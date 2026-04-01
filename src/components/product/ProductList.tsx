import { useProductQuery } from "@/hooks/product/useShowMeProduct";
import ProductCard from "./ProductCard";
import ProductCardLoading from "./ProductCardLoading";

type props = {
  search: string;
};

export default function ProductList({ search }: props) {
  const {
    data: showMeProduct,
    isLoading: productIsLoading,
    isFetching: productIsFetching,
    // isSuccess: productIsSuccess,
    // error: productError,
  } = useProductQuery();
  const productList = showMeProduct?.products || [];

  const filteredProducts = productList.filter((product) => {
    const query = (search || "").toLowerCase();

    return (
      (product.name || "").toLowerCase().includes(query) ||
      (product.category?.name || "").toLowerCase().includes(query)
    );
  });

  return (
    <div>
      {productIsLoading || productIsFetching ? (
        // <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
        //   {Array.from({ length: 5 }).map(() => {
        //     return <ProductCardLoading products={productList} />;
        //   })}
        // </div>
        <div>
          <ProductCardLoading products={productList} />
        </div>
      ) : (
        <>
          <ProductCard products={filteredProducts} />
        </>
      )}
    </div>
  );
}
