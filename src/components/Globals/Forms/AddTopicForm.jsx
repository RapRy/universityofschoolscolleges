import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  ThemeProvider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useSelector, useDispatch } from "react-redux";
import PublishIcon from "@material-ui/icons/Publish";
import { useSnackbar } from "notistack";
import { EditorState, convertToRaw } from "draft-js";

import Input from "./Input";
import TextAreaWithEditor from "./TextAreaWithEditor";
import { publish_topic, update_topic } from "../../../redux/topicsReducer";
import * as api from "../../../api";
import { poppinsFont } from "../../../theme/themes";

const initialErrors = { title: "", ref: { category: "" }, description: "" };
const initialState = {
  title: "",
  ref: {
    category: "",
    creator: JSON.parse(localStorage.getItem("profile"))?.result?._id,
  },
};

const AddTopicForm = ({ action }) => {
  const classes = useStyles();

  const { categories, selectedCat } = useSelector((state) => state.categories);
  const { selectedTopic } = useSelector((state) => state.topics);
  const { profile } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [errors, setErrors] = useState(initialErrors);
  const [formData, setFormData] = useState(initialState);
  const [select, setSelect] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const { enqueueSnackbar } = useSnackbar();

  const handleSelectChange = (e) => {
    setSelect(e.target.value);
    const cat = categories.filter(({ name }) => name === e.target.value);

    const updatedRef = { ...formData.ref, category: cat[0]._id };

    setFormData({ ...formData, ref: updatedRef });
    setErrors({ ...errors, ref: { category: "" } });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const descriptionEditor = convertToRaw(editorState.getCurrentContent());

    if (formData.title === "") {
      setErrors({ ...errors, title: "Field required." });
      return;
    }

    if (
      descriptionEditor.blocks[0].text === "" &&
      descriptionEditor.entityMap[0] === undefined
    ) {
      setErrors({ ...errors, description: "Field required." });
      return;
    }

    if (
      formData.ref.category === "" ||
      formData.ref.category === "select category" ||
      formData.ref.category === null
    ) {
      setErrors({ ...errors, ref: { category: "Field required." } });
      return;
    }
    // action edit
    if (action === "edit") {
      const { data, status } = await api.updateTopic(formData);

      if (status === 200) {
        if (data.status === 0) {
          setErrors({ ...errors, title: data.message });
          return;
        }

        // if(selectedCat._id === data.result.ref.category) dispatch(update_topic(data.result))

        dispatch(update_topic(data.result));

        enqueueSnackbar(`update successful`, { variant: "success" });

        const cat = categories.filter(({ name }) => name === select);
        const ref = {
          ...initialState.ref,
          category: cat[0]._id,
          creator:
            profile.result?._id ||
            JSON.parse(localStorage.getItem("profile"))?.result?._id,
        };

        setFormData({ ...initialState, ref: ref });
      }

      return;
    }

    // publish
    const { data, status } = await api.publishTopic({
      ...formData,
      description: JSON.stringify(descriptionEditor),
    });

    if (status === 200) {
      if (data.status === 0) {
        setErrors({ ...errors, title: data.message });
        return;
      }

      if (selectedCat._id === data.result.ref.category)
        dispatch(publish_topic(data.result));

      enqueueSnackbar(`${formData.title} publish at ${select}`, {
        variant: "success",
      });

      const cat = categories.filter(({ name }) => name === select);
      const ref = {
        ...initialState.ref,
        category: cat[0]._id,
        creator:
          profile.result?._id ||
          JSON.parse(localStorage.getItem("profile"))?.result?._id,
      };

      setFormData({ ...initialState, ref: ref });
    }
  };

  useEffect(() => {
    setSelect(selectedCat.name);
    const ref = { ...formData.ref, category: selectedCat._id || null };

    if (action === "edit") {
      setFormData({
        ...formData,
        ref: ref,
        title: selectedTopic.topic.title,
        topicId: selectedTopic.topic._id,
      });
    } else {
      setFormData({ ...formData, ref: ref });
    }
  }, [selectedCat]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container classes={{ root: classes.containerRoot }}>
      <form onSubmit={handleFormSubmit}>
        <Grid container direction="column">
          <Grid item xs={12}>
            <Grid
              container
              direction="row"
              justify="space-around"
              alignItems="center"
              spacing={2}
            >
              <Grid item xs={12} sm={8} md={9}>
                <Input
                  type="text"
                  name="title"
                  label="set title"
                  handleInputChange={handleInputChange}
                  errors={errors}
                  value={formData.title}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <ThemeProvider theme={poppinsFont}>
                  <FormControl
                    classes={{ root: classes.formControl }}
                    error={errors.ref.category !== "" ? true : false}
                  >
                    <InputLabel
                      id="demo-simple-select-error-label"
                      classes={{ root: classes.label }}
                    >
                      {errors.ref.category !== ""
                        ? errors.ref.category
                        : "select category"}
                    </InputLabel>
                    <Select
                      disableUnderline
                      variant="filled"
                      labelId="demo-simple-select-error-label"
                      id="demo-simple-select-error"
                      value={select || ""}
                      onChange={handleSelectChange}
                      classes={{
                        root: classes.select,
                      }}
                      inputProps={{
                        classes: {
                          root: classes.input,
                        },
                      }}
                    >
                      <MenuItem
                        value=""
                        disabled
                        classes={{ root: classes.input }}
                      >
                        <em>select category</em>
                      </MenuItem>
                      {categories.map((cat) => (
                        <MenuItem
                          classes={{ root: classes.input }}
                          key={cat._id}
                          value={cat.name}
                        >
                          {cat.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </ThemeProvider>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.textAreaGrid}>
            <TextAreaWithEditor
              editorState={editorState}
              setEditorState={setEditorState}
              errorMessage={errors.description}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              className={classes.buttonSubmit}
              startIcon={<PublishIcon />}
            >
              PUBLISH
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  containerRoot: {
    background: theme.palette.grey.A100,
    marginTop: theme.spacing(2),
    padding: theme.spacing(2, 3),
    borderRadius: theme.shape.borderRadius,
  },
  buttonSubmit: {
    borderRadius: theme.shape.borderRadius,
    margin: `${theme.spacing(2)}px auto`,
    fontSize: ".9rem",
    fontWeight: theme.typography.fontWeightLight,
    color: theme.palette.secondary.contrastText,
    padding: theme.spacing(1, 3),
    background: theme.palette.secondary.main,
    "&:hover": {
      background: theme.palette.secondary.dark,
    },
    [theme.breakpoints.down("xs")]: {
      margin: `${theme.spacing(1)}px auto 0`,
    },
  },
  formControl: {
    width: "100%",
  },
  filled: {
    borderRadius: theme.shape.borderRadius,
  },
  label: {
    fontSize: ".8rem",
    color: theme.palette.common.black,
    marginLeft: theme.spacing(2),
    // transform: "translateY(20px)",
    zIndex: 2,
  },
  select: {
    background: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius,
    height: 0,
  },
  input: {
    fontSize: ".8rem",
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.common.black,
    background: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius,
  },
  textAreaGrid: {
    marginTop: theme.spacing(2),
  },
}));

export default AddTopicForm;
