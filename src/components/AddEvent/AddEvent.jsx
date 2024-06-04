import React, { useRef, useState } from "react";
import "./addEvent.scss";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { useCookies } from "react-cookie";
import Charts from "./Charts/Charts";

function AddEvent() {
  const [cookie, setCookie] = useCookies(["login"]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const btnDodaj = useRef(null);
  const [formValues, setFormValues] = useState({
    naziv: "",
    adminId: 0,
    tipDogadjaja: "",
    cena: 0,
    putanjaSlike: null,
  });

  const handleSaveEvent = async (e) => {
    e.preventDefault();

    if (cookie.user !== undefined) {
      alert("User cannot create events!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("putanjaSlike", formValues.putanjaSlike);
      formData.append("naziv", formValues.naziv);
      if (cookie.admin == undefined)
        formData.append("adminId", formValues.adminId);
      else formData.append("adminId", cookie.admin.adminId);

      formData.append("cena", formValues.cena);
      formData.append("tipDogadjaja", formValues.tipDogadjaja);

      const addedEventResponse = await axios.post(
        "http://localhost:5000/dogadjaj",
        formData,
        {
          withCredentials: true,
        }
      );

      if (addedEventResponse.data) {
        alert("uspesno ste dodlai ticket");
      } else {
        alert("neuspesno");
      }
    } catch (error) {
      if (
        error.response.status == 401 &&
        error.response.data.message == "Not authenticated"
      ) {
        alert("You are not logged in!");
      } else if (
        error.response.status == 401 &&
        error.response.data.message == "Unauthorized"
      ) {
        alert("You don't have privilege to create events!");
      }
    }
  };

  return (
    <div style={{ overflow: "hidden" }}>
      <Navbar />
      <div className="dodaj-dogadjaj-form">
        <h1>New event</h1>
        <form action="">
          <div className="form-group">
            <div className="form-fields">
              <label htmlFor="naziv">Name</label>
              <input
                type="text"
                name="naziv"
                id=""
                value={formValues.naziv}
                onChange={(e) =>
                  setFormValues({ ...formValues, naziv: e.target.value })
                }
              />
              <p>{formErrors.naziv}</p>
            </div>
            <div className="form-fields">
              <label htmlFor="tipDogadjaja">Event type</label>
              <input
                type="text"
                name="tipDogadjaja"
                id=""
                value={formValues.tipDogadjaja}
                onChange={(e) =>
                  setFormValues({ ...formValues, tipDogadjaja: e.target.value })
                }
              />
              <p>{formErrors.tipDogadjaja}</p>
            </div>
          </div>
          <div className="form-fields">
            <label htmlFor="cena" style={{ fontSize: "1.5rem" }}>
              Price
            </label>
            <input
              type="number"
              name="cena"
              id=""
              value={formValues.cena}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  cena: e.target.value,
                })
              }
            />
            <p>{formErrors.cena}</p>
          </div>

          <div className="form-fields">
            <label htmlFor="slika" style={{ fontSize: "1.5rem" }}>
              Image
            </label>
            <input
              type="file"
              name="slika"
              id=""
              onChange={(event) => {
                setFormValues({
                  ...formValues,
                  putanjaSlike: event.target.files[0],
                });
              }}
            />
            <p>{formErrors.inventarskiBroj}</p>
          </div>

          <div className="sacuvaj-dogadjaj-btn">
            <button className="button" onClick={handleSaveEvent} ref={btnDodaj}>
              Save
            </button>
          </div>
        </form>
      </div>
      <div className="charts">
        <Charts />
      </div>
    </div>
  );
}

export default AddEvent;
