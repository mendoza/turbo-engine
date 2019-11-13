import React, { PureComponent } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Routes from "./Routes";
import Error404 from "./pages/Error404";

class Index extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <BrowserRouter>
        <DashboardLayout Routes={Routes}>
          <Switch>
            {Routes.map(route => {
              return <Route exact path={route.path} component={route.component} />;
            })}
            <Route component={Error404} />
          </Switch>
        </DashboardLayout>
      </BrowserRouter>
    );
  }
}

export default Index;
