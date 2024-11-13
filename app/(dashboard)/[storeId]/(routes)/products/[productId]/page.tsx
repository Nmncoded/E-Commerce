import getCategories from "@/actions/getCategories";
import getColors from "@/actions/getColors";
import getProductById from "@/actions/getProductById";
import getSizes from "@/actions/getSizes";
import ProductForm from "./components/product-form";

type ProductPageParams = Promise<{ storeId: string; productId: string }>;

const ProductPage = async ({ params }: { params: ProductPageParams }) => {
  const { productId, storeId } = await params;
  const product = await getProductById(productId);
  const categories = await getCategories(storeId);
  const sizes = await getSizes(storeId);
  const colors = await getColors(storeId);

  // console.log(product);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm
          initialData={product}
          sizes={sizes}
          colors={colors}
          categories={categories}
        />
      </div>
    </div>
  );
};

export default ProductPage;
