import getProducts from "@/actions/getProducts";
import { formatter } from "@/lib/utils";
import { formatDate } from "date-fns";
import ProductClient from "./components/client";
import { ProductColumn } from "./components/columns";

type ProductsPageParams = Promise<{ storeId: string }>;

const ProductsPage = async ({ params }: { params: ProductsPageParams }) => {
  const { storeId } = await params;
  const products = await getProducts(storeId);

  const formattedProducts: ProductColumn[] = (products || [])?.map((item) => ({
    id: item.id,
    name: item.name,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    price: formatter.format(item.price),
    category: item.category.name,
    size: item.size.name,
    color: item.color.value,
    createdAt: formatDate(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient data={formattedProducts} />
      </div>
    </div>
  );
};

export default ProductsPage;
