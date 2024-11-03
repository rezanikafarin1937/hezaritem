import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Spinner, AvatarUpload } from "../../../components";
import axios from "axios";

import "./register.scss";

export const Register = () => {
  const navigate = useNavigate();
  const URL = "http://localhost/back-sef/public/api/users";
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
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
  const [image,setImage] = useState(null);

  const handelInput = (event) => {
    event.persist();
    setUser({ ...getUser, [event.target.name]: event.target.value });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const fd = new FormData();
      fd.append('name',getUser.name)
      fd.append('mobile', getUser.mobile)
      fd.append('email', getUser.email)
      fd.append('city',  getUser.city)
      fd.append('address', getUser.address)
      fd.append('type', getUser.type)
      fd.append('password', '1234567')
      fd.append('avatar',image)
      axios({
        method: 'post',
        url: URL,
        data: fd,
        headers: {
            'Content-Type': 'multipart/form-data',
        }
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

  const getImage = (img) =>{
    setImage(img)
  }

  return (
    <div className="page">
      {loading ? (
        <Spinner />
      ) : (
        <form className="page__box" onSubmit={handelSubmit}>
          <div className="page__container-avatar">
            <div className="page__type-user">
              <label id="type-admin" className="page__container-radio">
                تولید کننده هستم
                <input
                  className=""
                  name="type"
                  id="type-admin"
                  type="radio"
                  value="ADMIN"
                  onChange={handelInput}
                  // required={true}
                />
                <span className="page__checkmark"></span>
              </label>
              <br />
              <label id="type-admin" className="page__container-radio">
                خریدار هستم
                <input
                  className=""
                  name="type"
                  id="type-user"
                  type="radio"
                  value="USER"
                  onChange={handelInput}
                  // required={true}
                />
                <span className="page__checkmark"></span>
              </label>

              <span className="page__err">{inputErrorList.type}</span>
            </div>
            <AvatarUpload currentImage="" onUpload={getImage}/>
          </div>
          <input
            className="page__input"
            name="name"
            value={getUser.name}
            onChange={handelInput}
            placeholder="نام و نام خانوادگی"
            // required={true}
          />
          <span className="page__err">{inputErrorList.name}</span>
          <input
            className="page__input"
            name="email"
            value={getUser.email}
            onChange={handelInput}
            placeholder="ایمیل"
            // required={true}
          />
          <span className="page__err">{inputErrorList.email}</span>

          <input
            className="page__input"
            name="mobile"
            value={getUser.mobile}
            onChange={handelInput}
            placeholder="مبایل"
            // required={true}
          />
          <span className="page__err">{inputErrorList.mobile}</span>

          <input
            className="page__input"
            name="city"
            value={getUser.city}
            onChange={handelInput}
            placeholder="شهر"
            // required={true}
          />
          <span className="page__err">{inputErrorList.city}</span>

          <input
            className="page__input"
            name="address"
            value={getUser.address}
            onChange={handelInput}
            placeholder="آدرس"
            // required={true}
          />
          <span className="page__err">{inputErrorList.address}</span>

          {/* <input
            className="page__input"
            name="avatar"
            value={getUser.avatar}
            onChange={handelInput}
            placeholder="لینک عکس"
            // required={true}
          />
          <span className="err">{inputErrorList.avatar}</span> */}

          <div className="page__btns">
            <input
              type="submit"
              className="mybtn mybtn__sucsess"
              value="ثبت نام کاربر"
            />
            <Link to="/manager" className="mybtn mybtn__denger">
              بازگشت
            </Link>
          </div>
        </form>
      )}
    </div>
  );
};

export default Register;
