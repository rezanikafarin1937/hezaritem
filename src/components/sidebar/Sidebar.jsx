import { useEffect, useState } from "react";
import axios from "axios";
import { BaseURL } from "../../Global/BaseUrl";
import { Link } from "react-router-dom";
import "./sidebar.scss";

const Sidebar = () => {
  const [categories, setCategories] = useState([]);

  const getCategories = () => {
    axios.get(`${BaseURL}/categories`).then((res) => {
      setCategories([{ id: 0, name: "همه محصولات" }, ...res.data]);
    });
  };

  useEffect(() => {
    getCategories();
    console.log("Categories = ", categories);
  }, []);

  return (
    <div className="sidebar">
      {console.log("cat = ", categories)}
      <ul>
        <span className="sidebar__title">دسته ها</span>
        {categories.map((cat, index) => (
          <li key={index}>
            <Link
              className="sidebar__cat"
              to={cat.id == 0 ? "/" : `/${cat.id}`}
            >
              {cat.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
