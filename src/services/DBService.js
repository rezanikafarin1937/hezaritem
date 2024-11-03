import axios from "axios";

const URL = "http://localhost/back-sef/public/api/users";
const url = "http://localhost:9000/users";

export const saveUser = (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  console.log("userData = ", data);
  axios
    .post(URL, data, config)
    .then((res) => console.log("response = ", res))
    .catch((err) => console.log("err = ", err.massage));

  // fetch(URL, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: userData
  // })
  //   .then((res) => console.log("res = ", res))
  //   .catch((err) => console.log("err = ", err));
};

export const allUser = () => {
  let users = null;
  let dataUsers = null;
  fetch(URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization:
        "Bearer hL3mLquFhdkhpj6qEfIBfjyOioIMLe34lr6kmQ9S4R5G77zR0sEzQpfL1zC6ZQaveBRK21K1amv4lBz5x3Gu5wySwvuY15ZqRCvV",
    },
  })
    .then((res) => {
      console.log("res = ", res);
      users = res.json();
      console.log("users.json() = ", users);
      users.then((response) => {
        dataUsers = response;
        console.log("dataUsers = ", dataUsers);
      });
      console.log("vm.users = ", users);
    })
    .catch((err) => console.log("err = ", err));

  console.log("AAA users = ", users);
  return dataUsers;
};

export const allUsers = async () => {
  const dataUsers = null;
  const users = await fetch(URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization:
        "Bearer hL3mLquFhdkhpj6qEfIBfjyOioIMLe34lr6kmQ9S4R5G77zR0sEzQpfL1zC6ZQaveBRK21K1amv4lBz5x3Gu5wySwvuY15ZqRCvV",
    },
  }).json();
  // .then(res => res.json()).catch(err => console.log(err));

  console.log("all Users = ", users);
  //   users.then((res) => { dataUsers = res})
  //   .catch((err) => console.log(err));

  // console.log("Users = ", dataUsers);
  //  return [...dataUsers];
};

export const myUsers = async () => {
  let users = null;
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization:
        "Bearer hL3mLquFhdkhpj6qEfIBfjyOioIMLe34lr6kmQ9S4R5G77zR0sEzQpfL1zC6ZQaveBRK21K1amv4lBz5x3Gu5wySwvuY15ZqRCvV",
    },
  };
  try {
    users = await axios.get(
      "http://localhost/back-sef/public/api/users",
      config
    );
    console.log("my Users = ", users);
  } catch (err) {
    console.log(err);
  }
  return users.data.data;
};

export const theUser = async (userId) => {
  let user = null;
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization:
        "Bearer hL3mLquFhdkhpj6qEfIBfjyOioIMLe34lr6kmQ9S4R5G77zR0sEzQpfL1zC6ZQaveBRK21K1amv4lBz5x3Gu5wySwvuY15ZqRCvV",
    },
  };
  try {
    user = await axios.get(
      `http://localhost/back-sef/public/api/users/${userId}`,
      config
    );
    console.log("the User = ", user);
  } catch (err) {
    console.log(err);
  }
  return user;
};
