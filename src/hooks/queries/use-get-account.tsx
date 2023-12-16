import { useQuery } from "@tanstack/react-query";

import accountService, { accountKey } from "@/services/account-service";

const useGetAccount = ({ tokenExists }: { tokenExists: boolean }) => {
  return useQuery({
    queryKey: [accountKey],
    queryFn: accountService.getAccount,
    enabled: tokenExists,
  });
};

export default useGetAccount;
