import React from 'react'

export default function Footer() {
  const copy=()=>{
    let phoneNumber = "+917057338366";
    navigator.clipboard.writeText(phoneNumber);
  }

  return (
    <div
        className="footer row px-4 py-3"
        style={{ backgroundColor: "#9a8100", color: "black"}}
      >
        <div className="col-sm-4 mb-3 mb-sm-0 px-4 py-3">
          <b>Contact Us</b>
          <hr/>
          <p>
            <i className="bi bi-geo-alt-fill">
              {" "}
              41, Second Floor, J.M Road, Near Deccan Mall, Pune, Maharshtra 411004
            </i>
          </p>
          <p>
            <i className="bi bi-envelope-fill"><a href="mailto:support@lehza.in" target='_blank' rel="noreferrer"> support@lehza.in</a></i>
          </p>
          <p>
          <i className="bi bi-telephone-fill" onClick={copy} data-toggle="tooltip" data-placement="bottom" title="copy to clipboard"><a href="tel:+917057338366">+917057338366</a></i>
          </p>
        </div>

        <div className="col-sm-4 mb-3 mb-sm-0 px-4 py-3">
          <b>About Us</b>
          <hr/>
          <p>
            Lehza seamlessly blends traditional Indian craftsmanship with
            contemporary design. We specialize in creating timeless, handcrafted
            ethnic wear, with a commitment to quality, sustainability, and
            refined elegance.
          </p>
        </div>

        <div className="col-sm-4 mb-3 mb-sm-0 px-4 py-3">
          <b>Follow Us</b>
          <hr/>
          <a href="https://www.facebook.com" target='_blank' rel="noreferrer" ><i className="bi bi-facebook"> &nbsp; </i></a>
          <a href="https://www.instagram.com" target='_blank' rel="noreferrer"><i className="bi bi-instagram"> &nbsp; </i></a>
          <a href="https://www.pintrest.com" target='_blank' rel="noreferrer"><i className="bi bi-pinterest"> &nbsp; </i></a>
          <a href="https://www.youtube.com" target='_blank' rel="noreferrer"> <i className="bi bi-youtube"> &nbsp; </i></a>
        </div>
        <hr/>
        <strong>© 2024 LEHZA PVT LTD.</strong>
      </div>
  )
}
