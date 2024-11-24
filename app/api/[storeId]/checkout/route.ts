import prisma from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

type CheckoutApiParams = Promise<{ storeId: string }>;

export const POST = async (
  request: Request,
  { params }: { params: CheckoutApiParams }
) => {
  try {
    const { storeId } = await params;
    const body = await request.json();
    const { productIds } = body;

    if (!productIds || productIds.length === 0) {
      return new NextResponse("Invalid data", { status: 400 });
    }

    const products = await prisma.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
    });

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    products.forEach((product) => {
      line_items.push({
        quantity: 1,
        price_data: {
          currency: "USD",
          product_data: {
            name: product.name,
          },
          unit_amount: Number(product.price) * 100,
        },
      });
    });

    const order = await prisma.order.create({
      data: {
        storeId,
        isPaid: false,
        orderItems: {
          create: productIds.map((productId: string) => ({
            product: {
              connect: {
                id: productId,
              },
            },
          })),
        },
      },
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      billing_address_collection: "required",
      phone_number_collection: {
        enabled: true,
      },
      success_url: `${process.env.NEXT_PUBLIC_FRONTEND_STORE_URL}/cart?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_FRONTEND_STORE_URL}/cart?canceled=1`,
      metadata: {
        orderId: order.id,
      },
    });

    return NextResponse.json(
      {
        url: session.url,
      },
      {
        headers: corsHeaders,
      }
    );
  } catch (error) {
    console.log("[CHECKOUT_POST]_ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
