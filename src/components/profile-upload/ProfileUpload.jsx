import { useState,useRef } from "react";

import './profile-upload.scss';

const ProfileUpload = () => {
    const [file,setFile] = useState(null);
    const [objImage,setObjImage] = useState({backgroundImage : `url(./icons/avatar.png')`});

    const handleInput = (e) => {
        let obj = e.target.files[0];
        setFile(() => obj);
        let objImg = {backgroundImage : `url(${URL.createObjectURL(obj)})`}
        setObjImage(()=> objImg);
    }

    return(
        <div className="profile" style={objImage}>
            {file ? console.log('file = ',file) : ""}
            <div className="profile__ratio"></div>
            <input type="file" onChange={handleInput} className="profile__input"/>
        </div>
    )
}

export default ProfileUpload;