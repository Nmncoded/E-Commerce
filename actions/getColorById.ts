import prismadb from "@/lib/prismadb";

const getColorById = async (colorId: string) => {
  try {
    const res = await prismadb.color.findUnique({
      where: {
        id: colorId,
      },
    });

    return res;
  } catch (error) {
    return null;
  }
};

export default getColorById;
