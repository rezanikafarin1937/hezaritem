import { useEffect, useState } from "react";
import axios from "axios";
import { BaseURL } from "../../Global/BaseUrl";
import { useNavigate } from "react-router-dom";
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
  Exception,
} from "../../components";
import "./sidebar.scss";

const Sidebar = () => {
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  let navigation = useNavigate();

  const getCategories = () => {
    axios.get(`${BaseURL}/categories`).then((res) => {
      setCategories([{ id: 0, name: "همه محصولات" }, ...res.data]);
    });
  };

  const handleCategoryId = (catId) => {
    setCategoryId(() => catId);
    if (catId === 0) {
      navigation("/");
    } else {
      navigation(`/${catId}`);
    }
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
              "sidebar__parent-cat " + (cat.id === categoryId ? "sidebar__active" : "")
            }
            onClick={() => handleCategoryId(cat.id)}
          >
            {index === 0 ? (
              <AllProduct
                color={
                  cat.id === categoryId
                    ? "rgba(0,0,0,.8)"
                    : "rgba(0, 0, 0, 0.56)"
                }
              />
            ) : (
              ""
            )}
            {index === 1 ? (
              <Food
                color={
                  cat.id === categoryId
                    ? "rgba(0,0,0,.8)"
                    : "rgba(0, 0, 0, 0.56)"
                }
              />
            ) : (
              ""
            )}
            {index === 2 ? (
              <Clothing
                color={
                  cat.id === categoryId
                    ? "rgba(0, 0, 0, 0.8)"
                    : "rgba(0, 0, 0, 0.56)"
                }
              />
            ) : (
              ""
            )}
            {index === 3 ? (
              <Shoes
                color={
                  cat.id === categoryId
                    ? "rgba(0,0,0,.8)"
                    : "rgba(0, 0, 0, 0.56)"
                }
              />
            ) : (
              ""
            )}
            {index === 4 ? (
              <Kitchen
                color={
                  cat.id === categoryId
                    ? "rgba(0,0,0,.8)"
                    : "rgba(0, 0, 0, 0.56)"
                }
              />
            ) : (
              ""
            )}
            {index === 5 ? (
              <Carpet
                color={
                  cat.id === categoryId
                    ? "rgba(0,0,0,.8)"
                    : "rgba(0, 0, 0, 0.56)"
                }
              />
            ) : (
              ""
            )}
            {index === 6 ? (
              <Sport
                color={
                  cat.id === categoryId
                    ? "rgba(0,0,0,.8)"
                    : "rgba(0, 0, 0, 0.56)"
                }
              />
            ) : (
              ""
            )}
            {index === 7 ? (
              <BookIcon
                color={
                  cat.id === categoryId
                    ? "rgba(0,0,0,.8)"
                    : "rgba(0, 0, 0, 0.56)"
                }
              />
            ) : (
              ""
            )}
            {index === 8 ? (
              <Digital
                color={
                  cat.id === categoryId
                    ? "rgba(0,0,0,.8)"
                    : "rgba(0, 0, 0, 0.56)"
                }
              />
            ) : (
              ""
            )}
            {index === 9 ? (
              <Industry
                color={
                  cat.id === categoryId
                    ? "rgba(0,0,0,.8)"
                    : "rgba(0, 0, 0, 0.56)"
                }
              />
            ) : (
              ""
            )}
            {index === 10 ? (
              <Brick
                color={
                  cat.id === categoryId
                    ? "rgba(0,0,0,.8)"
                    : "rgba(0, 0, 0, 0.56)"
                }
              />
            ) : (
              ""
            )}
            {index === 11 ? (
              <Software
                color={
                  cat.id === categoryId
                    ? "rgba(0,0,0,.8)"
                    : "rgba(0, 0, 0, 0.56)"
                }
              />
            ) : (
              ""
            )}
            {index === 12 ? (
              <Invention
                color={
                  cat.id === categoryId
                    ? "rgba(0,0,0,.8)"
                    : "rgba(0, 0, 0, 0.56)"
                }
              />
            ) : (
              ""
            )}
            {index === 13 ? (
              <Base
                color={
                  cat.id === categoryId
                    ? "rgba(0,0,0,.8)"
                    : "rgba(0, 0, 0, 0.56)"
                }
              />
            ) : (
              ""
            )}
            {index === 14 ? (
              <Medicine
                color={
                  cat.id === categoryId
                    ? "rgba(0,0,0,.8)"
                    : "rgba(0, 0, 0, 0.56)"
                }
              />
            ) : (
              ""
            )}
            {index === 15 ? (
              <Exception
                color={
                  cat.id === categoryId
                    ? "rgba(0,0,0,.8)"
                    : "rgba(0, 0, 0, 0.56)"
                }
              />
            ) : (
              ""
            )}
            <span style={{ marginLeft: ".5rem" }}></span>
            <span>{cat.name}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
