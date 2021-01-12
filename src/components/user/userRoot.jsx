import React from "react";
import { Switch, Route } from "react-router-dom";
import List from "./list";
import ManageUser from "./addOrEditUser";
export default function AccountLayout(props) {
  const { match } = props;
  return (
    <div className="user">
      <Switch>
        <Route exact path={`${match.path}/`} component={List} />
        <Route exact path={`${match.path}/list`} component={List} />
        <Route exact path={`${match.path}/add`} component={ManageUser} />
        <Route
          exact
          path={`${match.path}/edit/:index`}
          render={(props) => (
            <ManageUser {...props} userIndex={props.match.params.index} />
          )}
        />
      </Switch>
    </div>
  );
}
