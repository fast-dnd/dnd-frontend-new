import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useReadLocalStorage } from "usehooks-ts";

import authService from "@/services/auth-service";

const useSolanaLogin = () => {
  const router = useRouter();

  const communityId = useReadLocalStorage<string>("communityId");

  return useMutation({
    mutationFn: authService.solanaLogin,
    onSuccess: (data) => {
      router.push(communityId ? "/home" : "/communities");
      localStorage.setItem("jwtToken", data.data.jwtToken);
      toast.success("Logged in successfully!");
    },
  });
};

export default useSolanaLogin;
