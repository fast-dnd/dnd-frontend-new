import { useQuery } from "@tanstack/react-query";

import accountService, { accountKey } from "@/services/account-service";
import { IAccount } from "@/types/account";

interface IUseGetAccountProps {
  tokenExists: boolean;
  setUser: (user: IAccount) => void;
}
const useGetAccount = ({ tokenExists, setUser }: IUseGetAccountProps) => {
  return useQuery({
    queryKey: [accountKey],
    queryFn: accountService.getAccount,
    enabled: tokenExists,
    onSuccess: (data) => {
      setUser(data);
    },
  });
};

export default useGetAccount;
