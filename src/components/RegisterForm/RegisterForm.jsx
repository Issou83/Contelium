import { useState } from "react";
import "./index.css";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.message) {
        console.log("User registered:", data.message);
      }
    } catch (error) {
      console.error("There was an error registering the user", error);
    }
  };

  return (
    <div className="registerMain">
      <h1 className="titleSplash">
        <span data-letter="C">C</span>
        <span data-letter="O">O</span>
        <span data-letter="N">N</span>
        <span data-letter="S">S</span>
        <span data-letter="T">T</span>
        <span data-letter="E">E</span>
        <span data-letter="L">L</span>
        <span data-letter="I">I</span>
        <span data-letter="U">U</span>
        <span data-letter="M">M</span>
      </h1>
      <div className="registerCase">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
        <button className="btnValider" type="submit">
          Valider
        </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
