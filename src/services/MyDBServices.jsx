import { useState } from "react";
import axios from "axios";

const  MyDBServices = () => {
    const [getUser,setUser] = useState({});
    const URL = "http://localhost/back-sef/public/api/users/10";
    const config = {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization":
          "Bearer hL3mLquFhdkhpj6qEfIBfjyOioIMLe34lr6kmQ9S4R5G77zR0sEzQpfL1zC6ZQaveBRK21K1amv4lBz5x3Gu5wySwvuY15ZqRCvV",
    
        }
    }

    const userFunc = async () =>{
       let user = await axios.get(URL,config);
       setUser(user.data);
       console.log('User = ',getUser);
    }

    userFunc();

    return(
        <>
            <div>{getUser}</div>
        </>
    )


}

export default MyDBServices;