import React, { useState } from "react";
import { useNavigate } from "react-router";

// import Auth from "../utils/auth";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  ///////////////////////////////////////////////////////////
  //                                                       //
  //    These methods will update the state properties.    //
  //                                                       //
  ///////////////////////////////////////////////////////////
  function updateForm(value) {
    return setForm(prev => {
      return { ...prev, ...value };
    });
  }

  const handleFormSubmit = async event => {
    event.preventDefault();
    const verifyPassword = { ...form };

    await fetch("http://localhost:5001/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(verifyPassword),
    }).catch(error => {
      window.alert(error);
      return;
    });

    setForm({
      email: "",
      password: "",
    });

    console.log(verifyPassword);
    navigate("/profile");
  };

  return (
    <div>
      <h3>Login</h3>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            className="form-control"
            id="email"
            value={form.email}
            onChange={e => updateForm({ email: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="text"
            className="form-control"
            id="password"
            value={form.password}
            onChange={e => updateForm({ password: e.target.value })}
          />
        </div>
        <div className="form-group">
          <input type="submit" value="Login" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
}
