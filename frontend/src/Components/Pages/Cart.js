import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Cart(props) {
  const [cartData, setCartData] = useState([]);
  const [totalCartAmt, setTotalCartAmount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/cart/getAllCart/${localStorage.getItem("username")}`);
        setCartData(response.data);

        // Calculate the total amount
        let total = 0;
        response.data.forEach(item => {total += item.totalAmount;});
        setTotalCartAmount(total);
      } catch (error) {
        console.log("error while fetching cart: ", error);
      }
    };
    fetchCartData();
  },[]);

  const handleDelete = async (prodId) => {
    if (window.confirm("Are you sure you want to remove this item from the cart?")) {
      try {
        await axios.delete(`http://localhost:8080/cart/deleteCart/${localStorage.getItem("username")}/${prodId}`);
        
        // Update cartData and totalCartAmt after deletion
        setCartData((prevData) => prevData.filter((item) => item.product.prodId !== prodId));
        setTotalCartAmount((prevTotal) => prevTotal - cartData.find(item => item.product.prodId === prodId).totalAmount);
      } catch (error) {
        console.log("Error while deleting cart item: ", error);
      }
    }
  };

  const handleUpdate =(quantity,prodId)=>{
    try {
        if(quantity===0)
        {
            handleDelete(prodId);
        }
        else
        {
            axios.put(`http://localhost:8080/cart/updateQty/${localStorage.getItem("username")}/${quantity}/${prodId}`);
            setCartData((prevData)=>prevData.map((item)=> item.product.prodId === prodId ? {...item,quantity} : item));
            if((cartData.find((item)=>item.product.prodId === prodId).quantity > quantity))
            {
              setTotalCartAmount((prevTotal) => prevTotal - cartData.find(item => item.product.prodId === prodId).product.price);
            }
            else
            {
              setTotalCartAmount((prevTotal) => prevTotal + cartData.find(item => item.product.prodId === prodId).product.price);
            }
        }        
    } catch (error) {
        console.log('error while updating qty : ', error);
    }
       
  }

  const cartCheckout=()=>{
      navigate("/Checkout",{ state : {cartData, totalCartAmt}});
  }

  return (
    <>
      {/* navbar */}
      <div>
        <Navbar toggleMode={props.toggleMode} mode={props.mode} />
      </div>
      <div className="container">
        <center><h2 style={{ paddingTop: "3rem" }}>Shopping Cart</h2></center>
      </div>
      <hr />
      {/* body */}
      <div className="row">
        <div className="col-md-9">
          {cartData.map((element) => {
            return (
              <React.Fragment key={element.cartId}>
                <div className="row py-4 px-4">
                  {/* productDetails */}
                  <div className="col-md-4" style={{ height: "9rem", width: "9rem" }}>
                    <img className="img-fluid" src={element.product.image} alt="N/A" />
                  </div>
                  <div className="col-md-8" style={{ height: "9rem" }}>
                    <div>
                      <h5>{element.product.title.slice(0, 50)}...</h5>
                    </div>

                    <div>
                    <i class="bi bi-dash-circle" onClick={()=>handleUpdate(element.quantity-1,element.product.prodId)}></i>
                    <input className="text-center" type="text" min={0} max={10} style={{height:'2rem',width:'2rem', borderRadius:15}} value={element.quantity}></input>
                    <i class="bi bi-plus-circle" onClick={()=>handleUpdate(element.quantity+1,element.product.prodId)}></i>
                    </div>

                    {/* <div>Quantity: {element.quantity}</div> */}
                    <div>₹ {element.product.price}</div>
                  </div>
                  <div className="cartDeleteBtn">
                    <i
                      type="button"
                      className="bi bi-trash3"
                      onClick={() => handleDelete(element.product.prodId)}
                    > remove
                    </i>
                  </div>
                </div>
                <hr />
              </React.Fragment>
            );
          })}
        </div>
        {/* orderDetails */}
        <div className="col-md-3 px-4"><center><h4>Price Details</h4></center>
          <hr/>
          <div className="row">
          <div className="col-md-6 py-1 ">Price</div>
          <div className="col-md-6 py-1 " style={{display:'flex', justifyContent:'right'}}>₹ {totalCartAmt}</div>
          </div>

          <div className="row">
          <div className="col-md-6 py-1 ">Delivery Charges</div>
          <div className="col-md-6 py-1 " style={{display:'flex',justifyContent:'right',color:'green'}}>{totalCartAmt < 2000 ? <><s>Free</s>&nbsp;₹ 50</> : 'Free'}</div>
          </div>
          <hr/>
          <div className="row">
          <div className="col-md-6 py-1 ">Total Amount</div>
          <div className="col-md-6 py-1 " style={{display:'flex',justifyContent:'right'}}>₹ {totalCartAmt < 2000 ? totalCartAmt+50 : totalCartAmt}</div>
          </div>
          
          <div style={{display:'flex',justifyContent:'center'}}>
          <button className="btn btn-success" onClick={()=>cartCheckout()}>Checkout</button>
          </div>

        </div>
      </div>
    </>
  );
}
