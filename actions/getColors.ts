import prismadb from "@/lib/prismadb";

const getColors = async (storeId: string) => {
  try {
    const res = await prismadb.color.findMany({
      where: {
        storeId: storeId,
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

export default getColors;
