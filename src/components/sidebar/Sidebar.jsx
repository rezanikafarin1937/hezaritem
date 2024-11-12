import { useEffect, useState } from "react";
import axios from "axios";
import { BaseURL } from "../../Global/BaseUrl";
import { NavLink } from "react-router-dom";
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
    console.log(catId)
  };

  useEffect(() => {
    getCategories();
    console.log("Categories = ", categories);
  }, []);

  return (
    <nav className="sidebar">
      {console.log("cat = ", categories)}
      <ul>
        <span className="sidebar__title">دسته ها</span>
        {categories.map((cat, index) => (
          <li key={index} className={cat.id == categoryId ? "active" : "" } onClick={() => handleCategoryId(cat.id)}>
            {    console.log('handleCategoryId = ',categoryId)}
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
