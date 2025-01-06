import { Link } from "react-router-dom";
import { Star, NoImage, NoPicture } from "../../components";
import "./product-card.scss";
/* REza Nikafarin For Test Remote Gitup  1**/
/* REza Nikafarin For Test Remote Gitup  2**/
/* REza Nikafarin For Test Remote Gitup  3**/
const ProductCard = ({ data,cityName,provinceName }) => {
  return (
    <Link className="card" to={`/products/show/${data.id}`}>
      <div className="card__left">
        <div
          className="card__image"
          style={{ backgroundImage: `url(${data.image})` }}
        >
          {data.image ? null : (
            <NoPicture width="2rem" color="rgba(0,0,0,.2)" />
          )}
        </div>
      </div>
      <div className="card__right">
        <div className="top">
          <span className="catd__title">{data.title}</span>
          <div>
            <Star width="15px" height="15px" color="orange" />
            <Star width="15px" height="15px" color="orange" />
            <Star width="15px" height="15px" color="orange" />
            <Star width="15px" height="15px" color="orange" />
            <Star width="15px" height="15px" color="orange" />
          </div>
          <div className="card__description">{provinceName} - {cityName}</div>
        </div>
        <div className="card__bottom">
          <div className="card__parent-price">
            {data.discount > 0 ? (
              <div className="card__price">
                <div className="card__line"></div>
                <div className="card__price-icon">تومان</div>
                <span style={{ marginRight: ".15rem" }}></span>
                <div>{Math.round(data.price).toLocaleString("fa")}</div>
              </div>
            ) : (
              ""
            )}
            <div className="card__price">
              <div className="card__price-icon" style={{ color: "#a62626" }}>
                تومان
              </div>
              <span style={{ marginRight: ".15rem" }}></span>
              <div style={{ color: "#a62626" }}>
                {Math.round(
                  data.price - data.price * (data.discount / 100)
                ).toLocaleString("fa")}
              </div>
            </div>
          </div>
          {data.discount > 0 ? (
            <div className="card__discount">
              <span>% {data.discount.toLocaleString("fa")}</span>
            </div>
          ) : (
            <span className="card__description">مقطوع</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
