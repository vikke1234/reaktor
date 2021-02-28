import axios from "axios";

const baseurl = "http://localhost:3001/api";

async function getAvailability(manufacturer) {
  const url = `${baseurl}/availability/${manufacturer}`;
  const res = await axios.get(url, {
    "Content-Type": "application/xml; charset=utf-8",
  });
  return res.data;
}

export default getAvailability;
