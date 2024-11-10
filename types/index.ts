// types/index.ts
export interface PageParams {
  storeId: string;
}

export interface BillboardPageParams extends PageParams {
  billboardId: string;
}

export interface CategoryPageParams extends PageParams {
  categoryId: string;
}

export interface ColorPageParams extends PageParams {
  colorId: string;
}

export interface SizePageParams extends PageParams {
  sizeId: string;
}

export interface ProductPageParams extends PageParams {
  productId: string;
}

// Base props interface
export interface PageProps<T = {}> {
  params: T;
  searchParams: { [key: string]: string | string[] | undefined };
}

// Specific page props
export type BillboardProps = PageProps<BillboardPageParams>;
export type CategoryProps = PageProps<CategoryPageParams>;
export type ColorProps = PageProps<ColorPageParams>;
export type SizeProps = PageProps<SizePageParams>;
export type ProductProps = PageProps<ProductPageParams>;
export type StoreProps = PageProps<PageParams>;
