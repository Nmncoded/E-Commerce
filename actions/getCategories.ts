import prismadb from "@/lib/prismadb";

const getCategories = async (storeId: string) => {
  try {
    const res = await prismadb.category.findMany({
      where: {
        storeId: storeId,
      },
      include: {
        billboard: true,
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

export default getCategories;
