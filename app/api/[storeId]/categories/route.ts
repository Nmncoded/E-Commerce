import prisma from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const POST = async (
  request: Request,
  { params }: { params: { storeId: string } }
) => {
  try {
    const body = await request.json();
    const { name, billboardId } = body;
    const { userId } = await auth();

    // console.log(userId);

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 401 });
    }

    if (!name || !billboardId) {
      return new NextResponse("Invalid data", { status: 400 });
    }

    const storeByUserId = await prisma.store.findUnique({
      where: {
        userId,
        id: params.storeId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const category = await prisma.category.create({
      data: {
        name,
        billboardId,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORIES_POST]_ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const GET = async (
  request: Request,
  { params }: { params: { storeId: string } }
) => {
  try {
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 401 });
    }

    const categories = await prisma.category.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.log("[CATEGORIES_GET]_ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
