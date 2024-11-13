import prisma from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

type BillboardApiParams = Promise<{ billboardId: string; storeId: string }>;

export const POST = async (
  request: Request,
  { params }: { params: BillboardApiParams }
) => {
  try {
    const { storeId } = await params;
    const body = await request.json();
    const { label, imageUrl } = body;
    const { userId } = await auth();

    // console.log(userId);

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!storeId) {
      return new NextResponse("Store id is required", { status: 401 });
    }

    if (!label || !imageUrl) {
      return new NextResponse("Invalid data", { status: 400 });
    }

    const storeByUserId = await prisma.store.findUnique({
      where: {
        userId,
        id: storeId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const billboard = await prisma.billboard.create({
      data: {
        label,
        imageUrl,
        storeId: storeId,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARDS_POST]_ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const GET = async (
  request: Request,
  { params }: { params: BillboardApiParams }
) => {
  try {
    const { storeId } = await params;
    if (!storeId) {
      return new NextResponse("Store id is required", { status: 401 });
    }

    const billboards = await prisma.billboard.findMany({
      where: {
        storeId: storeId,
      },
    });

    return NextResponse.json(billboards);
  } catch (error) {
    console.log("[BILLBOARDS_GET]_ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
