import api from "@/api/axios-instance";
import { useQuery } from "@tanstack/react-query";
import type { ProductResponse } from "../useShowMeProduct";

const getCartProduct = async () => {
  const { data } = await api.get<ProductResponse>(`/product/cart`);
  return data;
};

export default function useGetCartProduct() {
  return useQuery<ProductResponse>({
    queryKey: ["showCart-Product"],
    queryFn: getCartProduct,
  });
}
