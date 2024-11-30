import { useState,useEffect } from "react";
import "./myselect.scss";

const MySelect = ({ onSelect,data,fieldTitle = "title",defaultTitle = ""}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [text,setText] = useState("");
  const [myData,setMyData] = useState([]);

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
      document.querySelector(".myselect__arrow").style.transform = "rotate(1deg)";
    }
  };



  const startSearch = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const emitSelect = (data) => {
    document.querySelector("#select-input").value = data.name;
    document.querySelector("#search-input").value = "";
    setText("");
    onSelect(data);
    setIsOpen(() => true);
    document.querySelector(".myselect__area").style.opacity = "0";
    document.querySelector(".myselect__area").style.height = "0";
    document.querySelector(".myselect__arrow").style.transform = "rotate(0)";
  }


  const handelInputSearch = (event) => {
    event.persist();
    setText(event.target.value);
  };
  
  const searchInputValueInData = () => {
     let mydata =  data.filter(d => d.name.indexOf(text) > -1);
     setMyData(() => [...mydata]);

  }

  useEffect(()=>{
    searchInputValueInData();
  },[text]);

  return (
    <div className="myselect">
      <div className="myselect__input" onClick={openSearch}>
        <input value={defaultTitle} id="select-input" placeholder="انتخاب شهر" onClick={openSearch} readOnly/>
        <span className="myselect__arrow"></span>
      </div>
      <div className="myselect__area" onClick={startSearch}>
        <input placeholder="جستجو" name="search" id="search-input" onChange={(e) => handelInputSearch(e)}/>
        {myData.map((d, index) => (
          <div className="myselect__data" key={index} onClick={() => emitSelect(d)}>
            {d[fieldTitle]}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MySelect;
