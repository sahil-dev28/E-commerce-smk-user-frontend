import api from "@/api/axios-instance";
import { useQuery } from "@tanstack/react-query";

export interface AddressResponse {
  addresses: [];
}

const getAddresses = async () => {
  const { data } = await api.get<AddressResponse>("/address");
  return data;
};

export const useGetAddress = () => {
  return useQuery({
    queryKey: ["showMe-address"],
    queryFn: getAddresses,
  });
};
