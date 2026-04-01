import api from "@/api/axios-instance";
import { useQuery } from "@tanstack/react-query";
import type { ProductResponse } from "../useShowMeProduct";

const getWishlistProduct = async () => {
  const { data } = await api.get<ProductResponse>(`/product/wishlist`);
  return data;
};

export default function useGetWishlistProduct() {
  return useQuery<ProductResponse>({
    queryKey: ["showMe-wishlistProduct"],
    queryFn: getWishlistProduct,
  });
}
