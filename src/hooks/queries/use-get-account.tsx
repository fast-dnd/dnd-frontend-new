import { useQuery } from "@tanstack/react-query";

import accountService, { accountKey } from "@/services/account-service";

const useGetAccount = (enabled?: boolean) => {
  return useQuery({
    queryKey: [accountKey],
    queryFn: accountService.getAccount,
    enabled,
  });
};

export default useGetAccount;
