import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Backdrop, CircularProgress, ThemeProvider, createMuiTheme } from '@material-ui/core';
import { grey, blueGrey } from '@material-ui/core/colors';

import './index.css';

const Auth = lazy(() => import('./components/Auth/Auth'));
const Forum = lazy(() => import('./components/Forum/Forum'));
const Home = lazy(() => import('./components/Home/Home'));

const App = () => {
    const theme = createMuiTheme({
      palette: {
        primary: blueGrey,
        secondary: grey
      }
    })

    return (
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Suspense fallback={<Backdrop open={true} style={{zIndex:5}}><CircularProgress /></Backdrop>}>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/auth" component={Auth} />
                <Route path="/forum" component={Forum} />
              </Switch>
          </Suspense>
        </BrowserRouter>
      </ThemeProvider>
    )
}

export default App
