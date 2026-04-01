import api from "@/api/axios-instance";
import type { Product } from "@/types/auth.type";
import { useQuery } from "@tanstack/react-query";

export interface ProductResponse {
  products: Product[];
  totalProducts: number;
  noOfPages: number;
}

export interface ProductParams {
  search?: string;
  sort?: string;
  featured?: string;
  categoryId?: string;
  sizeId?: string;
  priceSort?: string;
  page?: number;
}

const getData = async (
  params: ProductParams = {},
): Promise<ProductResponse> => {
  const { data } = await api.get<ProductResponse>(`/product`, {
    params: {
      search: params.search,
      sort: params.sort,
      featured: params.featured,
      categoryId: params.categoryId,
      sizeId: params.sizeId,
      priceSort: params.priceSort,
      page: params.page,
    },
  });

  return data;
};

export const useProductQuery = (params: ProductParams = {}) => {
  return useQuery<ProductResponse>({
    queryKey: ["showMe-product", JSON.stringify(params)],
    queryFn: () => getData(params),
  });
};
