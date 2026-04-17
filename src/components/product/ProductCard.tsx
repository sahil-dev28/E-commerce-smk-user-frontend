import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { HeartIcon, StarIcon } from "lucide-react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cn } from "@/lib/utils";

import type { Product } from "@/types/auth.type";
import { Link } from "react-router-dom";
import { useAddToWishlist } from "@/hooks/product/wishlist/useAddToWishlist";

export type ProductProps = {
  products: Product[];
};

export default function ProductCard({ products }: ProductProps) {
  const { mutateAsync: addToWishlist } = useAddToWishlist();

  const addToWishlistHandler = async (productId: string) => {
    await addToWishlist(productId);
  };

  const getImageUrl = (image: File | string): string => {
    if (typeof image === "string") return image;
    return URL.createObjectURL(image);
  };

  return (
    <section className="p-10">
      <div className="mx-auto max-w-7xl">
        <div className="space-y-5 my-5 ">
          <p className="text-sm font-medium">Urban Store</p>
          <h2 className="text-2xl font-semibold sm:text-3xl lg:text-4xl">
            All New Collection
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {/* Product Cards */}
          {products.map((product) => {
            return (
              <Card
                key={product.id}
                className={cn(
                  "shadow-none ring-0 pt-0 pb-4 border",
                  // product.salePrice && "relative",
                )}
              >
                {/* Product Image */}
                <Link to={`/product/${product.id}`}>
                  <img
                    src={getImageUrl(product.image)}
                    className="sm:size-full relative md:size-120 lg:size-80"
                  />
                </Link>

                {/* Sale Badge */}
                {product.discountAmount ? (
                  <Badge className="absolute m-3 bg-destructive/80 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40  mx-3 rounded-sm px-3 py-1 uppercase focus-visible:outline-none">
                    Sale
                  </Badge>
                ) : (
                  ""
                )}

                <CardContent className="flex flex-1 flex-col justify-between gap-6">
                  {/* Product Details */}
                  <div className="space-y-4">
                    <div className="flex flex-col gap-2 text-center">
                      <Link to={`/product/${product.id}`}>
                        <h3 className="text-xl font-semibold">
                          {product.name}
                        </h3>
                      </Link>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex gap-2">
                        <div>
                          <Badge className="rounded-sm bg-green-600/10 text-green-600 focus-visible:ring-green-600/20 focus-visible:outline-none dark:bg-green-400/10 dark:text-green-400 dark:focus-visible:ring-green-400/40">
                            <StarIcon />
                            {product.averageRating}
                          </Badge>
                        </div>
                        <div className="text-gray-500 underline">
                          {product.numOfReviews} Reviews
                        </div>
                      </div>

                      <div>
                        <Badge className="rounded-sm bg-green-600/10 text-green-600 focus-visible:ring-green-600/20 focus-visible:outline-none dark:bg-green-400/10 dark:text-green-400 dark:focus-visible:ring-green-400/40">
                          {product.category.name}
                        </Badge>
                      </div>
                    </div>

                    <Separator />

                    {/* Product Price */}
                    <div className="flex items-center justify-between">
                      {!product.discountAmount && (
                        <span className="text-2xl font-semibold">
                          ₹{product.price}
                        </span>
                      )}
                      {product.discountAmount ? (
                        <div className="flex items-center gap-2.5">
                          <span className="text-2xl font-semibold">
                            ₹{product.price - product.discountAmount}
                          </span>
                          <span className="text-muted-foreground font-medium line-through">
                            ₹{product.price}
                          </span>
                        </div>
                      ) : (
                        ""
                      )}

                      <div>
                        {product.isWishListed ? (
                          <CheckboxPrimitive.Root>
                            <span className="">
                              <HeartIcon className="fill-destructive stroke-destructive size-5 cursor-pointer" />
                            </span>
                          </CheckboxPrimitive.Root>
                        ) : (
                          <CheckboxPrimitive.Root
                            data-slot="checkbox"
                            className="group focus-visible:ring-ring/50 rounded-sm p-2.5 outline-none focus-visible:ring-3"
                            aria-label="Heart icon"
                            onCheckedChange={() =>
                              addToWishlistHandler(product.id)
                            }
                          >
                            <span className="group-data-[state=checked]:hidden cursor-pointer">
                              <HeartIcon className="size-5" />
                            </span>
                          </CheckboxPrimitive.Root>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
