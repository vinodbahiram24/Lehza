import React, { useEffect, useState } from "react";
import '../css/homePage.css';
import MainCarousel from "../MainCarousel/MainCarousel";
import SectionCarousel from "../HomeSectionCarousel/SectionCarousel";
import FAQ from "../FAQ";
import Footer from "../Footer";
import Navbar from "../Navbar";
import axios from "axios";

export default function HomePage(props) {

  const [ data, setData ] = useState([]);

  useEffect(()=>{
    const fetchData= async () => {
      try {
        const response = await axios.get('http://localhost:8080/products/getAllProducts/sarees');
        setData(response.data);
      } catch (error) {
        console.log('error in homePage fechData :', error );
      }
    }
    fetchData()
  },[])

  return (
    <>
    {/* Navbar */}
    <div><Navbar toggleMode={props.toggleMode} mode={props.mode} /></div>
    {/* Body */}
      <div className="mainCarousel">
        <MainCarousel />
      </div>

      <div className="trending">
        <h3 className="trendingText">
          <b>—— TRENDING ——</b>
        </h3>
        <p className="trendingText" style={{ color: "gray" }}>
          <i>Top view in this week</i>
        </p>
        <SectionCarousel data={data}/>
      </div>

      <div className="bestSeller">
        <h3 className="bestSellerText">
          <b>—— BEST SELLER ——</b>
        </h3>
        <p className="bestSellerText" style={{ color: "gray" }}>
          <i>Top sale in this week</i>
        </p>
        <SectionCarousel data={data} />
      </div>

      <div className="faq">
        <center><h4>—— FAQS ——</h4></center>
        <FAQ mode={props.mode} />
      </div>

      <Footer/>
    </>
  );
}
