import React from "react";
import AliceCarousel from "react-alice-carousel";
import CarouselCard from "./CarouselCard";

const responsive = {
  0: { items: 1 },
  720: { items: 3 },
  1024: { items: 4 },
};

export default function SectionCarousel(props) {
    const items= props.data.map((item)=><CarouselCard product={item}/>);
  return (
    <div className="container">
    <AliceCarousel
        autoPlay
        autoPlayInterval={1000}
        animationDuration={1000}
        animationType="slide"
        infinite
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}/>
    </div>
  );
}
