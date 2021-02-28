import axios from "axios";

const baseurl = "http://localhost:3001/api";

async function getProducts(category) {
  const url = `${baseurl}/${category}`;
  const req = await axios.get(url);
  return req.data;
}

export default getProducts;
