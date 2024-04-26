import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Event from "./Event/Event";
import "./events.css";
import axios from "axios";

function Events() {
  const { events, types } = useLoaderData();
  const [ticketTypes, setTicketTypes] = useState(types);
  const [currencies, setCurrencies] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [eventsView, setEventsView] = useState(events);
  const [sortedArray, setSortedArray] = useState(false);

  useEffect(() => {
    (async () => {
      setCurrencies(
        (
          await axios.get(
            "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_MJZEd8uE5tgpc0wqca6LnC3cCoCasKrUEsKMCZzt"
          )
        ).data.data
      );
    })();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();

    setEventsView(
      events.filter((event) =>
        event.tipDogadjaja.toUpperCase().includes(searchText.toUpperCase())
      )
    );
  };
  const handleSort = async (e) => {
    e.preventDefault();
    if (sortedArray) {
      setEventsView(events);
    } else {
      const sortingArray = [...events];
      sortingArray.sort((a, b) => a.naziv.localeCompare(b.naziv));
      setEventsView(sortingArray);
    }
    setSortedArray(!sortedArray);
  };
  return (
    <div>
      <Navbar />
      <div className="search-bar">
        <input
          type="text"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            if (searchText.trim(" ") == "") {
              setEventsView(events);
            }
          }}
        />
        <button className="button searchBtn" onClick={handleSearch}>
          Search
        </button>
        <button className="button searchBtn" onClick={handleSort}>
          Sort per name
        </button>
      </div>
      <div className="events">
        {eventsView.map((event, index) => {
          return (
            <Event
              event={event}
              key={index}
              ticketTypes={ticketTypes}
              currencies={currencies}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Events;
