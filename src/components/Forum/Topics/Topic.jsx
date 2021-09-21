import React, { useEffect, useState } from "react";
import { useRouteMatch, useHistory, Link } from "react-router-dom";
import {
  Container,
  Typography,
  Divider,
  LinearProgress,
  ThemeProvider,
  makeStyles,
  useMediaQuery,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import moment from "moment";
import { Edit, Delete } from "@material-ui/icons";
import { Editor } from "react-draft-wysiwyg";
import { convertFromRaw, EditorState } from "draft-js";
import axios from "axios";

import { get_topic_details } from "../../../redux/topicsReducer";
import AddReply from "../../Globals/Forms/AddReply";
import Reply from "./Reply";
import * as api from "../../../api";
import AddTopicForm from "../../Globals/Forms/AddTopicForm";
import DeleteDialog from "../../Globals/DeleteDialog";
import {
  update_active_status,
  update_topic_votes,
} from "../../../redux/topicsReducer";
import { poppinsFont, ubuntuFont } from "../../../theme/themes";
import { IconTextBtn, VotesBtn } from "../../Globals/Buttons";
import StatCounter from "./Stats/StatCounter";
import { withAuthor } from "../../HOC";

const ReplyWithAuthor = withAuthor(Reply);

const Topic = (props) => {
  let profileLS = null || JSON.parse(localStorage.getItem("profile")).result;

  const min960 = useMediaQuery((theme) => theme.breakpoints.up("md"));

  const classes = useStyles({ min960 });

  const { params, url } = useRouteMatch();
  const history = useHistory();

  const [edit, setEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [votes, setVotes] = useState({ up: false, down: false });
  const [replies, setReplies] = useState([]);

  const dispatch = useDispatch();
  const { selectedTopic, status } = useSelector((state) => state.topics);
  const { profile } = useSelector((state) => state.auth);

  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = () => setOpenDelete(true);

  const handleCloseDialog = () => setOpenDelete(false);

  const handleConfirmDelete = () => {
    dispatch(update_active_status(selectedTopic.topic._id));
    enqueueSnackbar(`${selectedTopic.topic.title} deleted`, {
      variant: "success",
    });
    setOpenDelete(false);
    history.push(`/forum/${selectedTopic.topic.ref.category}`);
  };

  const handleEdit = () => setEdit(true);

  const handleUpVote = () => {
    const formData = {
      topicId: selectedTopic.topic?._id,
      userId: profile.result?._id,
      type: "upvote",
    };

    api
      .voteTopic(formData)
      .then((res) => {
        if (res.status === 200) {
          dispatch(update_topic_votes(formData));
          setVotes({ up: true, down: false });
        }
      })
      .catch((err) => console.log(err));
  };

  const handleDownVote = () => {
    const formData = {
      topicId: selectedTopic.topic?._id,
      userId: profile.result?._id,
      type: "downvote",
    };

    api
      .voteTopic(formData)
      .then((res) => {
        if (res.status === 200) {
          dispatch(update_topic_votes(formData));
          setVotes({ up: false, down: true });
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (profile.result === null || profileLS === null) {
      history.push("/auth");
      return;
    }

    const source = axios.CancelToken.source();

    // profileLS = JSON.parse(localStorage.getItem('profile')).result
    if (!props.isFromProfile) {
      dispatch(get_topic_details(params.topicId))
        .then((res) => {
          if (res.meta.requestStatus === "fulfilled") {
            const { description, meta } = res.payload.topic;
            setVotes({
              up: meta.upvotes.includes(profileLS._id),
              down: meta.downvotes.includes(profileLS._id),
            });

            setEditorState(
              EditorState.createWithContent(
                convertFromRaw(JSON.parse(description))
              )
            );
          }
        })
        .catch((err) => console.log(err));

      try {
        const data = {
          topicId: params.topicId,
          viewer: profile.result?._id || profileLS._id,
        };
        api.addTopicViews(data);
      } catch (error) {
        console.log(error);
      }

      return;
    }

    if (props.isFromProfile) {
      api
        .getReplies(props.topic._id, source)
        .then((res) => {
          if (res.status === 200) setReplies(res.data);
        })
        .catch((err) => console.log(err));

      setVotes({
        up: props.topic.meta.upvotes.includes(profileLS._id),
        down: props.topic.meta.downvotes.includes(profileLS._id),
      });

      setEditorState(
        EditorState.createWithContent(
          convertFromRaw(JSON.parse(props.topic.description))
        )
      );
      return;
    }

    return () => {
      props.isFromProfile && source.cancel("request cancelled");
    };
  }, [url, props.isFromProfile, props.topic?.meta?.replies]);

  return (
    <Container className={classes.mainContainer}>
      {status === "loading" && !props.isFromProfile && (
        <LinearProgress style={{ margin: "30px 0" }} />
      )}

      {openDelete && (
        <DeleteDialog
          status={openDelete}
          message={`Click confirm to delete ${
            !props.isFromProfile
              ? selectedTopic.topic.title
              : props.topic?.title
          }`}
          handleDelete={handleConfirmDelete}
          handleCancel={handleCloseDialog}
        />
      )}

      {status === "idle" && (
        <>
          <div className={classes.titleContainer}>
            {(profileLS?._id ===
              (!props.isFromProfile
                ? selectedTopic.topic?.ref?.creator
                : props.topic?.ref?.creator) ||
              profile.result?._id ===
                (!props.isFromProfile
                  ? selectedTopic.topic?.ref?.creator
                  : props.topic?.ref?.creator)) && (
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
            )}

            <ThemeProvider theme={ubuntuFont}>
              <Typography variant="h3" className={classes.title}>
                {!props.isFromProfile
                  ? selectedTopic.topic?.title
                  : props.topic?.title}
              </Typography>
            </ThemeProvider>
            <ThemeProvider theme={poppinsFont}>
              <Typography variant="body1" className={classes.updatesDetails}>
                Asked by{" "}
                {
                  <Link
                    to={`/forum/profile/${
                      !props.isFromProfile
                        ? selectedTopic.creator?._id
                        : props.author?._id
                    }`}
                    style={{ textDecoration: "none" }}
                  >
                    <span className={classes.span}>
                      {!props.isFromProfile
                        ? selectedTopic.creator?.username
                        : props.author?.username}
                    </span>
                  </Link>
                }{" "}
                on{" "}
                {moment(
                  !props.isFromProfile
                    ? selectedTopic.topic.createdAt
                    : props.topic?.createdAt
                ).format("MMMM D, YYYY")}{" "}
                in{" "}
                {
                  <Link
                    to={`/forum/${
                      !props.isFromProfile
                        ? selectedTopic.category?._id
                        : props.category?._id
                    }`}
                    style={{ textDecoration: "none" }}
                  >
                    <span className={classes.span}>
                      {!props.isFromProfile
                        ? selectedTopic.category?.name
                        : props.category?.name}
                    </span>
                  </Link>
                }
              </Typography>
            </ThemeProvider>
            {/* stats */}
            <div>
              <StatCounter
                count={
                  !props.isFromProfile
                    ? selectedTopic.topic?.meta?.replies.length
                    : props.topic?.meta?.replies.length
                }
                label="comments"
                color="secondary"
                isAuthor={false}
              />
              <StatCounter
                count={
                  !props.isFromProfile
                    ? selectedTopic.topic?.meta?.views.length
                    : props.topic?.meta?.views.length
                }
                label="views"
                color="secondary"
                isAuthor={false}
              />
              <StatCounter
                count={
                  !props.isFromProfile
                    ? selectedTopic.topic?.meta?.upvotes.length
                    : props.topic?.meta?.upvotes.length
                }
                label="up votes"
                color="secondary"
                isAuthor={false}
              />
              <StatCounter
                count={
                  !props.isFromProfile
                    ? selectedTopic.topic?.meta?.downvotes.length
                    : props.topic?.meta?.downvotes.length
                }
                label="down votes"
                color="secondary"
                isAuthor={false}
              />
              <StatCounter
                count={0}
                label=""
                color="primary"
                isAuthor={true}
                author={
                  !props.isFromProfile ? selectedTopic.creator : props.author
                }
              />
            </div>
            {/* votes */}
            <div>
              <VotesBtn isVoted={votes.up} icon="up" event={handleUpVote} />
              <VotesBtn
                isVoted={votes.down}
                icon="down"
                event={handleDownVote}
              />
            </div>
          </div>

          {edit && (
            <AddTopicForm
              action="edit"
              isFromProfile={props.isFromProfile ? props.isFromProfile : false}
              topic={props.isFromProfile ? props.topic : selectedTopic.topic}
              category={
                props.isFromProfile ? props.category : selectedTopic.category
              }
              topicInd={props.isFromProfile ? props.topicInd : null}
            />
          )}

          <Divider className={classes.divider} />

          <div className={classes.descContainer}>
            <Editor editorState={editorState} toolbarHidden readOnly />
          </div>

          <Divider className={classes.divider} />

          <div>
            <AddReply
              categoryId={
                !props.isFromProfile
                  ? selectedTopic.topic?.ref?.category
                  : props.topic?.ref?.category
              }
              topicId={
                !props.isFromProfile
                  ? selectedTopic.topic?._id
                  : props.topic?._id
              }
            />
          </div>

          <div className={classes.repliesContainer}>
            <div>
              <ThemeProvider theme={ubuntuFont}>
                <Typography
                  variant="body1"
                  className={classes.repliesHeader}
                >{`${
                  !props.isFromProfile
                    ? selectedTopic.replies.length
                    : replies.length
                } comments`}</Typography>
              </ThemeProvider>
            </div>
            {!props.isFromProfile
              ? selectedTopic.replies.map((reply) => (
                  <ReplyWithAuthor topic={reply} key={reply._id} />
                ))
              : replies.map((reply) => (
                  <ReplyWithAuthor topic={reply} key={reply._id} />
                ))}
          </div>
        </>
      )}
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    marginTop: (props) => (props.min960 ? 0 : theme.spacing(5)),
  },
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

export default Topic;
