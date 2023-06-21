"use client";

import authService from "@/services/auth-service";
import { useQuery } from "@tanstack/react-query";

const useGetAccount = () => {
  return useQuery({
    queryKey: ["account"],
    queryFn: authService.account,
  });
};

export default useGetAccount;
