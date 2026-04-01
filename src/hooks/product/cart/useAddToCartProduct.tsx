import api from "@/api/axios-instance";
import { queryClient } from "@/main";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

const addToCart = async (id: string) => {
  const response = await api.post(`/product/cart/${id}`);
  return response.data;
};

export const useAddToCart = () => {
  return useMutation({
    mutationFn: addToCart,
    mutationKey: ["addTo-Cart"],

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addTo-Cart"] });
      queryClient.invalidateQueries({ queryKey: ["showCart-Product"] });
      queryClient.invalidateQueries({ queryKey: ["showSingle-product"] });
      queryClient.invalidateQueries({ queryKey: ["showMe-product"] });
      toast.success("Added to cart");
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
