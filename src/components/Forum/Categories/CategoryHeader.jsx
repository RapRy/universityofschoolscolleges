import React, { useState } from "react";
import {
  Typography,
  Grid,
  useMediaQuery,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import PostAddIcon from "@material-ui/icons/PostAdd";
import DeleteIcon from "@material-ui/icons/Delete";
import ForumIcon from "@material-ui/icons/Forum";
import { useSnackbar } from "notistack";

import { set_selected } from "../../../redux/categoriesReducer";
import DeleteDialog from "../../Globals/DeleteDialog";
import { update_active_status } from "../../../redux/categoriesReducer";
import { poppinsFont } from "../../../theme/themes";
import { IconTextBtn } from "../../Globals/Buttons";

const CategoryHeader = ({ cat, setShowForm, showForm }) => {
  const classes = useStyles();
  const max600 = useMediaQuery((theme) => theme.breakpoints.down("xs"));

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const handleAddTopic = () => {
    showForm === false && dispatch(set_selected(cat._id));
    setShowForm((prevState) => !prevState);
  };

  const handleDelete = () => setOpen(true);

  const handleConfirmDelete = () => {
    dispatch(update_active_status(cat._id));
    enqueueSnackbar(`${cat.name} deleted`, { variant: "success" });
    setOpen(false);
  };

  const handleCloseDialog = () => setOpen(false);

  return (
    <Grid
      container
      direction={max600 === true ? "column" : "row"}
      alignItems="center"
      justify="space-between"
      spacing={max600 === true ? 3 : 1}
      style={{ paddingBottom: "20px" }}
    >
      {open && (
        <DeleteDialog
          status={open}
          message={`Click confirm to delete ${cat.name}`}
          handleDelete={handleConfirmDelete}
          handleCancel={handleCloseDialog}
        />
      )}
      <Grid item md={"auto"} sm={"auto"} xs={12}>
        <ThemeProvider theme={poppinsFont}>
          <Typography variant="h4" className={classes.typoH4}>
            {cat.name}
          </Typography>
        </ThemeProvider>
      </Grid>
      <Grid item md={2} sm={2} xs={12}>
        <span className={classes.statsGrid}>
          <ForumIcon className={classes.icon} />
          <ThemeProvider theme={poppinsFont}>
            <Typography variant="h5" className={classes.typoH5}>
              {cat.meta.topics.length}
            </Typography>
          </ThemeProvider>
        </span>
      </Grid>
      <Grid item md={8} sm={8} xs={12}>
        <Grid
          container
          direction="row"
          justify={max600 === true ? "center" : "flex-end"}
        >
          <IconTextBtn
            icon={<PostAddIcon style={{ fontSize: "1.2rem" }} />}
            text="add post"
            color="secondary"
            size=".9rem"
            isLowercase={true}
            event={handleAddTopic}
            isMarginRight={true}
          />
          <IconTextBtn
            icon={<DeleteIcon style={{ fontSize: "1.2rem" }} />}
            text="delete"
            color="secondary"
            size=".9rem"
            isLowercase={true}
            event={handleDelete}
            isMarginRight={false}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  typoH4: {
    color: theme.palette.common.black,
    fontSize: ".9rem",
    fontWeight: theme.typography.fontWeightBold,
  },
  statsGrid: {
    padding: theme.spacing(1, 2),
    background: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius,
  },
  icon: {
    color: theme.palette.secondary.main,
    marginRight: theme.spacing(1),
    fontSize: "1.2rem",
    position: "relative",
    top: "-2px",
    left: 0,
    verticalAlign: "middle",
  },
  typoH5: {
    color: theme.palette.secondary.main,
    fontSize: "1rem",
    fontWeight: theme.typography.fontWeightBold,
    display: "inline-block",
  },
}));

export default CategoryHeader;
