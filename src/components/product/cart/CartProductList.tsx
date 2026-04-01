import CartProudctCard from "./CartProductCard";
import useGetCartProduct from "@/hooks/product/cart/useGetCartProduct";
import emptyBag from "../../../assets/emptyBag.png";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function CartProductList() {
  const {
    data: showMeProduct,
    // isLoading: productIsLoading,
    // isFetching: productIsFetching,
    // isSuccess: productIsSuccess,
    // error: productError,
  } = useGetCartProduct();
  const cartProductList = showMeProduct?.products || [];

  const navigate = useNavigate();

  const wishlistHandler = () => {
    navigate("/wishlist");
  };
  return (
    <div className="xl:flex xl:items-center xl:justify-center">
      {showMeProduct?.totalProducts === 0 ? (
        <div>
          <div>
            <img
              src={emptyBag}
              className="w-100 h-80 object-contain"
              alt="Empty bag"
            />
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">Hey, it feels light!</div>
            <div className="text-muted-foreground mt-2">
              There is nothing in your bag. Let's add some items.
            </div>

            <div className="mt-5">
              <Button
                variant="ghost"
                className="border-primary border-2 w-fit p-5 uppercase text-md cursor-pointer text-primary hover:text-primary"
                onClick={wishlistHandler}
              >
                Add items from wishlist
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <CartProudctCard cartProduct={cartProductList} />
      )}
    </div>
  );
}
