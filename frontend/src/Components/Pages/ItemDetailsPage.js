import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../Footer";
import { BestSellerCarouselData } from "../Data/BestSellerCarouselData";
import SectionCarousel from "../HomeSectionCarousel/SectionCarousel";
import Navbar from "../Navbar";
import axios from "axios";

export default function ItemDetailsPage(props) {
  const { id, title, price, image, brand, username} = useParams();
  const [itemQty, setItemQty] = useState(0);

  const addToCart = async ()=>{
    const newQty = itemQty+1;
    const cartDto = {
      product: { prodId: id },  // Assuming 'id' is the field in ProductsDto
      quantity: newQty
  };
    try {
      const response = await axios.post(`http://localhost:8080/cart/addCart/${username}`, cartDto);

      if (response.status === 200 || response.status === 201) {
        setItemQty(newQty); // Update state after successful API call
        console.log('Item added to cart:', response.data);
      } else {
        console.error('Failed to add item to cart:', response.data);
      }
    }
    catch (error) {
      console.log("Failed add to cart..!", error);
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
            src={decodeURIComponent(image)}
            alt="N/A"
            style={{
              boxShadow: "5px 5px 10px 4px rgba(0, 0, 0, 0.5)",
              animation: "ease-in-out",
            }}
          />
        </div>
        <div
          className="col-md-7 px-5 py-5"
          style={{ border: 1, borderColor: "black" }}
        >
          <div className="conatiner">
            <h3 style={{color:'gray',fontWeight:'bold',textDecoration:'underline'}}>brand : {brand}</h3>
            <h5>
              <b>{title}</b>
            </h5>
          </div>
          <div className="container" style={{height:'20rem'}}>
            {/* description to add */}
          </div>
          <div className="conatiner pt-5">
            <h5>
              <b>₹ {price}</b>
            </h5>
          </div>
          <div className="py-3" style={{display: 'flex'}}>
            <button type="button" className="btn btn-warning pl-5">
              <strong>Buy</strong>
            </button>
            &nbsp;
            <button type="button" className="btn btn-warning" onClick={addToCart} style={{marginLeft:'1rem', width:'150px'}}>
              <strong>Add to Cart</strong>
            </button>
          </div>  
        </div>
      </div>
      <div className="py-5">
        <h3 className="text-center py-3">
          <b>—— RELATED ITEMS ——</b>
        </h3>
        <SectionCarousel data={BestSellerCarouselData}/>
      </div>
      <br/>
      <Footer/>
    </>
  );
}
