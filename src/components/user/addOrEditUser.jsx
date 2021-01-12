import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addUser, editUser, dismissAddUser } from "../../store/user";

function ManageUser(props) {
  const dispatch = useDispatch();
  const { userIndex } = props;
  const [addorEdit] = useState(userIndex ? "Edit" : "Add");
  const { countries } = useSelector((state) => state.common);
  const { adduserDataSuccess, edituserDataSuccess, userData } = useSelector(
    (state) => state.user
  );
  const [validationError, setValidationError] = useState({});
  const [postData, setPostData] = useState({
    firstName: "",
    lastName: "",
    ageName: "",
    emailName: "",
    active: "",
    state: "",
    country: "",
    telephone: "",
    profilePic: "",
  });
  useEffect(() => {
    if (adduserDataSuccess || edituserDataSuccess) {
      props.history.push("/");
      dispatch(dismissAddUser());
    }
  }, [adduserDataSuccess, edituserDataSuccess, dispatch, props.history]);
  useEffect(() => {
    if (userIndex) {
      if (userData[userIndex]) {
        setPostData(userData[userIndex]);
      }
    }
  }, [userIndex, dispatch, userData]);
  function return_confirmvalidate(e) {
    let elements = e.target.querySelectorAll("[required]");
    var text = "";
    var key = "";
    var msgObj = {};

    for (var i = 0; i < elements.length; i++) {
      if (!elements[i].checkValidity()) {
        let errortext1 =
          elements[i].value === "" ? `is required` : `is not valid`;
        text = `${elements[i].getAttribute("data-validation")} ${errortext1}`;
        key = `${elements[i].getAttribute("data-key")}`;
        msgObj[key] = text;
      } else if (elements[i].value.trim() === "") {
        let errortext =
          elements[i].value === "" ? `is required` : `is not valid`;
        text = `${elements[i].getAttribute("data-validation")} ${errortext}`;
        key = `${elements[i].getAttribute("data-key")}`;
        msgObj[key] = text;
      }
    }
    return msgObj;
  }
  function updatevalTostate(value, key) {
    let tempPostData = { ...postData };
    tempPostData[key] = value;
    setPostData(tempPostData);

    removeError(key);
  }
  function removeError(key) {
    let tempValidationError = { ...validationError };
    tempValidationError[key] = "";
    setValidationError(tempValidationError);
  }
  function readURL(files) {
    if (files && files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        updatevalTostate(e.target.result, "profilePic");
      };

      reader.readAsDataURL(files[0]); // convert to base64 string
    }
  }
  function saveUser(e) {
    e.preventDefault();
    setValidationError({});
    let error = false;
    let validationError = {};
    if (!e.target.checkValidity()) {
      let obj = return_confirmvalidate(e);
      validationError = obj;
      error = true;
    }
    if (postData.active === "") {
      validationError.active = "Active is required";
      error = true;
    }
    if (postData.country === "") {
      validationError.country = "Country is required";
      error = true;
    }
    if (postData.country !== "" && postData.state === "") {
      validationError.state = "State is required";
      error = true;
    }

    setValidationError(validationError);

    if (error) {
      return false;
    }
    if (userIndex && userIndex >= 0) {
      dispatch(editUser(postData, userIndex));
    } else {
      dispatch(addUser(postData));
    }
  }
  return (
    <div className="manageUser">
      <h1>{addorEdit} User</h1>
      <form noValidate onSubmit={(e) => saveUser(e)}>
        <div className="parent">
          <div className="main">
            <div className="picdiv">
              {postData.profilePic !== "" ? (
                <div className="pictureBox">
                  <img alt="profilepic" src={postData.profilePic}></img>
                </div>
              ) : (
                <div className="pictureBox">
                  <span>Profile Picture</span>
                </div>
              )}
              <input
                onChange={(e) => readURL(e.target.files)}
                type="file"
              ></input>
            </div>
            <div>
              <div className="eachChild">
                <label>
                  First Name <span className="red">*</span>
                </label>
                <div>
                  <input
                    type="text"
                    data-validation={"First Name"}
                    data-key="firstName"
                    placeholder={`First Name`}
                    required
                    value={postData.firstName}
                    onChange={(e) => {
                      updatevalTostate(e.target.value, "firstName");
                    }}
                  />
                  {"firstName" in validationError && (
                    <p className="errorP">{validationError.firstName}</p>
                  )}
                </div>
              </div>
              <div className="eachChild">
                <label>
                  Last Name <span className="red">*</span>
                </label>
                <div>
                  <input
                    type="text"
                    data-validation={"Last Name"}
                    data-key="lastName"
                    placeholder={`Last Name`}
                    required
                    value={postData.lastName}
                    onChange={(e) => {
                      updatevalTostate(e.target.value, "lastName");
                    }}
                  />
                  {"lastName" in validationError && (
                    <p className="errorP">{validationError.lastName}</p>
                  )}
                </div>
              </div>
              <div className="eachChild">
                <label>
                  Age <span className="red">*</span>
                </label>
                <div>
                  <input
                    type="number"
                    data-validation={"Age"}
                    data-key="age"
                    placeholder={`Age`}
                    required
                    value={postData.age}
                    onChange={(e) => {
                      updatevalTostate(e.target.value, "age");
                    }}
                  />
                  {"age" in validationError && (
                    <p className="errorP">{validationError.age}</p>
                  )}
                </div>
              </div>
              <div className="eachChild">
                <label>
                  Email <span className="red">*</span>
                </label>
                <div>
                  <input
                    type="email"
                    data-validation={"Email"}
                    data-key="emailName"
                    placeholder={`Email`}
                    required
                    value={postData.emailName}
                    onChange={(e) => {
                      updatevalTostate(e.target.value, "emailName");
                    }}
                  />
                  {"emailName" in validationError && (
                    <p className="errorP">{validationError.emailName}</p>
                  )}
                </div>
              </div>
              <div className="eachChild">
                <label>
                  Active <span className="red">*</span>
                </label>
                <div>
                  <select
                    required
                    onChange={(e) => {
                      updatevalTostate(e.target.value, "active");
                    }}
                    value={postData.active}
                  >
                    <option>--Select--</option>
                    <option key={"y"} value="1">
                      Active
                    </option>
                    <option key={"n"} value="0">
                      Inactive
                    </option>
                  </select>
                  {"active" in validationError && (
                    <p className="errorP">{validationError.active}</p>
                  )}
                </div>
              </div>
              <div className="eachChild">
                <label>
                  State <span className="red">*</span>
                </label>
                <div>
                  <select
                    required
                    disabled={postData.country === "" ? true : false}
                    onChange={(e) => {
                      updatevalTostate(e.target.value, "state");
                    }}
                    value={postData.state}
                  >
                    <option>--Select--</option>
                    {postData.country &&
                      countries
                        .filter((c) => c.country === postData.country)[0]
                        .states.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                  </select>
                  {"state" in validationError && (
                    <p className="errorP">{validationError.state}</p>
                  )}
                </div>
              </div>
              <div className="eachChild">
                <label>
                  Country <span className="red">*</span>
                </label>
                <div>
                  <select
                    data-validation={"Country"}
                    data-key="country"
                    required
                    value={postData.country}
                    onChange={(e) => {
                      updatevalTostate(e.target.value, "country");
                    }}
                  >
                    <option>--Select--</option>
                    {countries.map((c) => (
                      <option key={c.country} value={c.country}>
                        {c.country}
                      </option>
                    ))}
                  </select>
                  {"country" in validationError && (
                    <p className="errorP">{validationError.country}</p>
                  )}
                </div>
              </div>
              <div className="eachChild">
                <label>
                  Telephone <span className="red">*</span>
                </label>
                <div>
                  <input
                    type="number"
                    data-validation={"Telephone"}
                    data-key="telephone"
                    placeholder={`Telephone`}
                    required
                    value={postData.telephone}
                    onChange={(e) => {
                      updatevalTostate(e.target.value, "telephone");
                    }}
                  />
                  {"telephone" in validationError && (
                    <p className="errorP">{validationError.telephone}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="submit-div">
            <input
              type="submit"
              className="btn"
              value={userIndex >= 0 ? "Update" : "Submit"}
            />
          </div>
        </div>
      </form>
      <Link to="/user">Back</Link>
    </div>
  );
}

export default ManageUser;
