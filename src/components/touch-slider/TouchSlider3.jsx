import { useState, useEffect } from "react";
import "./touch-slider.scss";

const TouchSlider = ({ children, imageLength }) => {
  const p = "<<";
  const n = ">>";
  const [startX, setStartX] = useState(0);
  const [pressed, setPressed] = useState(false);
  const [startPoint, setStartPoint] = useState(0);
  const [endPoint, setEndPoint] = useState(0);
  const [space, setSpace] = useState(0);

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
    const slide = document.querySelector(".slide");
    const width = slide.offsetWidth;
    setSpace(() => startPoint - endPoint);

    if (startPoint > endPoint) {
      slide.scrollLeft +=  space;
    } else if (startPoint < endPoint) {
      slide.scrollLeft -=  space;
    }
  };

  const dragEnd = (e) => {
    setPressed(false);
    if (e.type !== "touchmove") {
      const wrapper = document.querySelector(".wrapper-slide");
      wrapper.style.cursor = "grab";
    }

    if (startPoint > endPoint) {
      nextSlide();
    } else if (startPoint < endPoint) {
      prevSlide();
    }
  };

  const nextSlide = () => {
    let slide = document.querySelector(".slide");
    let width = slide.offsetWidth;
    let widthAll = slide.offsetWidth * (imageLength - 1);
    if (startX >= widthAll) {
      return;
    }
    if (startX < widthAll) {
      slide.scrollLeft += width - space;
      setStartX(() => startX + (width - space));
    }
  };

  const prevSlide = () => {
    let slide = document.querySelector(".slide");
    let width = slide.offsetWidth;
    if (startX === 0) {
      return;
    }
    if (startX > 0) {
      slide.scrollLeft -= width + space;
      setStartX(() => startX - (width + space));
    }
  };

  return (
    <div
      className="wrapper-slide"
      onMouseDown={dragStart}
      onMouseMove={dragMove}
      onMouseLeave={dragEnd}
      onMouseUp={dragEnd}
      // onMouseOut={dragEnd}
      onTouchStart={dragStart}
      onTouchEnd={dragEnd}
      onTouchMove={dragMove}
    >
      {
        <>
          <div>StartX = {startX}</div>
          <div>Start point : {startPoint}</div>
          <div>End point : {endPoint}</div>
          <div>space = {startPoint - endPoint}</div>
          <div>width = {400 - space}</div>
        </>
      }
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
