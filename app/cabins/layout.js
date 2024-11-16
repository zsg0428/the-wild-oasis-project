import React from "react";
export const metadata = {
  title: {
    template: "%s / Cabin Selections",
    default: "Cabins Selections",
  },
};
const Layout = ({ children }) => {
  return <div>{children}</div>;
};

export default Layout;
