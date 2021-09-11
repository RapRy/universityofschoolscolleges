import React from "react";
import { Link } from "react-router-dom";
import {
  ListItemText,
  ListItemIcon,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";
import { poppinsFont, ubuntuFont } from "../../../theme/themes";
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
      <ThemeProvider theme={ubuntuFont}>
        <ListItemText
          primary={topic.title}
          classes={{ primary: classes.topicName, root: classes.marginBottom }}
        />
      </ThemeProvider>
      <ListItemIcon classes={{ root: classes.listIcon }}>{icon}</ListItemIcon>
      <ThemeProvider theme={poppinsFont}>
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
      </ThemeProvider>
    </Link>
  );
};

const useStyles = makeStyles((theme) => ({
  topicName: {
    color: theme.palette.common.black,
    fontSize: ".9rem",
    fontWeight: theme.typography.fontWeightBold,
    whiteSpace: "nowrap",
    overflowX: "hidden",
    textOverflow: "ellipsis",
  },
  marginBottom: {
    marginBottom: 0,
  },
  listIcon: {
    display: "inline",
  },
  secondaryItem: {
    display: "inline-block",
  },
  secondaryTextItem: {
    fontSize: ".7rem",
    color: theme.palette.common.black,
    marginLeft: theme.spacing(1),
  },
}));

export default TopicInSideNav;
