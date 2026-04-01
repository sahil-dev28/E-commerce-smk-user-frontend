import api from "@/api/axios-instance";
import { queryClient } from "@/main";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

const removeFromCart = async (id: string) => {
  const response = await api.delete(`/product/cart/${id}`);
  return response;
};

export const useRemoveFromCart = () => {
  return useMutation({
    mutationFn: removeFromCart,
    mutationKey: ["removeFrom-cart"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["removeFrom-cart"] });
      queryClient.invalidateQueries({ queryKey: ["showCart-Product"] });
      toast.success("Removed from cart");
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
