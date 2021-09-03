import React from "react";

import HomeMenu from "../Navigation/HomeMenu";

const withHomeMenu = (Component) => {
  const EnhancedHomeMenuComp = ({ type, aside, ...props }) => {
    if (type !== "") {
      return <Component {...props} />;
    }

    return <HomeMenu aside={aside} />;
  };

  return EnhancedHomeMenuComp;
};

export default withHomeMenu;
