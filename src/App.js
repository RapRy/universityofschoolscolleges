import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ReactNotification from 'react-notifications-component'

import './index.css';

const Auth = lazy(() => import('./components/Auth/Auth'));
const Forum = lazy(() => import('./components/Forum/Forum'));
const Home = lazy(() => import('./components/Home/Home'));

const App = () => {
    return (
        <BrowserRouter>

          <ReactNotification />
          <Suspense fallback={<p>Loading...</p>}>
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
