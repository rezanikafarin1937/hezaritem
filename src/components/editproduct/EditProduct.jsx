import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Spinner, ImageUpload, MySelect } from "../../components";
import axios from "axios";
import PN from "persian-number";
import { BaseURL, headers } from "../../Global/BaseUrl";
import "../../Global/sass/global-box.scss";
export const EditProduct = () => {
  const navigate = useNavigate();
  const { id: userId } = useParams();

  const [product, setProduct] = useState({
    id: null,
    title: "",
    city: 0,
    province: 0,
    address : "",
    shipping_cost: "",
    return: "",
    description: "",
    price: "",
    category: 0,
    image: {},
    images: [],
    idDeleteImages: [],
    nameDeleteImages: [],
  });

  const [loading, setLoading] = useState(false);
  const [returnProduct, setReturnProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [idDeleteImages, setIdDeleteImages] = useState([]);
  const [nameDeleteImages, setNameDeleteImages] = useState([]);
  const [cities, setCities] = useState([]);
  const [inputErrorList, setInputErrorList] = useState({});
  const [categories, setCategories] = useState([]);

  const getImage = (addImages, delImage) => {
    setImages(() => [...addImages]);
    delImage.map((img) => {
      if (img.old) {
        setIdDeleteImages((d) => [...d, img.id]);
        setNameDeleteImages((n) => [...n, giveNameToOldImage(img)]);
      }
    });
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


  const fetchData = async () => {
    try {
      setLoading(true);
      await axios
        .all([
          axios.get(BaseURL + "/cities"),
          axios.get(BaseURL + "/categories"),
          axios.get(`${BaseURL}/products/show/${userId}`),
        ])
        .then(
          axios.spread((res1, res2, res3) => {
            setCities(() => [...res1.data]);
            setCategories(() => [...res2.data]);
            setReturnProduct(() => res3.data.return);
            setProduct(() => {
              if (res3.data.image) {
                res3.data.images.unshift({
                  id: 0,
                  product_id: res3.data.id,
                  address: res3.data.image,
                });
              }
              let newState = { ...res3.data };
              return newState;
            });
            setLoading(false);

          })
        );
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchData();
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
      fd.append("city", product.city);
      fd.append("province", product.province);
      fd.append("address", product.address);
      fd.append("price", product.price);
      fd.append("category", product.category);
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
      console.log("images in handleSubmit = ", images);
      for (let i = 0; i < idDeleteImages.length; i++) {
        fd.append("idDeleteImages[" + i + "]", idDeleteImages[i]);
        fd.append("nameDeleteImages[" + i + "]", nameDeleteImages[i]);
      }
      axios({
        method: "post",
        url: BaseURL + `/products/${userId}`,
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



  const handleSelectCity = (objCity) => {
    console.log("mycity = ", objCity);
    setProduct(() => {
      product.city = objCity.id;
      product.province = objCity.province_id;
      let newState = { ...product };
      return newState;
    });
    console.log('EditProduct myCity = ',product)
  };

  const handleSelectCategory = (objCat) => {
    console.log("mycat = ", objCat);
    setProduct(() => {
      product.category = objCat.id;
      let newState = { ...product };
      return newState;
    });
    console.log('EditProduct myCity = ',product)
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
          <div className="page__help-title">موقعیت کارگاه</div>
          <span className="page__help-title">شهر</span>
          <MySelect
              data={cities}
              onSelect={handleSelectCity}
              fieldTitle="name"
              defaultSelect={cities[product.city - 1]}
              placeholder="انتخاب شهر"
              id="city"

            />
            <span className="page__small-description">با انتخاب شهر به صورت خودکار استان شما نیز انخاب میشود</span>
            <span className="page__err">{inputErrorList.city}</span>
          </label>
          <br />
          <span className="page__help-title">آدرس دقیق کارگاه</span>
          <input
            className="page__input"
            name="address"
            value={product.address}
            onChange={handelInput}
            placeholder="آدرس دقیق کارگاه"
          />
          <span className="page__err">{inputErrorList.address}</span>

          <br />
          <br />
          <label id="type-admin" className="page__container-select">
            <span className="page__help-title">دسته بندی محصول</span>
            <MySelect
              data={categories}
              onSelect={handleSelectCategory}
              fieldTitle="name"
              defaultSelect={categories[product.category - 1]}
              placeholder="انتخاب دسته بندی"
              id="catecory"
            />
            {/* <input name="city" hidden/> */}
            <span className="page__err">{inputErrorList.city}</span>
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
