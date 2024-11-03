import { useState,useEffect} from "react";
import "./new-avatar-upload.scss";
const NewAvatarUpload = ({ currentImage = null, onUpload }) => {
    const [file,setFile] = useState(null);
    const [currentImg,setCurrentImg] = useState(currentImage);
    const [noChange,setNoChange] = useState(true);
    const createObjectUrl = (file) => {
        return URL.createObjectURL(file);
      };
    const emitImage = (e) => {
        let obj = e.target.files[0];
        console.log('file = ',obj);
        setFile(() => obj);
    
    }

    const delImage = () => {
        setFile(null);
        setCurrentImg(null);
        setNoChange(false);
    }

    useEffect(()=>{
        onUpload(file,currentImg);
        setCurrentImg(currentImage);
      },[file,currentImage]);
    

    return (
    <>
      <div className="ava">
        <div className="ava__btn" onClick={delImage}>-</div>
        <div className="ava__img">
          <div className="ava__ratio"></div>
          <img src={file ? createObjectUrl(file) : (currentImg && noChange ? currentImg : "../../../../images/user-icon.png")}/>
        </div>
        <div className="ava__btn">
          +
          <input className="ava__input" type="file" onChange={emitImage} />
        </div>
      </div>
    </>
  );
};
export default NewAvatarUpload;
