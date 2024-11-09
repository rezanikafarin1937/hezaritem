import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Spinner, AvatarUpload } from "../../../components";
import { BaseURL,headers } from "../../../Global/BaseUrl";
import axios from "axios";

import "../../sass/global-box.scss";

export const Register = () => {
  const navigate = useNavigate();
  const [inputErrorList, setInputErrorList] = useState({});

  const [getUser, setUser] = useState({
    name: "",
    mobile: "",
    type: "",
    city: "",
    address: "",
    email: "",
    password: "",
    avatar: {},
  });

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  const handelInput = (event) => {
    event.persist();
    setUser({ ...getUser, [event.target.name]: event.target.value });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const fd = new FormData();
      fd.append("name", getUser.name);
      fd.append("mobile", getUser.mobile);
      fd.append("email", getUser.email);
      fd.append("city", getUser.city);
      fd.append("address", getUser.address);
      fd.append("type", getUser.type);
      fd.append("password", "1234567");
      fd.append("avatar", image);
      axios({
        method: "post",
        url: `${BaseURL}/users`,
        data: fd,
        headers: headers
      })
        .then((res) => console.log("response = ", res))
        .catch((err) => {
          if (err.response) {
            if (err.response.status === 422) {
              setInputErrorList(err.response.data.errors);
            }
            if (err.response.status === 500) {
              alert(err.response.data);
            }
          }
        });
      setUser({});
      setLoading(false);
      navigate("/manager");
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };

  const getImage = (img) => {
    setImage(img);
  };

  return (
    <div className="page">
      {loading ? (
        <Spinner />
      ) : (
        <form className="page__box" onSubmit={handelSubmit}>
          <span className="page__title">ثبت نام کاربر</span>
          <br />
          <br />
          <span className="page__description">تصویر آواتار</span>
          <AvatarUpload currentImage="" onUpload={getImage} />
          <br />
          <br />
          <span className="page__help-title">تولید کننده یا خریدار</span>
          <div className="page__container-avatar">
            <div className="page__type-user">
              <label id="type-admin" className="page__container-radio">
                <span className="page__description">تولید کننده هستم</span>

                <input
                  className=""
                  name="type"
                  id="type-admin"
                  type="radio"
                  value="ADMIN"
                  onChange={handelInput}
                />
                <span className="page__checkmark"></span>
              </label>
              <label id="type-admin" className="page__container-radio">
                <span className="page__description">خریدار هستم</span>

                <input
                  className=""
                  name="type"
                  id="type-user"
                  type="radio"
                  value="USER"
                  onChange={handelInput}
                />
                <span className="page__checkmark"></span>
              </label>

              <span className="page__err">{inputErrorList.type}</span>
            </div>
            {/* <AvatarUpload currentImage="" onUpload={getImage}/> */}
          </div>
          <br/>
          <br/>
          <span className="page__help-title">نام و نام خانوادگی</span>
          <input
            className="page__input"
            name="name"
            value={getUser.name}
            onChange={handelInput}
            placeholder="نام و نام خانوادگی"
          />
          <span className="page__err">{inputErrorList.name}</span>
          <br/>
          <br/>
          <span className="page__help-title">ایمیل</span>
          <input
            className="page__input"
            name="email"
            value={getUser.email}
            onChange={handelInput}
            placeholder="ایمیل"
          />
          <span className="page__err">{inputErrorList.email}</span>

          <br/>
          <br/>
          <span className="page__help-title">مبایل</span>
          <input
            className="page__input"
            name="mobile"
            value={getUser.mobile}
            onChange={handelInput}
            placeholder="مبایل"
          />
          <span className="page__err">{inputErrorList.mobile}</span>

          <br/>
          <br/>
          <span className="page__help-title">شهر</span>
          <input
            className="page__input"
            name="city"
            value={getUser.city}
            onChange={handelInput}
            placeholder="شهر"
          />
          <span className="page__err">{inputErrorList.city}</span>

          <br/>
          <br/>
          <span className="page__help-title">آدرس</span>
          <input
            className="page__input"
            name="address"
            value={getUser.address}
            onChange={handelInput}
            placeholder="آدرس"
            // required={true}
          />
          <span className="page__err">{inputErrorList.address}</span>


          <div className="page__btns">
            <input
              type="submit"
              className="mybtn mybtn__active"
              value="ثبت نام کاربر"
            />
            <span className="mybtn__space"></span>
            <Link to="/manager" className="mybtn mybtn__inactive">
              بازگشت
            </Link>
          </div>
        </form>
      )}
    </div>
  );
};

export default Register;
