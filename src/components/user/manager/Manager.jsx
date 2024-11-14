import { Link,useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { useEffect } from "react";
import { updateForceRender } from "../../../slices/forceRenderSlice";
import { InfiniteLoadingManager } from "../..";
import { BaseURL,config } from "../../../Global/BaseUrl";
import './manager.scss';

const UseInfiniteLoading = () => {

  const isSholdRender =  useSelector(state => state.forceRenderSlice.value);
  const navigate = useNavigate();
  const dispatch =  useDispatch();


  useEffect(()=>{
    if(isSholdRender){
        navigate(0);
        dispatch(updateForceRender(false));

    }
  },[isSholdRender]);
  return (
    <div className="manager">
      <Link to="/register" className="manager__add-user">+</Link>
      <InfiniteLoadingManager BaseURL={`${BaseURL}/users`} config={config} />
    </div>
  );
};
export default UseInfiniteLoading;
