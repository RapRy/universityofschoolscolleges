import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Backdrop, CircularProgress } from '@material-ui/core';

import './index.css';

const Auth = lazy(() => import('./components/Auth/Auth'));
const Forum = lazy(() => import('./components/Forum/Forum'));
const Home = lazy(() => import('./components/Home/Home'));

const App = () => {
    return (
        <BrowserRouter>
          <Suspense fallback={<Backdrop open={true} style={{zIndex:5}}><CircularProgress /></Backdrop>}>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/auth" component={Auth} />
                <Route path="/forum" component={Forum} />
              </Switch>
          </Suspense>
        </BrowserRouter>
    )
}

export default App
