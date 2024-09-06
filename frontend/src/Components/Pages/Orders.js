import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar';
import axios from 'axios';

export default function Orders(props) {
    const [orders, setOrders] = useState({});
  
    useEffect(() => {
      const fetchOrders = async () => {
        const response = await axios.get(`http://localhost:8080/order/getOrdersByUser/${localStorage.getItem("username")}`);
        setOrders(response.data);
      };
      fetchOrders();
    }, []);
  
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
                <img className="img-fluid" src={item.product.image} alt="N/A" />
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
      </>
    );
}
