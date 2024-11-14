import prismadb from "@/lib/prismadb";

const getOrders = async (storeId: string) => {
  try {
    const res = await prismadb.order.findMany({
      where: {
        storeId: storeId,
      },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res;
  } catch (error) {
    return null;
  }
};

export default getOrders;
