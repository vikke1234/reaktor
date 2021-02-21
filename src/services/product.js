import axios from "axios";

const baseurl = "http://localhost/api";

async function getProducts(category) {
  const url = `${baseurl}/${category}`;
  const req = await axios.get(url);
  return req;
}

export default getProducts;
