import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useLocalStorage } from "usehooks-ts";

import authService from "@/services/auth-service";

const useSolanaLogin = () => {
  const router = useRouter();

  const [_, setJwtToken] = useLocalStorage("jwtToken", "");

  return useMutation({
    mutationFn: authService.solanaLogin,
    onSuccess: (data) => {
      router.push("/communities");
      setJwtToken(data.data.jwtToken);
      toast.success("Logged in successfully!");
    },
  });
};

export default useSolanaLogin;
