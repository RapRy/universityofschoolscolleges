import React from "react";
import { Container } from "@material-ui/core";
import { useSelector } from "react-redux";

import { SideNavButton } from "../Globals/Buttons";

const ManagePanel = ({ manage }) => {
  const { categories } = useSelector((state) => state.categories);

  return (
    <Container style={{ padding: 0 }}>
      {manage.options.map((man) => (
        <SideNavButton data={man} icon={null} key={man._id} />
      ))}
      {manage.header === "manage forum" &&
        categories.map((cat) => (
          <SideNavButton data={cat} icon={null} key={cat._id} />
        ))}
    </Container>
  );
};

export default ManagePanel;
