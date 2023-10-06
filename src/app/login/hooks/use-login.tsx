import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useReadLocalStorage } from "usehooks-ts";

import authService from "@/services/auth-service";

const useLogin = () => {
  const router = useRouter();

  const redirectURL = useReadLocalStorage<string>("redirectURL");
  const redirectTo = redirectURL ?? "/home";

  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      router.push(redirectTo);
      localStorage.removeItem("redirectURL");
      localStorage.setItem("jwtToken", data.data.jwtToken);
    },
  });
};

export default useLogin;
