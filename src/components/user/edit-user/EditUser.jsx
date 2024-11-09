import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Spinner, AvatarUpload } from "../../../components";
import { useSelector,useDispatch } from "react-redux";
import { updateForceRender } from "../../../slices/forceRenderSlice";
import axios from "axios";
import { BaseURL,config } from "../../../Global/BaseUrl";
import "../../../Global/sass/global-box.scss";


export const EditUser = () => {
  const { id: userId } = useParams();
  const navigate = useNavigate();
  const [inputErrorList, setInputErrorList] = useState({});

  const [user, setUser] = useState({});
  const [typeUser, setTypeUser] = useState(null);

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [url,setUrl] = useState(user.avatar);
  const dispatch =  useDispatch();

  const isSholdRender =  useSelector(state => state.forceRenderSlice.value);

  const handelInput = (event) => {
    event.persist();
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const changeTypeUser = (e) => {
    setTypeUser(e.target.value);
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const fd = new FormData();
      fd.append("name", user.name);
      fd.append("mobile", user.mobile);
      fd.append("email", user.email);
      fd.append("city", user.city);
      fd.append("address", user.address);
      fd.append("type", typeUser ? typeUser : user.type);
      fd.append("password", "1234567");
      fd.append("avatar", image);

      axios({
        method: "post",
        url: BaseURL + `/users/update/${userId}`,
        data: fd,
        headers: {
          "Content-Type": "multipart/form-data",
        },
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
      dispatch(updateForceRender(true));
      navigate("/manager");
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };

  const refreshPage = () => {
    navigate(0);
  };

  const getImage = (img) => {
    setImage(img);
    console.log("img in getImg = ", img);
  };

  useEffect(() => {
    try {
      axios.get(BaseURL  + `/users/${userId}`, config).then((res) => {
        setUser({ ...res.data });
        setLoading(false);
        setTypeUser(res.data.type);
        console.log("typeUser =", typeUser);
        setUrl(res.data.avatar);
      });
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }, []);

  return (
    <div className="page">
      {loading ? (
        <Spinner />
      ) : (
        <form className="page__box" onSubmit={handelSubmit}>
          <span className="page__title">ویرایش اطلاعات کاربر</span>
          <br/>
          <br/>
          <AvatarUpload
              fileImage={image}
              currentImage={url}
              onUpload={getImage}
            />
          <br/>
          <br/>
            <div className="page__type-user">
              <label id="type-admin" className="page__container-radio">
                <span className="page__description">تولید کننده هستم</span>
                <input
                  className=""
                  name="type"
                  id="type-admin"
                  type="radio"
                  value="ADMIN"
                  onChange={changeTypeUser}
                  checked={typeUser === "ADMIN"}

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
                  checked={typeUser === "USER"}
                  onChange={changeTypeUser}
                />
                <span className="page__checkmark"></span>
              </label>

              <span className="page__err">{inputErrorList.type}</span>
            </div>
          <br/>
          <br/>
          <span className="page__help-title">نام و نام خانوادگی</span>
          <input
            className="page__input"
            name="name"
            value={user.name}
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
            value={user.email}
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
            value={user.mobile}
            onChange={handelInput}
            placeholder="مبایل"
          />
          <span className="page__err">{inputErrorList.mobile}</span>
          <br/>
          <br/>
          <span className="page__help__title">شهر</span>
          <input
            className="page__input"
            name="city"
            value={user.city}
            onChange={handelInput}
            placeholder="شهر"
          />
          <span className="page__err">{inputErrorList.city}</span>
          <br/>
          <br/>
          <span className="page__help__title">آدرس</span>
          <input
            className="page__input"
            name="address"
            value={user.address}
            onChange={handelInput}
            placeholder="آدرس"
          />
          <span className="page__err">{inputErrorList.address}</span>


          <div className="page__btns">
            <input
              type="submit"
              className="mybtn mybtn__active"
              value="ویرایش"
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

export default EditUser;
