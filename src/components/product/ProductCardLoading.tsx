import { Card, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";

type ProductCardLoadingProps = {
  count: number;
};

export default function ProductCardLoading({ count }: ProductCardLoadingProps) {
  return (
    <section className="p-10">
      <div className="mx-auto max-w-7xl">
        <div className="space-y-5 my-5">
          <Skeleton className="h-4 w-24 rounded-full" />
          <Skeleton className="h-8 w-48 rounded-full" />
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: count }).map((_, i) => (
            <Card key={i} className="shadow-none ring-0 pb-4 pt-0 border">
              {/* Image */}
              <Skeleton className="w-full aspect-square" />

              <CardContent className="flex flex-1 flex-col justify-between gap-6">
                <div className="space-y-4">
                  {/* Product name */}
                  <div className="flex justify-center">
                    <Skeleton className="h-5 w-40 rounded-full" />
                  </div>

                  {/* Rating + reviews + category */}
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <Skeleton className="h-5 w-14 rounded-sm" />
                      <Skeleton className="h-5 w-20 rounded-full" />
                    </div>
                    <Skeleton className="h-5 w-16 rounded-sm" />
                  </div>

                  <Separator />

                  {/* Price + heart icon */}
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-7 w-20 rounded-full" />
                    <Skeleton className="h-5 w-5 rounded-full" />
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
