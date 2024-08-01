import React from "react";
import { useThemeContext } from "../../Contexts/ThemesContext";
import { useStateContext } from "../../Contexts/StateContext";
import "./ImageModal.scss";
const ImageModal = () => {
  const { applicationColor } = useThemeContext();
  const { imageData, setImageModal,setImageData } = useStateContext();
  return (
    <div className="modal image-modal" onClick={() =>{
      setImageModal(false)
      setImageData(null);
    }
    
    
    }>
      <img src={imageData ? imageData : null} alt="no-profile" />
    </div>
  );
};

export default ImageModal;
