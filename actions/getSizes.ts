import prismadb from "@/lib/prismadb";

const getSizes = async (storeId: string) => {
  try {
    const res = await prismadb.size.findMany({
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

export default getSizes;
