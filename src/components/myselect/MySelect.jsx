import { useState,useEffect } from "react";
import "./myselect.scss";

const MySelect = ({ onSelect,data,fieldTitle = "title",defaultSelect = {},placeholder = "",id}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [text,setText] = useState("");
  const [myData,setMyData] = useState([]);
  const myroot = document.getElementById(id);

  const openSearch = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsOpen(() => !isOpen);
    if (isOpen) {
      myroot.querySelector(".myselect__area").style.opacity = "1";
      myroot.querySelector(".myselect__area").style.height = "300px";
      myroot.querySelector(".myselect__arrow").style.transform =
        "rotate(180deg)";
    } else {
      myroot.querySelector(".myselect__area").style.opacity = "0";
      myroot.querySelector(".myselect__area").style.height = "0";
      myroot.querySelector(".myselect__arrow").style.transform = "rotate(1deg)";
    }
  };



  const startSearch = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const emitSelect = (data) => {
    myroot.querySelector("#select-input").value = data.name;
    myroot.querySelector("#search-input").value = "";
    setText("");
    onSelect(data);
    setIsOpen(() => true);
    myroot.querySelector(".myselect__area").style.opacity = "0";
    myroot.querySelector(".myselect__area").style.height = "0";
    myroot.querySelector(".myselect__arrow").style.transform = "rotate(0)";
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
    <div className="myselect" id={id}>
      <div className="myselect__input" onClick={openSearch}>
        <input value={defaultSelect ?  defaultSelect[fieldTitle] : ""} id="select-input" placeholder={placeholder} onClick={openSearch} readOnly/>
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
