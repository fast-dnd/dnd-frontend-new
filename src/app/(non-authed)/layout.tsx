import React from "react";

import Navbar from "@/components/navbar";

const NonAuthedLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default NonAuthedLayout;
