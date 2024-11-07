import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../../spinner/Spinner";
import axios from "axios";
import "../../sass/global-box.scss";

import "./show-user.scss";

const ShowUser = () => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { id: userId } = useParams();
  const URL = `http://localhost/back-sef/public/api/users/${userId}`;
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization:
        "Bearer hL3mLquFhdkhpj6qEfIBfjyOioIMLe34lr6kmQ9S4R5G77zR0sEzQpfL1zC6ZQaveBRK21K1amv4lBz5x3Gu5wySwvuY15ZqRCvV",
    },
  };

  useEffect(() => {
    try {
      axios
        .get(URL, config)
        .then((res) => {
          setUser({ ...res.data });
          setIsLoading(false);
          console.log("my user = ", user);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="page">
          <div  className="image" style={{...(user.avatar ? { backgroundImage: `url(${user.avatar})` }
                : {}),
            }}
          >
            <div className="ratio"></div>
          </div>
          <div className="page__box">
            <div className="">
              <div className="">{user.name}</div>
              <div className="">
                سلام من <span className=""> {user.name} </span>
                از شهر <span className=""> {user.city} </span>
                هستم و در این اپلیکیشن به عنوان یک{" "}
                <span className="">
                  {user.type === "ADMIN" ? " یک تولید کننده " : "یک خریدار "}
                </span>
                فعالیت دارم
              </div>

              <div className="">
                <Link
                  to={`/edit-user/${user.id}`}
                  className="mybtn mybtn__active"
                >
                  ویرایش
                </Link>
                <span className="btn__space"></span>
                <Link
                  to={`/delete-user/${user.id}`}
                  className="mybtn mybtn__inactive"
                >
                  حذف
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default ShowUser;
