import React from "react";
import { Container, Grid, Divider } from "@material-ui/core";
import { useSelector } from "react-redux";

import PanelHeader from "../Globals/PanelHeader";
import PanelButton from "../Globals/PanelButton";

const ManagePanel = ({ manage }) => {
  const { categories } = useSelector((state) => state.categories);

  return (
    <Grid item xs={12} sm={6} md={12}>
      <Container style={{ padding: "0" }}>
        <PanelHeader title={manage.header} />
        {manage.options.map((opt, i) => (
          <PanelButton opt={opt} key={i} />
        ))}
        {manage.header === "manage forum" && (
          <>
            <Divider style={{ marginTop: "15px" }} />
            {categories.map(
              (cat) =>
                cat.active === 1 && <PanelButton opt={cat} key={cat._id} />
            )}
          </>
        )}
      </Container>
    </Grid>
  );
};

export default ManagePanel;
