import React, { useEffect } from "react";
import {
  Container,
  makeStyles,
  Typography,
  ThemeProvider,
  Divider,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";

import { get_categories } from "../../redux/categoriesReducer";
import SearchBar from "../Globals/Search/SearchBar";
import { poppinsFont } from "../../theme/themes";
import { SideNavButton } from "../Globals/Buttons";

const CategoriesPanel = () => {
  // const Route = useRouteMatch("/forum/:category");
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
            <SideNavButton data={cat} key={cat._id} />
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
}));

export default CategoriesPanel;
