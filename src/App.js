import React, { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Switch, Route, useLocation } from 'react-router-dom';
import { Backdrop, CircularProgress, ThemeProvider, createMuiTheme } from '@material-ui/core';

import './index.css';
const Auth = lazy(() => import('./components/Auth/Auth'));
const Forum = lazy(() => import('./components/Forum/Forum'));
const Home = lazy(() => import('./components/Home/Home'));

const App = () => {

    const theme = createMuiTheme({
      palette: {
        primary: {
          main: "#003566",
          dark: "#001D3D",
          light: "#868686",
          contrastText: "#F6F6F6"
        },
        secondary: {
          main: "#C44536",
          dark: "#464646",
          light: "#E3E3E3",
          contrastText: "#FFFFFF"
        }
      },
      typography: {
        fontWeightBlack: 900
      },
      shape: {
        borderRadius: 5
      },
      overrides: {
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
