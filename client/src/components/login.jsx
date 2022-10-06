import React, { useState } from "react";
import { useNavigate } from "react-router";

import Auth from "../utils/auth";

export default function Create() {
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

  /////////////////////////////////////////////////////
  //                                                 //
  //    This function will handle the submission.    //
  //                                                 //
  /////////////////////////////////////////////////////
  async function onSubmit(e) {
    e.preventDefault();
  }

  return (
    <div>
      <h3>Login</h3>
      <form onSubmit={onSubmit}>
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
