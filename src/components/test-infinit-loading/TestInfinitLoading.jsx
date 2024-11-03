import InfinitLoading from "../infinit-loading-component/InfinitLoading";
import "./test-infinit-loading.scss";

const TestInfinitLoading = () => {
  const BaseURL = "https://jsonplaceholder.typicode.com/todos";
  // const BaseURL = "https://gorest.co.in/public/v2/users";
  const config = {};

  return (
    <>
      <InfinitLoading BaseURL={BaseURL} config={config} responseDataField={null}>
        <div className="container">
          <h2 className="container__title">title</h2>
          <p className="container__user">userId</p>
          <p className="container__id">id</p>
          <i className="container__completed">completed</i>

          {/* <div>id</div>
          <div>name</div>
          <i className="red">email</i>
          <div>gender</div>
          <div>status</div> */}

        </div>
      </InfinitLoading>
    </>
  );
};

export default TestInfinitLoading;
