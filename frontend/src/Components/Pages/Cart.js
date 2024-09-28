import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer";

export default function Cart(props) {
  const [cartData, setCartData] = useState([]);
  const [totalCartAmt, setTotalCartAmount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/cart/getAllCart`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setCartData(response.data);

        // Calculate the total amount
        let total = 0;
        response.data.forEach(item => {total += item.totalAmount;});
        setTotalCartAmount(total);
      } catch (error) {
        if(error.response.status === 401)
          {
            navigate("/notAuthorized");
          }
          else{
            console.log("error while fetching cart: ", error);
          }
       
      }
    };
    fetchCartData();
  },[navigate]);

  const handleDelete = async (prodId) => {
    if (window.confirm("Are you sure you want to remove this item from the cart?")) {
      try {
        await axios.delete(`http://localhost:8080/cart/deleteCart/${prodId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        // Update cartData and totalCartAmt after deletion
        setCartData((prevData) => prevData.filter((item) => item.product.prodId !== prodId));
        setTotalCartAmount(totalCartAmt - cartData.find(item => item.product.prodId === prodId).totalAmount);
      } catch (error) {
        console.log("Error while deleting cart item: ", error); 
      }
    }
  };

  const handleUpdate =async(quantity,prodId)=>{
    try {
        if(quantity===0)
        {
            handleDelete(prodId);
        }
        else
        {
          await axios.put(`http://localhost:8080/cart/updateQty/${quantity}/${prodId}`,{},
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            });
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

  
    if(cartData.length ===0)
    {
      return(
        <>
        {/* navbar */}
        <div><Navbar toggleMode={props.toggleMode} mode={props.mode} /></div>
        <div className="container">
        <center><h2 style={{ paddingTop: "3rem" }}>Shopping Cart</h2></center>
        </div>
        <hr />
        <div className="container" style={{display:'flex', justifyContent:'center',paddingTop:'5rem'}}>
          <h1>Oops...Your Cart Is Empty!</h1>
        </div>
        <div className="container emptyCart" style={{display:'flex', justifyContent:'center',paddingBottom:'5rem'}}>
          <a href="/home">Click here to shop</a>
        </div>
        <Footer/>
      </>
      );
    }
    else
    {
      return(
        <>
        {/* navbar */}
        <div>
          <Navbar toggleMode={props.toggleMode} mode={props.mode} />
        </div>
        <div className="container">
          <center><h2 style={{paddingTop: "3rem"}}>Shopping Cart</h2></center>
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
                    <div className="col-md-4" style={{ height: "9rem", width: "9rem"}}>
                      <img className="img-fluid" src={element.product.image} alt="N/A" style={{borderRadius:50}}/>
                    </div>
                    <div className="col-md-8" style={{ height: "9rem" }}>
                      <div>
                        <h5>{element.product.title}</h5>
                      </div>
  
                      <div>
                      <i className="bi bi-dash-circle" onClick={()=>handleUpdate(element.quantity-1,element.product.prodId)}></i>
                      <input className="text-center" type="text" min={0} max={10} style={{height:'2rem', width:'2rem', borderRadius:15, margin:'5px', opacity:'60%'}} value={element.quantity} readOnly></input>
                      <i className="bi bi-plus-circle" onClick={()=>handleUpdate(element.quantity+1,element.product.prodId)}></i>
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
            <div className="col-md-6 py-1 " style={{display:'flex',justifyContent:'right',color:'green'}}>{totalCartAmt < 2000 && totalCartAmt!==0 ? <><s>Free</s>&nbsp; ₹ 50</> : 'Free'}</div>
            </div>
            <hr/>
            <div className="row">
            <div className="col-md-6 py-1 ">Total Amount</div>
            <div className="col-md-6 py-1 " style={{display:'flex',justifyContent:'right'}}>₹ {totalCartAmt < 2000 && totalCartAmt!==0 ? totalCartAmt + 50 : totalCartAmt}</div>
            </div>
            
            <div style={{display:'flex',justifyContent:'center', padding:'1rem'}}>
            <button className="checkoutBtn" onClick={()=>cartCheckout()} disabled={cartData.length === 0}>Checkout</button>
            </div>
          </div>
        </div>
        <br/>
        <Footer/>
      </>
      );
    }
   
  
}
