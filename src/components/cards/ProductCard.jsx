import "./product-card.scss";

const ProductCard = ({ data }) => {
  return (
    <div className="card">
      <div className="card__left">
        <div
          className="card__image"
          style={{ backgroundImage: `url(${data.image})` }}
        >
          <div className="card__ratio"></div>
        </div>
        <div>
          <span>{data.price}</span>
          <span>{data.discount}</span>
        </div>
      </div>

      <div className="card__right">
        <span className="card__title">{data.title}</span>
        <span>تولید شهر {data.city}</span>
        <span>ارسال رایگان</span>
      </div>
    </div>
  );
};

export default ProductCard;
