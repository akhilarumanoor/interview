import {
  RELOAD_DATA,
  ADD_USER_SUCCESS,
  ADD_USER_DISMISS,
  DELETE_USER,
  EDIT_USER,
} from "./userActionTypes";

export function reloadData() {
  return (dispatch) => {
    dispatch({
      type: RELOAD_DATA,
    });
  };
}
export function addUser(userData) {
  return (dispatch) => {
    dispatch({
      type: ADD_USER_SUCCESS,
      data: userData,
    });
  };
}
export function dismissAddUser() {
  return {
    type: ADD_USER_DISMISS,
  };
}
export function deleteUser(index) {
  return (dispatch) => {
    dispatch({
      type: DELETE_USER,
      index: index,
    });
  };
}
export function editUser(userData, index) {
  return (dispatch) => {
    dispatch({
      type: EDIT_USER,
      data: userData,
      index: index,
    });
  };
}
