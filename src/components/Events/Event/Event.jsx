import React, { useState } from "react";
import "./event.css";
import CustomModal from "./CustomModal/CustomModal";

function Event(props) {
  const [displayModal, setDisplayModal] = useState("none");

  const handleBuyClick = () => {
    if (displayModal === "none") setDisplayModal("block");
    else setDisplayModal("none");
  };
  return (
    <div className="event-card">
      <div className="event-details">
        <div>
          <div className="event-image">
            <img src={props.event.putanjaSlike} alt="nema" />
          </div>
          <h3>{props.event.naziv}</h3>
        </div>
        <div>
          <h4>{props.event.tipDogadjaja}</h4>
        </div>
        <div>
          <h3>{props.event.Admin.email}</h3>
        </div>
        <div className="button black" onClick={handleBuyClick}>
          Buy Tickets
        </div>
      </div>
      <CustomModal
        displayModal={displayModal}
        setDisplayModal={setDisplayModal}
        event={props.event}
        ticketTypes={props.ticketTypes}
        currencies={props.currencies}
      />
    </div>
  );
}

export default Event;
