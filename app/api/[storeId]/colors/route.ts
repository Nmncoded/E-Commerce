import prisma from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

type ColorApiParams = Promise<{ storeId: string }>;

export const POST = async (
  request: Request,
  { params }: { params: ColorApiParams }
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

    const color = await prisma.color.create({
      data: {
        name,
        value,
        storeId: storeId,
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLORS_POST]_ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const GET = async (
  request: Request,
  { params }: { params: ColorApiParams }
) => {
  try {
    const { storeId } = await params;
    if (!storeId) {
      return new NextResponse("Store id is required", { status: 401 });
    }

    const colors = await prisma.color.findMany({
      where: {
        storeId: storeId,
      },
    });

    return NextResponse.json(colors);
  } catch (error) {
    console.log("[COLORS_GET]_ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
