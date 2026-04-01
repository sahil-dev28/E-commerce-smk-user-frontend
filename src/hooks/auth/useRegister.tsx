import api from "@/api/axios-instance";
import type { UserRegisterData } from "@/types/auth.type";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

const registerUser = async (data: UserRegisterData) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};



export const useRegisterUser = () => {
  return useMutation({
    mutationFn: registerUser,
    mutationKey: ["register-user"],

    onSuccess: (data) => {
      toast.success(data.message || "Account created successfully!");
    },

    onError: (
      error: AxiosError<{
        msg: string;
      }>,
    ) => {
      toast.error(
        error.response?.status || "Failed to register. Please try again.",
      );
    },
  });
};
