import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import './index.css';

const Auth = lazy(() => import('./components/Auth/Auth'));
const Forum = lazy(() => import('./components/Forum/Forum'));
const Home = lazy(() => import('./components/Home/Home'));

const App = () => {
    return (
        <BrowserRouter>

          <Suspense fallback={<p>Loading...</p>}>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/auth" component={Auth} />
                <Route exact path="/forum" component={Forum} />
              </Switch>
          </Suspense>
        </BrowserRouter>
    )
}

export default App
