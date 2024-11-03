import { useState, useEffect } from "react";
import "./touch-slider.scss";

const TouchSlider = ({ children, imageLength }) => {
  const p = "<<";
  const n = ">>";
  const [startX, setStartX] = useState(0);
  const [pressed, setPressed] = useState(false);
  const [startPoint, setStartPoint] = useState(0);
  const [endPoint, setEndPoint] = useState(0);
  const [compare, setCompare] = useState(0);
  const [indexImage, setIndexImage] = useState(0);
  useEffect(() => {
    if (startPoint > endPoint) {
      setCompare(() => 1);
    } else if (startPoint < endPoint) {
      setCompare(() => -1);
    } else {
      setCompare(() => 0);
    }
  }, [startPoint, endPoint]);

  window.addEventListener("mouseup", () => {
    setPressed(false);
  });

  const dragStart = (e) => {
    setPressed(true);
    if (e.type === "touchstart") {
      setStartPoint(() => e.touches[0].clientX);
    } else {
      setStartPoint(() => e.clientX);
      const wrapper = document.querySelector(".wrapper-slide");
      wrapper.style.cursor = "grabbing";
    }
  };

  const dragMove = (e) => {
    if (!pressed) {
      return;
    }
    setPressed(false);
    if (e.type === "touchmove") {
      setEndPoint(() => e.touches[0].clientX);
    } else {
      setEndPoint(() => e.clientX);
    }

    if (compare === 1) {
      nextSlide();
    } else if (compare === -1) {
      prevSlide();
    } else if (compare === 0) {
      return;
    }
  };

  const dragEnd = (e) => {
    setPressed(false);
    if (e.type !== "touchmove") {
      const wrapper = document.querySelector(".wrapper-slide");
      wrapper.style.cursor = "grab";
    }
  };

  const nextSlide = () => {
    let slide = document.querySelector(".slide");
    let width = slide.offsetWidth;

    if (indexImage < imageLength - 1) {
      slide.scrollLeft = width * (indexImage + 1);
      setStartX(() => width * indexImage);
      if (indexImage >= imageLength) {
        setIndexImage(0);
      } else {
        setIndexImage(indexImage + 1);
      }
    } else {
      setStartX(0);
      setIndexImage(() => 0);
      slide.scrollLeft = 0;
    }
  };

  const prevSlide = () => {
    let slide = document.querySelector(".slide");
    let width = slide.offsetWidth;
    if (indexImage > 0) {
      setIndexImage(() => indexImage - 1);
      setStartX(() => width * (indexImage - 1));
      slide.scrollLeft = (indexImage - 1) * width;
    } else if (indexImage === 0) {
      setIndexImage(() => imageLength - 1);
      setStartX(() => width * (imageLength - 1));
      slide.scrollLeft = (imageLength - 1) * width;
    }
  };

  const shiftIndexImage = (index) => {
    let slide = document.querySelector(".slide");
    let width = slide.offsetWidth;
    slide.scrollLeft = index * width;
    setIndexImage(() => index);
  };

  return (
    <>
      <div
        className="wrapper-slide"
        onMouseDown={dragStart}
        onMouseMove={dragMove}
        onMouseLeave={dragEnd}
        onMouseUp={dragEnd}
        onTouchStart={dragStart}
        onTouchEnd={dragEnd}
        onTouchMove={dragMove}
      >
        <div className="slide">
          {children}
          <div className="slide__btn-next" onClick={nextSlide}>
            <span className="arrow-next"></span>
          </div>
          <div className="slide__btn-prev" onClick={prevSlide}>
            <span className="arrow-prev"></span>
          </div>
        </div>
      </div>
      <div className="cards">
        {children.map((child, index) => {
          return (
            <div
              key={index}
              onClick={() => shiftIndexImage(index)}
              className={
                "cards__card" + (index === indexImage ? " cards__select" : "")
              }
            >
              <img src={child.props.children.props.src} />
            </div>
          );
        })}
      </div>
    </>
  );
};
export default TouchSlider;
