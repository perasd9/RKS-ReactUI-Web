import React, { useRef, useState } from "react";
import "./customModal.scss";
import axios from "axios";
import { useCookies } from "react-cookie";

function CustomModal(props) {
  const [cookie, setCookie] = useCookies(["login"]);
  const cena = useRef(props.event.cena);
  const [formValues, setFormValues] = useState({
    cena: props.event.cena,
    dogadjajId: props.event.dogadjajId,
    tipKarteId: props.ticketTypes[0].tipKarteId,
    brojKomada: 0,
    valuta: "RSD",
  });

  const handleBuy = async (e) => {
    e.preventDefault();
    if (cookie.admin !== undefined) {
      alert("Admin cannot buy tickets!");
      return;
    }

    axios.defaults.withCredentials = true;
    try {
      const addedTicketResponse = await axios.post(
        "http://localhost:5000/karta",
        {
          brojKomada: formValues.brojKomada,
          opis: "",
          dogadjajId: props.event.dogadjajId,
          tipKarteId: formValues.tipKarteId,
          korisnikId: cookie.user?.korisnikId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (addedTicketResponse.data) {
        alert("uspesno ste dodali ticket");
      } else {
        alert("neuspesno");
      }
    } catch (error) {
      console.log(error.response.data);
      if (
        error.response.status == 401 &&
        error.response.data.message == "Not authenticated"
      ) {
        alert("You are not logged in!");
      } else if (
        error.response.status == 401 &&
        error.response.data.message == "Unauthorized"
      ) {
        alert("You don't have privilege to buy tickets!");
      }
    }
  };
  return (
    <div className="custom-modal" style={{ display: props.displayModal }}>
      <button
        className="close-modal"
        onClick={() => {
          props.setDisplayModal("none");
        }}
      >
        X
      </button>
      <form action="" id="creating-form">
        <div>
          <label>Event: *</label>
          <input
            id="dogadjaj"
            type="text"
            name="dogadjaj"
            style={{
              backgroundColor: "#fff",
              opacity: 0.7,
              color: "#000",
              border: "none",
            }}
            disabled
            value={props.event.naziv}
          />
        </div>
        <div>
          <label>Number of pieces: *</label>
          <input
            id="brojKomada"
            type="number"
            name="brojKomada"
            value={formValues.brojKomada}
            onChange={async (e) => {
              setFormValues({ ...formValues, brojKomada: e.target.value });
            }}
          />
        </div>
        <div>
          <label>Ticket type: *</label>
          <select
            id="tipKarte"
            type="option"
            name="tipKarte"
            defaultValue={formValues.tipKarteId}
            onChange={(e) =>
              setFormValues({
                ...formValues,
                tipKarteId: props.ticketTypes.find(
                  (type) => type.tipKarteId == e.target.value
                ),
              })
            }
          >
            {props.ticketTypes.map((ticketType, index) => {
              return (
                <option
                  value={ticketType.tipKarteId}
                  key={ticketType.tipKarteId || index}
                >
                  {ticketType.naziv}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <label>Currency: *</label>
          <select
            id="valuta"
            type="option"
            name="valuta"
            defaultValue={formValues.valuta}
            onChange={(e) => {
              cena.current.value = (
                (props.event.cena / 107) *
                parseFloat(e.target.value)
              ).toFixed(2);
            }}
          >
            <option value={107}>RSD</option>
            {Object.keys(props.currencies).map((value, index) => {
              return (
                <option value={props.currencies[value]} key={index}>
                  {value}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <label>Price: *</label>
          <input
            ref={cena}
            id="snaga"
            type="text"
            name="snaga"
            disabled
            defaultValue={props.event.cena}
            value={cena.current.value}
            style={{
              backgroundColor: "#fff",
              opacity: 0.7,
              color: "#000",
              border: "none",
            }}
          />
        </div>
        <div>
          <button className="button" onClick={handleBuy}>
            Buy
          </button>
        </div>
      </form>
    </div>
  );
}

export default CustomModal;
