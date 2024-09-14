import React, { useState } from "react";
import Navbar from "../Navbar";
import { useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

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
            const response = await axios.get(`http://localhost:8080/users/getUserByUsername/${localStorage.getItem("username")}`);
            setUser(response.data);
        }
        fetchUser();
    },[])

    const updateAddress = async (e) =>{
      e.preventDefault();
      const response = await axios.put(`http://localhost:8080/users/updateUser/3`, {address: address, city: city, pincode: parseInt(pincode) , state: state});
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
        const response = await axios.post(`http://localhost:8080/order/createOrder/${localStorage.getItem('username')}`);
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
            <div className="col-md-9" style={{border:"1px", borderColor: 'red'}}>
            <center><h4>Address</h4></center>
            <hr/>
            <div className="address" style={{paddingBlock:'2rem'}}>
            {user.address}<br/> {user.city}<br/>{user.pincode}<br/>{user.state}
            </div>
            <hr/>
            <div className="addressForm py-2 px-5">
            <center><h5>or update address</h5></center>
            <form className="text-center" onSubmit={updateAddress}>
                <input className="updateAddInput" type="text" placeholder="address" value={address} style={{width:'30rem', height:'3rem' , borderRadius:10}} onChange={(e)=>setAddress(e.target.value)} required></input>
                <input className="updateAddInput" type="text" placeholder="city" value={city} style={{width:'30rem', height:'3rem',borderRadius:10}} onChange={(e)=>setCity(e.target.value)} required></input>
                <input className="updateAddInput" type="text" placeholder="pincode" value={pincode} style={{width:'30rem', height:'3rem',borderRadius:10}} onChange={(e)=>setPincode(e.target.value)} required></input>
                <input className="updateAddInput" type="text" placeholder="state" value={state} style={{width:'30rem', height:'3rem',borderRadius:10}} onChange={(e)=>setState(e.target.value)} required></input><br/>
                <button type="submit" className="btn btn-success" style={{width:'5rem', borderRadius:20, marginTop:'1rem'}}>Update</button>
            </form>

            </div>

            </div>

          <div className="col-md-3">
          <center><h4>Price Details</h4></center>
          <hr/>
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
          <button className="btn btn-success" style={{width:'7rem', borderRadius:20}} onClick={()=>placeOrder()} disabled={totalCartAmt === 0}>Place Order</button>
          </div>
          </div>
      </div>
    </>
  );
}
