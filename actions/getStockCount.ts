import prismadb from "@/lib/prismadb";

export const getStockCount = async (storeId: string) => {
  const count = await prismadb.product.count({
    where: {
      storeId: storeId,
      isArchived: false,
    },
  });
  return count;
};
