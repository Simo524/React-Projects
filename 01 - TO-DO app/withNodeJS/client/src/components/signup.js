import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";

const SignUp = (props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = useState(false);

  const signupRequest = async () => {
    const response = await fetch("/signUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    });
    const data = await response.json();

    if (data.errorMail) {
      setEmailError(true);
      setEmailErrorMessage(data.message);
      return;
    }
    setEmailError(false);
    setEmailErrorMessage("");

    if (data.errorUsername) {
      setUsernameError(true);
      setUsernameErrorMessage(data.message);
      return;
    }
    setUsernameError(false);
    setUsernameErrorMessage("");

    if (response.ok) {
      props.setLoggedinF(true);
      props.setUserMailF(email);
      props.setUserNameF(username);

      props.setCategories([
        {
          id: 0,
          name: "All",
          color: "white",
        },
        {
          id: 1,
          name: "Study",
          color: "orange",
        },
        {
          id: 2,
          name: "Coding",
          color: "red",
        },
        {
          id: 3,
          name: "Books",
          color: "blue",
        },
        {
          id: 4,
          name: "Movies",
          color: "purple",
        },
      ]);
      props.setTodos([]);
      setUsername("");
      setPassword("");
      setEmail("");
      props.setSignup(false);
    }
  };

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: "100vh" }}>
      <h1 className="text-center my-3">Sign up</h1>
      <label
        className="add-todo-label p-3 d-flex align-items-center fs-4 my-3"
        style={
          emailError
            ? { border: "1px solid red", width: "20%" }
            : { width: "20%" }
        }>
        <input
          type="email"
          placeholder="Email"
          className="add-todo-input"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      {emailError ? <p className="text-danger">{emailErrorMessage}</p> : ""}
      <label
        className="add-todo-label p-3 d-flex align-items-center fs-4 my-3"
        style={
          usernameError
            ? { border: "1px solid red", width: "20%" }
            : { width: "20%" }
        }>
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
        style={{ width: "20%" }}>
        <input
          type="password"
          placeholder="Password"
          className="add-todo-input"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>

      <div className="d-flex flex-row">
        <button
          className="btn btn-secondary text-light fs-4 px-3 m-3"
          onClick={() => {
            props.setSignup(false);
          }}>
          Go Back
        </button>

        <button
          className="btn add-todo text-light fs-4 px-3 m-3"
          onClick={signupRequest}>
          Sign up
        </button>
      </div>

      <button
        className="position-absolute fs-5 text-light"
        style={{ left: 20, top: 20, background: "transparent" }}
        onClick={() => {
          props.setSignup(false);
        }}>
        <FontAwesomeIcon icon={faArrowLeftLong} />
      </button>
    </div>
  );
};

export default SignUp;
