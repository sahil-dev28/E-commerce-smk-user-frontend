import api from "@/api/axios-instance";
import { useQuery } from "@tanstack/react-query";

export interface CartPriceResponse {
  subTotal: number;
  total: number;
  discount: number;
  coupon?: string;
}

export interface CartPriceParams {
  coupon?: string;
}

const getCartPrice = async (
  params: CartPriceParams = {},
): Promise<CartPriceResponse> => {
  const { data } = await api.get<CartPriceResponse>(`/order/cart/price`, {
    params: {
      coupon: params.coupon,
    },
  });

  return data;
};

export default function useGetCartTotalPrice(params: CartPriceParams = {}) {
  return useQuery<CartPriceResponse>({
    queryKey: ["showCart-Price", JSON.stringify(params)],
    queryFn: () => getCartPrice(params),
  });
}
