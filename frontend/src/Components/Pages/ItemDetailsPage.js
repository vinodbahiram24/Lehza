import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../Footer";
import SectionCarousel from "../HomeSectionCarousel/SectionCarousel";
import Navbar from "../Navbar";
import axios from "axios";

export default function ItemDetailsPage(props) {
  const {prodId} = useParams();
  const [itemQty, setItemQty] = useState(0);
  const [relatedCouroselData, setRelatedCouroselData] = useState([]);
  const [totalCartAmt, setTotalCartAmount] = useState(0);
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    const fetchData= async() =>{
      try {
        const fetchedProduct = await axios.get(`http://localhost:8080/products/getProduct/${prodId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
        setProduct(fetchedProduct.data);
        setTotalCartAmount(fetchedProduct.data.price);
        const fetchedData = await axios.get('http://localhost:8080/products/getAllProducts/sarees',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
        setRelatedCouroselData(fetchedData.data);
      } catch (error) {
        if(error.response.status === 401)
          {
            navigate("/notAuthorized");
          }
          else{
            console.log("error in ItemDetailsPage: ", error);
          }
      }

    }
    fetchData();
  },[prodId,navigate])

  console.log(totalCartAmt);

  const buy = async ()=>{
    const cartDto = {
      product: { prodId: prodId }, 
      quantity: 1
    };

    try {
      const response = await axios.post(`http://localhost:8080/cart/addCart`, cartDto,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
      if (response.status === 200 || response.status === 201) {
        setItemQty(1); 
        navigate("/checkout",{state: {totalCartAmt}});

      } else {
        console.error('Failed to add item to cart:', response.data);
      }
    }
    catch (error) {
      console.log("Error in cart..!", error);
    }
  }

  const addToCart = async ()=>{
    
    const newQty = itemQty+1;
    const cartDto = {
      product: { prodId: prodId }, 
      quantity: newQty
    };
    try {
      const response = await axios.post(`http://localhost:8080/cart/addCart`, cartDto,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

      if (response.status === 200 || response.status === 201) {
        setItemQty(newQty); 
        window.alert("Added to Cart!");
        
      } else {
        console.error('Failed to add item to cart:', response.data);
      }
    }
    catch (error) {
      console.log("Error in cart..!", error);
    }
  }

  return (
    <>
    <div><Navbar toggleMode={props.toggleMode} mode={props.mode} /></div>
      <div className="row">
        <div
          className="col-md-5 px-5 py-5"
          style={{ border: 1, borderColor: "black" }}
        >
          <img
            className="img-fluid"
            src={product.image}
            alt="N/A"
            style={{
              boxShadow: "5px 5px 10px 4px rgba(0, 0, 0, 0.5)",
              borderRadius:40,
              animation: "ease-in-out",
            }}
          />
        </div>
        <div
          className="col-md-7 px-5 py-5"
          style={{ border: 1, borderColor: "black" }}
        >
          <div className="conatiner">
            <h3 style={{color:'gray',fontWeight:'bold',textDecoration:'underline'}}>brand : {product.brand}</h3>
            <h5>
            {product.title}
            </h5>
          </div>
          <div className="container" style={{height:'20rem'}}>
            {/* description to add */ product.description}
          </div>
          <div className="conatiner pt-5">
            <h5>
              <b>₹ {product.price}</b>
            </h5>
          </div>
          <div className="py-3">
            <button type="button" className="buyBtn btn btn-success" onClick={buy}>
              <strong>Buy</strong>
            </button>
            <button type="button" className="addCartBtn btn btn-warning" onClick={addToCart}>
              <strong>Add to Cart</strong>
            </button>
          </div>  
        </div>
      </div>
      <div>
        <h3 className="text-center py-5">
          <b>—— RELATED ITEMS ——</b>
        </h3>
        <SectionCarousel data={relatedCouroselData}/>
      </div>
      <br/>
      <Footer/>
    </>
  );
}
