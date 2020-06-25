import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

const RootLandingPage = lazy(() => import('../LandingPages/RootLandingPage/RootLandingPage'));
const StatisticsLandingPage = lazy(() =>
  import('../LandingPages/StatisticsLandingPage/StatisticsLandingPage')
);
const DokuLandingPage = lazy(() => import('../LandingPages/DokuLandingPage/DokuLandingPage'));
const ExplorationView = lazy(() => import('../ExplorationView/ExplorationView'));
const NotFound = lazy(() => import('../NotFound/NotFound'));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={RootLandingPage} />
        <Route exact path="/doku" component={DokuLandingPage} />
        <Route exact path="/statistics" component={StatisticsLandingPage} />
        <Route
          exact
          path="/doku/help/:currentClass"
          render={props => <ExplorationView {...props} mode="help" />}
        />
        <Route
          exact
          path="/doku/classes/:currentClass"
          render={props => <ExplorationView {...props} mode="class" />}
        />
        <Route
          exact
          path="/doku/classes/:currentClass/methods/:site/:currentMethod"
          render={props => <ExplorationView {...props} mode="method" />}
        />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  </Router>
);

export default App;
