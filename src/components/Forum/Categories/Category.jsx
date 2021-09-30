import React, { useState } from "react";
import {
  Container,
  Divider,
  Grid,
  Typography,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";

import CategoryHeader from "./CategoryHeader";
import AddTopicForm from "../../Globals/Forms/AddTopicForm";
import TopicThumb from "./TopicThumb";
import { poppinsFont } from "../../../theme/themes";
import { withAuthor } from "../../HOC";
import Empty from "../../Globals/Empty/Empty";

const TopicWithAuthor = withAuthor(TopicThumb);
const Category = ({ cat, latestTopics, hotTopics }) => {
  const classes = useStyles();

  const [showForm, setShowForm] = useState(false);

  return (
    <Container className={classes.container}>
      <CategoryHeader cat={cat} setShowForm={setShowForm} showForm={showForm} />
      <Divider />
      {showForm && (
        <>
          <AddTopicForm />
          <Divider style={{ marginTop: "25px" }} />
        </>
      )}
      <Grid
        container
        direction="row"
        spacing={3}
        className={classes.gridContainer}
      >
        {latestTopics.length > 0 ? (
          <Grid item md={6} xs={12}>
            <ThemeProvider theme={poppinsFont}>
              <Typography variant="h6" className={classes.typoH6}>
                Latest Topics
              </Typography>
            </ThemeProvider>
            {latestTopics.map((top) => (
              <TopicWithAuthor topic={top} key={top._id} category={cat} />
            ))}
          </Grid>
        ) : (
          <Grid item md={6} xs={12}>
            <Empty message="No Topics" />
          </Grid>
        )}

        {hotTopics.length > 0 ? (
          <Grid item md={6} xs={12}>
            <ThemeProvider theme={poppinsFont}>
              <Typography variant="h6" className={classes.typoH6}>
                Hot Topics
              </Typography>
            </ThemeProvider>
            {hotTopics.map((top) => (
              <TopicWithAuthor topic={top} key={top._id} category={cat} />
            ))}
          </Grid>
        ) : (
          <Grid item md={6} xs={12}>
            <Empty message="No Topics" />
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    background: theme.palette.background.paper,
    marginTop: theme.spacing(4),
    padding: theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
  },
  gridContainer: {
    marginTop: theme.spacing(2),
  },
  typoH6: {
    color: theme.palette.common.black,
    fontSize: ".8rem",
    fontWeight: theme.typography.fontWeightBold,
    marginBottom: theme.spacing(1),
  },
}));

export default Category;
