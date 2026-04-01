import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRemoveFromCart } from "@/hooks/product/cart/useRemoveFromCartProduct";
import type { Product } from "@/types/auth.type";
import { Trash2 } from "lucide-react";

export function AlertDeleteDialog({ product }: { product: Product }) {
  const { mutateAsync: removeFromCart } = useRemoveFromCart();

  const removeFromCartHandler = async () => {
    await removeFromCart(product.id);
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="cursor-pointer">
          <Trash2 />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-96">
        <div className="flex gap-5">
          <div>
            <img
              src={
                typeof product.image === "string"
                  ? product.image
                  : URL.createObjectURL(product.image)
              }
              className="size-15"
            />
          </div>
          <div>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-lg">
                Remove from cart
              </AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to move this item from cart?
              </AlertDialogDescription>
            </AlertDialogHeader>
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={removeFromCartHandler}>
            Remove
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
