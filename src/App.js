import React, { lazy } from "react";
import { Switch, Route } from "react-router-dom";
import { useApp } from "hooks";
const Home = lazy(() => import("pages/Home"));
const IssueDetails = lazy(() => import("pages/IssueDetails"));
const NotFound = lazy(() => import("pages/NotFound"));
const AppLoader = lazy(() => import("components/AppLoader"));

function App() {
  const { loading } = useApp();
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/issues/:id">
          <IssueDetails />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
      <AppLoader isLoading={loading} />
    </>
  );
}

export default App;
