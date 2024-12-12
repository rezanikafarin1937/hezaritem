import "./checkbox.scss";
const CheckBox = ({ active = false, middle = false }) => {
  return (
    <div
      className={
        !middle
          ? "checkbox " + (active ? "checkbox__active" : "")
          : "checkbox checkbox__middle"
      }
    ></div>
  );
};

export default CheckBox;
