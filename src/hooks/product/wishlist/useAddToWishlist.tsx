import api from "@/api/axios-instance";
import { queryClient } from "@/main";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

const addToWishList = async (id: string) => {
  const response = await api.post(`/product/wishlist/${id}`);
  return response.data;
};

export const useAddToWishlist = () => {
  return useMutation({
    mutationFn: addToWishList,
    mutationKey: ["wishlist-product"],

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist-product"] });
      queryClient.invalidateQueries({ queryKey: ["showSingle-product"] });
      queryClient.invalidateQueries({ queryKey: ["showMe-product"] });
      toast.success("Added to wishlist");
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
