import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Spinner, ImageUpload } from "../../components";
import axios from "axios";
import PN from "persian-number";
import { BaseURL } from "../../Global/BaseUrl";
import "../../Global/sass/global-box.scss";

export const InsertProduct = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const [inputErrorList, setInputErrorList] = useState({});

  const [product, setProduct] = useState({
    title: "",
    price: "",
    discount: "",
    shipping_cost: "",
    return: "",
    description: "",
    images: [],
    category: 0,
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
      fd.append("category", product.category);
      fd.append("discount", product.discount);
      fd.append("shipping_cost", product.shipping_cost);
      fd.append("return", product.return);
      fd.append("description", product.description);
      for (let i = 0; i < images.length; i++) {
        fd.append("images[" + i + "]", images[i]);
      }
      axios({
        method: "post",
        url: BaseURL + "/products",
        data: fd,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).catch((err) => {
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
      navigate("/");
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };

  const getImage = (img) => {
    setImages(() => [...img]);
  };

  useEffect(() => {
    axios.get(BaseURL + "/categories").then((res) => {
      setCategories([...res.data]);
    });
  }, []);

  return (
    <div className="page">
      {loading ? (
        <Spinner />
      ) : (
        <form className="page__box" onSubmit={handelSubmit}>
          <span className="page__title">ثبت محصول</span>
          <hr />
          <br />
          <label id="type-admin" className="page__container-select">
            <span className="page__description">
              محصول شما در کدام دسته بندی قرار دارد
            </span>
            <br />
            <select
              className="page__select"
              name="category"
              value={product.category}
              onChange={handelInput}
            >
              <option value={0}>انتخاب دسته بندی</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <span className="page__err">{inputErrorList.category}</span>
          </label>
          <br />
          <br />
          <span className="page__help-title">عکس محصول</span>
          <ImageUpload onUpload={getImage} />
          <span className="page__description">
            تعداد عکس‌های انتخاب شده نباید بیشتر از ۲۰ باشد.
          </span>
          <br />
          <br />
          <span className="page__help-title">وضعیت مرجوعی</span>
          <div className="page__container-avatar">
            <div className="page__type-user">
              <label id="type-admin" className="page__container-radio">
                <span className="page__discription">
                  مرجوعی محصول مورد قبول است
                </span>

                <input
                  className="page__input"
                  name="return"
                  type="radio"
                  value="YES"
                  onChange={handelInput}
                />
                <span className="page__checkmark"></span>
              </label>
              <label id="type-admin" className="page__container-radio">
                <span className="page__discription">
                  مرجوعی محصول مورد قبول نیست
                </span>
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
          <br />
          <br />
          <span className="page__help-title">عنوان محصول</span>
          <input
            className="page__input"
            name="title"
            value={product.title}
            onChange={handelInput}
            placeholder="عنوان محصول"
          />
          <span className="page__err">{inputErrorList.title}</span>
          <br />

          <span className="page__help-title">قیمت محصول</span>
          <input
            className="page__input"
            name="price"
            value={product.price}
            onChange={handelInput}
            placeholder="قیمت"
          />
          <span className="page__description">
            {PN.convert(product.price)} تومان
          </span>
          <span className="page__err">{inputErrorList.price}</span>
          <br />
          <span className="page__help-title">تخفیف</span>
          <input
            className="page__input"
            name="discount"
            value={product.discount}
            onChange={handelInput}
            placeholder="چند درصد امکان تخفیف وجود دارد"
          />
          <span className="page__description">
            {PN.convert(product.discount)} درصد
          </span>
          <span className="page__err">{inputErrorList.discount}</span>

          <br />
          <span className="page__help-title">هزینه ارسال</span>
          <input
            className="page__input"
            name="shipping_cost"
            value={product.shipping_cost}
            onChange={handelInput}
            placeholder="هزینه ارسال"
          />
          <span className="page__description">
            {PN.convert(product.shipping_cost)} تومان
          </span>
          <span className="page__err">{inputErrorList.shipping_cost}</span>

          <br />
          <span className="page__help-title">توضیحات محصول</span>
          <textarea
            name="description"
            className="page__textarea"
            value={product.description}
            onChange={handelInput}
          ></textarea>
          <span className="page__err">{inputErrorList.description}</span>

          <div className="page__btns">
            <input
              type="submit"
              className="mybtn mybtn__active"
              value="ثبت محصول"
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

export default InsertProduct;
