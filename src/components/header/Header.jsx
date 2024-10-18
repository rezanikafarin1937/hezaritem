import { Link, useLocation } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { updateSearch } from "../../slices/searchSlice";
import "./header.scss";

const Header = () => {
  const location = useLocation();

  const text = useSelector(state => state.searchSlice.value);
  const dispatch = useDispatch();


  return (
    <div className="header">
      <Link to="/register" className="mybtn mybtn__logo">لوگو</Link>
      {location.pathname === "/" ? (
        <input
          value={text}
          className="input-box"
          placeholder="جستجو"
          onChange={(e) => dispatch(updateSearch(e.target.value))}
        />
      ) : null}
      <Link to="/insert-product" className="mybtn mybtn__sucsess">
        ثبت محصول
      </Link>
    </div>
  );
};

export default Header;
