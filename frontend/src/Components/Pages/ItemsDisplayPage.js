import React, { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import Footer from "../Footer";
import axios from "axios";
import Navbar from "../Navbar";

export default function ItemsDisplayPage(props) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/products/${props.apiPath}`)
        console.log(response.data);
      setProducts(response.data);
      } catch (error) {
        console.error('error in fetching data: ', error)
      }
      
    };
    fetchData();
  },[props.apiPath]);

  return (
    <>
    <div><Navbar toggleMode={props.toggleMode} mode={props.mode} /></div>
      <header>
        <img className="img-fluid" src={props.coverImg} alt="N/A.." />
      </header>

      <div className="row">
        {/* Filter Section */}
        <div className="col-md-3 px-5 py-5">
          <h4>Color</h4>
          <hr />
          <p>Filters upcoming..</p>
        </div>
        {/* Item Display Section */}
        <div className="col-md-8 py-5">
          <div className="row">
            {products.map((element) => {
              return (
                <div className="col-md-4" key={element.prodId}>
                  <ItemCard
                    prodId={element.prodId}
                    brand={element.brand}
                    title={element.title}
                    image={element.image}
                    price={element.price}
                    mode={props.mode}
                  />
                  <br/>
                </div>
              );
            })}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
