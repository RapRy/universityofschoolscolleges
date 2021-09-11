import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Grid,
  Container,
  useMediaQuery,
  Box,
  makeStyles,
  useTheme,
} from "@material-ui/core";
import _ from "lodash";
import {
  Switch,
  Route,
  useRouteMatch,
  useHistory,
  Redirect,
} from "react-router-dom";

import Navigation from "../Navigation/Navigation";
import SearchBar from "../Navigation/SearchBar";
import SideNavigation from "../SideNavigation/SideNavigation";
import { sign_in_LS } from "../../redux/authReducer";

import Overview from "./Overview/Overview";
import Categories from "./Categories/Categories";
import Topics from "./Topics/Topics";
import Topic from "./Topics/Topic";
import ActiveUsersList from "./Users/ActiveUsersList";
import RegisteredUsersList from "./Users/RegisteredUsersList";
import NewUsersList from "./Users/NewUsersList";
import BlacklistedUsersList from "./Users/BlacklistedUsersList";
import UserPosts from "./Users/UserPosts";
import EditProfile from "./Users/EditProfile";
import SearchResult from "./Search/SearchResult";
import BottomPanels from "./BottomPanels";
import BackToTop from "../Globals/BackToTop";

const profileLS = JSON.parse(localStorage.getItem("profile"));

const Forum = () => {
  const history = useHistory();
  const theme = useTheme();

  const { profile } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { path } = useRouteMatch();
  const matchTopicId = useRouteMatch("/forum/:category/:topicId");

  const max600 = useMediaQuery((theme) => theme.breakpoints.down("xs"));
  const max960 = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const classes = useStyles();

  useEffect(() => {
    if (!_.isEmpty(profile)) {
      return;
    } else if (localStorage.getItem("profile") !== null) {
      dispatch(sign_in_LS(profileLS));
    } else {
      history.push(history.action === "POP" ? "/" : "/auth");
      // history.push("/");
    }
  }, [dispatch, profile, history]);

  return (
    <div>
      <BackToTop />
      <Navigation type="forum" />
      {/* {max600 && (
        <Box className={classes.searchContainer}>
          <SearchBar />
        </Box>
      )} */}
      <Container className={classes.forumContainer}>
        <Grid container>
          <Grid item md={4} xs={12}>
            <SideNavigation />
          </Grid>
          <Grid item md={8} xs={12}>
            <Switch>
              <Route exact path={path}>
                {(profile?.result?.accountType === 1 &&
                  profile?.result !== null) ||
                (profileLS?.result?.accountType === 1 &&
                  profileLS?.result !== null) ? (
                  <Overview />
                ) : (
                  <Redirect to={`${path}/topics`} />
                )}
              </Route>

              <Route path={`${path}/categories`}>
                {profile.result?.accountType === 1 && <Categories />}
              </Route>

              <Route
                exact
                path={`${path}/search/:keyword`}
                component={SearchResult}
              />
              <Route
                exact
                path={`${path}/active-users`}
                component={ActiveUsersList}
              />
              <Route
                exact
                path={`${path}/registered-users`}
                component={RegisteredUsersList}
              />
              <Route
                exact
                path={`${path}/new-users`}
                component={NewUsersList}
              />
              <Route
                exact
                path={`${path}/blacklisted-users`}
                component={BlacklistedUsersList}
              />

              <Route
                exact
                path={`${path}/profile/edit/:userId`}
                component={EditProfile}
              />

              <Route
                exact
                path={`${path}/profile/:userId`}
                component={UserPosts}
              />

              <Route exact path={`${path}/:category`} component={Topics} />

              <Route
                exact
                path={`${path}/:category/:topicId`}
                component={Topic}
              />
            </Switch>

            {max960 &&
              profile?.result?.accountType === 0 &&
              matchTopicId?.params?.category !== "profile" && (
                <BottomPanels gridSize={matchTopicId !== null ? 4 : 6} />
              )}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  searchContainer: {
    marginTop: theme.spacing(4),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    padding: theme.spacing(2),
    background: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[7],
  },
  forumContainer: {
    padding: 0,
    marginTop: theme.spacing(10),
  },
}));

export default Forum;
