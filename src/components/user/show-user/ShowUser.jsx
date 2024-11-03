import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../../spinner/Spinner";
import axios from "axios";

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
        <div className="parent-user">
          <div
            className="image"
            style={{
              ...(user.avatar
                ? { backgroundImage: `url(${user.avatar})` }
                : {}),
            }}
          >
            <div className="ratio"></div>
          </div>
          <div className="user">
            <div className="user__title">{user.name}</div>
            <div className="user__text">
              سلام من <span className="user__mark"> {user.name} </span>
              از شهر <span className="user__mark"> {user.city} </span>
              هستم و در این اپلیکیشن به عنوان یک{" "}
              <span className="user__mark">
                {user.type === "ADMIN" ? " یک تولید کننده " : "یک خریدار "}
              </span>
              فعالیت دارم
            </div>

            <div className="user__wrapper-btns">
              <Link to={`/edit-user/${user.id}`} className="mybtn mybtn__sucsess">ویرایش</Link>
              <Link to={`/delete-user/${user.id}`} className="mybtn mybtn__denger">حذف</Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default ShowUser;
