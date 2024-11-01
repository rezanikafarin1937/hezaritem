import { useEffect, useState } from "react";
import Slider from "../slider/Slider";
// import TouchSlider from "../touch-slider/TouchSlider";
import CarouselTouchSlider from "../touch-slider/carousel-touch-slider/CarouselTouchSlider";
import { getProduct } from "../../services/Service";
import { useParams } from "react-router-dom";
import Spinner from "../spinner/Spinner";
import ShowInformationProduct from "./ShowInformationProduct";
import "./product.scss";

const Product = () => {
  const { id: productId } = useParams();

  const [getDataProduct, setDataProduct] = useState({});
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handelGetProduct = async () => {
    setLoading(true);
    try {
      const { data } = await getProduct(productId);
      console.log("Product data", data);
      data.images.push({ id: 0, productId: data.id, address: data.image });
      setDataProduct(data);
      setImages(() => [...data.images]);
      setLoading(false);
    } catch (err) {
      console.log("eeeer = ", err.message);
    }
  };

  useEffect(() => {
    handelGetProduct();
    console.log("in Product Component = ", getDataProduct);
  }, []);

  return (
    <div className="product">
      {loading ? (
        <Spinner />
      ) : (
        <div className="wrapper">
          <div className="container-product">
            <ShowInformationProduct data={getDataProduct} />
            <div className="container-product__slider">
              <CarouselTouchSlider  imageLength={images.length} webStyle={true} twoWay={true}>
                {images.map((image, index) => (
                  <div className="slide__item" key={index}>
                    <img src={image.address} />
                  </div>
                ))}
              </CarouselTouchSlider>
            </div>
            {/* <div className="container-product__slider">
              <Slider images={images}/>
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
};
export default Product;



