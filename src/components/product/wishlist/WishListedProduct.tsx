import useGetWishlistProduct from "@/hooks/product/wishlist/useGetWishlistProduct";
import WishListCard from "./WishListCard";

export default function WishListedProductList() {
  const {
    data: showMeProduct,
    // isLoading: productIsLoading,
    // isFetching: productIsFetching,
    // isSuccess: productIsSuccess,
    // error: productError,
  } = useGetWishlistProduct();
  const productList = showMeProduct?.products || [];
  return (
    <div>
      <WishListCard products={productList} />
    </div>
  );
}
