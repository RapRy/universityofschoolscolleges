import React from "react";
import { Link } from "react-router-dom";
import { ListItemText, ListItemIcon, makeStyles } from "@material-ui/core";
import moment from "moment";

const TopicInSideNav = ({ topic, icon, header, category }) => {
  const classes = useStyles();

  const secondText = (header, latest, replies, related) => {
    switch (header) {
      case "latest topics":
        // return dateString(latest);
        return `added on ${moment(latest).format("MMM D YYYY")}`;
      case "hot topics":
        return `${replies.length} Replies`;
      case "related topics":
        return `added on ${moment(related).format("MMM D YYYY")}`;
      default:
        return null;
    }
  };

  return (
    <Link
      to={`/forum/${category?.name?.replace(" ", "-")}/${topic._id}`}
      style={{ textDecoration: "none", overflowX: "hidden" }}
    >
      <ListItemText
        primary={topic.title}
        classes={{ primary: classes.topicName }}
      />
      <ListItemIcon classes={{ root: classes.listIcon }}>{icon}</ListItemIcon>
      <ListItemText
        primary={secondText(
          header,
          topic.createdAt,
          topic.meta.replies,
          topic.createdAt
        )}
        classes={{
          root: classes.secondaryItem,
          primary: classes.secondaryTextItem,
        }}
      />
    </Link>
  );
};

const useStyles = makeStyles((theme) => ({
  topicName: {
    color: theme.palette.secondary.dark,
    fontSize: ".9rem",
    fontWeight: theme.typography.fontWeightBold,
    whiteSpace: "nowrap",
    overflowX: "hidden",
    textOverflow: "ellipsis",
  },
  listIcon: {
    display: "inline",
  },
  secondaryItem: {
    display: "inline-block",
  },
  secondaryTextItem: {
    fontSize: ".8rem",
    color: theme.palette.primary.light,
    marginLeft: theme.spacing(1),
  },
}));

export default TopicInSideNav;
