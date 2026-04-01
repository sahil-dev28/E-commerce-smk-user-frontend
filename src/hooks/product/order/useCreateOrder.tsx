import api from "@/api/axios-instance";
import { queryClient } from "@/main";
import type { CreateOrderData } from "@/types/auth.type";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

const createOrder = async (createOrder: CreateOrderData) => {
  console.log({ createOrder });

  const response = await api.post("/order", createOrder);
  return response.data;
};

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: createOrder,
    mutationKey: ["create-order"],

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addTo-Cart"] });
      queryClient.invalidateQueries({ queryKey: ["showCart-Product"] });
      queryClient.invalidateQueries({ queryKey: ["showSingle-product"] });
      queryClient.invalidateQueries({ queryKey: ["showMe-product"] });
      toast.success("Order created successfully");
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
