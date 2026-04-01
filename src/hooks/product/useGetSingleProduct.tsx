import api from "@/api/axios-instance";
import { useQuery } from "@tanstack/react-query";

interface ProductProps {
  product: {
    id: string;
    name: string;
    price: number;
    discount: string;
    discountAmount: number;
    image: string;
    categoryId: string;
    description: string;
    featured: string;
    color: string;
    averageRating: string;
    numOfReviews: number;
    sizes: { id: string; value: number }[];
    category: {
      id: string;
      name: string;
    };
    isWishListed: boolean;
    isAddedToCart: boolean;
  };
}

const getProduct = async (id: string) => {
  const { data } = await api.get<ProductProps>(`/product/${id}`);
  return data;
};

export const useGetSinglePropertyQuery = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: ["showSingle-product", id],
    queryFn: () => getProduct(id),
    enabled: !!id,
  });
};
