import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function FieldSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-4 w-20 rounded-full" />
      <Skeleton className="h-9 w-full rounded-md" />
    </div>
  );
}

export default function ProfileOverviewLoading() {
  return (
    <div className="min-h-screen mx-auto">
      <div className="px-10 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 mx-auto">
          {/* Profile sidebar */}
          <Card className="flex flex-col items-center p-0 relative">
            <div className="absolute top-4 right-4">
              <Skeleton className="h-8 w-8 rounded-md" />
            </div>

            {/* Avatar */}
            <Skeleton className="h-24 w-24 rounded-full mt-10" />

            {/* Name */}
            <Skeleton className="h-5 w-36 rounded-full mt-15" />

            {/* "Profile Overview" label */}
            <Skeleton className="h-4 w-32 rounded-full mt-4 mb-4" />
          </Card>

          {/* Form card */}
          <div className="xl:w-250 flex justify-center">
            <Card className="max-w-4xl w-full">
              <CardHeader>
                <Skeleton className="h-5 w-28 rounded-full" />
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Row 1: First Name, Last Name, Contact Number */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FieldSkeleton />
                  <FieldSkeleton />
                  <FieldSkeleton />
                </div>

                {/* Row 2: Gender, Date of birth, Email */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FieldSkeleton />
                  <FieldSkeleton />
                  <FieldSkeleton />
                </div>

                {/* Submit button */}
                <Skeleton className="h-9 w-32 rounded-md xl:mt-10 xl:mx-164" />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Address section */}
        <div className="gap-8 max-w-fit mx-auto mt-10">
          <div className="xl:w-250 flex justify-center">
            <Card className="max-w-4xl w-full">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <Skeleton className="h-5 w-28 rounded-full" />
                  <Skeleton className="h-9 w-28 rounded-md" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-24 w-full rounded-md" />
                <Skeleton className="h-24 w-full rounded-md" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
