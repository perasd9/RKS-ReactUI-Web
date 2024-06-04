import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./signin.scss";
import { useCookies } from "react-cookie";

const Signin = () => {
  const [cookie, setCookie] = useCookies(["login"]);
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    ime: "",
    prezime: "",
    email: "",
    lozinka: "",
    repeatLozinka: "",
  });
  // const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });

    // const errors = validate({ ...formValues, [name]: value });
    // setFormErrors({ ...formErrors, [name]: errors[name] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cookie.admin !== undefined || cookie.user !== undefined) {
      alert("Ne mozete se registrovati jer ste vec prijavljeni!");
      return;
    }
    if (formValues.lozinka !== formValues.repeatLozinka) {
      alert("Password and repeat password have to be same!");
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/korisnik",
        {
          ime: formValues.ime,
          prezime: formValues.prezime,
          email: formValues.email,
          lozinka: formValues.lozinka,
        },
        {
          headers: {
            "Contet-Type": "application/json",
          },
        }
      );

      if (response.data.message !== "User with same email is registered!") {
        setFormValues({
          ime: "",
          prezime: "",
          email: "",
          lozinka: "",
          repeatLozinka: "",
        });
        setCookie("user", response.data, {
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
          sameSite: "none",
          secure: true,
        });
        alert("Uspesno ste se registrovali");
        navigate("/");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error during signin:", error);
      alert("Neuspesno logovanje, greska!");
    }
  };

  //   const validate = (values) => {
  //     const errors = {};
  //     const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

  //     if (!values.email) {
  //       errors.email = "Email is required!";
  //     } else if (!regex.test(values.email)) {
  //       errors.email = "This is not a valid email format!";
  //     } else if (values.email.length > 50) {
  //       errors.email = "Email must not exceed 50 characters";
  //     }

  //     if (!values.password) {
  //       errors.password = "Password is required!";
  //     } else if (values.password.length < 4) {
  //       errors.password = "Password must be more than 4 characters";
  //     }

  //     if (!values.repeat_password) {
  //       errors.repeat_password = "Repeat password";
  //     } else if (values.repeat_password !== values.password) {
  //       errors.repeat_password = "Passwords do not match";
  //     }
  //     return errors;
  //   };

  return (
    <div className="container">
      <div className="signup">
        <div className="box">
          <h1>Create your account</h1>
          <p>
            Already have an account?{" "}
            <Link to="/login">
              <span>Login in!</span>
            </Link>
          </p>
        </div>

        <form id="registrationForm" className="form-signup">
          <div className="input-group center">
            <label htmlFor="ime">Name: *</label>
            <input
              id="ime"
              type="text"
              name="ime"
              placeholder="Name"
              value={formValues.ime}
              onChange={handleChange}
            />
          </div>
          {/* <p>{formErrors.ime}</p> */}
          <div className="input-group center">
            <label htmlFor="prezime">Surname: *</label>
            <input
              id="prezime"
              type="text"
              name="prezime"
              value={formValues.prezime}
              placeholder="Surname"
              onChange={handleChange}
            />
          </div>
          {/* <p>{formErrors.prezime}</p> */}
          <div className="input-group center">
            <label htmlFor="email">Email: *</label>
            <input
              id="email"
              type="text"
              name="email"
              placeholder="name.surname@mail.com"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
          {/* <p>{formErrors.email}</p> */}
          <div className="input-group center">
            <label htmlFor="lozinka">Password: *</label>
            <input
              id="lozinka"
              type="password"
              name="lozinka"
              placeholder="*********"
              value={formValues.lozinka}
              onChange={handleChange}
            />
          </div>
          {/* <p>{formErrors.lozinka}</p> */}
          <div className="input-group center">
            <label htmlFor="repeatLozinka">Repeat password: *</label>
            <input
              id="repeatLozinka"
              type="password"
              name="repeatLozinka"
              placeholder="*********"
              value={formValues.repeatLozinka}
              onChange={handleChange}
            />
          </div>
          {/* <p>{formErrors.repeatLozinka}</p> */}

          <div>
            <button className="button" onClick={handleSubmit}>
              Sign up
            </button>
          </div>

          {registrationSuccess && (
            <div className="success-message">
              <p>Signed in successfully!</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Signin;
