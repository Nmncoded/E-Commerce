import prismadb from "@/lib/prismadb";

const getSizeById = async (sizeId: string) => {
  try {
    const res = await prismadb.size.findUnique({
      where: {
        id: sizeId,
      },
    });

    return res;
  } catch (error) {
    return null;
  }
};

export default getSizeById;
