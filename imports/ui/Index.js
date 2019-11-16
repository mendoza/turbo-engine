import React, { PureComponent } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";
import Routes from "./Routes";
import Error404 from "./pages/Error404";
import RedirectLogin from "./components/RedirectLogin";
import RedirectDashboard from "./components/RedirectDashboard";

class Index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { loggedIn, currentUser } = this.props;
    const isLoggedIn = route => {
      if (route.path === "/login" && loggedIn) {
        return <Route exact key={route.name} path={route.path} component={RedirectDashboard} />;
      }
      if (loggedIn) {
        return <Route exact key={route.name} path={route.path} component={route.component} />;
      }
      if (route.path === "/login") {
        return <Route exact key={route.name} path={route.path} component={route.component} />;
      }
      return <Route exact key={route.name} path={route.path} component={RedirectLogin} />;
    };
    const isSuperAdmin = route => {
      if (route.path === "/login" && loggedIn) {
        return <Route exact key={route.name} path={route.path} component={RedirectDashboard} />;
      }
      if (loggedIn && currentUser && currentUser.profile.role === "superAdmin") {
        return <Route exact key={route.name} path={route.path} component={route.component} />;
      }
      if (loggedIn && currentUser && currentUser.profile.role !== "superAdmin") {
        return <Route exact key={route.name} path={route.path} component={RedirectLogin} />;
      }
      if (route.path === "/login") {
        return <Route exact key={route.name} path={route.path} component={route.component} />;
      }
      if (currentUser === null) {
        return <Route exact key={route.name} path={route.path} component={RedirectLogin} />;
      }
    };

    return (
      <BrowserRouter>
        <Switch>
          {Routes.map(route => {
            if (route.permission === "superAdmin") {
              return isSuperAdmin(route);
            }
            return isLoggedIn(route);
          })}
          <Route component={Error404} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default withTracker(() => {
  const loggedIn = !!Meteor.userId();
  return {
    loggedIn,
    currentUser: Meteor.user(),
  };
})(Index);
