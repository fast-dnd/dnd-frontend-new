import React from "react";

import Navbar from "@/components/navbar";

const AuthedLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default AuthedLayout;
