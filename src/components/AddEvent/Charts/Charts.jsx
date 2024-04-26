import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";
import axios from "axios";

function Charts() {
  const dataArray = [["Event", "Price"]];
  const [events, setEvents] = useState([]);
  useEffect(() => {
    (async () => {
      const events = (await axios.get("http://localhost:5000/dogadjaj")).data;
      setEvents(events);
    })();
  }, []);

  events.forEach((item, index) => {
    dataArray.push([item.naziv, item.cena]);
  });

  return (
    <Chart
      chartType="PieChart"
      width={"80%"}
      height={"500px"}
      style={{ margin: "2rem auto" }}
      data={dataArray}
      options={{ title: "Price of all events" }}
    />
  );
}

export default Charts;
