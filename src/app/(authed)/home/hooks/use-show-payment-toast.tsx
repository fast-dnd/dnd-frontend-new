import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useIsClient } from "usehooks-ts";

const useShowPaymentToast = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isClient = useIsClient();

  useEffect(() => {
    if (!isClient) return;

    const payment = searchParams.get("payment");

    if (!payment) return;

    if (payment === "success") toast.success("Payment successful");
    else if (payment === "cancel") toast.error("Payment cancelled");

    const timeout = setTimeout(() => router.replace(pathname), 1000);

    return () => clearTimeout(timeout);
  }, [isClient, pathname, router, searchParams]);

  return <div>useShowPaymentToast</div>;
};

export default useShowPaymentToast;
