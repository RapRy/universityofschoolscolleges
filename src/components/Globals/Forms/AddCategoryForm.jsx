import React, { useState } from "react";
import { Container, Grid, Button, makeStyles } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";

import Input from "./Input";
import * as api from "../../../api";
import { add_category } from "../../../redux/categoriesReducer";

const initialErrors = { name: "" };
const initialState = { name: "" };

const AddCategoryForm = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const [errors, setErrors] = useState(initialErrors);
  const [formData, setFormData] = useState(initialState);

  const { enqueueSnackbar } = useSnackbar();

  const handleInputChange = (e) => {
    setFormData({ name: e.target.value });
    setErrors({ name: "" });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (formData.name === "") {
      setErrors({ name: "Field required." });
      return;
    }

    let { data, status } = await api.addCategory(formData);

    if (status === 200) {
      if (data.status === 0) {
        setErrors({ name: data.message });
        return;
      }

      dispatch(add_category({ ...data.result }));

      enqueueSnackbar(`${formData.name} added`, { variant: "success" });

      setFormData({ name: "" });
    }
  };

  return (
    <Container className={classes.container}>
      <form onSubmit={handleFormSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={10} sm={11}>
            <Input
              type={"text"}
              name={"name"}
              label={"add new category"}
              handleInputChange={handleInputChange}
              errors={errors}
            />
          </Grid>
          <Grid item xs={1}>
            <Button
              disableFocusRipple
              disableRipple
              classes={{ root: classes.iconBtn }}
            >
              <AddIcon />
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    background: theme.palette.grey.A100,
    padding: theme.spacing(2, 3),
    borderRadius: theme.shape.borderRadius,
  },
  iconBtn: {
    width: "100%",
    height: "100%",
    borderRadius: theme.shape.borderRadius,
    background: theme.palette.secondary.main,
    color: theme.palette.common.white,
    "&:hover": {
      background: theme.palette.secondary.light,
    },
  },
}));

export default AddCategoryForm;
