import React from "react";

import HomeMenu from "../Navigation/HomeMenu";

const withHomeMenu = (Component) => {
  const EnhancedComp = ({ type, aside, ...props }) => {
    if (type !== "") {
      return <Component {...props} />;
    }

    return <HomeMenu aside={aside} />;
  };

  return EnhancedComp;
};

export default withHomeMenu;
