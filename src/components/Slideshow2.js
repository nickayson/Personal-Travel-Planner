import React, { useState, useEffect } from 'react';
import '../styles/Slideshow.css';

function Slideshow2({ images }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(goToNextSlide, 5000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  const goToNextSlide = () => {
    const nextSlide = (currentSlide + 1) % images.length;
    setCurrentSlide(nextSlide);
  };

  const goToPreviousSlide = () => {
    const previousSlide = (currentSlide - 1 + images.length) % images.length;
    setCurrentSlide(previousSlide);
  };

  return (
    <div>
      {images.map((image, index) => (
        <img 
          key={index}
          className={`slide-image-two ${index === currentSlide ? 'active' : ''}`}
          src={image} 
          alt={`Slide ${index}`} 
        />
      ))}
    </div>
  );
}

export default Slideshow2;
