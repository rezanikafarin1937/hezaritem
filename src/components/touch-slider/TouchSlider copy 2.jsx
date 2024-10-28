import { useState } from "react";
import "./touch-slider.scss";

const TouchSlider = ({ children, imageLength }) => {
  const p = "<<";
  const n = ">>";
  const [startX, setStartX] = useState(0);
  const [pressed, setPressed] = useState(false);
  const wrapper = document.querySelector(".wrapper-slide");

  window.addEventListener("mouseup", () => {
    console.log("mouseup");
    setPressed(false);
  });

  const stepOne = (e) => {
    console.log("stepOne");
    setPressed(true);
    // setStartX(() => e.clientX);
    // wrapper.style.cursor = "grabbing";
  };

  const stepTwo = () => {
    console.log("stepTwo");
    setPressed(false);
    // wrapper.style.cursor = "grab";
  };

  const moveSlide = () => {
    if (!pressed) {
      return;
    }
    let slide = document.querySelector(".slide");
    let width = slide.offsetWidth;
    let widthAll = slide.offsetWidth * imageLength;
    if (startX <= widthAll) {
      slide.scrollLeft += width;
      setStartX(() => startX + width);
    } 
    else if (startX > 0) {
      slide.scrollLeft -= width;
      setStartX(() => startX - width);
    }
  };

  const nextSlide = () => {
    let slide = document.querySelector(".slide");
    let width = slide.offsetWidth;
    let widthAll = slide.offsetWidth * imageLength;
    if (startX <= widthAll) {
      slide.scrollLeft += width;
      setStartX(() => startX + width);
    }
  };

  const prevSlide = () => {
    let slide = document.querySelector(".slide");
    let width = slide.offsetWidth;
    if (startX > 0) {
      slide.scrollLeft -= width;
      setStartX(() => startX - width);
    }
  };

  return (
    <div
      className="wrapper-slide"
      onMouseDown={stepOne}
      onMouseLeave={stepTwo}
      onMouseMove={moveSlide}
    >
      <div className="slide">
        {children}

        <div className="slide__btn-next" onClick={nextSlide}>
          <span style={{ fontSize: "20px", color: "#fff" }}>{n}</span>
        </div>
        <div className="slide__btn-prev" onClick={prevSlide}>
          <span style={{ fontSize: "20px", color: "#fff" }}>{p}</span>
        </div>
      </div>
    </div>
  );
};
export default TouchSlider;
