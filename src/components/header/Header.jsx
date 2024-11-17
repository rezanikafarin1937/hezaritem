import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateSearch } from "../../slices/searchSlice";
import "./header.scss";

const Header = () => {
  const location = useLocation();


  const text = useSelector((state) => state.searchSlice.value);
  const dispatch = useDispatch();

  return (
    <header className="header">
      <nav className="header__section">
        <span to="/register" className="header__btn-nav">
          لوگو
        </span>
        <span to="/register" className="header__btn-nav header__space">
          اراک
        </span>
        <Link to="/" className="header__btn-nav header__space">
           صفحه اصلی
        </Link>
        <span style={{ marginRight: "1rem" }}></span>
        <input
          value={text}
          className="header__search"
          placeholder="جستجو"
          onChange={(e) => dispatch(updateSearch(e.target.value))}
        />
      </nav>
      <nav className="header__section">
        <Link to="/" className="header__btn-nav header__space">
            محصولات
        </Link>
        <Link to="/" className="header__btn-nav header__space">
            تولیدکنندگان
        </Link>
        <span to="/register" className="header__btn-nav header__space">
          تولید من
        </span>
        <span to="/register" className="header__btn-nav header__space">
          پشتیبانی
        </span>

        <Link to="/insert-product" className="mybtn mybtn__active">
          ثبت محصول
        </Link>
      </nav>
    </header>
  );
};

export default Header;
