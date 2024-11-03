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
        <span to="/register" className="header__btn-nav header__space">
          دسته ها
        </span>
        <span style={{ marginRight: "1rem" }}></span>
        {location.pathname === "/" ? (
          <input
            value={text}
            className="header__search"
            placeholder="جستجو"
            onChange={(e) => dispatch(updateSearch(e.target.value))}
          />
        ) : null}
      </nav>
      <nav className="header__section">
        <button>مابقی دکمه ها</button>
        <Link to="/insert-product" className="mybtn mybtn__active">
          ثبت محصول
        </Link>
      </nav>
    </header>
  );
};

export default Header;
