import store from "./store";
import { reloadData } from "./store/user";
const Boot = () =>
  new Promise(() => {
    store.dispatch(reloadData());
  });
export default Boot;
