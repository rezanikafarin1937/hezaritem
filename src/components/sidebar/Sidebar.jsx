import { useEffect, useState } from "react";
import axios from "axios";
import { BaseURL } from "../../Global/BaseUrl";
import { NavLink } from "react-router-dom";
import {
  AllProduct,
  Clothing,
  Food,
  Shoes,
  Kitchen,
  Carpet,
  Sport,
  BookIcon,
  Digital,
  Industry,
  Brick,
  Software,
  Invention,
  Base,
  Medicine,
  Exception
} from "../../components";
import "./sidebar.scss";

const Sidebar = () => {
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(0);

  const getCategories = () => {
    axios.get(`${BaseURL}/categories`).then((res) => {
      setCategories([{ id: 0, name: "همه محصولات" }, ...res.data]);
    });
  };

  const handleCategoryId = (catId) => {
    setCategoryId(() => catId);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <nav className="sidebar">
      <ul>
        <span className="sidebar__title">دسته بندی</span>
        {categories.map((cat, index) => (
          <li
            key={index}
            className={
              "sidebar__parent-cat " + (cat.id == categoryId ? "active" : "")
            }
            onClick={() => handleCategoryId(cat.id)}
          >
            {index === 0 ? <AllProduct color="rgba(0, 0, 0, 0.56)" /> : ""}
            {index === 1 ? <Food color="rgba(0, 0, 0, 0.56)" /> : ""}
            {index === 2 ? <Clothing color="rgba(0, 0, 0, 0.56)" /> : ""}
            {index === 3 ? <Shoes color="rgba(0, 0, 0, 0.56)" /> : ""}
            {index === 4 ? <Kitchen color="rgba(0, 0, 0, 0.56)" /> : ""}
            {index === 5 ? <Carpet color="rgba(0, 0, 0, 0.56)" /> : ""}
            {index === 6 ? <Sport color="rgba(0, 0, 0, 0.56)" /> : ""}
            {index === 7 ? <BookIcon color="rgba(0, 0, 0, 0.56)" /> : ""}
            {index === 8 ? <Digital color="rgba(0, 0, 0, 0.56)" /> : ""}
            {index === 9 ? <Industry color="rgba(0, 0, 0, 0.56)" /> : ""}
            {index === 10 ? <Brick color="rgba(0, 0, 0, 0.56)" /> : ""}
            {index === 11 ? <Software color="rgba(0, 0, 0, 0.56)" /> : ""}
            {index === 12 ? <Invention color="rgba(0, 0, 0, 0.56)" /> : ""}
            {index === 13 ? <Base color="rgba(0, 0, 0, 0.56)" /> : ""}
            {index === 14 ? <Medicine color="rgba(0, 0, 0, 0.56)" /> : ""}
            {index === 15 ? <Exception color="rgba(0, 0, 0, 0.56)" /> : ""}
            <span style={{ marginLeft: ".5rem" }}></span>
            <NavLink
              className="sidebar__cat"
              to={cat.id == 0 ? "/" : `/${cat.id}`}
            >
              {cat.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
