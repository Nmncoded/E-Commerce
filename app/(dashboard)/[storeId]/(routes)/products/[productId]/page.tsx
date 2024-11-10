import getCategories from "@/actions/getCategories";
import getColors from "@/actions/getColors";
import getProductById from "@/actions/getProductById";
import getSizes from "@/actions/getSizes";
import ProductForm from "./components/product-form";

const ProductPage = async ({
  params,
}: {
  params: { productId: string; storeId: string };
}) => {
  const product = await getProductById(params?.productId);
  const categories = await getCategories(params?.storeId);
  const sizes = await getSizes(params?.storeId);
  const colors = await getColors(params?.storeId);

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
