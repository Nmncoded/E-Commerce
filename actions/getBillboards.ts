import prismadb from "@/lib/prismadb";

const getBillboards = async (storeId: string) => {
  try {
    const res = await prismadb.billboard.findMany({
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

export default getBillboards;
