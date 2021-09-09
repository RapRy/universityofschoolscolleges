import React, { useEffect } from "react";
import {
  Container,
  makeStyles,
  Typography,
  ThemeProvider,
  Divider,
  Button,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";

import { get_categories } from "../../redux/categoriesReducer";
import SearchBar from "../Globals/Search/SearchBar";
import { poppinsFont } from "../../theme/themes";

const CategoriesPanel = () => {
  // const Route = useRouteMatch("/forum/:category");
  const { url } = useRouteMatch();
  const { categories } = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  const classes = useStyles();

  useEffect(() => {
    dispatch(get_categories());
  }, [dispatch]);

  return (
    <Container className={classes.container}>
      <SearchBar />
      <Divider className={classes.divider} />
      <div>
        <ThemeProvider theme={poppinsFont}>
          <Typography variant="h6" className={classes.heading}>
            CATEGORIES
          </Typography>
          {categories.map((cat) => (
            <Link
              to={`${url}/${cat._id}`}
              key={cat._id}
              className={classes.link}
            >
              <Button
                disableRipple
                disableFocusRipple
                fullWidth
                classes={{
                  // root: `${classes.cat} ${
                  //   cat._id === params.category ? classes.activeCat : ""
                  // }`,
                  root: classes.cat,
                  label: classes.catlabel,
                }}
              >
                {cat.name}
              </Button>
            </Link>
          ))}
        </ThemeProvider>
      </div>
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    background: theme.palette.primary.main,
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  heading: {
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.common.white,
    fontSize: ".85rem",
    marginBottom: theme.spacing(2),
  },
  link: {
    textDecoration: "none",
    marginBottom: theme.spacing(2),
    display: "block",
    "&:last-child": {
      marginBottom: 0,
    },
  },
  cat: {
    color: theme.palette.common.white,
    textTransform: "capitalize",
    fontWeight: theme.typography.fontWeightBold,
    fontSize: ".8rem",
    textAlign: "left",
    padding: theme.spacing(1, 2),
    transition: "background 400ms linear",
    "&:hover": {
      background: theme.palette.primary.dark,
    },
  },
  activeCat: {
    background: theme.palette.primary.dark,
    "&:hover": {
      background: theme.palette.primary.dark,
    },
  },
  catlabel: {
    justifyContent: "flex-start",
  },
}));

export default CategoriesPanel;
