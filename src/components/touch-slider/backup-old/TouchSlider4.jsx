import { useState } from "react";
import "./touch-slider.scss";

const TouchSlider = ({ children, imageLength }) => {
  const p = "<<";
  const n = ">>";
  const [startX, setStartX] = useState(0);
  const [pressed, setPressed] = useState(false);

  window.addEventListener("mouseup", () => {
    // console.log("mouseup");
    setPressed(false);
  });

  const mouseDownFunc = (e) => {
    let wrapperSlide = document.querySelector(".wrapper-slide");
    let slide = document.querySelector(".slide");
    setPressed(true);
    setStartX(() => e.offsetX - slide.offsetLeft);
    wrapperSlide.style.cursor = "grabbing";
    // console.log('mouseDownFunc client X = ',e.clientX);
  };

  const mouseEnterFunc = () => {
    let wrapperSlide = document.querySelector(".wrapper-slide");
    wrapperSlide.style.cursor = "grab";
    // console.log('mouseEnterFunc');
  };

  const mouseUpFunc = (e) => {
    setPressed(false);
    let wrapperSlide = document.querySelector(".wrapper-slide");
    wrapperSlide.style.cursor = "grab";
    console.log('mouseUpFunc client X = ',e.clientX);
  };

  const mouseMoveFunc = (e) => {
    if (!pressed) {
      return;
    }
    // e.preventDefault();
    let x = e.offsetX;
    let slide = document.querySelector(".slide");
    slide.style.left = `${x - startX}px`;
    console.log('mouseMoveFunc , offesetX = ',e.clientX);


    // let slide = document.querySelector(".slide");
    // let width = slide.offsetWidth;
    // let widthAll = slide.offsetWidth * imageLength;
    // if (startX <= widthAll) {
    //   slide.scrollLeft += width;
    //   setStartX(() => startX + width);
    // } else if (startX > 0) {
    //   slide.scrollLeft -= width;
    //   setStartX(() => startX - width);
    // }
  };


  const touchStartFunc = (e) => {
    setPressed(true);
    let slide = document.querySelector(".slide");
    setStartX(() => e.offsetX - slide.offsetLeft);
    let wrapperSlide = document.querySelector(".wrapper-slide");
    wrapperSlide.style.cursor = "grabbing";
    // console.log('touchStartFunc');
  }

  const touchEndFunc = (e) => {
    setPressed(false);
    let wrapperSlide = document.querySelector(".wrapper-slide");
    wrapperSlide.style.cursor = "grab";
    // console.log('touchEndFunc')
    console.log('touchEndFunc client X = ',e.clientX);


  }

  const touchMoveFunc = (e) => {
    if (!pressed) return;
    // e.preventDefault();
    let x = e.offsetX;
    let slide = document.querySelector(".slide");
    slide.style.left = `${x - startX}px`;
    console.log('touchMoveFunc client X = ',e.clientX);
  }

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
      onMouseDown={mouseDownFunc}
      onMouseUp={mouseUpFunc}
      onMouseEnter={mouseEnterFunc}
      onMouseMove={mouseMoveFunc}
      onTouchStart={touchStartFunc}
      onTouchEnd={touchEndFunc}
      onTouchMove={touchMoveFunc}
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
