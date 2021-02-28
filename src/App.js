import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import "./App.css";
import ProductList from "./components/ProductList";
import "bootstrap/dist/css/bootstrap.min.css";
import getProducts from "./services/product";
import getAvailability from "./services/availability";

function App() {
  const [products, setProducts] = useState([]);
  const [facemasks, setFacemasks] = useState([]);
  const [beanies, setBeanies] = useState([]);
  const [gloves, setGloves] = useState([]);
  // const [shownProducts, setShownProducts] = useState([]);

  // const [filters, setFilters] = useState(new Set());
  const columns = React.useMemo(() => [
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Price",
      accessor: "price",
    },

    {
      Header: "Category",
      accessor: "type",
    },
    {
      Header: "Available",
      accessor: "available",
    },
  ]);
  useEffect(async () => {
    const prods = await Promise.all([
      getProducts("facemasks"),
      getProducts("gloves"),
      getProducts("beanies"),
    ]);
    setFacemasks(prods[0]);
    setGloves(prods[1]);
    setBeanies(prods[2]);
    setProducts([...prods[0], ...prods[1], ...prods[2]]);
    /* get a list of manufacturers to get the data for, also sets */
    console.log(facemasks, gloves, beanies);
  }, []);

  useEffect(async () => {
    const manufacturers = new Set();
    if (!products.length) {
      return;
    }
    products.reduce(product => manufacturers.add(product.manufacturer));
    const promises = [];
    manufacturers.forEach(m => promises.push(getAvailability(m)));
    const availData = await Promise.all(promises);
    console.log(availData);
  }, [products]);

  return (
    <div className="App">
      <h1 style={{ textAlign: "center" }}>Warehouse listing</h1>
      <div className="container">
        <div className="left">
          <Form>
            <Form.Group controlId="formSearch">
              <Form.Control
                type="text"
                placeholder="Search"
                style={{ marginRight: "20px" }}
              />
              <Form.Check
                defaultChecked="true"
                onChange={() => {}}
                type="checkbox"
                label="Facemasks"
              />
              <Form.Check
                defaultChecked="true"
                onChange={() => {}}
                type="checkbox"
                label="Beanies"
              />
              <Form.Check
                defaultChecked="true"
                onChange={() => {}}
                type="checkbox"
                label="Gloves"
              />
            </Form.Group>
          </Form>
        </div>
        <div className="right">
          <ProductList columns={columns} data={products} />
        </div>
      </div>
    </div>
  );
}

export default App;
