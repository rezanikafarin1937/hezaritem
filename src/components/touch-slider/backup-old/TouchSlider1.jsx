import { useState } from "react";
import "./touch-slider.scss";

const TouchSlider = ({ children, imageLength }) => {
  const p = "<<";
  const n = ">>";
  const [startX, setStartX] = useState(0);
  const [pressed, setPressed] = useState(false);
  const [startPointTouch, setStartPointTouch] = useState(0);
  const [endPointTouch, setEndPointTouch] = useState(0);

  window.addEventListener("mouseup", () => {
    setPressed(false);
  });

  const touchStartFunc = (e) => {
    setStartPointTouch(() => Math.round(e.touches[0].clientX));
    console.log("clientX touchStart = ", startPointTouch);
    setPressed(true);
  };

  const touchEndFunc = (e) => {
    setPressed(false);
  };

  const touchCancelFunc = (e) => {
    console.log("endPoint touchCancel = ", e.touches[0].clientX);
  };
  const touchMoveFunc = (e) => {
    if (!pressed) {
      return;
    }
    setEndPointTouch(() => Math.round(e.touches[0].clientX));
    console.log('endPoint touchMoveFunc = ',endPointTouch);

    if (startPointTouch > endPointTouch) {
      nextSlide();
    } else if (startPointTouch < endPointTouch) {
      prevSlide();
    }
    setPressed(false);
    // setStartPointTouch(() => 0);
    // setEndPointTouch(() => 0);
  };

  const mouseDownFunc = (e) => {
    setPressed(true);
    setStartPointTouch(() => Math.round(e.clientX));
    console.log('start point = ',startPointTouch)
    const wrapper = document.querySelector(".wrapper-slide");
    wrapper.style.cursor = "grabbing";
  };

  const mouseLeaveFunc = (e) => {
    setPressed(false);
    const wrapper = document.querySelector(".wrapper-slide");
    wrapper.style.cursor = "grab";
  };


  const mouseMoveFunc = (e) => {
    if (!pressed) {
      return;
    }
    setEndPointTouch(() => Math.round(e.clientX));
    console.log('end point = ',endPointTouch);
    if (startPointTouch > endPointTouch) {
      nextSlide();
    } else if (startPointTouch < endPointTouch) {
      prevSlide();
    }

    // let slide = document.querySelector(".slide");
    // let width = slide.offsetWidth;
    // let widthAll = slide.offsetWidth * (imageLength - 1);
    // if (startX < widthAll) {
    //   slide.scrollLeft += width;
    //   setStartX(() => startX + width);
    // } else if (startX > 0) {
    //   slide.scrollLeft -= width;
    //   setStartX(() => startX - width);
    // }
    setPressed(false);
  };

  const nextSlide = () => {
    let slide = document.querySelector(".slide");
    let width = slide.offsetWidth;
    let widthAll = slide.offsetWidth * (imageLength - 1);
    if (startX >= widthAll) {
      console.log("startX = ", startX);
      return;
    }
    if (startX < widthAll) {
      slide.scrollLeft += width;
      setStartX(() => startX + width);
      console.log("startX = ", startX);
    }
  };

  const prevSlide = () => {
    let slide = document.querySelector(".slide");
    let width = slide.offsetWidth;
    if (startX === 0) {
      // console.log('startX = ',startX)
      return;
    }
    if (startX > 0) {
      slide.scrollLeft -= width;
      setStartX(() => startX - width);
      // console.log('startX = ',startX);
    }
  };

  return (
    <div
      className="wrapper-slide"
      onMouseDown={mouseDownFunc}
      onMouseLeave={mouseLeaveFunc}
      onMouseMove={mouseMoveFunc}
      onMouseUp={mouseLeaveFunc}
      onTouchStart={touchStartFunc}
      onTouchEnd={touchEndFunc}
      onTouchMove={touchMoveFunc}
      onTouchCancel={touchCancelFunc}
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
