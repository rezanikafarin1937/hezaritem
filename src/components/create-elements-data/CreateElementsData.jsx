import React from "react";
import "./create-elements-data.scss";

const CreateElementsData = ({ elements, fields, classElements, data }) => {
  return (
    <>
      {elements.length === 0 ? null : elements.map((e,i) => {
        return React.createElement(e,{className : classElements[i], key : i}, data[fields[i]]);
      })}
    </>
  );
};

export default CreateElementsData;
