import React from "react";

import HomeMenu from "../Navigation/HomeMenu";

const withHomeMenu = (Component) => {
  const EnhancedComponent = ({ type, aside, ...props }) => {
    if (type !== "") {
      return <Component {...props} />;
    }

    return <HomeMenu aside={aside} />;
  };

  return EnhancedComponent;
};

export default withHomeMenu;
