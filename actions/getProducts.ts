import prismadb from "@/lib/prismadb";

const getProducts = async (storeId: string) => {
  try {
    const res = await prismadb.product.findMany({
      where: {
        storeId: storeId,
      },
      include: {
        images: true,
        category: true,
        size: true,
        color: true,
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

export default getProducts;
