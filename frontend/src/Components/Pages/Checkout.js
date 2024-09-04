import React, { useState } from "react";
import Navbar from "../Navbar";
import { useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function Checkout(props) {
    const [user, setUser] = useState({});
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [pincode, setPincode] = useState('');
    const [state, setState] = useState('');
    const location = useLocation();
    const {totalCartAmt} = location.state || {};


    useEffect(()=>{
        const fetchUser = async ()=>{
            const response = await axios.get(`http://localhost:8080/users/getUserByUsername/${localStorage.getItem("username")}`);
            console.log(response.data);
            setUser(response.data);
        }
        fetchUser();
    },[])

    const updateAddress = async (e) =>{
      e.preventDefault();
      const response = await axios.put(`http://localhost:8080/users/updateUser/3`, {address: address, city: city, pincode: pincode, state: state});
      console.log(response.data);
      setUser(response.data);
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
            <div className="address">
            {user.address}<br/> {user.city}<br/>{user.pincode}<br/>{user.state}
            </div>
            <hr/>
            <div className="addressForm py-2 px-5">
            <center><h5>or update address</h5></center>
            <form className="text-center" onSubmit={updateAddress}>
                <input type="text" placeholder="address" style={{width:'45rem',borderRadius:10}} onChange={(e)=>setAddress(e.target.value)}></input>
                <input type="text" placeholder="city" style={{width:'45rem',borderRadius:10}} onChange={(e)=>setCity(e.target.value)}></input>
                <input type="text" placeholder="pincode" style={{width:'45rem',borderRadius:10}} onChange={(e)=>setPincode(e.target.value)}></input>
                <input type="text" placeholder="state" style={{width:'45rem',borderRadius:10}} onChange={(e)=>setState(e.target.value)}></input>
                <button type="submit" className="btn btn-success">Update</button>
            </form>

            </div>

            </div>

            <div className="col-md-3">
            <center><h4>Price Details</h4></center>
            <hr/>
            <div className="row">
          <div className="col-md-6 py-1 ">Price</div>
          <div className="col-md-6 py-1 " style={{display:'flex', justifyContent:'right'}}>₹ {totalCartAmt}</div>
          </div>

          <div className="row">
          <div className="col-md-6 py-1 ">Delivery Charges</div>
          <div className="col-md-6 py-1 " style={{display:'flex', justifyContent:'right',color:'green'}}>Free</div>
          </div>
          <hr/>
          <div className="row">
          <div className="col-md-6 py-1 ">Total Amount</div>
          <div className="col-md-6 py-1 " style={{display:'flex', justifyContent:'right'}}>₹ {totalCartAmt}</div>
          </div>
          
          <div style={{display:'flex',justifyContent:'center'}}>
          <button className="btn btn-success" style={{width:'7rem'}}>Place Order</button>
          </div>
            </div>
      </div>
    </>
  );
}
