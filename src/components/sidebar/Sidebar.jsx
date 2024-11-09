import { useEffect, useState } from "react";
import axios from "axios";
import { BaseURL } from "../../Global/BaseUrl";
import "./sidebar.scss";

const Sidebar = () => {
  const [categories, setCategories] = useState([]);

  const getCategories = () => {
    axios.get(`${BaseURL}/categories`).then((res) => {
      setCategories([...res.data]);
    });
  };

  useEffect(() => {
    getCategories();
    console.log("Categories = ", categories);
  }, []);

  return <div className="sidebar">
    <ul>
        {categories.map((cat,index) => (
            <>
                <li key={index}>{cat.name}</li>
            </>
        ))}
    </ul>
  </div>;
};

export default Sidebar;
