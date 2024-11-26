import { useState } from "react";
import "./myselect.scss";

const MySelect = ({ onSelect,data }) => {
  const [isOpen, setIsOpen] = useState(true);

  const openSearch = (e) => {
    e.stopPropagation();
    setIsOpen(() => !isOpen);
    if (isOpen) {
      document.querySelector(".myselect__area").style.opacity = "1";
      document.querySelector(".myselect__area").style.height = "300px";
      document.querySelector(".myselect__arrow").style.transform =
        "rotate(180deg)";
    } else {
      document.querySelector(".myselect__area").style.opacity = "0";
      document.querySelector(".myselect__area").style.height = "0";
      document.querySelector(".myselect__arrow").style.transform = "rotate(0)";
    }
  };

  window.addEventListener("click", function () {
    setIsOpen(() => true);
    document.querySelector(".myselect__area").style.opacity = "0";
    document.querySelector(".myselect__area").style.height = "0";
    document.querySelector(".myselect__arrow").style.transform = "rotate(0)";
  });

  const startSearch = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const emitSelect = (data) => {
    document.querySelector("#input-select").value = data.name;
    onSelect(data);
    setIsOpen(() => true);
    document.querySelector(".myselect__area").style.opacity = "0";
    document.querySelector(".myselect__area").style.height = "0";
    document.querySelector(".myselect__arrow").style.transform = "rotate(0)";


  }

  return (
    <div className="myselect">
      <div className="myselect__input" onClick={openSearch}>
        <input id="input-select" placeholder="انتخاب شهر" onClick={openSearch} />
        <span className="myselect__arrow"></span>
      </div>
      <div className="myselect__area" onClick={startSearch}>
        <input placeholder="جستجو" />
        {data.map((d, index) => (
          <div className="myselect__data" key={index} onClick={() => emitSelect(d)}>
            {d.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MySelect;
