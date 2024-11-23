import { useState, useEffect } from "react";
import ImageUploadSvg from "./ImageUploadSvg";
import "./image-upload.scss";

const ImageUpload = ({ onUpload, PreviousPhotos = [] }) => {
  const [files, setFiles] = useState([]);
  const [delFiles, setDelFiles] = useState([]);
  const [isPreviousPhotos, setIsPreviousPhotos] = useState(true);

  const createObjectUrl = (file) => {
    return URL.createObjectURL(file);
  };

  const handleInput = (e) => {
    let obj = e.target.files;
    setFiles((f) => [...f, ...obj]);
  };

  const merge = () => {
    if (PreviousPhotos.length > 0) {
      PreviousPhotos.map((pp) => {
        const blob = new Blob([pp.address]);
        const file = new File([blob], pp.address, {
          type: "image/jpeg",
        });
        file.old = true;
        file.id = pp.id;
        file.product_id = pp.product_id;
        setFiles((f) => [...f, file]);
      });
    }
    setIsPreviousPhotos(false);
  };

  useEffect(() => {
    if (isPreviousPhotos) {
      merge();
    }
  }, []);

  useEffect(() => {
    onUpload(files, delFiles);
  }, [files]);

  return (
    <div className="upload">
      <div className="upload__multi-image">
        {files.map((file, index) => {
          return (
            <div className="upload__image" key={index}>
              {console.log('files = ',files)}
              <img src={file.old ? file.name : createObjectUrl(file)} />
              <div className="upload__overlay">
                <div
                  className="upload__del-btn"
                  onClick={() => {
                    setDelFiles(() =>
                      files.filter((f, i) => {
                        if (index === i) {
                          return f;
                        }
                      })
                    );
                    setFiles(() =>
                      files.filter((f, i) => {
                        if (index !== i) {
                          return f;
                        }
                      })
                    );
                  }}
                ></div>
              </div>
            </div>
          );
        })}

        <div className="upload__con-input">
          <input
            type="file"
            multiple
            className="upload__input"
            onChange={handleInput}
          />
          <div className="upload__btn-input">
            <ImageUploadSvg />
          </div>
          <div className="upload__con-input--ratio"></div>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
