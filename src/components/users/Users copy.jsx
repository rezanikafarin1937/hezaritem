import { useState } from "react";
import { theUser,myUsers } from "../../services/DBService";


const Users = () => {

    const [getUser,setUser] = useState({});

    const fetchData = async () => {
    let users = await myUsers().then(async res => await res.data.data).catch(err => console.log(err));
    console.log("in Users = ", users);
    return users;
  };
//   let allUsers = null;
//   allUsers = fetchData();
// //   console.log("allUsers = ", allUsers.then(res => console.log('ddd = ',res)));
//   let u = allUsers.then(res => res.data.data).catch(err => console.log(err));
//   console.log('uu = ',u);

  let newUser = theUser(10);
  console.log('New Users = ',newUser)
  const getUserFunc = async () =>{
     await theUser(10).then(res => this.setUser({user : res.data})).catch(err => console.log(err))
  }

  getUserFunc();
  console.log('getUser = ',getUser);
  return (
    <>
      <h1>Users are : </h1>
      {/* {user} */}
    </>
  );
};
export default Users;
