import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Create() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    city: "",
    about: "",
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

  //    This function will handle the submission.

  async function onSubmit(e) {
    e.preventDefault();
    const newPerson = { ...form };

    await fetch("http://localhost:5001/user/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPerson),
    }).catch(error => {
      window.alert(error);
      return;
    });

    setForm({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      age: "",
      gender: "",
      city: "",
      about: "",
    });
    navigate("/profile");
  }

  //    This following section will display the form that takes the input from the user.

  return (
    <div>
      <h3>Create New User</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            value={form.firstName}
            onChange={e => updateForm({ firstName: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            value={form.lastName}
            onChange={e => updateForm({ lastName: e.target.value })}
          />
        </div>
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
          <label htmlFor="age">Age</label>
          <input
            type="text"
            className="form-control"
            id="age"
            value={form.age}
            onChange={e => updateForm({ age: e.target.value })}
          />
        </div>
        <div className="form-group">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="genderOptions"
              id="genderMale"
              value="Male"
              checked={form.gender === "Male"}
              onChange={e => updateForm({ gender: e.target.value })}
            />
            <label htmlFor="genderMale" className="form-check-label">
              Male
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="genderOptions"
              id="genderFemale"
              value="Female"
              checked={form.gender === "Female"}
              onChange={e => updateForm({ gender: e.target.value })}
            />
            <label htmlFor="genderFemale" className="form-check-label">
              Female
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="genderOptions"
              id="genderOther"
              value="Other"
              checked={form.gender === "Other"}
              onChange={e => updateForm({ gender: e.target.value })}
            />
            <label htmlFor="genderOther" className="form-check-label">
              Other
            </label>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            className="form-control"
            id="city"
            value={form.city}
            onChange={e => updateForm({ city: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="about">About Me</label>
          <input
            type="text"
            className="form-control"
            id="about"
            value={form.about}
            onChange={e => updateForm({ about: e.target.value })}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create Profile"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
