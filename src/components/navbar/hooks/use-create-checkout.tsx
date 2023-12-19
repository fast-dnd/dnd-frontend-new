import { useMutation } from "@tanstack/react-query";

import stripeService from "@/services/stripe-service";

const useCreateCheckout = () => {
  return useMutation({
    mutationFn: stripeService.createCheckoutSession,
  });
};

export default useCreateCheckout;
