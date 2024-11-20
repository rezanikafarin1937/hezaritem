import { useEffect, useState } from "react";
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
      data.images.push({ id: 0, productId: data.id, address: data.image });
      setDataProduct(data);
      setImages(() => [...data.images]);
      setLoading(false);
    } catch (err) {
    }
  };

  useEffect(() => {
    handelGetProduct();
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
              <CarouselTouchSlider
                imageLength={images.length}
                webStyle={true}
                twoWay={true}
                dots={true}
                // btnSharp={true}
              >
                {images.map((image, index) => (
                  <div className="slide__item" key={index}>
                    <img src={image.address} />
                  </div>
                ))}
              </CarouselTouchSlider>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Product;
