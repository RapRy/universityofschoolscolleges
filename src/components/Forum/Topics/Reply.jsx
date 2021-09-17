import React, { useState, useEffect } from "react";
import {
  Container,
  Avatar,
  Grid,
  Typography,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { Editor } from "react-draft-wysiwyg";
import { convertFromRaw, EditorState } from "draft-js";
import { poppinsFont } from "../../../theme/themes";

const Reply = (props) => {
  const classes = useStyles();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    // console.log(JSON.parse(props.topic.reply));
    // editorState.current = EditorState.createWithContent(
    //   convertFromRaw(JSON.parse(props.topic.reply))
    // );

    setEditorState(
      EditorState.createWithContent(
        convertFromRaw(JSON.parse(props.topic.reply))
      )
    );
  }, [props.topic.reply]);

  return (
    <Container className={classes.container}>
      <Grid container direction="row" spacing={1}>
        <Grid item md={"auto"}>
          <Link
            to={`/forum/profile/${props.author._id}`}
            style={{ textDecoration: "none" }}
          >
            <Avatar
              className={classes.avatar}
              src={
                props.author?.accountType === 0
                  ? `${process.env.PUBLIC_URL}/assets/defaultProPic.jpg`
                  : `${process.env.PUBLIC_URL}/assets/adminProPic.jpg`
              }
            >
              {props.author.username?.charAt(0)}
            </Avatar>
          </Link>
        </Grid>
        <Grid item md={11}>
          <div>
            <ThemeProvider theme={poppinsFont}>
              <Link
                to={`/forum/profile/${props.author._id}`}
                style={{ textDecoration: "none" }}
              >
                <Typography variant="h5" className={classes.username}>
                  {props.author.username}
                </Typography>
              </Link>
              <Typography variant="body1" className={classes.timestamp}>
                <Moment fromNow>{props.topic.createdAt}</Moment>
              </Typography>
            </ThemeProvider>
          </div>
          <Editor editorState={editorState} toolbarHidden readOnly />
        </Grid>
      </Grid>
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    background: theme.palette.common.white,
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
  },
  avatar: {
    [theme.breakpoints.down("xs")]: {
      width: theme.spacing(4),
      height: theme.spacing(4),
    },
  },
  username: {
    display: "inline-block",
    fontWeight: theme.typography.fontWeightBold,
    fontSize: ".85rem",
    marginRight: theme.spacing(2),
    color: theme.palette.common.black,
  },
  timestamp: {
    color: theme.palette.common.black,
    display: "inline-block",
    fontSize: ".75rem",
  },
  reply: {
    color: theme.palette.common.dark,
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
    fontSize: ".9rem",
    wordBreak: "break-all",
  },
}));

export default Reply;
