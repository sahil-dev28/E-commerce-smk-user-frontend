import { Card, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";
import type { ProductProps } from "./ProductCard";

export default function ProductCardLoading({ products }: ProductProps) {
  return (
    <section className="p-10">
      <div className="mx-auto max-w-7xl">
        <div className="space-y-5 my-5 ">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Product Cards */}
          {products.map(() => (
            <Card className={"shadow-none ring-0 pb-2 pt-0 border"}>
              {/* Product Image */}
              <Skeleton className="size-80 relative" />

              <CardContent className="flex flex-1 flex-col justify-between gap-6">
                {/* Product Details */}
                <div className="space-y-4">
                  <div className="flex gap-2 text-center">
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <Skeleton className="h-6 w-14 rounded-full" />
                    </div>
                  </div>

                  <Separator />

                  {/* Product Price */}
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-semibold">
                      <Skeleton className="h-6 w-20 rounded-full" />
                    </span>

                    <div>
                      <span className="group-data-[state=checked]:hidden">
                        <Skeleton className="h-6 w-20 rounded-full" />
                      </span>
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
