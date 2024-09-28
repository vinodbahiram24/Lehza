import React from "react";
import "../../App.css";

export default function ItemCard(props) {
  return (
    <div>
      <div
        className="card displayPage"
      >
        <img src={props.image} className="card-img-top displayPage" alt="..."/>
        <div className="card-body" style={{height:'10rem'}}>
          <strong><a href={`/itemDetail/${props.prodId}`}>{props.title}</a></strong>
          <hr/>
          <strong style={{color:"#cdac00"}}>₹ {props.price}</strong>
        </div>
      </div>
    </div>
  );
}
