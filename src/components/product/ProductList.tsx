import { useProductQuery } from "@/hooks/product/useShowMeProduct";
import ProductCard from "./ProductCard";
import ProductCardLoading from "./ProductCardLoading";
import { SearchX } from "lucide-react";

const SKELETON_COUNT = 8;

type Props = {
  search: string;
};

export default function ProductList({ search }: Props) {
  const { data: showMeProduct, isLoading: productIsLoading } =
    useProductQuery();

  const productList = showMeProduct?.products || [];

  const filteredProducts = productList.filter((product) => {
    const query = (search || "").toLowerCase();
    return (
      (product.name || "").toLowerCase().includes(query) ||
      (product.category?.name || "").toLowerCase().includes(query)
    );
  });

  if (productIsLoading) {
    return <ProductCardLoading count={SKELETON_COUNT} />;
  }

  if (search && filteredProducts.length === 0) {
    return (
      <section className="p-10">
        <div className="mx-auto max-w-7xl flex flex-col items-center justify-center py-24 gap-4 text-center">
          <SearchX className="size-12 text-muted-foreground" />
          <h2 className="text-xl font-semibold">No results for "{search}"</h2>
          <p className="text-muted-foreground text-sm">
            Try a different keyword or browse all products.
          </p>
        </div>
      </section>
    );
  }

  return <ProductCard products={filteredProducts} />;
}
