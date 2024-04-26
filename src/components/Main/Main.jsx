import React from "react";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import "./main.css";

function Main() {
  const navigate = useNavigate();
  return (
    <div>
      <Navbar />
      <div className="main part-main">
        <div className="text">
          <h1>Welcome to our online selling tickets platform!</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
            dolore corrupti ullam a, officia pariatur placeat doloribus expedita
            explicabo recusandae deleniti dolor mollitia non, veniam accusamus
            iure? Dolor nostrum exercitationem esse consequuntur beatae, nobis
            omnis amet, doloremque asperiores dolores corrupti illo quas
            tempora, at consectetur. Dolorem ipsum odio aliquam dicta soluta
            voluptas necessitatibus ab, repellendus non molestias ducimus
            veritatis? Dicta temporibus dolor quasi nihil non a reiciendis,
            minima aut veniam aperiam aspernatur culpa sunt repudiandae quidem
            autem. Fugit enim assumenda placeat voluptatem. Aut magni ex enim.
            Laudantium natus at facilis labore, quod odio porro id perspiciatis
            eaque ipsam, saepe nam.
          </p>
          <div>
            <button
              className="button"
              onClick={() => {
                navigate("/events");
              }}
            >
              See Events!
            </button>

            <button
              className="button"
              onClick={() => {
                navigate("/addevent");
              }}
            >
              Add Event!
            </button>
          </div>
        </div>
        <div className="image">
          <img src="../src/assets/hero-main.jpg"></img>
        </div>
      </div>
    </div>
  );
}

export default Main;
