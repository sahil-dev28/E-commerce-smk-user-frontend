import api from "@/api/axios-instance";
import { queryClient } from "@/main";
import type { VerifyOrderData } from "@/types/auth.type";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

const verifyOrder = async (verifyOrder: VerifyOrderData) => {
  const response = await api.post("/order/verify", verifyOrder);
  return response.data;
};

export const useVerifyOrder = () => {
  return useMutation({
    mutationFn: verifyOrder,
    mutationKey: ["verify-order"],

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["verify-order"] });
      queryClient.invalidateQueries({ queryKey: ["showCart-Product"] });
      queryClient.invalidateQueries({ queryKey: ["create-order"] });
      toast.success("Order verified successfully");
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
