import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDebounce } from "../../customHooks/useDebounce";
import { Spinner, Sidebar, ManufacturersItem } from "../../components";
import { BaseURL, config } from "../../Global/BaseUrl";
import "./infinite-loading-manufacturers.scss";

const InfiniteLoadingManufacturers = () => {
  const navigate = useNavigate();

  let text = useSelector((state) => state.searchSlice.value);
  text = useDebounce(text, 800);

  const [totalData, setTotalData] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(0);
  const [numberOfData, setNumberOfData] = useState(0);
  const [stateSearch, setStateSearch] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      let response = await axios.get(
        BaseURL + "/users/general" + `?title=${text}&page=${page}`,
        config
      );
      console.log("res= ", response.data);
      if (text.length === 0) {
        setTotalData((oldData) => [...oldData, ...response.data.data]);
      } else if (text.length > 0) {
        setTotalData(() => []);
        setTotalData(() => [...response.data.data]);
      }
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

  const refreshPage = () => {
    navigate(0);
  };


  useEffect(() => {
    if (text.length > 0) {
      setTotalData(() => []);
      setStateSearch(() => true);
      setPage(1);
      fetchData();
    }
    if (stateSearch && text.length === 0) {
      setStateSearch(() => false);
      setTotalData(() => []);
      refreshPage();
    }
  }, [text]);



  useEffect(() => {
    fetchData();
  }, [page]);

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
        <Sidebar />
      </div>

      <div className="main__items">
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            {totalData.map((data, index) => (
              <ManufacturersItem key={index} data={data} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default InfiniteLoadingManufacturers;
