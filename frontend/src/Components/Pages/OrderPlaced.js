import React from 'react'
import Navbar from '../Navbar'
import checkGif from '../Data/checkGif.gif';

export default function OrderPlaced(props) {
  return (
    <div>
      {/* navbar */}
      <div>
          <Navbar toggleMode={props.toggleMode} mode={props.mode} />
       </div>

       <div className='py-5' style={{display:'flex', justifyContent:'center'}}>
        <img className='img-fluid' src={checkGif} alt=""/>
       </div>
       <div className='container text-center'>
       <h1>Order Successful..!</h1>
       <a href="/Orders" style={{color:'gray', textDecoration:'underline'}}> click here to see orders</a>
       </div>
    </div>
  )
}
