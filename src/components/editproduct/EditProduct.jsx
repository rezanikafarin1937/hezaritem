import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProduct } from "../../services/Service";
import { Spinner, ImageUpload } from "../../components";
import axios from "axios";
import PN from "persian-number";
import { BaseURL, headers } from "../../Global/BaseUrl";
import "../../Global/sass/global-box.scss";
export const EditProduct = () => {
  const navigate = useNavigate();
  const { id: userId } = useParams();

  const [inputErrorList, setInputErrorList] = useState({});
  const [categories, setCategories] = useState([]);

  const [product, setProduct] = useState({
    id: null,
    title: "",
    shipping_cost: "",
    return: "",
    description: "",
    price: "",
    // category: 0,
    image: {},
    images: [],
    idDeleteImages: [],
    nameDeleteImages: [],
  });

  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [returnProduct, setReturnProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [idDeleteImages, setIdDeleteImages] = useState([]);
  const [nameDeleteImages, setNameDeleteImages] = useState([]);

  const getImage = (addImages, delImage) => {
    setImages(() => [...addImages]);
    delImage.map((img) => {
      if (img.old) {
        setIdDeleteImages((d) => [...d, img.id]);
        setNameDeleteImages((n) => [...n, giveNameToOldImage(img)]);
      }
    });
  };

  const removeImages = (delImage) => {
    setIdDeleteImages(() => [...delImage]);
  };

  const giveNameToOldImage = (image) => {
    let dot = image.name.indexOf(".");
    let extension = image.name.slice(dot);
    let slash = image.name.lastIndexOf("/");
    let name = image.name.slice(slash + 1, dot) + extension;
    return name;
  };

  const changeReturnProduct = (e) => {
    setReturnProduct(() => e.target.value);
  };

  const featchData = async () => {
    try {
      setLoading(true);
      const { data: productData } = await getProduct(id);
      setReturnProduct(() => productData.return);
      setProduct(() => {
        if (productData.image) {
          productData.images.unshift({
            id: 0,
            product_id: productData.id,
            address: productData.image,
          });
        }
        let newState = { ...productData };
        return newState;
      });
      setLoading(false);
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };

  const fetchCategories = () => {
    axios.get(BaseURL + "/categories").then((res) => {
      setCategories([...res.data]);
    });
  };
  useEffect(() => {
    featchData();
    fetchCategories();
  }, []);

  const handelInput = (event) => {
    setProduct({
      ...product,
      [event.target.name]: event.target.value,
    });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const fd = new FormData();
      fd.append("user_id", 1);
      fd.append("title", product.title);
      fd.append("price", product.price);
      fd.append("category", product.category_id);
      fd.append("discount", product.discount);
      fd.append("shipping_cost", product.shipping_cost);
      fd.append("return", returnProduct ? returnProduct : product.return);
      fd.append("description", product.description);
      let j = 0;
      for (let i = 0; i < images.length; i++) {
        if (!images[i].old) {
          fd.append("images[" + j + "]", images[i]);
          j++;
        }
      }
      for (let i = 0; i < idDeleteImages.length; i++) {
        fd.append("idDeleteImages[" + i + "]", idDeleteImages[i]);
        fd.append("nameDeleteImages[" + i + "]", nameDeleteImages[i]);
      }
      axios({
        method: "post",
        url: BaseURL + `/products/${userId}`,
        data: fd,
        headers: headers,
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

  return (
    <div className="page">
      {loading ? (
        <Spinner />
      ) : (
        <form className="page__box" onSubmit={handelSubmit}>
          <span className="page__title">ویرایش محصول</span>
          <br />
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
              <option value={parseInt(product.category_id)}>
                {product.category}
              </option>
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
          <ImageUpload onUpload={getImage} PreviousPhotos={product.images} />
          <span className="page__description">
            تعداد عکس‌های انتخاب شده نباید بیشتر از ۲۰ باشد.
          </span>
          <br />
          <br />
          <span className="page__help-title">وضعیت مرجوعی</span>
          <div className="page__container-avatar">
            <div className="page__type-user">
              <label id="type-admin" className="page__container-radio">
                <span className="page__description">
                  مرجوعی محصول مورد قبول است
                </span>
                <input
                  className="page__input"
                  name="return"
                  type="radio"
                  value="YES"
                  onChange={changeReturnProduct}
                  checked={returnProduct === "YES"}
                />
                <span className="page__checkmark"></span>
              </label>
              <label id="type-admin" className="page__container-radio">
                <span className="page__description">
                  مرجوعی محصول مورد قبول نیست{" "}
                </span>
                <input
                  className="page__input"
                  name="return"
                  type="radio"
                  value="NO"
                  onChange={changeReturnProduct}
                  checked={returnProduct === "NO"}
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
            placeholder="عنوان"
            required={true}
          />
          <span className="page__err">{inputErrorList.title}</span>

          <br />
          <br />
          <span className="page__help-title">قیمت محصول</span>
          <input
            className="page__input"
            name="price"
            value={product.price}
            onChange={handelInput}
            placeholder="قیمت"
            required={true}
          />
          <span className="page__description">
            {PN.convert(product.price)} تومان
          </span>
          <span className="page__err">{inputErrorList.price}</span>

          <br />
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
          <br />
          <span className="page__help-title">هزینه ارسال</span>
          <input
            className="page__input"
            name="shipping_cost"
            value={product.shipping_cost}
            onChange={handelInput}
            placeholder="هزینه ارسال"
            required={true}
          />
          <span className="page__description">
            {PN.convert(product.shipping_cost)} تومان
          </span>
          <span className="page__err">{inputErrorList.shipping_cost}</span>
          <br />
          <br />

          <span className="page__help-title">توضیحات</span>
          <textarea
            className="page__textarea"
            name="description"
            value={product.description ? product.description : ""}
            onChange={handelInput}
            placeholder=""
            required={true}
          />
          <div className="page__btns">
            <input
              type="submit"
              className="mybtn mybtn__active"
              value="ویرایش محصول"
            />
            <span className="mybtn__space"></span>
            <Link to="/" className="mybtn mybtn__inactive">
              بازگشت
            </Link>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditProduct;
