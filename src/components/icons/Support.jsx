import "./icons.scss";
const Support = ({ width = "25px", height = "25px", color = "#000000" }) => {
  return (
    <>
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        <path
          stroke={color}
          stroke-width="2"
          d="M18 18l-3-3M9 9L6 6m9 3l3-3M6 18l3-3m12-3a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>{" "}
    </>
  );
};
export default Support;
