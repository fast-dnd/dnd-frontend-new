import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useReadLocalStorage } from "usehooks-ts";

import authService from "@/services/auth-service";

const useSolanaLogin = () => {
  const router = useRouter();

  const redirectURL = useReadLocalStorage<string>("redirectURL");
  const redirectTo = redirectURL ?? "/home";

  return useMutation({
    mutationFn: authService.solanaLogin,
    onSuccess: (data) => {
      router.push(redirectTo);
      localStorage.removeItem("redirectURL");
      localStorage.setItem("jwtToken", data.data.jwtToken);
      toast.success("Logged in successfully!");
    },
  });
};

export default useSolanaLogin;
