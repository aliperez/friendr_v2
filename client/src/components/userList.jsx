import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const User = props => (
  <tr>
    <td>{props.user.firstName}</td>
    <td>{props.user.lastName}</td>
    <td>{props.user.age}</td>
    <td>{props.user.gender}</td>
    <td>{props.user.city}</td>
    <td>{props.user.about}</td>
    <td>
      <Link className="btn btn-link" to={`/edit/${props.user._id}`}>
        Edit Profile
      </Link>{" "}
      |
      <button
        className="btn btn-link"
        onClick={() => {
          props.deleteUser(props.user._id);
        }}
      >
        Delete Profile
      </button>
    </td>
  </tr>
);

export default function UserList() {
  const [users, setUser] = useState([]);
  //
  //
  //    This method fetches the users from the database.
  //
  useEffect(() => {
    async function getUser() {
      const response = await fetch(`http://localhost:5001/user/`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const user = await response.json();
      setUser(user);
    }

    getUser();

    return;
  }, [users.length]);

  //
  //
  //    This method will delete a user
  //
  async function deleteUser(id) {
    await fetch(`http://localhost:5001/${id}`, {
      method: "DELETE",
    });

    const newUsers = users.filter(el => el.id !== id);
    setUser(newUsers);
  }
  //
  //
  //    This method will map out the users on the table
  //
  function userList() {
    return users.map(user => {
      return (
        <User
          user={user}
          deleteUser={() => deleteUser(user._id)}
          key={user._id}
        />
      );
    });
  }
  //
  //
  //    This following section will display the table with the users of individuals.
  //
  return (
    <div>
      <h3>This will be the Profile Page - after you sign in </h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>City</th>
            <th>About Me</th>
          </tr>
        </thead>
        <tbody>{userList()}</tbody>
      </table>
    </div>
  );
}
