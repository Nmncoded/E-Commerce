import getBillboards from "@/actions/getBillboards";
import getCategoryById from "@/actions/getCategoryById";
import CategoryForm from "./components/category-form";

type CategoryPageParams = Promise<{ storeId: string; categoryId: string }>;

const CategoryPage = async ({ params }: { params: CategoryPageParams }) => {
  const { storeId, categoryId } = await params;
  const category = await getCategoryById(categoryId);
  const billboards = await getBillboards(storeId);

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
