import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../spinner/Spinner";
import Sidebar from "../sidebar/Sidebar";
import Item from "../item/Item";
import { BaseURL,config } from "../../Global/BaseUrl";
import "./infint-loading-products.scss";

const InfiniteLoadingProducts = () => {
  const [totalData, setTotalData] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(0);
  const [numberOfData, setNumberOfData] = useState(0);
  const [categoryId,setCategoryId] = useState(0);


  const fetchData = async () => {
    try {
      setIsLoading(true);
      let response = await axios.get(BaseURL+ '/products/' + `${categoryId}` + `?page=${page}` , config);
      setTotalData((oldData) => [...oldData, ...response.data.data]);
      setVisible((prev) => prev + response.data.per_page);
      setNumberOfData(response.data.total);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
      window.scrollTo({ top: window.scrollY, behavior: "smooth" });
    }
  };

  const handleOnScroll = () => {
    if (
      window.scrollY + window.innerHeight >=
      document.documentElement.scrollHeight
    ) {
      setPage((prev) => prev + 1);
    }
  };

  const changeCategory = (catId) => {
    console.log('categoryId = ',catId)
    setCategoryId(() => catId);
  }

  useEffect(() => {
    setTotalData([]);
    fetchData();
  }, [page,categoryId]);

  useEffect(() => {
    if (numberOfData === undefined) {
      window.addEventListener("scroll", handleOnScroll);
    } else {
      visible < numberOfData && numberOfData > 0
        ? window.addEventListener("scroll", handleOnScroll)
        : window.removeEventListener("scroll", handleOnScroll);
      return () => {
        window.removeEventListener("scroll", handleOnScroll);
      };
    }
  }, [visible]);

  return (
    <div className="main">
        <div className="main__sidebar">
        <Sidebar onChangeCategory={changeCategory}/>
      </div>

      <div className="main__items">
        {isLoading ? (
          <Spinner />
        ) : (
          <>
              {totalData.map((data, index) => (
                <Item  key={index} data={data} />
))}
            {/* <button
              onClick={() => {
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
              }}
            >
              scroll top
            </button> */}

          </>
        )}
      </div>
    </div>
  );
};

export default InfiniteLoadingProducts;
