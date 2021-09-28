import React, { useState } from "react";
import { Container, Grid, makeStyles } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";

import Input from "./Input";
import { IconBtn } from "../../Globals/Buttons";
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
            {/* <IconBtn
              icon={<AddIcon />}
              color="secondary"
              event={null}
              type="submit"
            /> */}
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
    display: "inline-block",
  },
}));

export default AddCategoryForm;
