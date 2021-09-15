import React, { useState, useEffect } from "react";
import { useRouteMatch, useHistory, Link } from "react-router-dom";
import {
  makeStyles,
  Container,
  Typography,
  Divider,
  ThemeProvider,
  useMediaQuery,
} from "@material-ui/core";
import { useSnackbar } from "notistack";
import moment from "moment";
import { Edit, Delete } from "@material-ui/icons";
import { Editor } from "react-draft-wysiwyg";
import { convertFromRaw, EditorState } from "draft-js";
import axios from "axios";

import DeleteDialog from "../../Globals/DeleteDialog";
import { IconTextBtn, VotesBtn } from "../../Globals/Buttons";
import { poppinsFont, ubuntuFont } from "../../../theme/themes";
import StatCounter from "../Topics/Stats/StatCounter";
import AddTopicForm from "../../Globals/Forms/AddTopicForm";
import AddReply from "../../Globals/Forms/AddReply";
import { withAuthor } from "../../HOC";
import Reply from "../Topics/Reply";
import * as api from "../../../api";

const ReplyWithAuthor = withAuthor(Reply);

const Post = (props) => {
  const proflieLS = null || JSON.parse(localStorage.getItem("profile")).result;
  const classes = useStyles();

  const [openDelete, setOpenDelete] = useState(false);
  const [edit, setEdit] = useState(false);
  const [votes, setVotes] = useState({ up: false, down: false });
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [replies, setReplies] = useState([]);

  const handleEdit = () => setEdit(true);
  const handleDelete = () => setOpenDelete(true);

  const handleUpVote = () => {
    // const formData = {
    //   topicId: selectedTopic.topic?._id,
    //   userId: profile.result?._id,
    //   type: "upvote",
    // };
    // api
    //   .voteTopic(formData)
    //   .then((res) => {
    //     if (res.status === 200) {
    //       dispatch(update_topic_votes(formData));
    //       setVotes({ up: true, down: false });
    //     }
    //   })
    //   .catch((err) => console.log(err));
  };

  const handleDownVote = () => {
    // const formData = {
    //   topicId: selectedTopic.topic?._id,
    //   userId: profile.result?._id,
    //   type: "downvote",
    // };
    // api
    //   .voteTopic(formData)
    //   .then((res) => {
    //     if (res.status === 200) {
    //       dispatch(update_topic_votes(formData));
    //       setVotes({ up: false, down: true });
    //     }
    //   })
    //   .catch((err) => console.log(err));
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    api
      .getReplies(props.topic._id, source)
      .then((res) => {
        if (res.status === 200) setReplies(res.data);
      })
      .catch((err) => console.log(err));

    setVotes({
      up: props.topic.meta.upvotes.includes(proflieLS._id),
      down: props.topic.meta.downvotes.includes(proflieLS._id),
    });

    setEditorState(
      EditorState.createWithContent(
        convertFromRaw(JSON.parse(props.topic.description))
      )
    );

    return () => source.cancel("request cancelled");
  }, [props.topic._id]);

  return (
    <Container>
      {openDelete && (
        <DeleteDialog
          status={openDelete}
          message={`Click confirm to delete ${props.topic.title}`}
        />
      )}

      <div className={classes.titleContainer}>
        {
          <div className={classes.ctaContainer}>
            <IconTextBtn
              icon={<Edit style={{ fontSize: "1.1rem" }} />}
              text="edit post"
              color="secondary"
              size=".8rem"
              isLowercase={true}
              event={handleEdit}
            />
            <IconTextBtn
              icon={<Delete style={{ fontSize: "1.1rem" }} />}
              text="delete post"
              color="secondary"
              size=".8rem"
              isLowercase={true}
              event={handleDelete}
            />
          </div>
        }

        <ThemeProvider theme={ubuntuFont}>
          <Typography variant="h3" className={classes.title}>
            {props.topic?.title}
          </Typography>
        </ThemeProvider>
        <ThemeProvider theme={poppinsFont}>
          <Typography variant="body1" className={classes.updatesDetails}>
            Asked by{" "}
            {
              <Link
                to={`/forum/profile/${props.topic?.creator?._id}`}
                style={{ textDecoration: "none" }}
              >
                <span className={classes.span}>{props.author?.username}</span>
              </Link>
            }{" "}
            on {moment(props.topic.createdAt).format("MMMM D, YYYY")} in{" "}
            {
              <Link
                to={`/forum/${props.category?._id}`}
                style={{ textDecoration: "none" }}
              >
                <span className={classes.span}>{props.category?.name}</span>
              </Link>
            }
          </Typography>
        </ThemeProvider>
        <div>
          <StatCounter
            count={props.topic.meta.replies.length}
            label="comments"
            color="secondary"
            isAuthor={false}
          />
          <StatCounter
            count={props.topic.meta.views.length}
            label="views"
            color="secondary"
            isAuthor={false}
          />
          <StatCounter
            count={props.topic.meta.upvotes.length}
            label="up votes"
            color="secondary"
            isAuthor={false}
          />
          <StatCounter
            count={props.topic.meta.downvotes.length}
            label="down votes"
            color="secondary"
            isAuthor={false}
          />
          <StatCounter
            count={0}
            label=""
            color="primary"
            isAuthor={true}
            author={props.author}
          />
        </div>
        <div>
          <VotesBtn isVoted={votes.up} icon="up" event={handleUpVote} />
          <VotesBtn isVoted={votes.down} icon="down" event={handleDownVote} />
        </div>
      </div>

      {edit && <AddTopicForm action="edit" />}

      <Divider className={classes.divider} />

      <div className={classes.descContainer}>
        <Editor editorState={editorState} toolbarHidden readOnly />
      </div>

      <Divider className={classes.divider} />

      <div>
        <AddReply
          categoryId={props.topic?.ref?.category}
          topicId={props.topic?._id}
        />
      </div>

      <div className={classes.repliesContainer}>
        <div>
          <ThemeProvider theme={ubuntuFont}>
            <Typography
              variant="body1"
              className={classes.repliesHeader}
            >{`${replies.length} comments`}</Typography>
          </ThemeProvider>
        </div>
        {replies.map((reply) => (
          <ReplyWithAuthor topic={reply} key={reply._id} />
        ))}
      </div>
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  titleContainer: {
    marginTop: 0,
    [theme.breakpoints.down("xs")]: {
      marginTop: theme.spacing(5),
    },
  },
  title: {
    fontSize: "1.1rem",
    color: theme.palette.common.black,
    fontWeight: theme.typography.fontWeightBold,
    marginBottom: theme.spacing(1),
  },
  updatesDetails: {
    fontSize: ".7rem",
    color: theme.palette.common.black,
  },
  span: {
    color: theme.palette.common.black,
    fontWeight: theme.typography.fontWeightBold,
  },
  ctaContainer: {
    marginBottom: theme.spacing(2),
  },
  divider: {
    marginTop: theme.spacing(3),
    [theme.breakpoints.down("xs")]: {
      marginTop: theme.spacing(1),
    },
  },
  descContainer: {
    margin: `${theme.spacing(3)}px 0`,
  },
  repliesHeader: {
    fontSize: ".8rem",
    fontWeight: theme.typography.fontWeightBold,
    marginBottom: theme.spacing(1),
    color: theme.palette.common.black,
  },
  repliesContainer: {
    marginTop: theme.spacing(4),
    background: theme.palette.background.paper,
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
  },
}));

export default Post;
