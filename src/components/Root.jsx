import React, { Component } from "react";

import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Userlayout from "./user/userRoot";
class Root extends Component {
  render() {
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <div className="container">
          <Switch>
            <Route path="/user" render={(props) => <Userlayout {...props} />} />
            <Redirect to="/user" />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, null)(Root);
