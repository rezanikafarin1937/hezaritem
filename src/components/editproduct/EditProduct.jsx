import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProduct } from "../../services/Service";
import { Spinner, ImageUpload } from "../../components";
import axios from "axios";
import "../../components/getinfo/getproduct.scss";

export const EditProduct = () => {
  const navigate = useNavigate();
  const { id: userId } = useParams();
  const URL = `http://localhost/back-sef/public/api/products/${userId}`;

  const [inputErrorList, setInputErrorList] = useState({});

  const [product, setProduct] = useState({
    id: null,
    title: "",
    shipping_cost: "",
    return: "",
    description: "",
    price: "",
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
    console.log("files = ", addImages);
    delImage.map((img) => {
      if (img.old) {
        setIdDeleteImages((d) => [...d, img.id]);
        setNameDeleteImages((n) => [...n, giveNameToOldImage(img)]);
        console.log("delete Files = ", nameDeleteImages);
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
    console.log("e.target.value = ", e.target.value);
    setReturnProduct(() => e.target.value);
  };

  useEffect(() => {
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
            console.log("product images = ", productData.images);
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
    featchData();
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
      console.log("All Images = ", images);
      console.log("All deleteImages = ", idDeleteImages);
      axios({
        method: "post",
        url: URL,
        data: fd,
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization:
            "Bearer hL3mLquFhdkhpj6qEfIBfjyOioIMLe34lr6kmQ9S4R5G77zR0sEzQpfL1zC6ZQaveBRK21K1amv4lBz5x3Gu5wySwvuY15ZqRCvV",
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
          <ImageUpload onUpload={getImage} PreviousPhotos={product.images} />
          <div className="page__container-avatar">
            <div className="page__type-user">
              <label id="type-admin" className="page__container-radio">
                مرجوعی محصول مورد قبول است
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
              <br />
              <label id="type-admin" className="page__container-radio">
                مرجوعی محصول مورد قبول نیست
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

          <input
            className="page__input"
            name="title"
            value={product.title}
            onChange={handelInput}
            placeholder="عنوان"
            required={true}
          />
          <input
            className="page__input"
            name="shipping_cost"
            value={product.shipping_cost}
            onChange={handelInput}
            placeholder="هزینه ارسال"
            required={true}
          />
          <input
            className="page__input"
            name="price"
            value={product.price}
            onChange={handelInput}
            placeholder="قیمت"
            required={true}
          />
          <textarea
            className="page__textarea"
            name="description"
            value={product.description}
            onChange={handelInput}
            placeholder="توضیحات"
            required={true}
          />
          <div className="page__btns">
            <input
              type="submit"
              className="mybtn mybtn__sucsess"
              value="ویرایش محصول"
            />
            <Link to="/" className="mybtn mybtn__denger">
              بازگشت
            </Link>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditProduct;
