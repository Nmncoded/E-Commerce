import prismadb from "@/lib/prismadb";

const getCategoryById = async (categoryId: string) => {
  try {
    const res = await prismadb.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    return res;
  } catch (error) {
    return null;
  }
};

export default getCategoryById;
