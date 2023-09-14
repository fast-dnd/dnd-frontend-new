"use client";

import { useQuery } from "@tanstack/react-query";

import accountService, { accountKey } from "@/services/account-service";

const useGetAccount = () => {
  return useQuery({
    queryKey: [accountKey],
    queryFn: accountService.getAccount,
  });
};

export default useGetAccount;
