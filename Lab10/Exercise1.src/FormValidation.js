import React, { useState } from "react";

function FormValidation() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let err = {};

    if (!form.name) err.name = "Name is required";
    if (!form.email) {
      err.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      err.email = "Invalid email";
    }
    if (!form.password) err.password = "Password is required";

    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      alert("Form Submitted Successfully!");
      setForm({ name: "", email: "", password: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
      <p>{errors.name}</p>

      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
      <p>{errors.email}</p>

      <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password" />
      <p>{errors.password}</p>

      <button type="submit">Submit</button>
    </form>
  );
}

export default FormValidation;