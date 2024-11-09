import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { saveProduct } from "../../services/Service";
import { Spinner} from '../../components';
import "../../Global/sass/global-box.scss";
export const Getproduct = () => {

  const navigate = useNavigate();

  const [getProduct, setProduct] = useState({
    title: "",
    text: "",
    price: "",
    image: "",
  });

  const [loading,setLoading] = useState(false);

  const handelInput = (event) => {
    setProduct({ ...getProduct, [event.target.name]: event.target.value });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { status } = await saveProduct(getProduct);
      console.log('status = ',status);
      if(status === 201){
        setProduct({});
        setLoading(false);
        navigate("/");
      }
    } catch(err) {
      console.log(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="page">
      {loading ? <Spinner/> : (
      <form className="page__box" onSubmit={handelSubmit}>
      <input
        className="page__input"
        name="title"
        value={getProduct.title}
        onChange={handelInput}
        placeholder="عنوان"
        required={true}
      />
      <input
        className="page__input"
        name="text"
        value={getProduct.text}
        onChange={handelInput}
        placeholder="جمله کوتاه"
        required={true}
      />
      <input
        className="page__input"
        name="price"
        value={getProduct.price}
        onChange={handelInput}
        placeholder="قیمت"
        required={true}
      />
      <input
        className="page__input"
        name="image"
        value={getProduct.image}
        onChange={handelInput}
        placeholder="لینک عکس"
        required={true}
      />
      <div className="page__btns">
        <input
          type="submit"
          className="mybtn mybtn__sucsess"
          value="+ محصول جدید"
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

export default Getproduct;
