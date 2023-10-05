import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import authService from "@/services/auth-service";

const useLogin = () => {
  const router = useRouter();

  const redirectURL = typeof window !== "undefined" ? localStorage.getItem("redirectURL") : null;
  const redirectTo = redirectURL ? redirectURL : "/home";

  return useMutation({
    mutationFn: authService.login,
    onSuccess: () => {
      router.push(redirectTo);
    },
  });
};

export default useLogin;
