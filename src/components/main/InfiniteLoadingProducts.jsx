import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDebounce } from "../../customHooks/useDebounce";
import Spinner from "../spinner/Spinner";
import Sidebar from "../sidebar/Sidebar";
import Item from "../item/Item";
import { BaseURL,config } from "../../Global/BaseUrl";
import "./infint-loading-products.scss";

const InfiniteLoadingProducts = () => {
  const { catId = 0} = useParams();
  let text = useSelector((state) => state.searchSlice.value);
  text = useDebounce(text,800);


  const [totalData, setTotalData] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(0);
  const [numberOfData, setNumberOfData] = useState(0);


  const fetchData = async () => {
    try {
      setTotalData(() => []);
      setIsLoading(true);
      let response = await axios.get(BaseURL+ '/products/' + `${catId}?title=${text}&page=${page}` , config);
      // let response = await axios.get(BaseURL+ '/products' + '/search' + `/${text}`, config);
      console.log('res= ',response.data);
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

  
  useEffect(() => {
    setTotalData(() => []);
    fetchData();
  }, [page,catId,text]);

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
        <Sidebar/>
      </div>

      <div className="main__items">
        {isLoading ? (
          <Spinner />
        ) : (
          <>
              {totalData.map((data, index) => (
                <Item  key={index} data={data} />
))}

          </>
        )}
      </div>
    </div>
  );
};

export default InfiniteLoadingProducts;
