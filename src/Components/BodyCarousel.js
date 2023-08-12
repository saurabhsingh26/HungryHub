import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import carousel1 from "../assets/carousel1.png";
import carousel2 from "../assets/carousel2.png";
import carousel3 from "../assets/carousel3.png";
import carousel4 from "../assets/carousel4.png";
import carousel5 from "../assets/carousel5.png";
import carousel6 from "../assets/carousel6.png";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 1440 },
    items: 2,
    partialVisibilityGutter: 200,
  },
  desktop: {
    breakpoint: { max: 1439, min: 1261 },
    items: 2,
    partialVisibilityGutter: 120,
  },
  large: {
    breakpoint: { max: 1260, min: 1181 },
    items: 2,
    partialVisibilityGutter: 80,
  },
  mobile: {
    breakpoint: { max: 1180, min: 1077 },
    items: 2,
    partialVisibilityGutter: 40,
  },
  small: {
    breakpoint: { max: 1076, min: 1024 },
    items: 2,
    partialVisibilityGutter: 20,
  },
};

const BodyCarousel = () => {
  const handleClick = () => {
    const targetSection = document.getElementById("visible-part");
    var interval = setInterval(function () {
      var targetSectionCoordinates = targetSection.getBoundingClientRect();
      if (
        targetSectionCoordinates.top >= 0 &&
        targetSectionCoordinates.top <= 20
      ) {
        clearInterval(interval);
        return;
      }
      window.scrollBy(0, 5);
    }, 2);
  };

  return (
    <div className="flex flex-col w-[90%] mx-auto">
      <div style={{ color: "#02060CEB" }} className="text-2xl font-bold my-4">
        Best offers for you
      </div>
      <div className="z-0">
        <Carousel
          responsive={responsive}
          draggable={true}
          showDots={true}
          focusOnSelect={true}
          autoPlay={true}
          autoPlaySpeed={3000}
          infinite={true}
          partialVisible={true}
        >
          <div onClick={handleClick}>
            <img className="w-[27rem] h-64" src={carousel1} alt="" />
          </div>
          <div onClick={handleClick}>
            <img className="w-[27rem] h-64" src={carousel2} alt="" />
          </div>
          <div onClick={handleClick}>
            <img className="w-[27rem] h-64" src={carousel3} alt="" />
          </div>
          <div onClick={handleClick}>
            <img className="w-[27rem] h-64" src={carousel4} alt="" />
          </div>
          <div onClick={handleClick}>
            <img className="w-[27rem] h-64" src={carousel5} alt="" />
          </div>
          <div onClick={handleClick}>
            <img className="w-[27rem] h-64" src={carousel6} alt="" />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default BodyCarousel;
