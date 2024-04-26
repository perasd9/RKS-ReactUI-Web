import axios from "axios";

export async function GetAllEventsLoader() {
  const events = (await axios.get("http://localhost:5000/dogadjaj")).data;
  const types = (await axios.get("http://localhost:5000/tipKarte")).data;
  return { events, types };
}
