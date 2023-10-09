import { useQuery } from "@tanstack/react-query";

import accountService, { accountKey } from "@/services/account-service";

const useGetAccount = (disabled?: boolean) => {
  return useQuery({
    queryKey: [accountKey],
    queryFn: accountService.getAccount,
    enabled: !disabled,
  });
};

export default useGetAccount;
