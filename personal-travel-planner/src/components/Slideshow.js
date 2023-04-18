import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const slideImages = ["/images/delhi.jpg"];

const Slideshow = () => {
  return (
    <Slide easing="ease">
      {slideImages.map((image, index) => (
        <div key={index} className="each-slide">
          <div
            style={{
              backgroundImage: `url(${image})`,
              height: "100vh",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </div>
      ))}
    </Slide>
  );
};

export default Slideshow;

