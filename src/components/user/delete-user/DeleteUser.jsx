import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Confirm from "../../confirm/Confirm";
// import { removeProduct } from "../../services/Service";
import axios from "axios";
import Spinner from "../../spinner/Spinner";
import "./deleteuser.scss";

const DeleteUser = () => {
  const [loading, setLoading] = useState(false);

  const navigation = useNavigate();

  const { id } = useParams();

  const handelDelete = async () => {
    setLoading(true);
    const { status } = await axios.delete(
      `http://localhost/back-sef/public/api/users/${id}`,{
        Headers: {
          "Content-Type": "application/json"
        }
  
      }
    );
    if (status === 204) {
      setLoading(false);
      navigation("/manager");
    }
  };

  return (
    <div className="page">
      {loading ? (
        <Spinner />
      ) : (
        <Confirm title="آیا میخواهید این محصول را حذف کنید ؟">
          <Link className="mybtn mybtn__logo" to={`/show-user/${id}`}>
            انصراف
          </Link>
          <button onClick={handelDelete} className="mybtn mybtn__delete">
            پاک شود
          </button>
        </Confirm>
      )}
    </div>
  );
};

export default DeleteUser;
