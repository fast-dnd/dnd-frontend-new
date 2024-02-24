import React from "react";

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import useRedeemCoupon from "@/hooks/mutations/use-redeem-coupon";

const Web2 = () => {
  const [code, setCode] = React.useState("");

  const { mutate: redeemCoupon, isLoading } = useRedeemCoupon();

  return (
    <DialogFooter>
      <Input
        placeholder="Enter your code..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <Button
        className="mb-2 flex w-fit gap-2 whitespace-nowrap"
        onClick={() => redeemCoupon({ code })}
        isLoading={isLoading}
      >
        REDEEM
      </Button>
    </DialogFooter>
  );
};

export default Web2;
