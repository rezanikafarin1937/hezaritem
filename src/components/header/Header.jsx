import { NavLink, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { updateSearch } from "../../slices/searchSlice";
import "./header.scss";

const Header = () => {
  const [numberLink, setNumberLink] = useState(() => 0);
  const location = useLocation();

  const text = useSelector((state) => state.searchSlice.value);
  const dispatch = useDispatch();

  const selector = (num) => {
    setNumberLink(() => num);
  };

  return (
    <header className="header">
      <nav className="header__section">
        <span to="/register" className="header__btn-nav">
          لوگو
        </span>
        <span to="/register" className="header__btn-nav header__space">
          اراک
        </span>
        <div onClick={() => selector(0)} className={numberLink === 0 ? "header__select" : ""}>
          <NavLink to="/" className="header__btn-nav header__space">
            صفحه اصلی
          </NavLink>
        </div>
        <span style={{ marginRight: "1rem" }}></span>
        <input
          value={text}
          className="header__search"
          placeholder="جستجو"
          onChange={(e) => dispatch(updateSearch(e.target.value))}
        />
      </nav>
      <nav className="header__section">
        <span onClick={() => selector(1)} className={numberLink === 1 ? "header__select" : ""}>
          <NavLink to="/" className="header__btn-nav header__space">
            محصولات
          </NavLink>
        </span>
        <span onClick={() => selector(2)} className={numberLink === 2 ? "header__select" : ""}>
          <NavLink to="/general" className="header__btn-nav header__space">
            تولیدکنندگان
          </NavLink>
        </span>
        <span to="/register" className="header__btn-nav header__space">
          تولید من
        </span>
        <span to="/register" className="header__btn-nav header__space">
          پشتیبانی
        </span>

        <NavLink to="/insert-product" className="mybtn mybtn__active" >
          ثبت محصول
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
