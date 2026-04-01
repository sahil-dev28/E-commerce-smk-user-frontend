import api from "@/api/axios-instance";
import { queryClient } from "@/main";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

const removeFromWishlist = async (id: string) => {
  const response = await api.delete(`/product/wishlist/${id}`);
  return response;
};

export const useRemoveFromWishlist = () => {
  return useMutation({
    mutationFn: removeFromWishlist,
    mutationKey: ["remove-wishlist"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist-product"] });
      queryClient.invalidateQueries({ queryKey: ["showMe-wishlistProduct"] });
      toast.success("Removed from wishlist");
    },

    onError: (
      error: AxiosError<{
        msg: string;
      }>,
    ) => {
      toast.error(error.response?.status || "Something went wrong");
    },
  });
};
