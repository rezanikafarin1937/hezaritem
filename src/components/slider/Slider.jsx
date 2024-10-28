import { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import "./slider.scss";

const Slider = ({ images }) => {
  const [myImages, setMyImages] = useState([]);

  useEffect(() => {
    setMyImages(() => [ ...images]);
  }, []);

  return (
    <div className="slider">
      <Carousel autoFocus="true">
        {myImages.map((image, index) => {
          return (
            <div key={index}>
              <img src={image.address} />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default Slider;
