import React from "react";
import { Provider } from "react-redux";
import Root from "./components/Root";
import store from "./store";
import Boot from "./boot";
const App = () => (
  <Provider store={store}>
    <Root />
  </Provider>
);
Boot()
  .then(() => App())
  .catch((error) => console.error(error));
export default App;
