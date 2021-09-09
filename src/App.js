import React, { lazy, Suspense } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { Backdrop, CircularProgress, ThemeProvider } from "@material-ui/core";

import { mainTheme } from "./theme/themes";

import "./index.css";
import Footer from "./components/Footer/Footer";
import FourOFour from "./components/Globals/FourOFour/FourOFour";
const Auth = lazy(() => import("./components/Auth/Auth"));
const Forum = lazy(() => import("./components/Forum/Forum"));
const Home = lazy(() => import("./components/Home/Home"));

const App = () => {
  const matchAuth = useRouteMatch("/auth");
  // const match404 = useRouteMatch("*");

  return (
    <ThemeProvider theme={mainTheme}>
      <Suspense
        fallback={
          <Backdrop open={true} style={{ zIndex: 5 }}>
            <CircularProgress />
          </Backdrop>
        }
      >
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/auth" component={Auth} />
          <Route path="/forum" component={Forum} />

          <Route path="*" component={FourOFour} />
        </Switch>
      </Suspense>

      {matchAuth === null && <Footer />}
    </ThemeProvider>
  );
};

export default App;
