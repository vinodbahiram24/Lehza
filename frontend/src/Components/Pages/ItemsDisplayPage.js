import React, { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import Footer from "../Footer";
import axios from "axios";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";
import "../../App.css";

export default function ItemsDisplayPage(props) {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/products/${props.apiPath}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
      setProducts(response.data);
      } catch (error) {
        if(error.response.status === 401)
          {
            navigate("/notAuthorized");
          }
          else{
            console.log("error in ItemsDisplayPage: ", error);
          }
      }
      
    };
    fetchData();
  },[props.apiPath,navigate]);

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
