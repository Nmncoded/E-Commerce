import prismadb from "@/lib/prismadb";

const getProductById = async (productId: string) => {
  try {
    const res = await prismadb.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        images: true,
      },
    });

    return res;
  } catch (error) {
    return null;
  }
};

export default getProductById;
