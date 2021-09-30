import React, { useState } from "react";
import {
  AppBar,
  Typography,
  Container,
  Grid,
  useMediaQuery,
  Drawer,
  ThemeProvider,
  Box,
  makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";

import UserMenu from "./UserMenu";
import ProfileMenu from "./ProfileMenu";
import { withHomeMenu } from "../HOC";

import { poppinsFont, ubuntuFont } from "../../theme/themes";

const ProfileWithHomeMenu = withHomeMenu(ProfileMenu);
const UserWithHomeMenu = withHomeMenu(UserMenu);

const Navigation = ({ type }) => {
  const classes = useStyles({ type });
  const max960 = useMediaQuery("(max-width:960px)");

  const [showAside, setShowAside] = useState(false);

  return (
    <Box position="absolute" top="0" left="0" width="100%">
      <AppBar position="relative" className={classes.appBar} elevation={0}>
        <Container className={classes.container}>
          <Grid container direction="row" alignItems="center">
            {/* logo start */}
            <Grid item xs={11} sm={11} md={6}>
              <ThemeProvider theme={poppinsFont}>
                <Link to="/" className={classes.logo}>
                  <Typography
                    variant="h5"
                    className={classes.headerH5}
                    display="inline"
                  >
                    SCHOOL LOGO
                    {/* add pipe if forum page */}
                    {type !== "" ? "   |" : ""}
                  </Typography>
                </Link>
                {/* add forum text if forum page */}
                {type !== "" ? (
                  <Link to="/forum" className={classes.logo}>
                    <Typography
                      className={classes.headerH6}
                      variant="h6"
                      display="inline"
                    >
                      {" "}
                      THE FORUM
                    </Typography>
                  </Link>
                ) : (
                  ""
                )}
              </ThemeProvider>
            </Grid>
            {/* logo end */}

            {/* nav menu start */}
            <Grid item xs={1} sm={1} md={max960 ? 1 : 6}>
              <ThemeProvider theme={ubuntuFont}>
                {/* mobile menu start */}
                <Drawer
                  anchor="right"
                  open={showAside}
                  onClose={() => setShowAside((prevState) => !prevState)}
                  classes={{
                    paper: classes.drawerBg,
                  }}
                  elevation={1}
                >
                  <ProfileWithHomeMenu
                    max960={max960}
                    setShowAside={setShowAside}
                    type={type}
                    aside={true}
                  />
                </Drawer>
                {/* mobile menu end */}

                {/* desktop menu start */}
                {max960 ? (
                  <Grid container justify="flex-end">
                    <MenuIcon
                      className={classes.menuIcon}
                      onClick={() => setShowAside((prevState) => !prevState)}
                    />
                  </Grid>
                ) : (
                  <>
                    <UserWithHomeMenu
                      setShowAside={setShowAside}
                      showAside={showAside}
                      type={type}
                      aside={false}
                    />
                  </>
                )}
                {/* desktop menu end */}
              </ThemeProvider>
            </Grid>
            {/* nav menu end */}
          </Grid>
        </Container>
      </AppBar>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  appBar: {
    background: "transparent",
    boxShadow: "none",
  },
  container: {
    padding: theme.spacing(2, 3),
  },
  headerH5: {
    fontWeight: 700,
    fontSize: "1.3rem",
    color: theme.palette.primary.main,
  },
  logo: {
    color: theme.palette.primary.main,
    textDecoration: "none",
  },
  headerH6: {
    fontWeight: 500,
    fontSize: "1rem",
    color: theme.palette.primary.main,
  },
  menuIcon: {
    color: (props) =>
      props.type === "forum"
        ? theme.palette.primary.main
        : theme.palette.common.white,
    fontSize: "2.5rem",
    cursor: "pointer",
    transition: "color 500ms linear",
    "&:hover": {
      color: theme.palette.primary.light,
    },
  },
  drawerBg: {
    background: theme.palette.primary.main,
  },
}));

export default Navigation;
