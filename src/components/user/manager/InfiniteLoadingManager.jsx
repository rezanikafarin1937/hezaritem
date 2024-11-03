import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../../spinner/Spinner";
import { Link,useNavigate } from "react-router-dom";
import "./infint-loading-manager.scss";

const InfinitLoading = ({ BaseURL, config }) => {
  const [totalData, setTotalData] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(0);
  const [numberOfData, setNumberOfData] = useState(0);
  // const [isRender,setIsRender] = useState(false);

  const navigate  = useNavigate();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      let response = await axios.get(`${BaseURL}?page=${page}`, config);
      setTotalData((oldData) => [...oldData, ...response.data.data]);
      setVisible((prev) => prev + response.data.per_page);
      setNumberOfData(response.data.total);
      console.log("numberOfData = ", numberOfData);
      console.log("per_page =", visible);
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

  const reloadPage = () => {
    window.location.reload()
  }

  const refreshPage = () => {
    navigate(0);
  }


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
    <>
      <div>
        {isLoading ? (
          <Spinner />
        ) : (
          <table className="styled-table">
            <thead>
                <th>عکس</th>
                <th>شماره</th>
                <th>نام</th>
                <th>نوع کاربر</th>
                <th>مبایل</th>
                <th>شهر</th>
                <th>ایمیل</th>
                <th>اطلاعات</th>
            </thead>
            <tbody>
              {totalData.map((data, index) => (
                <tr key={index}>
                  <td>
                    <img
                      src={
                        data.avatar === null
                          ? "../../../../images/avatar.png"
                          : `${data.avatar}`
                      }
                    />
                  </td>
                  <td>{data.id}</td>
                  <td>{data.name}</td>
                  <td>{data.type}</td>
                  <td>{data.mobile}</td>
                  <td>{data.city}</td>
                  <td>{data.email}</td>
                  <td><Link to={`/show-user/${data.id}`}  className="styled-table__btn">بیشتر ...</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default InfinitLoading;
