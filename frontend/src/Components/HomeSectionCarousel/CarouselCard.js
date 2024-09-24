import React from "react";
import "../css/homePage.css";

export default function CarouselCard(props) {
  return (
    <div>
      <div className="card home">
        <img src={props.item.image} className="card-img-top home" alt="..."/>
        <div className="card-body" style={{height:'9rem'}}>
          <h6 className="card-title">
          <a href={`/itemDetail/${props.item.prodId}`}>{props.item.title}</a> 
          </h6>
          <hr/>
          <h6>₹ {props.item.price}</h6>
        </div>
      </div>
    </div>
  );
}
