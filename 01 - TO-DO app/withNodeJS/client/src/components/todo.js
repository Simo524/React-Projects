import { BsFillTrashFill } from "react-icons/bs";
import { useEffect } from "react";
import DoingRoundIcon from "@rsuite/icons/DoingRound";

const Todo = (props) => {
  return (
    <div className="d-flex flex-row justify-content-evenly align-items-center p-3 m-3 rounded-4 text-light todo">
      <div
        className="round"
        onClick={() =>
          props.handleCheckbox(props.text, +!parseInt(props.checked))
        }>
        {parseInt(props.checked) && (
          <input
            type="checkbox"
            className="checkbox"
            checked
            onClick={() =>
              props.handleCheckbox(props.text, +!parseInt(props.checked))
            }
          />
        )}
        {!parseInt(props.checked) && (
          <input
            type="checkbox"
            className="checkbox"
            defaultChecked={parseInt(props.checked)}
            onClick={() =>
              props.handleCheckbox(props.text, +!parseInt(props.checked))
            }
          />
        )}
        <label
          onClick={() =>
            props.handleCheckbox(props.text, +!parseInt(props.checked))
          }></label>
      </div>

      <p className="px-4 m-0 fs-4 w-75">
        {parseInt(props.checked) ? (
          <del>
            <DoingRoundIcon
              style={{
                color: props.category.color,
                marginRight: "10px",
                height: 22,
                width: 22,
              }}
            />
            {props.text}
          </del>
        ) : (
          <>
            <DoingRoundIcon
              style={{
                color: props.category.color,
                marginRight: "10px",
                height: 22,
                width: 22,
              }}
            />
            {props.text}
          </>
        )}
      </p>
      <button
        className="btn btn-danger"
        onClick={() => props.deleteFunction(props.text)}>
        <BsFillTrashFill />
      </button>
    </div>
  );
};

export default Todo;
