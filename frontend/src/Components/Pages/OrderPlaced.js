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
      <div className='orderPlaced'>
          <div>
            <img className='img-fluid' src={checkGif} alt="" style={{paddingBottom : '2rem'}}/>
          </div>
          <div>
            <h1>Order Successful..!</h1>
            <a href="/Orders"> click here to see orders</a>
          </div>
      </div>
      <Footer/>
    </>
  )
}
