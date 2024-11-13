import prisma from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

type SizeApiParams = Promise<{ storeId: string }>;

export const POST = async (
  request: Request,
  { params }: { params: SizeApiParams }
) => {
  try {
    const { storeId } = await params;
    const body = await request.json();
    const { name, value } = body;
    const { userId } = await auth();

    // console.log(userId);

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!storeId) {
      return new NextResponse("Store id is required", { status: 401 });
    }

    if (!name || !value) {
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

    const size = await prisma.size.create({
      data: {
        name,
        value,
        storeId: storeId,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZES_POST]_ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const GET = async (
  request: Request,
  { params }: { params: SizeApiParams }
) => {
  try {
    const { storeId } = await params;
    if (!storeId) {
      return new NextResponse("Store id is required", { status: 401 });
    }

    const sizes = await prisma.size.findMany({
      where: {
        storeId: storeId,
      },
    });

    return NextResponse.json(sizes);
  } catch (error) {
    console.log("[SIZES_GET]_ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
