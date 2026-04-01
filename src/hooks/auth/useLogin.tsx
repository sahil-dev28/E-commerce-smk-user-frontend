import api from "@/api/axios-instance";
import type { UserLoginData } from "@/types/auth.type";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

const loginUser = async (data: UserLoginData) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export const useAdminLogin = () => {
  return useMutation({
    mutationFn: loginUser,
    mutationKey: ["admin-login"],

    onSuccess: (data) => {
      toast.success(data.message || "Admin logged in successfully");
    },
    onError: (
      error: AxiosError<{
        msg: string;
      }>,
    ) => {
      toast.error(
        error.response?.data.msg || "Failed to login. Please try again.",
      );
    },
  });
};
