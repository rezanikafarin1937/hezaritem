import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Spinner,ImageUpload } from "../../components";
import axios from "axios";

import "./insert-product.scss";

export const InsertProduct = () => {
  const navigate = useNavigate();
  const URL = "http://localhost/back-sef/public/api/products";
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Authorization" : "Bearer hL3mLquFhdkhpj6qEfIBfjyOioIMLe34lr6kmQ9S4R5G77zR0sEzQpfL1zC6ZQaveBRK21K1amv4lBz5x3Gu5wySwvuY15ZqRCvV"
    },
  };
  const [inputErrorList, setInputErrorList] = useState({});

  const [product, setProduct] = useState({
    title: "",
    price: "",
    discount: "",
    shipping_cost: "",
    return: "",
    description: "",
    images: [],
  });

  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);

  const handelInput = (event) => {
    event.persist();
    setProduct({ ...product, [event.target.name]: event.target.value });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const fd = new FormData();
      fd.append("user_id", 1);
      fd.append("title", product.title);
      fd.append("price", product.price);
      fd.append("discount", product.discount);
      fd.append("shipping_cost", product.shipping_cost);
      fd.append("return", product.return);
      fd.append("description", product.description);
      for (let i = 0; i < images.length; i++) {
        fd.append('images[' + i + ']', images[i]);
    }
    console.log('All Images = ',images);
      axios({
        method: "post",
        url: URL,
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
      setProduct({});
      setLoading(false);
      // navigate("/");
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };

  const getImage = (img) => {
    setImages(()=> [...img]);
    console.log('images products = ',images);
  };

  return (
    <div className="page">
      {loading ? (
        <Spinner />
      ) : (
        <form className="page__box" onSubmit={handelSubmit}>
          <ImageUpload  onUpload={getImage}/>
          <hr/>
          <br/>
          <div className="page__container-avatar">
            <div className="page__type-user">
              <label id="type-admin" className="page__container-radio">
                مرجوعی محصول مورد قبول است
                <input
                  className="page__input"
                  name="return"
                  type="radio"
                  value="YES"
                  onChange={handelInput}
                />
                <span className="page__checkmark"></span>
              </label>
              <br />
              <label id="type-admin" className="page__container-radio">
                مرجوعی محصول مورد قبول نیست
                <input
                  className="page__input"
                  name="return"
                  type="radio"
                  value="NO"
                  onChange={handelInput}
                />
                <span className="page__checkmark"></span>
              </label>

              <span className="page__err">{inputErrorList.return}</span>
            </div>
          </div>
          <input
            className="page__input"
            name="title"
            value={product.title}
            onChange={handelInput}
            placeholder="عنوان محصول"
          />
          <span className="page__err">{inputErrorList.title}</span>
          <input
            className="page__input"
            name="price"
            value={product.price}
            onChange={handelInput}
            placeholder="قیمت"
          />
          <span className="page__err">{inputErrorList.price}</span>

          <input
            className="page__input"
            name="discount"
            value={product.discount}
            onChange={handelInput}
            placeholder="تخفیف"
          />
          <span className="page__err">{inputErrorList.discount}</span>

          <input
            className="page__input"
            name="shipping_cost"
            value={product.shipping_cost}
            onChange={handelInput}
            placeholder="هزینه ارسال"
            // required={true}
          />
          <span className="page__err">{inputErrorList.shipping_cost}</span>


          <textarea
            name="description"
            className="page__textarea"
            placeholder="توضیحات"
            value={product.description}
            onChange={handelInput}
          ></textarea>
          <span className="page__err">{inputErrorList.description}</span>

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

export default InsertProduct;
