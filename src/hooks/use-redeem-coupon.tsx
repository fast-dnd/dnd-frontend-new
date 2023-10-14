import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import accountService, { accountKey } from "@/services/account-service";

const useRedeemCoupon = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: accountService.redeemCoupon,
    onSuccess: (data) => {
      queryClient.invalidateQueries([accountKey]);
      toast.success(data.message);
    },
  });
};

export default useRedeemCoupon;
