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
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";

import UserMenu from "./UserMenu";
import ProfileMenu from "./ProfileMenu";
import SearchBar from "./SearchBar";
import HomeMenu from "./HomeMenu";

import { poppinsFont, ubuntuFont } from "../../theme/themes";

const Navigation = ({ type }) => {
  const classes = useStyles({ type });
  const max960 = useMediaQuery("(max-width:960px)");
  const min600 = useMediaQuery("(min-width:600px)");

  const [showAside, setShowAside] = useState(false);

  return (
    <Box position="absolute" top="0" left="0" width="100%">
      <AppBar position="relative" className={classes.appBar} elevation={0}>
        <Container className={classes.container}>
          <Grid container direction="row" alignItems="center">
            {/* logo start */}
            <Grid item xs={11} sm={5} md={6}>
              <ThemeProvider theme={poppinsFont}>
                <Link to="/" className={classes.logo}>
                  <Typography
                    variant="h5"
                    className={classes.headerH5}
                    display="inline"
                  >
                    SCHOOL LOGO
                    {type !== "" ? "   |" : ""}
                  </Typography>
                </Link>
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
            <Grid item xs={1} sm={7} md={6}>
              <ThemeProvider theme={ubuntuFont}>
                {/* mobile menu start */}
                {type !== "" ? (
                  <Drawer
                    anchor="right"
                    open={showAside}
                    onClose={() => setShowAside((prevState) => !prevState)}
                    classes={{
                      paper: classes.drawerBg,
                    }}
                    elevation={1}
                  >
                    <ProfileMenu max960={max960} setShowAside={setShowAside} />
                  </Drawer>
                ) : (
                  <Drawer
                    anchor="right"
                    open={showAside}
                    onClose={() => setShowAside((prevState) => !prevState)}
                    classes={{
                      paper: classes.drawerBg,
                    }}
                    elevation={1}
                  >
                    <HomeMenu aside={true} />
                  </Drawer>
                )}
                {/* mobile menu end */}

                {/* desktop menu start */}
                {max960 === true ? (
                  <Grid
                    container
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    justify="flex-end"
                  >
                    {min600 && type !== "" && (
                      <Grid item sm={10} md={11}>
                        <SearchBar />
                      </Grid>
                    )}
                    <Grid
                      item
                      xs={12}
                      sm={2}
                      md={1}
                      style={{ textAlign: "right" }}
                    >
                      <MenuIcon
                        className={classes.menuIcon}
                        onClick={() => setShowAside((prevState) => !prevState)}
                      />
                    </Grid>
                  </Grid>
                ) : (
                  <>
                    {type !== "" ? (
                      <UserMenu
                        setShowAside={setShowAside}
                        showAside={showAside}
                      />
                    ) : (
                      <HomeMenu aside={false} />
                    )}
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
    background: (props) =>
      props.type !== "" ? theme.palette.primary.main : "transparent",
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
    fontSize: "2.5rem",
  },
  drawerBg: {
    background: theme.palette.primary.main,
  },
}));

export default Navigation;
