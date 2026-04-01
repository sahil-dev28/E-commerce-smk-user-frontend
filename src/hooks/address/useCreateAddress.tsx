import api from "@/api/axios-instance";
import { queryClient } from "@/main";
import type { CreateAddressData } from "@/types/auth.type";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

const createAddress = async (createAddress: CreateAddressData) => {
  const response = await api.post("/address", createAddress);
  return response.data;
};

export const useCreateAddress = () => {
  return useMutation({
    mutationFn: createAddress,
    mutationKey: ["Create-address"],

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["showMe-address"] });
      toast.success("Address created successfully");
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
