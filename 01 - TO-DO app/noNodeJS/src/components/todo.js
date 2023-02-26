import { BsFillTrashFill } from "react-icons/bs";
import { useEffect } from "react";

const Todo = (props) => {
  useEffect(() => {
    console.log(props);
  }, []);

  return (
    <div className="d-flex flex-row justify-content-evenly align-items-center p-3 m-3 rounded-4 text-light todo">
      <div
        className="round"
        onClick={() => props.checkboxFunction(props.color, props.text)}>
        <input type="checkbox" className="checkbox" checked={props.checked} />
        <label></label>
      </div>
      {!props.checked && (
        <p className="px-4 m-0 fs-4 w-75">
          {props.color}
          {props.text}
        </p>
      )}
      {props.checked && (
        <p className="px-4 m-0 fs-4 w-75">
          <del>
            {props.color}
            {props.text}
          </del>
        </p>
      )}
      <button
        className="btn btn-danger"
        onClick={() => props.deleteFunction(props.color, props.text)}>
        <BsFillTrashFill />
      </button>
    </div>
  );
};

export default Todo;
