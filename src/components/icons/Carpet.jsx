const Carpet = ({ width = "25px", height = "25px", color = "#000000" }) => {
  return (
    <>
      <svg
        fill={color}
        height={height}
        width={width}
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        // xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 495 495"
        // xml:space="preserve"
      >
        <g>
          <path
            d="M380,0v45h-43.75V0h-30v45H262.5V0h-30v45h-43.75V0h-30v45H115V0H85v495h30v-45h43.75v45h30v-45h43.75v45h30v-45h43.75v45
		h30v-45H380v45h30V0H380z M380,216.465L278.953,75H380V216.465z M365.301,247.5L247.5,412.421L129.699,247.5L247.5,82.579
		L365.301,247.5z M216.047,75L115,216.465V75H216.047z M115,278.535L216.047,420H115V278.535z M278.953,420L380,278.535V420H278.953
		z"
          />
          <path
            d="M247.5,360.807L328.434,247.5L247.5,134.193L166.566,247.5L247.5,360.807z M291.566,247.5L247.5,309.193L203.434,247.5
		l44.066-61.693L291.566,247.5z"
          />
        </g>
      </svg>{" "}
    </>
  );
};
export default Carpet;
