import { useQuery } from "@tanstack/react-query";

import accountService, { accountKey } from "@/services/account-service";
import { IProfile } from "@/types/account";

interface IUseGetAccountProps {
  tokenExists: boolean;
  setUser: (user: IProfile) => void;
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
