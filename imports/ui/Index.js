import React, { PureComponent } from "react";
import AppBar from "./layouts/AppBarLayout";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Routes from "./Routes";
class Index extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <BrowserRouter>
        <AppBar Routes={Routes}>
          <Switch>
            {Routes.map(route => {
              return <Route exact path={route.path} component={route.component} />;
            })}
            {/* <Route component={Error404} /> */}
          </Switch>
        </AppBar>
      </BrowserRouter>
    );
  }
}

export default Index;
