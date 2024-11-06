import { useParams, Link } from "react-router-dom";
import "./show-information-product.scss";

const ShowInformationProduct = ({ data }) => {
  const { id: productId } = useParams();

  return (
    <div className="info">
      <h1 className="title">{data.title}</h1>
      <p className="info__small-title">دقایقی پیش در اراک</p>
      <div className="info__buttons">
        <button className="mybtn mybtn__active">اطلاعات تماس</button>
        <span style={{ marginLeft: "1rem" }}></span>
        <button className="mybtn mybtn__inactive">چت</button>
      </div>
      <br />
      <div className="info__hr"></div>
      <br/>
      <div>دسته بندی</div>
      <div>{data.category}</div>
      <hr />
      <div>توضیحات</div>
      <div>{data.description}</div>
      <br />
      <div className="info__hr"></div>
      <br/>
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
