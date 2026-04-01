import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductPageLoading() {
  return (
    <section>
      <div className="flex justify-evenly py-20">
        <div className="">
          <Skeleton className="h-120 w-120 border-2 rounded-xl" />
        </div>
        <Card className="ring-0 h-full w-150 rounded-none py-0">
          <CardHeader className="px-0">
            <CardTitle className="text-3xl font-bold">
              <Skeleton className="h-6 w-14 rounded-full" />
            </CardTitle>
          </CardHeader>
          <div className="flex gap-2 rounded-lg border w-fit items-center p-2">
            <div className="flex">
              <span className="text-lg font-semibold">
                <Skeleton className="h-6 w-14 rounded-full" />
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="text-3xl font-semibold">
              <Skeleton className="h-6 w-14 rounded-full" />
            </span>
            <span className="text-muted-foreground font-medium line-through">
              <Skeleton className="h-6 w-14 rounded-full" />
            </span>
          </div>

          <CardDescription>
            <Skeleton />
          </CardDescription>
          <Separator />
          <div className="text-lg font-medium grid grid-rows-3 gap-5">
            <div className="">
              <Skeleton className="h-6 w-14 rounded-full" />
            </div>
            <div className="">
              <Skeleton className="h-6 w-14 rounded-full" />
            </div>
            <div className="flex items-center w-fit gap-5">
              <Skeleton className="h-6 w-14 rounded-full" />
              <Skeleton className="h-6 w-14 rounded-full" />
            </div>
          </div>

          <Separator />
          <div className="flex-col grid grid-row-2 gap-4 p-5 border rounded-lg max-w-150">
            <div className="flex items-center">
              <span>
                <Skeleton className="h-6 w-14 rounded-full" />
              </span>
            </div>
            <Separator />

            <div className="flex items-center">
              <span>
                <Skeleton className="h-6 w-14 rounded-full" />
              </span>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
