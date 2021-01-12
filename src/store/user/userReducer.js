import {
  RELOAD_DATA,
  ADD_USER_SUCCESS,
  ADD_USER_DISMISS,
  DELETE_USER,
  EDIT_USER,
} from "./userActionTypes";

const initialState = {
  userData: [],
  adduserDataSuccess: false,
  edituserDataSuccess: false,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case RELOAD_DATA:
      let reloadData = localStorage.getItem("userData");
      return {
        ...state,
        userData: reloadData ? JSON.parse(reloadData) : [],
      };
    case ADD_USER_SUCCESS:
      let tempUserData = [...state.userData];
      tempUserData.unshift(action.data);
      localStorage.setItem("userData", JSON.stringify(tempUserData));
      return {
        ...state,
        userData: tempUserData,
        adduserDataSuccess: true,
      };

    case ADD_USER_DISMISS:
      return {
        ...state,
        adduserDataSuccess: false,
        edituserDataSuccess: false,
      };
    case DELETE_USER:
      let tempUserDataD = [...state.userData];
      tempUserDataD.splice(action.index, 1);
      localStorage.setItem("userData", JSON.stringify(tempUserDataD));
      return {
        ...state,
        userData: tempUserDataD,
      };
    case EDIT_USER:
      let tempUserDataEdit = [...state.userData];
      tempUserDataEdit[action.index] = action.data;
      localStorage.setItem("userData", JSON.stringify(tempUserDataEdit));
      return {
        ...state,
        userData: tempUserDataEdit,
        edituserDataSuccess: true,
      };
    default:
      return state;
  }
}
