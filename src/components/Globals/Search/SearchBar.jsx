import React, { useState } from "react";
import { InputBase, makeStyles, ThemeProvider } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";

import { poppinsFont } from "../../../theme/themes";

const SearchBar = () => {
  const classes = useStyles();
  const history = useHistory();

  const [keyword, setKeyword] = useState({ search: "" });
  const [error, setError] = useState({ search: "" });

  const handleInputChange = (e) => {
    setKeyword({ search: e.target.value });
    setError({ search: "" });
  };

  const submitForm = (e) => {
    e.preventDefault();

    if (keyword.search === "") {
      setError({ search: "Field required." });
    } else {
      history.push(`/forum/search/${keyword.search.replace(" ", "-")}`);
    }
  };

  return (
    <form onSubmit={submitForm}>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <ThemeProvider theme={poppinsFont}>
          <InputBase
            type="text"
            name="search"
            placeholder="Search..."
            fullWidth
            onChange={handleInputChange}
            classes={{
              input: classes.input,
            }}
          />
        </ThemeProvider>
      </div>
    </form>
  );
};

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.primary.main,
    zIndex: 2,
  },
  input: {
    fontSize: ".75rem",
    fontWeight: 500,
    width: "100%",
    color: theme.palette.common.black,
    background: theme.palette.common.white,
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    borderRadius: "5px",
  },
}));

export default SearchBar;
