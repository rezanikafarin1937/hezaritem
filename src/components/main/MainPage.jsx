import { useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import InfiniteLoadingProducts from "./InfiniteLoadingProducts";
import "./main-page.scss";

const MainPage = () => {
    const [categoryId, setCategoryId] = useState(0);


    const changeCategory = (catId) => {
        console.log("categoryId = ", catId);
        setCategoryId(() => catId);
      };
    
    return (
    <div className="main">
      <div className="main__sidebar">
        <Sidebar onChangeCategory={changeCategory} />
      </div>

      <div className="main__items">
        <InfiniteLoadingProducts/>
      </div>
    </div>
  );
};

export default MainPage;
