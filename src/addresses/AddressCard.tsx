import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { Address } from "@/types/auth.type";
import { Separator } from "@/components/ui/separator";
import { useDeleteAddress } from "@/hooks/address/useDeleteAddress";
import { AddressForm } from "@/components/address/CreateAddressForm";
import { useState } from "react";
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

const AddressItem = ({ address }: AddressProps) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const { mutateAsync: deleteAddress } = useDeleteAddress();

  const removeAddressHandler = async () => {
    await deleteAddress(address.id);
    setIsDeleteOpen(false);
  };

  return (
    <Card className="flex flex-col justify-between h-full shadow-sm hover:shadow-md transition rounded-2xl">
      {/* Badge */}
      {address.type && (
        <Badge className="absolute top-3 right-3 uppercase">
          {address.type}
        </Badge>
      )}

      {/* Content */}
      <CardContent className="space-y-2 text-sm pt-6">
        <p className="font-medium text-base">{address.address}</p>
        <p className="text-muted-foreground">
          {address.city}, {address.state}
        </p>
        <p className="text-muted-foreground">
          {address.country} - {address.pincode}
        </p>
      </CardContent>

      {/* Footer */}
      <CardFooter className="flex gap-2 pt-4">
        <div className="flex-1">
          <AddressForm mode="edit" address={address} />
        </div>

        <Separator orientation="vertical" />

        <Button
          variant="ghost"
          className="flex-1 text-destructive hover:text-destructive"
          onClick={() => setIsDeleteOpen(true)}
        >
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
