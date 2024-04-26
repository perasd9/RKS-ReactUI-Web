import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

function LoginForm() {
  const [cookie, setCookie] = useCookies(["login"]);
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState("");

  const handleLogInClick = async () => {
    const { email, password } = formValues;

    if (cookie.admin !== undefined || cookie.user !== undefined) {
      alert("Vec ste ulogovani");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/admin-login",
        {
          email: email,
          lozinka: password,
        },
        {
          headers: {
            "Contet-Type": "application/json",
          },
        }
      );

      if (response.data !== null) {
        const admin = response.data;
        setCookie("admin", admin, {
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
          sameSite: "none",
          secure: true,
        });

        navigate("/");
      } else {
        const response = await axios.post(
          "http://localhost:5000/korisnik-login",
          {
            email: email,
            lozinka: password,
          },
          {
            headers: {
              "Contet-Type": "application/json",
            },
          }
        );

        if (response.data !== null) {
          const korisnik = response.data;
          setCookie("user", korisnik, {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            sameSite: "none",
            secure: true,
          });

          navigate("/");
        } else {
          alert("Neuspesno logovanje");
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Neuspesno logovanje, greska");
    }
  };

  return (
    <div className="right">
      <h1>Welcome back!</h1>
      <h2>
        Log <span className="yellow">in!</span>
      </h2>
      <h5>
        Don't have an account?{" "}
        <span
          className="yellow"
          onClick={() => {
            navigate("/register");
          }}
        >
          Sign up
        </span>
      </h5>

      <div className="form">
        <div className="input-group">
          <label htmlFor="email">Email: *</label>
          <input
            id="email"
            type="text"
            name="email"
            placeholder="name@example.com"
            value={formValues.email}
            onChange={(e) =>
              setFormValues({ ...formValues, email: e.target.value })
            }
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password: *</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="*********"
            value={formValues.password}
            onChange={(e) =>
              setFormValues({ ...formValues, password: e.target.value })
            }
          />
        </div>
      </div>
      <div>
        <button className="button" onClick={handleLogInClick}>
          Log in
        </button>
      </div>

      <h6>By submitting this form you agree to our Privacy Policy</h6>
    </div>
  );
}

export default LoginForm;
