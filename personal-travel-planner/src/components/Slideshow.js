import React from "react";
import Slider from "react-slick";

function Slideshow() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <Slider {...settings}>
      <div>
        <img src="/images/Berlin.jpg" alt="Slide 1" />
      </div>
      <div>
        <img src="/images/dubai.jpg" alt="Slide 2" />
      </div>
      <div>
        <img src="/images/Johannesburg.jpg" alt="Slide 3" />
      </div>
    </Slider>
  );
}

export default Slideshow;
