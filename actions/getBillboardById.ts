import prismadb from "@/lib/prismadb";

const getBillboardById = async (billboardId: string) => {
  try {
    const res = await prismadb.billboard.findUnique({
      where: {
        id: billboardId,
      },
    });

    return res;
  } catch (error) {
    return null;
  }
};

export default getBillboardById;
