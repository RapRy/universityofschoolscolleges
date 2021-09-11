import React, { useEffect } from "react";
import { Container, List, ListItem, makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

import TopicInSideNav from "../Globals/Topics/TopicInSideNav";
import { withCategory } from "../HOC";
import { PanelHeader } from "../Globals/Headers";

const TopicInSideNavWithCat = withCategory(TopicInSideNav);

const TopicsPanelSm = ({
  header,
  API,
  reduxDispatch,
  selectorName,
  icon,
  limitOrId,
}) => {
  const dispatch = useDispatch();
  const topics = useSelector((state) => state.topics);
  const classes = useStyles();

  useEffect(() => {
    const source = axios.CancelToken.source();
    API(limitOrId, source)
      .then((res) => {
        const { data, status } = res;

        if (status === 200) dispatch(reduxDispatch(data));
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log(err.message);
          return;
        }
        console.log(err);
      });

    return () => source.cancel("Operation canceled");
  }, [dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container className={classes.mainContainer}>
      <Link
        to={`/forum/${header.replace(" ", "-")}`}
        style={{ textDecoration: "none" }}
      >
        <PanelHeader title={header} />
      </Link>
      <List className={classes.listRoot}>
        {topics[selectorName].map((top) => (
          <ListItem key={top._id}>
            <TopicInSideNavWithCat topic={top} icon={icon} header={header} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    padding: 0,
    marginTop: theme.spacing(5),
  },
  listRoot: {
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
  },
}));

export default TopicsPanelSm;
