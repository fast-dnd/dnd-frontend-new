"use client";

import { useQuery } from "@tanstack/react-query";

import authService from "@/services/auth-service";

const useGetAccount = () => {
  return useQuery({
    queryKey: ["account"],
    queryFn: authService.account,
  });
};

export default useGetAccount;
