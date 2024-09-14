import React from 'react'
import Navbar from '../Navbar'
import checkGif from '../Data/checkGif.gif';
import Footer from '../Footer';

export default function OrderPlaced(props) {
  return (
    <>
      {/* navbar */}
      <div>
       <Navbar toggleMode={props.toggleMode} mode={props.mode} />
       </div>
        {/* body */}
      <div className='emptyCart' style={{textAlign:'center'}}>
          <div className='py-5'>
            <img className='img-fluid' src={checkGif} alt=""/>
          </div>
          <div className='container'>
            <h1>Order Successful..!</h1>
            <a href="/Orders"> click here to see orders</a>
          </div>
      </div>
      <Footer/>
    </>
  )
}
