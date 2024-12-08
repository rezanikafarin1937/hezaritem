import { useState, useEffect } from "react";
import axios from "axios";
import { BaseURL } from "../../Global/BaseUrl";
import "./select-city.scss";

const SelectCity = () => {
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [dataCities, setDataCities] = useState([]);
  const [newData, setNewData] = useState([]);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [showProvince, setShowProvince] = useState(true);
  const [indexProvince, setIndexProvinve] = useState(0);

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

  return (
    <div className="select-city">
      <header className="select-city__header">
        <p className="select-city__title">انتخاب شهر</p>
        <p className="select-city__delete">حذف همه</p>
      </header>
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
                  style={{ top: "1rem" }}
                ></div>
              </div>
            </div>
            <div className="select-city__cities">
              {dataCities.map((c) => (
                <div className="select-city__item">
                  <input type="checkbox"/>
                  <span key={c.id}>{c.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectCity;
