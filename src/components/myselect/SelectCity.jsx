import { useState, useEffect } from "react";
import axios from "axios";
import { BaseURL } from "../../Global/BaseUrl";
import { SlideItems, Del, MultipliedBy, MyDelete } from "../../components";
import "./select-city.scss";

const SelectCity = () => {
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [dataCities, setDataCities] = useState([]);
  const [text, setText] = useState("");
  const [showProvince, setShowProvince] = useState(true);
  const [indexProvince, setIndexProvinve] = useState(0);
  const [selected, setSelected] = useState([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      await axios
        .all([
          axios.get(BaseURL + "/cities"),
          axios.get(BaseURL + "/provinces"),
        ])
        .then(
          axios.spread((res1, res2) => {
            setCities(() => [...res1.data]);
            setProvinces(() => [...res2.data]);
            console.log("provinces = ", provinces);
            console.log("cities  = ", cities);
            res2.data.map((p) => {
              let province = p.name;
              let province_id = p.id;
              let cities = res1.data.filter((c) => p.id === c.province_id);
              setData((d) => [
                ...d,
                { province, province_id, cities: [...cities] },
              ]);
            });
          })
        );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      console.log("DATA = ", JSON.stringify(data));
    }
  };

  const searchInputValueInData = () => {
    let myCities = cities.filter((city) => city.name.indexOf(text) > -1);
    setDataCities(() => [...myCities]);
    let elem = document.getElementById("province-header");
    if (elem) {
      elem.style.display = "none";
    }
  };

  useEffect(() => {
    fetchData();
    setDataCities([...cities]);
  }, []);

  useEffect(() => {
    searchInputValueInData();
  }, [text]);

  const openCities = (index) => {
    setShowProvince(false);
    let myCities = cities.filter((city) => city.province_id === index + 1);
    setDataCities([...myCities]);
    setIndexProvinve(() => index);
  };

  const closeCities = (e) => {
    e.stopPropagation();
    setShowProvince(true);
  };

  const handleInput = (e) => {
    setText(() => e.target.value);
    setShowProvince(false);
    if (e.target.value.length === 0) {
      setShowProvince(true);
    }
    console.log("slect cities = ", cities);
  };

  const addToSelected = (city) => {
    if (selected.length === 0) {
      setSelected((c) => [...c, city]);
      console.log("مرحله اول");
      return;
    } else {
      let test = selected.filter((s) => s.id === city.id);
      if (test.length === 0) {
        setSelected((c) => [...c, city]);
        console.log("مرحله دوم", test);
      }
    }
  };

  const delInSelected = (city) => {
    let del = selected.filter((s) => s.id !== city.id);
    setSelected(() => [...del]);
  };

  return (
    <div className="select-city">
      <header className="select-city__header">
        <p className="select-city__title">انتخاب شهر</p>
        <p className="select-city__delete">حذف همه</p>
      </header>
      <div className="select-city__parent-select">
        {selected.length === 0 ? (
          <div style={{ marginBottom: "1rem" }}>
            حداقل یک شهر را انتخاب کنید.
          </div>
        ) : (
          <SlideItems>
            {selected.map((h) => (
              <span className="select-city__btn-select" key={h.id}>
                {h.name}
                <span style={{ margin: "0 .5rem" }}></span>
                <div
                  className="select-city__delete"
                  onClick={() => delInSelected(h)}
                >
                  <MyDelete width="9px" height="9px" />
                </div>
              </span>
            ))}
          </SlideItems>
        )}
      </div>
      <div className="select-city__input">
        <input placeholder="جستجو" onChange={handleInput} />
      </div>
      <div className="select-city__provinces">
        {showProvince ? (
          data.map((d, index) => (
            <div
              className="select-city__province"
              key={index}
              onClick={() => openCities(index)}
            >
              <p>{d.province}</p>
              <div className="select-city__arrow"></div>
            </div>
          ))
        ) : (
          <div>
            <div
              className="select-city__header"
              onClick={(e) => closeCities(e)}
            >
              <div
                className="select-city__province select-city__balance"
                id="province-header"
              >
                <span> استان {provinces[indexProvince].name}</span>
                <div
                  className="select-city__arrow"
                  style={{ top: "1rem",transform : "rotate(-90deg)" }}
                ></div>
              </div>
            </div>
            <div className="select-city__cities">
              {text.length === 0 ? (
                <div className="select-city__item">
                  <input type="checkbox" />
                  <span>همه ی شهرهای {provinces[indexProvince].name}</span>
                </div>
              ) : null}
              {dataCities.map((c) => (
                <div
                  key={c.id}
                  className="select-city__item"
                  onClick={() => addToSelected(c)}
                >
                  <input type="checkbox" />
                  <span>{c.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <footer className="select-city__footer">
        <span className="mybtn mybtn__inactive mybtn__long">انصراف</span>
        <span className="mybtn__space"></span>
        <span className="mybtn mybtn__active mybtn__long">تایید</span>
      </footer>
    </div>
  );
};

export default SelectCity;
