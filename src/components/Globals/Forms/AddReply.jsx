import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Avatar,
  Input,
  makeStyles,
  useTheme,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { EditorState, convertToRaw } from "draft-js";

import TextAreaWithEditor from "./TextAreaWithEditor";
import * as api from "../../../api";
import { update_selected_topic_replies } from "../../../redux/topicsReducer";
import { PillButton } from "../Buttons";

const profileLs = JSON.parse(localStorage.getItem("profile"))?.result;

const initialErrors = {
  reply: "",
  ref: { category: "", topic: "", creator: "" },
};
const initialState = {
  reply: "",
  ref: { category: "", topic: "", creator: "" },
};

const AddReply = ({ categoryId, topicId }) => {
  const classes = useStyles();
  const theme = useTheme();

  const [errors, setErrors] = useState(initialErrors);
  const [formData, setFormData] = useState(initialState);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [showEditor, setShowEditor] = useState(false);

  const { profile } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const replyEditor = convertToRaw(editorState.getCurrentContent());

    if (
      replyEditor.blocks[0].text === "" &&
      replyEditor.entityMap[0] === undefined
    ) {
      setErrors({ ...errors, reply: "Field required." });
      return;
    }

    const { data, status } = await api.addReply({
      ...formData,
      reply: JSON.stringify(replyEditor),
    });

    if (status === 200) {
      dispatch(update_selected_topic_replies(data));
    }
  };

  useEffect(() => {
    const ref = {
      category: categoryId,
      topic: topicId,
      creator: profile.result?._id,
    };
    setFormData((prevState) => ({
      ...prevState,
      ref,
    }));
  }, [categoryId, topicId]);

  return (
    <Container classes={{ root: classes.containerRoot }}>
      <Grid container direction="row" spacing={1}>
        <Grid item xs={"auto"} md={1}>
          <Avatar
            src={
              profile.result?.accountType === 0
                ? `${process.env.PUBLIC_URL}/assets/defaultProPic.jpg`
                : `${process.env.PUBLIC_URL}/assets/adminProPic.jpg`
            }
          >
            {profile.result?.username?.charAt(0) ||
              profileLs?.username?.charAt(0)}
          </Avatar>
        </Grid>
        <Grid item xs={9} sm={11} style={{ marginTop: "3px" }}>
          <form onSubmit={handleFormSubmit}>
            {!showEditor ? (
              <Input
                placeholder="write a comment"
                fullWidth
                disableUnderline
                classes={{ root: classes.dummyInput }}
                onClick={() => setShowEditor(!showEditor)}
              />
            ) : (
              <>
                <TextAreaWithEditor
                  editorState={editorState}
                  setEditorState={setEditorState}
                  errorMessage={errors.reply}
                />
                <PillButton
                  text="Publish"
                  bgColor={theme.palette.secondary.main}
                  bgColorHover={theme.palette.secondary.light}
                  textColor={theme.palette.common.white}
                  padding={theme.spacing(0.5, 3)}
                  isFullWidth={false}
                  eventHandler={null}
                  type="submit"
                />
              </>
            )}
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  containerRoot: {
    background: theme.palette.grey.A100,
    margin: `${theme.spacing(3)}px 0 0`,
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
  },
  iconBtn: {
    padding: theme.spacing(1) - 4,
    color: theme.palette.secondary.main,
  },
  dummyInput: {
    background: theme.palette.common.white,
    padding: theme.spacing(1, 2),
    borderRadius: theme.shape.borderRadius,
    fontSize: ".8rem",
    border: "none",
  },
}));

export default AddReply;
