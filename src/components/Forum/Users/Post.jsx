import React from "react";
import { makeStyles } from "@material-ui/core";

const Post = ({ post }) => {
  const proflieLS = null || JSON.parse(localStorage.getItem("profile")).result;
  const classes = useStyles();

  return <div></div>;
};

const useStyles = makeStyles((theme) => ({}));

export default Post;
