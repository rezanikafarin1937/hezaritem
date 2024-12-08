import { useState, useEffect } from "react";
import axios from "axios";
import { BaseURL } from "../../Global/BaseUrl";
import "./select-city.scss";

const SelectCity = () => {
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState([]);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

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
              setData((d) => [...d, { province,province_id, cities: [...cities] }]);
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

  const addToCities = (myProvince,provinceId, myCities) => {

    myCities.map(city => {
        let newdata = data.filter(d => d.province_id === city.province_id);
        setNewData((d) => [...d,...newdata]);
        console.log('newdata = ',newdata);
    })

    // setData(() => [...newData]);

    // setData((d) =>[...d,...data.filter(d => d.province_id === provinceId)]);
    // if (newData.length === 0) {
    //   setNewData((nd) => [
    //     ...nd,
    //     { province: myProvince, cities: [...myCities] },
    //   ]);
    //   return;
    // }
    // let myFilter = newData.filter((nd) => nd.province == myProvince);
    // if (myFilter === null) {
    //   setNewData((nd) => [
    //     ...nd,
    //     { province: myProvince, cities: [...myCities] },
    //   ]);
    // }
  };
  const searchInputValueInData = () => {
    if (data.length > 0) {
      data.map((d) => {
        let myCities = d.cities.filter((city) => city.name.indexOf(text) > -1);
        if (myCities) {
          addToCities(d.province,d.province_id, myCities);
            // setNewData((nd) => [...nd,{ province: d.province, cities: [...myCities] }]);
        }
        // console.log("newData = ", newData);
      });
        // setData((nd)=> [...nd,...newData]);
    //     console.log("data = ", data);
    // console.log("cities = ",cities);
    // console.log("province =",provinces);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    searchInputValueInData();
  }, [text]);

  const openCities = (index) => {
    if (!open) {
      document.getElementById("item" + index).style.height = "250px";
      document.getElementById("arrow" + index).style.transform =
        "rotate(-90deg)";
      setOpen(true);
    } else {
      document.getElementById("item" + index).style.height = "0";
      document.getElementById("arrow" + index).style.transform = "rotate(0)";
      setOpen(false);
    }
  };

  const handleInput = (e) => {
    setText(() => e.target.value);
    console.log("text = ", text);
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
        {data.map((d, index) => (
          <div
            className="select-city__province"
            key={index}
            onClick={() => openCities(index)}
          >
            <p>{d.province}</p>
            <div className="select-city__arrow" id={"arrow" + index}></div>
            <div className="select-city__cities" id={"item" + index}>
              <div className="select-city__parent">
                <div className="select-city__city">
                  همه ی شهرهای استان {d.province}
                </div>
                {d.cities.map((c) => (
                  <div className="select-city__city" key={c.id}>
                    {c.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectCity;
