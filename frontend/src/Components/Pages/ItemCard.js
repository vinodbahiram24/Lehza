import React from "react";
import "../../App.css";

export default function ItemCard(props) {
  const username = localStorage.getItem("username");
  return (
    <div>
      <div
        className="card"
        style={{backgroundColor: "#656a76",border:'none' }}
      >
        <img src={props.image} className="card-img-top" alt="..." />
        <div className="card-body">
          <strong><a href={`/itemDetail/${encodeURIComponent(username)}/${props.prodId}`}>{props.title}</a></strong>
          <hr/>
          <strong style={{color:"#cdac00"}}>₹ {props.price}</strong>
        </div>
      </div>
    </div>
  );
}
