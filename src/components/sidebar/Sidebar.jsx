import { useEffect, useState } from "react";
import axios from "axios";
import { BaseURL } from "../../Global/BaseUrl";
import "./sidebar.scss";

const Sidebar = ({onChangeCategory}) => {
  const [categories, setCategories] = useState([]);
  const [products,setProducts] = useState([]);

  const getCategories = () => {
    axios.get(`${BaseURL}/categories`).then((res) => {
      setCategories([{id : 0, name : "همه محصولات"},...res.data]);
    });
  };

  const emitCategory = (catId) =>{
    onChangeCategory(catId);
  }

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
            <li onClick={()=> emitCategory(cat.id)} key={index}>{cat.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
