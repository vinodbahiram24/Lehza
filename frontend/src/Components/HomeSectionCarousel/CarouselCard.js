import React from "react";
import "../css/homePage.css";

export default function CarouselCard({product}) {
  return (
    <div>
      <div className="card" style={{width: '15rem', backgroundColor:'#9a8100'}}>
        <img src={product.image} className="card-img-top" alt="..." />
        
        <div className="card-body" style={{height:'9rem'}}>
          <h6 className="card-title">
           <a href={`/itemDetail/${localStorage.getItem('username')}/${product.prodId}/${product.title}/${product.price}/${encodeURIComponent(product.image)}/${product.brand}`}>{product.title}</a> 
          </h6>
          <hr/>
          <h6>₹ {product.price}</h6>
        </div>
      </div>
    </div>
  );
}
