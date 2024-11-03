import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const Users = ({ userId }) => {
  const URL = `http://localhost/back-sef/public/api/users/${userId}`;
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization:
        "Bearer hL3mLquFhdkhpj6qEfIBfjyOioIMLe34lr6kmQ9S4R5G77zR0sEzQpfL1zC6ZQaveBRK21K1amv4lBz5x3Gu5wySwvuY15ZqRCvV",
    },
  };
  const [getUser, setUser] = useState({
    userData: [],
    loading: true,
  });

  const myUser = async () => {
    let user = await axios.get(URL, config);
    setUser(user.data);
  };

  useEffect(() => {
    try {
      // myUser();
      axios
        .get(URL, config)
        .then((res) => res.data)
        .then((data) => setUser({ userData: data, full: false }))
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  }, []);

  const showUser = () => {
    let str = ``;
    for (let [key, value] of Object.entries(getUser.userData)) {
      str += `${key} : ${value};`;
    }
    let arr = str.split(";");
    console.log("arr = ", arr);
    return (
      <>
        {arr.map((a, i) => (
          <div key={i}>{a}</div>
        ))}
      </>
    );
  };

  const showUserNew = () => {
    let arr = [];
    Object.keys(getUser.userData).forEach((key) => {
      const value = getUser.userData[key];
      arr.push(`${key} : ${value}`);
      
    });

      return (
        <>
          {arr.map((a, i) => (
            <div key={i}>{a}</div>
          ))}
        </>
      );
  };

  console.log("getUser = ", getUser);

  return (
    <>
      <div>
        {getUser.loading ? <h2>loading...</h2> : <div>{showUserNew()}</div>}
      </div>
    </>
  );
};

export default Users;
