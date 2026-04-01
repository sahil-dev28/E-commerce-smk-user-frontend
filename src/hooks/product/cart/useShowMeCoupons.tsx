import api from "@/api/axios-instance";
import { useQuery } from "@tanstack/react-query";

export interface Coupon {
  id: string;
  code: string;
  expiryTime: string;
}

export interface CouponResponse {
  coupons: Coupon[];
  totalCoupons: number;
  numOfPages: number;
}

export interface CouponParams {
  page?: number;
  search?: string;
}

const getData = async (params: CouponParams = {}): Promise<CouponResponse> => {
  const { data } = await api.get<CouponResponse>(`/coupon/valid`, {
    params: {
      search: params.search,
      page: params.page,
    },
  });
  return data;
};

export const useShowMeCouponQuery = (params: CouponParams = {}) => {
  return useQuery<CouponResponse>({
    queryKey: ["showMe-coupon", JSON.stringify(params)],
    queryFn: () => getData(params),
  });
};
