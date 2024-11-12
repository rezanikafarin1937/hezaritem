import { useEffect, useState } from "react";
import axios from "axios";
import { BaseURL } from "../../Global/BaseUrl";
import { Link } from 'react-router-dom';
import "./sidebar.scss";

const Sidebar = () => {
  const [categories, setCategories] = useState([]);
  const [products,setProducts] = useState([]);

  const getCategories = () => {
    axios.get(`${BaseURL}/categories`).then((res) => {
      setCategories([{id : 0, name : "همه محصولات"},...res.data]);
    });
  };

//   const emitCategory = (catId) =>{
//     onChangeCategory(catId);
//   }

  useEffect(() => {
    getCategories();
    console.log("Categories = ", categories);
  }, []);

  return (
    <div className="sidebar">
        {console.log('cat = ',categories)}
      <ul>
        <div className="sidebar__title">دسته ها</div>
        {categories.map((cat, index) => (
            <div key={index}>
            <Link to={`/${cat.id}`}>{cat.name}</Link>

            </div>
))}
      </ul>
    </div>
  );
};

export default Sidebar;
