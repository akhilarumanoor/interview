import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteUser } from "../../store/user";

function List(props) {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  function deleteUserFn(index, username) {
    var r = window.confirm(`Confirm to delete ${username}`);
    if (r === true) {
      dispatch(deleteUser(index));
    }
  }
  return (
    <div>
      <Link to="/user/add">Add new User</Link>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th colSpan="2">Action</th>
          </tr>
        </thead>
        {userData.length > 0 ? (
          <tbody>
            {userData.map((u, index) => (
              <tr key={index}>
                <td>{`${u.firstName} ${u.lastName}`}</td>
                <td>{`${u.emailName}`}</td>
                <td>{u.active === "1" ? "Active" : "Inactive"}</td>
                <td>
                  <Link to={`/user/edit/${index}`}>Edit</Link>
                </td>
                <td>
                  <button
                    onClick={(e) =>
                      deleteUserFn(index, `${u.firstName} ${u.lastName}`)
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td style={{ textAlign: "center" }} colSpan="5"></td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }} colSpan="5"></td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }} colSpan="5"></td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }} colSpan="5">
                No Data
              </td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
}

export default List;
