import React, { useState } from "react";
import Navbar from "../Navbar";
import { useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../Footer";

export default function Checkout(props) {
    const [user, setUser] = useState({});
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [pincode, setPincode] = useState('');
    const [state, setState] = useState('');
    const location = useLocation();
    const {totalCartAmt} = location.state || {};
    const navigate = useNavigate();


    useEffect(()=>{
        const fetchUser = async ()=>{
          try {
            const response = await axios.get("http://localhost:8080/users/getUserByUsername",
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              });
              setUser(response.data);  
          } catch (error) {
            if(error.response.status === 401)
            {
              navigate("/notAuthorized");
            }
            else{
              console.log("error in checkout: ", error);
            }
          }
        
        }
        fetchUser();
    },[navigate])

    const updateAddress = async (e) =>{
      e.preventDefault();
      const response = await axios.put(`http://localhost:8080/users/updateUser`, {address: address, city: city, pincode: parseInt(pincode) , state: state},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response.data);
      setUser(response.data);

      setAddress("");
      setCity("");
      setPincode("");
      setState("");

      window.alert("Address Updated..!")
    }

    const placeOrder = async () => {
      try {
        const response = await axios.post(`http://localhost:8080/order/createOrder`,{},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const orderDetails = response.data;
        console.log(orderDetails);
        navigate('/OrderPlaced',{state : {orderDetails}});
      } catch (error) {
        console.log("Failed to create order : ", error);
      }
    }

  return (
    <>
      {/* navbar */}
      <div>
        <Navbar toggleMode={props.toggleMode} mode={props.mode} />
      </div>
      {/* body */}
      <div className="row py-5 px-5">
            <div className="col-md-9">
            <center><h3>Your Address</h3></center>
            <hr/>
            <div className="address">
            {user.address}<br/> {user.city}<br/>{user.pincode}<br/>{user.state}
            </div>
            <hr/>
            <div className="addressForm py-2 px-5">
            <center><h4>or update address here</h4></center>
            <form className="text-center" onSubmit={updateAddress}>
                <input className="updateAddInput" type="text" placeholder="address" value={address}  onChange={(e)=>setAddress(e.target.value)} required></input>
                <input className="updateAddInput" type="text" placeholder="city" value={city}  onChange={(e)=>setCity(e.target.value)} required></input>
                <input className="updateAddInput" type="text" placeholder="pincode" value={pincode}  onChange={(e)=>setPincode(e.target.value)} required></input>
                <input className="updateAddInput" type="text" placeholder="state" value={state} onChange={(e)=>setState(e.target.value)} required></input><br/>
                <button type="submit" className="upadateBtn">Update</button>
            </form>
            </div>
            </div>

          <div className="col-md-3">
          <center><h3>Price Details</h3></center>
          <hr/>
          <div className="priceDetails">
          <div className="row">
          <div className="col-md-6 py-1 ">Price</div>
          <div className="col-md-6 py-1 " style={{display:'flex', justifyContent:'right'}}>₹ {totalCartAmt ? totalCartAmt : 0}</div>
          </div>

          <div className="row">
          <div className="col-md-6 py-1 ">Delivery Charges</div>
          <div className="col-md-6 py-1 " style={{display:'flex', justifyContent:'right',color:'green'}}>Free</div>
          </div>
          <hr/>

          <div className="row">
          <div className="col-md-6 py-1 ">Total Amount</div>
          <div className="col-md-6 py-1 " style={{display:'flex', justifyContent:'right'}}>₹ {totalCartAmt ? totalCartAmt : 0}</div>
          </div>
          
          <div style={{display:'flex',justifyContent:'center',padding:'1rem'}}>
          <button className="placeOrderBtn" onClick={()=>placeOrder()} disabled={totalCartAmt === 0 || user.address === null}>Place Order</button>
          </div>
          </div>
          </div>
      </div>
      <Footer/>
    </>
  );
}
