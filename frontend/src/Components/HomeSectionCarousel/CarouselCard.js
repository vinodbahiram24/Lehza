import React from "react";
import "../css/homePage.css";

export default function CarouselCard(props) {
  return (
    <div>
      <div className="card" style={{width: '15rem', backgroundColor:'#9a8100'}}>
        <img src={props.item.image} className="card-img-top" alt="..." />
        <div className="card-body" style={{height:'9rem'}}>
          <h6 className="card-title">
          <a href={`/itemDetail/${localStorage.getItem('username')}/${props.item.prodId}`}>{props.item.title}</a> 
          </h6>
          <hr/>
          <h6>₹ {props.item.price}</h6>
        </div>
      </div>
    </div>
  );
}
