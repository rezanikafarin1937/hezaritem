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
  const [width, setWidth] = useState(0);
  const [widthAll, setWidthAll] = useState(0);

  useEffect(() => {
    setWidth(() => document.querySelector(".slide").offsetWidth);
    setWidthAll(() => width * (imageLength - 1));
  }, []);

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
    setWidth(() => slide.offsetWidth);
    setSpace(() => startPoint - endPoint);

    if (startPoint > endPoint) {
      setWidth(() => width - space);
      slide.scrollLeft += width;
    } else if (startPoint < endPoint) {
      setWidth(() => width + space);
      slide.scrollLeft -= width;
    }
  };

  const dragEnd = (e) => {
    setPressed(false);
    if (e.type !== "touchmove") {
      const wrapper = document.querySelector(".wrapper-slide");
      wrapper.style.cursor = "grab";
    }
    setWidth(() => document.querySelector(".slide").offsetWidth);

    if (startPoint > endPoint) {
      nextSlide();
    } else if (startPoint < endPoint) {
      prevSlide();
    }
  };

  const nextSlide = () => {
    setWidth(() => document.querySelector(".slide").offsetWidth);
    if (startX >= widthAll) {
      return;
    }
    if (startX < widthAll) {
      const slide = document.querySelector(".slide");
      slide.scrollLeft += width;
      setStartX(() => startX + width);
    }
  };

  const prevSlide = () => {
    setWidth(() => document.querySelector(".slide").offsetWidth);
    if (startX === 0) {
      return;
    }
    if (startX > 0) {
      let slide = document.querySelector(".slide");
      slide.scrollLeft -= width;
      setStartX(() => startX - width);
    }
  };

  return (
    <div
      className="wrapper-slide"
      onMouseDown={dragStart}
      onMouseMove={dragMove}
      onMouseLeave={dragEnd}
      onMouseUp={dragEnd}
      onMouseOut={dragEnd}
      onTouchStart={dragStart}
      onTouchEnd={dragEnd}
      onTouchMove={dragMove}
    >
      {
        <>
          <div>Start point : {startPoint}</div>
          <div>End point : {endPoint}</div>
          <div>{startPoint - endPoint}</div>
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
