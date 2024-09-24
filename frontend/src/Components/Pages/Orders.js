import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar';
import axios from 'axios';
import Footer from '../Footer';
import { useNavigate } from 'react-router-dom';

export default function Orders(props) {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchOrders = async () => {
        try {
          const response = await axios.get("http://localhost:8080/order/getOrdersByUser",
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            });
            setOrders(response.data.reverse());
        } catch (error) {
          if(error.response.status === 401)
            {
              navigate("/notAuthorized");
            }
            else{
              console.log("error in Orders: ", error);
            }
        }
        
      };
      fetchOrders();
    }, [navigate]);
  
    return (
      <>
        {/* navbar */}
        <div>
          <Navbar toggleMode={props.toggleMode} mode={props.mode} />
        </div>
        <div className="container">
          <center><h2 style={{ paddingTop: "3rem" }}>Orders</h2></center>
        </div>
        <hr />
        {/* body */}
        {orders.length > 0 ? (
          orders.map((item) => (
            <>
            <div className="row py-3 px-4" key={item.orderId} >
              <div className="col-md-3" style={{ height: "9rem", width: "9rem" }}>
                <img className="img-fluid" src={item.product.image} alt="N/A" style={{borderRadius:50}}/>
              </div>
  
              <div className="col-md-7 px-5">
                <h5>{item.orderId}</h5>
                <h6>{item.status}</h6>
                <h6>{item.product.title}</h6>
                <h6>Quantity : {item.quantity}</h6>
              </div>
  
              <div className="col-md-2">
              <h6>Orderd On : {item.date}</h6><br/>
              <h6>Amount To Pay : ₹ {item.amount}</h6>
              </div>
            </div>
            <hr/>
            </>
          ))
        ) : (
          <div className="text-center py-5">
            <h4>No order details available.</h4>
          </div>
        )}
        <Footer/>
      </>
    );
}
