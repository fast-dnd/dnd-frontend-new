import { useMutation } from "@tanstack/react-query";

import paypalService from "@/services/stripe-service";

const useCreateOrder = () => {
  return useMutation({
    mutationFn: paypalService.createOrder,
  });
};

export default useCreateOrder;
