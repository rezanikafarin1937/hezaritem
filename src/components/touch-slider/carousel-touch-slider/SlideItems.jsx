import { useState, useEffect } from "react";
import "./slide-items.scss";

const SlideItems = ({ children }) => {
  const [pressed, setPressed] = useState(false);
  const [compare, setCompare] = useState(0);
  const [startPoint, setStartPoint] = useState(0);
  const [endPoint, setEndPoint] = useState(0);
  const [dragLength, setDragLength] = useState(0);

  const handleOnWeel = (e) => {
    const container = document.getElementById("container");
    if (e.deltaY > 0) {
      container.scrollLeft += 100;
      e.preventDefault();
    } else {
      container.scrollLeft -= 100;
      e.preventDefault();
    }
  };

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
      if (compare === -1) {
        setEndPoint(() => e.touches[0].clientX);
      } else if (compare === 1) {
        setEndPoint(() => e.touches[0].clientX);
      }
    }
  };

  const dragEndTouch = (e) => {
    const slide = document.getElementById("container");
    slide.style.transform = `translateX(0)`;
    setEndPoint(() => e.changedTouches[0].clientX);
    setPressed(false);
  };


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



  return (
    <div
      id="container"
      className="slide-items"
      onWheel={(e) => handleOnWeel(e)}
      onTouchStart={dragStart}
      onTouchEnd={dragEndTouch}
      onTouchMove={dragMove}
>
      {children}
    </div>
  );
};

export default SlideItems;
