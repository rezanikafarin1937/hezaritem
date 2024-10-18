import { useState } from 'react';
import { Link,useParams,useNavigate } from 'react-router-dom';
import { Confirm } from '../../components';
import { removeProduct } from '../../services/Service';
import './deleteproduct.scss';


const DeleteProduct = () => {
   
  const [loading,setLoading] = useState(false);

  const navigation = useNavigate();

  const {id} = useParams();

   const handelDelete = async () => {
      setLoading(true);
      const { status } = await removeProduct(id);
      if(status === 204) {
        setLoading(false);
        navigation("/");
      }
   }

    return(
        <div className="page">
            <Confirm title="آیا میخواهید این محصول را حذف کنید ؟">
                <Link className='mybtn mybtn__logo' to={`/products/${id}`}>انصراف</Link>
                <button onClick={handelDelete} className='mybtn mybtn__delete'>پاک شود</button>
            </Confirm>
        </div>
    )
}

export default DeleteProduct;