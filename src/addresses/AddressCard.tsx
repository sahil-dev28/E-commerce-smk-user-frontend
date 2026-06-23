import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { Address } from "@/types/auth.type";
import { useDeleteAddress } from "@/hooks/address/useDeleteAddress";
import { AddressForm } from "@/components/address/CreateAddressForm";
import { useState } from "react";
import { MapPin, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export type AddressCardProps = {
  addressList: Address[];
};

export default function AddressCard({ addressList }: AddressCardProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-6">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {addressList.map((address) => (
          <AddressItem key={address.id} address={address} />
        ))}
      </div>
    </section>
  );
}

interface AddressProps {
  address: Address;
}

function badgeClass(type: string | undefined) {
  if (type === "HOME")
    return "bg-green-600/10 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800";
  if (type === "OFFICE")
    return "bg-blue-600/10 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800";
  return "bg-muted text-muted-foreground";
}

const AddressItem = ({ address }: AddressProps) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const { mutateAsync: deleteAddress } = useDeleteAddress();

  const removeAddressHandler = async () => {
    await deleteAddress(address.id);
    setIsDeleteOpen(false);
  };

  return (
    <Card className="relative flex flex-col justify-between h-full shadow-sm hover:shadow-md transition rounded-2xl">
      {/* Content */}
      <CardContent className="space-y-3 text-sm pt-4">
        {address.type && (
          <Badge
            variant="outline"
            className={`text-xs font-semibold uppercase tracking-wide px-2 py-0.5 ${badgeClass(address.type)}`}
          >
            {address.type}
          </Badge>
        )}

        <div className="flex items-start gap-2">
          <MapPin className="size-4 mt-0.5 shrink-0 text-muted-foreground" />
          <div className="space-y-1">
            <p className="font-medium text-base leading-snug">
              {address.address}
            </p>
            <p className="text-muted-foreground">
              {address.city}, {address.state}
            </p>
            <p className="text-muted-foreground">
              {address.country} — {address.pincode}
            </p>
          </div>
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="flex gap-2 pt-2 pb-4 px-4">
        <div className="flex-1">
          <AddressForm mode="edit" address={address} />
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="flex-1 text-destructive hover:text-destructive hover:bg-destructive/10 cursor-pointer gap-1.5"
          onClick={() => setIsDeleteOpen(true)}
        >
          <Trash2 className="size-4" />
          Remove
        </Button>
      </CardFooter>

      {/* Dialog */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this address?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={removeAddressHandler}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};
