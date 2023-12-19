import { useQuery } from "@tanstack/react-query";

import useCommunity from "@/hooks/helpers/use-community";
import stripeService, { stripeKey } from "@/services/stripe-service";

const useGetProducts = () => {
  const { isDefault } = useCommunity();

  return useQuery({
    queryKey: [stripeKey],
    queryFn: stripeService.getProducts,
    enabled: isDefault,
  });
};

export default useGetProducts;
