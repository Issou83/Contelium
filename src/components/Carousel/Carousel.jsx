import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import "./index.css";

function Carousel({ images, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoSlideInterval, setAutoSlideInterval] = useState(7000);
  const [slideDuration, setSlideDuration] = useState(7); // in seconds
  const [rotation, setRotation] = useState(0);
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        return (prevIndex + 1) % images.length;
      });
    }, autoSlideInterval);

    return () => clearInterval(interval);
  }, [images.length, autoSlideInterval]);

  const prevImage = () => {
    setCurrentIndex((prevIndex) => {
      return (prevIndex - 1 + images.length) % images.length;
    });
  };

  const nextImage = () => {
    setCurrentIndex((prevIndex) => {
      return (prevIndex + 1) % images.length;
    });
  };



  useEffect(() => {
    const show = () => setShowControls(true);
    const hideControls = setTimeout(() => setShowControls(false), 50);

    window.addEventListener("mousemove", show);
    window.addEventListener("keydown", show);

    return () => {
      window.removeEventListener("mousemove", show);
      window.removeEventListener("keydown", show);
      clearTimeout(hideControls);
    };
  }, []);

  const handleSlideDurationChange = (e) => {
    const duration = parseInt(e.target.value, 10);
    if (!isNaN(duration)) {
      setSlideDuration(duration);
      setAutoSlideInterval(duration * 1000);
    }
  };

  const rotateImage = () => {
    setRotation((prevRotation) => prevRotation + 90);
  };

  return (
    <div
      className="carousel-container"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <img src={images[currentIndex]} alt="NFT" className="carousel-image" />

      {showControls && (
        <div className="carousel-controls">
          Durée affichage :
          <input
            type="number"
            min="1"
            value={slideDuration}
            onChange={handleSlideDurationChange}
          />{" "}
          sec
        </div>
      )}
       {showControls && (
            <div className="control">
         <button className="carousel-prev" onClick={prevImage}>
            &lt;
          </button>
          <button className="carousel-next" onClick={nextImage}>
            &gt;
          </button>
          <span className="carousel-indicator">{`${currentIndex + 1}/${
            images.length
          }`}</span>
          <button className="carousel-rotate" onClick={rotateImage}>
            ↻
          </button>
          <span className="carousel-close" onClick={onClose}>
            &times;
          </span>
          </div>
 )}
    </div>
  );
}

Carousel.propTypes = {
  images: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Carousel;
