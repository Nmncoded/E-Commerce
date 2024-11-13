import getCategories from "@/actions/getCategories";
import { format } from "date-fns";
import CategoryClient from "./components/client";
import { CategoryColumn } from "./components/columns";

type CategoriesPageParams = Promise<{ storeId: string }>;

const CategoriesPage = async ({ params }: { params: CategoriesPageParams }) => {
  const { storeId } = await params;
  const categories = await getCategories(storeId);

  const formattedCategories: CategoryColumn[] = (categories || [])?.map(
    (item) => ({
      id: item.id,
      name: item.name,
      billboardLabel: item.billboard.label,
      createdAt: format(item.createdAt, "MMMM do, yyyy"),
    })
  );

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={formattedCategories} />
      </div>
    </div>
  );
};

export default CategoriesPage;
