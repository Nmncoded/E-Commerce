import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

type SizeApiParams = Promise<{ sizeId: string; storeId: string }>;

export async function GET(
  request: Request,
  { params }: { params: SizeApiParams }
) {
  try {
    const { sizeId } = await params;
    if (!sizeId) {
      return new NextResponse("size id is required", { status: 400 });
    }

    const size = await prismadb.size.findUnique({
      where: {
        id: sizeId,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZE_ID_GET]_ERROR", error);

    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: SizeApiParams }
) {
  try {
    const { sizeId, storeId } = await params;
    const { userId } = await auth();
    const body = await request.json();
    const { name, value } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name || !value) {
      return new NextResponse("Invalid data", { status: 400 });
    }

    if (!storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    if (!sizeId) {
      return new NextResponse("size id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findUnique({
      where: {
        userId,
        id: storeId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const size = await prismadb.size.updateMany({
      where: {
        id: sizeId,
      },
      data: {
        name,
        value,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZE_ID_PATCH]_ERROR", error);

    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: SizeApiParams }
) {
  try {
    const { sizeId, storeId } = await params;
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    if (!sizeId) {
      return new NextResponse("size id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findUnique({
      where: {
        userId,
        id: storeId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const size = await prismadb.size.delete({
      where: {
        id: sizeId,
        storeId: storeId,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZE_ID_DELETE]_ERROR", error);

    return new NextResponse("Internal Error", { status: 500 });
  }
}
