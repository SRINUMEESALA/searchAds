import "./index.css";

const Add = (props) => {
  const { imageUrl, companyName } = props.eachItem;

  return (
    <li className="col-3 p-2 text-center">
      <div className="card roomCard mx-auto shadow-sm p-3">
        <div className="">
          <img className="eachCard rounded w-100" alt="add" src={imageUrl} />
        </div>
        <h1 className="text-center h4 mt-2">{companyName}</h1>
      </div>
    </li>
  );
};

export default Add;
