import { useParams, Link } from "react-router-dom";
import "./show-information-product.scss";

const ShowInformationProduct = ({ data }) => {
  const { id: productId } = useParams();
  let parseNumber = parseInt(data.price);
  const price = parseNumber.toLocaleString("fa");

  parseNumber = parseInt(data.discount);
  const discount = parseNumber.toLocaleString("fa");

  parseNumber = parseInt(data.shipping_cost);
  const shippingCost = parseNumber.toLocaleString("fa");

  let returnProduct = "جنس فروخته شده بازپس گرفته ";
  returnProduct += data.return === "YES" ? "میشود" : "نمیشود";

  return (
    <div className="info">

      <h1 className="title">{data.title}</h1>
      <p className="info__small-title">دقایقی پیش در اراک</p>
      <div className="info__buttons">
        <button className="mybtn mybtn__active">اطلاعات تماس</button>
        <span style={{ marginLeft: "1rem" }}></span>
        <button className="mybtn mybtn__inactive">چت</button>
      </div>

      <div className="height-space"></div>
      <div className="info__hr"></div>
      <div className="height-space"></div>
      <div>دسته بندی</div>
      <span className="info__small-title">{data.category}</span>
      <div className="height-space"></div>
      <div>قیمت</div>
      <span className="info__small-title">{price} تومان</span>
      <div className="height-space"></div>
      <div>هزینه ارسال</div>
      <span className="info__small-title">{shippingCost} تومان</span>
      <div className="height-space"></div>
      <div>تخفیف</div>
      <span className="info__small-title">{discount} درصد</span>
      <div className="height-space"></div>
      <div>توضیحات</div>
      <div className="info__small-title">{data.description}</div>
      <p className="info__small-title">{returnProduct}</p>
      <div className="height-space"></div>
      <div className="info__hr"></div>
      <div className="height-space"></div>
      <div className="info__buttons">
        <Link
          to={`/products/edit/${productId}`}
          className="mybtn mybtn__active"
        >
          ویرایش
        </Link>
        <span style={{ marginLeft: "1rem" }}></span>
        <Link
          to={`/products/delete/${productId}`}
          className="mybtn mybtn__inactive"
        >
          حذف
        </Link>
      </div>
    </div>
  );
};

export default ShowInformationProduct;
