import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/auth.type";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useRemoveFromWishlist } from "@/hooks/product/wishlist/useRemoveFromWishlist";
import { useAddToCart } from "@/hooks/product/cart/useAddToCartProduct";

export type ProductProps = {
  products: Product[];
};

export default function WishListCard({ products }: ProductProps) {
  const { mutateAsync: removeWishlist } = useRemoveFromWishlist();
  const { mutateAsync: addToCart } = useAddToCart();
  const getImageUrl = (image: File | string): string => {
    if (typeof image === "string") return image;
    return URL.createObjectURL(image);
  };

  const addToCartHandler = async (productId: string) => {
    await addToCart(productId!);
  };
  const removeWishlistHandler = async (productId: string) => {
    await removeWishlist(productId);
  };
  return (
    <section className="">
      <div className="mx-auto max-w-7xl">
        <div className="my-10 flex justify-center">
          <h2 className="text-2xl font-semibold sm:text-2xl lg:text-3xl">
            My Wishlist{" "}
            <span className="font-light">{products.length} items</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 p-5 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:p-0 xl:grid-cols-4">
          {/* Product Cards */}
          {products.map((product) => (
            <Card
              key={product.id}
              className={cn(
                "shadow-none ring-0 pt-0 pb-2 border relative w-fit h-fit md:w-100 lg:w-full",
              )}
            >
              {/* Product Image */}
              <Link to={`/product/${product.id}`}>
                <img
                  src={getImageUrl(product.image)}
                  className="size-50 sm:size-60 md:size-100 lg:size-100 object-cover rounded-t-md"
                />
              </Link>

              {/* Sale Badge */}
              {product.discountAmount ? (
                <Badge className="absolute top-0 left-0 m-3 bg-destructive/80 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40  mx-3 rounded-sm px-3 py-1 uppercase focus-visible:outline-none">
                  Sale
                </Badge>
              ) : (
                ""
              )}

              <Button
                variant="destructive"
                className="absolute top-0 right-0 rounded-full m-1 z-10 cursor-pointer"
                onClick={() => removeWishlistHandler(product.id)}
              >
                <X color="#fff" className="w-5 h-5" />
              </Button>

              <CardContent className="flex flex-1 flex-col justify-between">
                {/* Product Details */}
                <div className="space-y-2">
                  <div className="flex flex-col gap-2 text-center">
                    <Link to={`/product/${product.id}`}>
                      <h3 className="text-xl font-medium">{product.name}</h3>
                    </Link>
                  </div>

                  <div className="flex items-center justify-center">
                    {!product.discountAmount && (
                      <span className="font-semibold text-xl">
                        ₹{product.price}
                      </span>
                    )}
                    {product.discountAmount ? (
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl font-semibold">
                          ₹{product.price - product.discountAmount}
                        </span>
                        <span className="text-muted-foreground font-medium line-through">
                          ₹{product.price}
                        </span>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>

                  <Separator className="w-2xl" />

                  {/* Product Price */}
                  <div className="flex items-center justify-center">
                    <div>
                      <Button
                        variant="ghost"
                        className="uppercase cursor-pointer w-full text-primary hover:text-primary/90"
                        onClick={() => addToCartHandler(product.id)}
                      >
                        Move to cart
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
