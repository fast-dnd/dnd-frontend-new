"use client";

import { useQuery } from "@tanstack/react-query";

import authService, { authKey } from "@/services/auth-service";

const useGetAccount = () => {
  return useQuery({
    queryKey: [authKey],
    queryFn: authService.account,
  });
};

export default useGetAccount;
