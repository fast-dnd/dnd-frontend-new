import { useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

const useShowPaymentToast = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      return;
    }

    const payment = searchParams.get("payment");

    if (!payment) return;

    if (payment === "success") toast.success("Payment successful");
    else if (payment === "cancel") toast.error("Payment cancelled");

    const timeout = setTimeout(() => router.replace(pathname), 1000);

    return () => clearTimeout(timeout);
  }, [pathname, router, searchParams]);

  return <div>useShowPaymentToast</div>;
};

export default useShowPaymentToast;
