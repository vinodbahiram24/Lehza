import React from "react";
import MainCarousel from "../MainCarousel/MainCarousel";
import SectionCarousel from "../HomeSectionCarousel/SectionCarousel";
import { TrendingCarouselData } from "../Data/TrendingCarouselData";
import { BestSellerCarouselData } from "../Data/BestSellerCarouselData";
import FAQ from "../FAQ";
import Footer from "../Footer";
import Navbar from "../Navbar";

export default function HomePage(props) {
  return (
    <>
    <div><Navbar toggleMode={props.toggleMode} mode={props.mode} /></div>
      <div className="py-2">
        <MainCarousel />
      </div>
      <div>
        <h3 className="text-center">
          <b>—— TRENDING ——</b>
        </h3>
        <p className="text-center" style={{ color: "gray" }}>
          <i>Top view in this week</i>
        </p>
        <SectionCarousel data={TrendingCarouselData} />
      </div>

      <div className="py-5">
        <h3 className="text-center">
          <b>—— BEST SELLER ——</b>
        </h3>
        <p className="text-center" style={{ color: "gray" }}>
          <i>Top sale in this week</i>
        </p>
        <SectionCarousel data={BestSellerCarouselData} />
      </div>

      <div className="container py-5">
        <center><h4>—— FAQS ——</h4></center>
        <FAQ mode={props.mode} />
      </div>
      <Footer></Footer>
    </>
  );
}
