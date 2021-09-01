import React from "react";

// TODO delete me

const TopBg = () => {
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: "100%",
        height: "500px",
        background: `url(${process.env.PUBLIC_URL}/assets/bg_blue.jpg)`,
        backgroundSize: "cover",
        zIndex: "-1",
      }}
    ></div>
  );
};

export default TopBg;
