const ShowData = ({ data, fields }) => {

  const renderFields = () => {
    return (
      <>
        {fields.map((f, i) => (
          <div  key={i}>
            <p>{f} : {data[f]}</p>
          </div>
        ))}
      </>
    );
  };

  return(
    <>
        {renderFields()}
    </>
  )
};

export default ShowData;
