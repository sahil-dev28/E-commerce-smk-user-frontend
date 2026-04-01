import api from "@/api/axios-instance";
import { queryClient } from "@/main";
import type { UpdateAddressData } from "@/types/auth.type";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

const updateAddress = async ({
  id,
  payload,
}: {
  id: string;
  payload: Partial<UpdateAddressData>;
}) => {
  const response = await api.patch(`/address/${id}`, payload);
  return response;
};

export const useUpdateAddress = () => {
  return useMutation({
    mutationFn: updateAddress,
    mutationKey: ["Update-address"],

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["showMe-address"] });
      toast.success("Address updated successfully.");
    },
    onError: (
      error: AxiosError<{
        msg: string;
      }>,
    ) => {
      toast.error(error.response?.status || "Failed to update the address");
    },
  });
};
