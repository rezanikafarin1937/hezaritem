import { useState, useEffect } from "react";
import "./carousel-touch-slider.scss";

const CarouselTouchSlider = ({
  children,
  imageLength,
  webStyle = true,
  dots = false,
  btnSharp = false
}) => {
  const [pressed, setPressed] = useState(false);
  const [startPoint, setStartPoint] = useState(0);
  const [endPoint, setEndPoint] = useState(0);
  const [dragLength, setDragLength] = useState(0);
  const [compare, setCompare] = useState(0);
  const [indexImage, setIndexImage] = useState(0);

  const btnRight = btnSharp ? ".wrapper-slide__right-btn-sharp" : ".wrapper-slide__right-btn";
  const btnLeft = btnSharp ? ".wrapper-slide__left-btn-sharp" : ".wrapper-slide__left-btn";

  useEffect(() => {
    if (startPoint > endPoint) {
      setCompare(() => 1);
    } else if (startPoint < endPoint) {
      setCompare(() => -1);
    } else {
      setCompare(() => 0);
    }
    setDragLength(() => startPoint - endPoint);
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
    }
  };

  const dragMove = (e) => {
    if (!pressed) {
      return;
    }
    setPressed(false);
    if (e.type === "touchmove") {
      if (indexImage === 0 && compare === -1) {
        setEndPoint(() => e.touches[0].clientX);
        document.querySelector(".slide").style.transform = `translateX(100px)`;
        document.querySelector(".wrapper-slide").style.overflow = "hidden";
      } else if (indexImage >= imageLength - 1 && compare === 1) {
        setEndPoint(() => e.touches[0].clientX);
        document.querySelector(".slide").style.transform = `translateX(-100px)`;
        document.querySelector(".wrapper-slide").style.overflow = "hidden";
      }
    }
  };

  const dragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setEndPoint(() => e.clientX);
    const slide = document.querySelector(".slide");
    const width = slide.offsetWidth;
    if (dragLength <= width / 2) {
      slide.style.transform = `translateX(${startPoint - e.clientX}px)`;
      document.querySelector(".wrapper-slide").style.overflow = "hidden";
    }
  };

  const dragEndTouch = (e) => {
    const slide = document.querySelector(".slide");
    const width = slide.offsetWidth;
    document.querySelector(".wrapper-slide").style.overflow = "visible";
    document.querySelector(".slide").style.transform = `translateX(0)`;
    setEndPoint(() => e.changedTouches[0].clientX);
    if (compare === 1 && Math.abs(dragLength) >= (width / 4)) {
      nextSlide();
    } else if (compare === -1 && Math.abs(dragLength) >= (width / 4)) {
      prevSlide();
    } else {
      slide.scrollLeft = indexImage * width;
    }
    setPressed(false);
  };

  const dragEnd = (e) => {
    setEndPoint(() => e.clientX);
    const slide = document.querySelector(".slide");
    const width = slide.offsetWidth;
    slide.style.transform = `translateX(${0}px) scale(1) rotateY(0)`;
    document.querySelector(".wrapper-slide").style.overflow = "visible";
    document.querySelector(".slide").style.transform = `translateX(0)`;

    if (compare === 1 && Math.abs(dragLength) >= (width / 3)) {
      nextSlide();
    } else if (compare === -1 && Math.abs(dragLength) >= (width / 3)) {
      prevSlide();
    } else {
      slide.scrollLeft = indexImage * width;
    }
    document.querySelector(btnRight).style.opacity = "1";
    document.querySelector(btnLeft).style.opacity = "1";
  };

  const nextSlide = () => {
    if (indexImage < imageLength - 1) {
      shiftIndexImage(indexImage + 1);
    } else if (indexImage >= imageLength - 1) {
      shiftIndexImage(imageLength - 1);
      document.querySelector(btnLeft).style.opacity = "0";
    }
  };

  const prevSlide = () => {
    if (indexImage > 0) {
      shiftIndexImage(indexImage - 1);
    } else if (indexImage <= 0) {
      shiftIndexImage(0);
      document.querySelector(btnRight).style.opacity = "0";
    }
  };

  const shiftIndexImage = (index) => {
    let slide = document.querySelector(".slide");
    let width = slide.offsetWidth;
    slide.scrollLeft = index * width;
    setIndexImage(() => index);
    document.querySelector(btnRight).style.opacity = "1";
    document.querySelector(btnLeft).style.opacity = "1";
  };

  return (
    <>
      <div
        className="wrapper-slide"
        onMouseDown={dragStart}
        onMouseMove={dragMove}
        onDragStart={dragStart}
        onDragOver={dragOver}
        onDragEnd={dragEnd}
        onTouchStart={dragStart}
        onTouchEnd={dragEndTouch}
        onTouchMove={dragMove}
      >
        <div
          style={dots ? {} : { display: "none" }}
          className="wrapper-slide__dots"
        >
          {children.map((child, index) => (
            <div
              key={index}
              className={
                index === indexImage
                  ? "wrapper-slide__dot-bold"
                  : "wrapper-slide__dot"
              }
            ></div>
          ))}
        </div>
        <div
          style={!webStyle ? { display: "none" } : {}}
          className={btnSharp ? "wrapper-slide__right-btn-sharp" : "wrapper-slide__right-btn"}
          onClick={prevSlide}
        >
          <span className={btnSharp ? "arrow-next" : "arrow-right"}></span>
        </div>
        <div
          style={!webStyle ? { display: "none" } : {}}
          className={btnSharp ? "wrapper-slide__left-btn-sharp" : "wrapper-slide__left-btn"}
          onClick={nextSlide}
        >
          <span className={btnSharp ? "arrow-prev" : "arrow-left"}></span>
        </div>

        <div className={btnSharp ? "slide" : "slide slide__border-radius"}>{children}</div>
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
export default CarouselTouchSlider;
