import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";

const LogIn = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = useState("false");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("false");

  const loginRequest = async () => {
    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const data = await response.json();

    if (data.errorUsername) {
      setUsernameError(true);
      setUsernameErrorMessage(data.message);
      return;
    }
    setUsernameError(false);
    setUsernameErrorMessage("");

    if (data.errorPassword) {
      setPasswordError(true);
      setPasswordErrorMessage(data.message);
      return;
    }
    setPasswordError(false);
    setPasswordErrorMessage("");

    if (response.ok) {
      setUsername("");
      setPassword("");
      props.setLoginF(false);
      props.setLoggedinF(true);
      props.setUserMailF(data.id_user);
      props.setUserNameF(data.username);

      props.updateCategories(data.categories);
      props.updateTodos(data.todos);
    }
  };

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: "100vh" }}>
      <h1 className="text-center my-3">Log In</h1>
      <label
        className="add-todo-label p-3 d-flex align-items-center fs-4 my-3"
        style={usernameError ? { border: "1px solid red" } : {}}>
        <input
          type="text"
          placeholder="Username"
          className="add-todo-input"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </label>
      {usernameError ? (
        <p className="text-danger">{usernameErrorMessage}</p>
      ) : (
        ""
      )}
      <label
        className="add-todo-label p-3 d-flex align-items-center fs-4 my-3"
        style={passwordError ? { border: "1px solid red" } : {}}>
        <input
          type="password"
          placeholder="Password"
          className="add-todo-input"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      {passwordError ? (
        <p className="text-danger">{passwordErrorMessage}</p>
      ) : (
        ""
      )}

      <div className="d-flex flex-row">
        <button
          className="btn btn-secondary rounded-5 text-light fs-4 px-3 m-3"
          onClick={() => {
            props.setLoginF(false);
          }}>
          Go Back
        </button>

        <button
          className="btn add-todo rounded-5 text-light fs-4 px-3 m-3"
          onClick={loginRequest}>
          Log In
        </button>
      </div>

      <button
        className="position-absolute fs-5 text-light"
        style={{ left: 20, top: 20, background: "transparent" }}
        onClick={() => {
          props.setLoginF(false);
        }}>
        <FontAwesomeIcon icon={faArrowLeftLong} />
      </button>
    </div>
  );
};

export default LogIn;
