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
  const [indexImage, setIndexImage] = useState(() => 1);
  const [loading, setLoading] = useState(false);

  const handelGetProduct = async () => {
    setLoading(true);
    try {
      const { data } = await getProduct(productId);
      data.images.push({ id: 0, productId: data.id, address: data.image });
      setDataProduct(data);
      setImages(() => [...data.images]);
      setLoading(false);
    } catch (err) {}
  };

  useEffect(() => {
    handelGetProduct();
  }, []);

  const handleClose = () => {
    document.querySelector(".zoom").style.display = "none";
  };

  const nextImage = () => {
    if (indexImage + 1 < images.length) {
      setIndexImage(() => indexImage + 1);
    } else {
      setIndexImage(() => 0);
    }
    openZoomImage(indexImage);
  };

  const prevImage = () => {
    if (indexImage > 0) {
      setIndexImage(() => indexImage - 1);
    } else {
      setIndexImage(() => images.length - 1);
    }
    openZoomImage(indexImage);
  };

  const openZoomImage = (index) => {
    document.querySelector(".zoom").style.display = "flex";
    let zoomImage = document.querySelector(".zoom__image");
    zoomImage.style.backgroundImage = `url(${images[index].address})`;

    zoomImage.addEventListener("mouseenter", function () {
      this.style.backgroundSize = "300%";
    });

    zoomImage.addEventListener("mouseleave", function () {
      this.style.backgroundSize = "cover";
      this.style.backgroundPosition = "center";
    });

    zoomImage.addEventListener("mousemove", function (e) {
      // روش آموزشی
      // let dimentions = this.getBoundingClientRect();
      // let x= e.clientX - dimentions.left;
      // let y = e.clientY - dimentions.top;
      // x =Math.round(100 / ( dimentions.width / x));
      // y =Math.round(100 / (dimentions.height / y));
      // this.style.backgroundPosition= `${x}% ${y}%`;

      // روش بهتر
      let x = 100 / (this.offsetWidth / e.offsetX);
      let y = 100 / (this.offsetHeight / e.offsetY);
      this.style.backgroundPosition = `${x}% ${y}%`;
    });
  };

  return (
    <div className="product">
      {loading ? (
        <Spinner />
      ) : (
        <div className="wrapper">
          <div className="zoom">
            <span className="zoom__btn-close" onClick={handleClose}></span>
            <span className="zoom__title">بزرگنمایی تصویر</span>
            <div className="zoom__image"></div>
            <div className="zoom__left-btn" onClick={prevImage}>
              <div className="zoom__arrow-left"></div>
            </div>
            <div className="zoom__right-btn" onClick={nextImage}>
              <div className="zoom__arrow-right"></div>
            </div>
          </div>

          <div className="container-product">
            <ShowInformationProduct data={getDataProduct} />
            <div className="container-product__slider">
              <CarouselTouchSlider
                imageLength={images.length}
                webStyle={true}
                twoWay={true}
                dots={true}
                // btnSharp={true}
                tooltip="برای بزرگنمایی تصویر بر روی  آن کلیک کنید"
              >
                {images.map((image, index) => (
                    <div
                      className="slide__item"
                      key={index}
                      onClick={() => openZoomImage(index)}
                    >
                      <img src={image.address} />
                    </div>
                ))}
              </CarouselTouchSlider>
              <textarea placeholder="یادداشت شما ..."></textarea>
                    <div className="container-product__description">
                      یادداشت تنها برای شما قابل دیدن است و پس از حذف آگهی، پاک
                      خواهد شد
                    </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Product;
