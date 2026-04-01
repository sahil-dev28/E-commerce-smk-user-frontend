import api from "@/api/axios-instance";
import { queryClient } from "@/main";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

const deleteAddress = async (id: string) => {
  const response = await api.delete(`/address/${id}`);
  return response.data;
};

export const useDeleteAddress = () => {
  return useMutation({
    mutationFn: deleteAddress,
    mutationKey: ["delete-address"],

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["delete-address"] });
      queryClient.invalidateQueries({ queryKey: ["showMe-address"] });
      toast.success(data.message || "Address deleted successfully");
    },
    onError: (
      error: AxiosError<{
        msg: string;
      }>,
    ) => {
      toast.error(
        error.response?.data.msg ||
          "Failed to deleted the address. Please try again.",
      );
    },
  });
};
