import React from "react";

export default function FAQ(props) {
  return (
    <div className="container" style={props.mode==='light'? {backgroundColor:'white',color:'black'}:{backgroundColor:'#36393F',color:'#9a8100'}}>
      <div className="accordion accordion-flush" id="accordionFlushExample">
        <div className="accordion-item" style={props.mode==='light'? {backgroundColor:'white',color:'black'}:{backgroundColor:'#36393F',color:'#9a8100'}}>
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseOne"
              aria-expanded="false"
              aria-controls="flush-collapseOne"
              style={props.mode==='light'? {backgroundColor:'white',color:'black'}:{backgroundColor:'#36393F',color:'#9a8100'}}
            >
              <strong>What is Lehza?</strong>
            </button>
          </h2>
          <div
            id="flush-collapseOne"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
              Lehza is a women's ethnic clothing brand that blends traditional
              craftsmanship with modern aesthetics. We offer a wide range of
              ethnic wear, including sarees, lehengas, kurtis, and more,
              designed to highlight the beauty of traditional attire with a
              contemporary touch.
            </div>
          </div>
        </div>
        <div className="accordion-item" style={props.mode==='light'? {backgroundColor:'white',color:'black'}:{backgroundColor:'#36393F',color:'#9a8100'}}>
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseTwo"
              aria-expanded="false"
              aria-controls="flush-collapseTwo"
              style={props.mode==='light'? {backgroundColor:'white',color:'black'}:{backgroundColor:'#36393F',color:'#9a8100'}}
            >
              <strong>What products does Lehza offer?</strong>
            </button>
          </h2>
          <div
            id="flush-collapseTwo"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
              Lehza offers a curated collection of ethnic wear including sarees,
              lehengas, salwar kameez, kurtis, and more. Each piece is carefully
              crafted to combine tradition with modern elegance, using
              high-quality fabrics and intricate detailing.
            </div>
          </div>
        </div>
        <div className="accordion-item" style={props.mode==='light'? {backgroundColor:'white',color:'black'}:{backgroundColor:'#36393F',color:'#9a8100'}}>
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseThree"
              aria-expanded="false"
              aria-controls="flush-collapseThree"
              style={props.mode==='light'? {backgroundColor:'white',color:'black'}:{backgroundColor:'#36393F',color:'#9a8100'}}
            >
              <strong>How should I care for Lehza garments?</strong>
            </button>
          </h2>
          <div
            id="flush-collapseThree"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
              Our garments are made with delicate fabrics and require careful
              handling. We recommend dry cleaning for most of our products to
              preserve their quality. Specific care instructions are provided
              with each item.
            </div>
          </div>
        </div>
        <div className="accordion-item" style={props.mode==='light'? {backgroundColor:'white',color:'black'}:{backgroundColor:'#36393F',color:'#9a8100'}}>
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseFour"
              aria-expanded="false"
              aria-controls="flush-collapseFour"
              style={props.mode==='light'? {backgroundColor:'white',color:'black'}:{backgroundColor:'#36393F',color:'#9a8100'}}
            >
              <strong>What is Lehza's return and exchange policy?</strong>
            </button>
          </h2>
          <div
            id="flush-collapseFour"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
              We accept returns and exchanges within 15 days of delivery,
              provided the item is in its original condition with tags attached.
              Please note that custom-made items and items purchased on sale are
              not eligible for return. For more details, visit our Return Policy
              page.
            </div>
          </div>
        </div>

        <div className="accordion-item" style={props.mode==='light'? {backgroundColor:'white',color:'black'}:{backgroundColor:'#36393F',color:'#9a8100'}}>
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseFive"
              aria-expanded="false"
              aria-controls="flush-collapseFive"
              style={props.mode==='light'? {backgroundColor:'white',color:'black'}:{backgroundColor:'#36393F',color:'#9a8100'}}
            >
              <strong>How long does it take to receive my order?</strong>
            </button>
          </h2>
          <div
            id="flush-collapseFive"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
              Delivery times vary based on your location. Standard delivery
              within India usually takes 5-7 business days. International
              shipping times may vary. You will receive a tracking number once
              your order is shipped.
            </div>
          </div>
        </div>

         <div className="accordion-item" style={props.mode==='light'? {backgroundColor:'white',color:'black'}:{backgroundColor:'#36393F',color:'#9a8100'}}>
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseSix"
              aria-expanded="false"
              aria-controls="flush-collapseSix"
              style={props.mode==='light'? {backgroundColor:'white',color:'black'}:{backgroundColor:'#36393F',color:'#9a8100'}}
            >
              <strong>How can I contact Lehza customer support?</strong>
            </button>
          </h2>
          <div
            id="flush-collapseSix"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
            You can reach our customer support team via email at <a href="mailto:support@lehza.in" target='_blank' rel="noreferrer"> support@lehza.in</a> or by phone at +91-XXXXXXXXXX. Our support team is available Monday to Saturday, from 10 AM to 7 PM IST.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
