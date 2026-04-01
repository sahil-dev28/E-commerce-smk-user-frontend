import { Button } from "@/components/ui/button";
import { CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetSinglePropertyQuery } from "@/hooks/product/useGetSingleProduct";

import {
  Heart,
  RefreshCcw,
  ShoppingCartIcon,
  Star,
  Tally1Icon,
  Truck,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import ProductPageLoading from "./ProductPageLoading";
import { useAddToWishlist } from "@/hooks/product/wishlist/useAddToWishlist";
import { useAddToCart } from "@/hooks/product/cart/useAddToCartProduct";

export default function ProductPage() {
  const { id } = useParams();

  const { data, isLoading, isSuccess } = useGetSinglePropertyQuery({
    id: id || "",
  });

  const { mutateAsync: addToWishlist } = useAddToWishlist();
  const { mutateAsync: addToCart } = useAddToCart();

  const product = data?.product;

  const addToWishlistHandler = async () => {
    if (product?.id) await addToWishlist(product.id);
  };

  const addToCartHandler = async () => {
    if (product?.id) await addToCart(product.id);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      {isLoading && <ProductPageLoading />}

      {isSuccess && product && (
        <div className="grid gap-10 lg:grid-cols-2 items-start">
          {/* IMAGE */}
          <div className="flex justify-center">
            <img
              src={product.image}
              // className="w-full max-w-md rounded-2xl border object-cover"
              className="size-fit mx-auto xl:size-140 border-2 rounded-xl"
            />
          </div>

          {/* DETAILS */}
          <div className="space-y-6">
            {/* TITLE */}
            <div className="space-y-2">
              <h1 className="text-2xl lg:text-3xl font-bold">{product.name}</h1>

              {/* RATING */}
              <div className="flex items-center gap-2 border rounded-md px-3 py-1 w-fit">
                <span className="font-semibold">{product.averageRating}</span>
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <Tally1Icon className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground text-sm">
                  {product.numOfReviews}
                </span>
              </div>
            </div>

            {/* PRICE */}
            <div className="flex items-center gap-3">
              <span className="text-2xl lg:text-3xl font-semibold">
                ₹
                {product.discountAmount
                  ? product.price - product.discountAmount
                  : product.price}
              </span>

              {product.discountAmount && (
                <span className="text-muted-foreground line-through">
                  ₹{product.price}
                </span>
              )}
            </div>

            {/* DESCRIPTION */}
            <CardDescription className="text-sm leading-relaxed">
              {product.description}
            </CardDescription>

            <Separator />

            {/* PRODUCT INFO */}
            <div className="space-y-2 text-md">
              <p>
                <span className="font-medium">Color:</span> {product.color}
              </p>
              <p>
                <span className="font-medium">Size:</span>{" "}
                {product.sizes[0].value}
              </p>
            </div>

            {/* ACTIONS */}
            <div className="flex flex-col sm:flex-row gap-3">
              {product.isAddedToCart ? (
                <Link to="/product/cart" className="flex-1">
                  <Button className="w-full uppercase">
                    <ShoppingCartIcon />
                    Go to cart
                  </Button>
                </Link>
              ) : (
                <Button className="flex-1 uppercase" onClick={addToCartHandler}>
                  <ShoppingCartIcon />
                  Add to cart
                </Button>
              )}

              <Button
                variant="outline"
                className="flex-1 uppercase"
                onClick={addToWishlistHandler}
                disabled={product.isWishListed}
              >
                <Heart
                  className={
                    product.isWishListed
                      ? "fill-destructive text-destructive"
                      : ""
                  }
                />
                {product.isWishListed ? "Wishlisted" : "Wishlist"}
              </Button>
            </div>

            <Separator />

            {/* DELIVERY */}
            <div className="border rounded-xl p-4 space-y-4">
              <div className="flex gap-4 items-start">
                <Truck className="w-6 h-6 mt-1" />
                <div>
                  <p className="font-semibold">Free Delivery</p>
                  <p className="text-sm text-muted-foreground">
                    Enter your postal code for availability
                  </p>
                </div>
              </div>

              <Separator />

              <div className="flex gap-4 items-start">
                <RefreshCcw className="w-6 h-6 mt-1" />
                <div>
                  <p className="font-semibold">Return Delivery</p>
                  <p className="text-sm text-muted-foreground">
                    Free 30-day returns. Details
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
