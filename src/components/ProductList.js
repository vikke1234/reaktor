/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
// import Product from "./Product";
import getProducts from "../services/product";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    console.log("getting data");
    getProducts("facemasks").then(res => console.log("data:", res)).catch(err => {
      console.log("ERROR: ", err);
    });
  }, []);

  console.log(products);
  return (
    <div>
      {products}
    </div>
  );
}

export default ProductList;
