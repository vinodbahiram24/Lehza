import React from 'react'
import AliceCarousel from 'react-alice-carousel'
import {MainCarouselData} from '../Data/MainCarouselData'
import 'react-alice-carousel/lib/alice-carousel.css';

export default function MainCarousel() {

const items = MainCarouselData.map((item)=> <img className='img-fluid' role='presentation' src={item.image} alt=""/>)

  return (
      <AliceCarousel
        autoPlay
        autoPlayInterval={1500}
        animationDuration={1500}
        animationType="slide"
        infinite
        disableButtonsControls
        items={items}
    />
  )
}
