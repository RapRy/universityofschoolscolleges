import React from "react";
import { makeStyles, ThemeProvider, Typography } from "@material-ui/core";
import { Editor } from "react-draft-wysiwyg";
import "../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import { poppinsFont } from "../../../theme/themes";

const TextAreaWithEditor = ({ editorState, setEditorState, errorMessage }) => {
  const classes = useStyles();

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  return (
    <ThemeProvider theme={poppinsFont}>
      <Editor
        placeholder={
          errorMessage === "" ? "write description..." : errorMessage
        }
        editorState={editorState}
        wrapperClassName={classes.wrapper}
        editorClassName={classes.editor}
        toolbarClassName={classes.toolbar}
        onEditorStateChange={onEditorStateChange}
      />
      <Typography variant="body1" className={classes.errorText}>
        {errorMessage}
      </Typography>
    </ThemeProvider>
  );
};

const useStyles = makeStyles((theme) => ({
  wrapper: {
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius,
  },
  editor: {
    padding: theme.spacing(0, 2),
    fontFamily: theme.typography.fontFamily,
    fontSize: ".85rem",
    color: theme.palette.common.black,
    borderTop: `1px solid ${theme.palette.grey.A100}`,
    minHeight: "150px",
  },
  toolbar: {
    background: "transparent !important",
    border: "none !important",
  },
  errorText: {
    color: theme.palette.error.main,
    fontSize: ".75rem",
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
}));

export default TextAreaWithEditor;
