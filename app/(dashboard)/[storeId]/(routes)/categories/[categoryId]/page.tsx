import getBillboards from "@/actions/getBillboards";
import getCategoryById from "@/actions/getCategoryById";
import CategoryForm from "./components/category-form";

const CategoryPage = async ({
  params,
}: {
  params: { categoryId: string; storeId: string };
}) => {
  const category = await getCategoryById(params.categoryId);
  const billboards = await getBillboards(params.storeId);

  console.log(category);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm initialData={category} billboards={billboards} />
      </div>
    </div>
  );
};

export default CategoryPage;
