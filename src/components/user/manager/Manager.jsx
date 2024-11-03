import { Link,useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { useEffect } from "react";
import { updateForceRender } from "../../../slices/forceRenderSlice";
import { InfiniteLoadingManager } from "../..";

import './manager.scss';

const UseInfiniteLoading = () => {
  const BaseUrl = "http://localhost/back-sef/public/api/users";
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization:
        "Bearer hL3mLquFhdkhpj6qEfIBfjyOioIMLe34lr6kmQ9S4R5G77zR0sEzQpfL1zC6ZQaveBRK21K1amv4lBz5x3Gu5wySwvuY15ZqRCvV",
    },
  };

  const isSholdRender =  useSelector(state => state.forceRenderSlice.value);
  const navigate = useNavigate();
  const dispatch =  useDispatch();


  useEffect(()=>{
    console.log('isSholdRender = ',isSholdRender);
    if(isSholdRender){
        navigate(0);
        dispatch(updateForceRender(false));

    }
  },[isSholdRender]);
  return (
    <div className="manager">
      <Link to="/register" className="manager__add-user">+</Link>
      {/* <button className="manager__add-user" onClick={refreshPage}>+</button> */}
      <InfiniteLoadingManager BaseURL={BaseUrl} config={config} />
    </div>
  );
};
export default UseInfiniteLoading;
