import "./App.css";
import { useState, useEffect } from "react";
import { BsArrowUp } from "react-icons/bs";

import Todo from "./components/todo";
import Navbar from "./components/navbar";
import TopLine from "./components/topLine";
import LogIn from "./components/login";
import SignUp from "./components/signup";

class TodoItem {
  constructor(id, text, done, id_category) {
    this.id = id;
    this.text = text;
    this.done = done;
    this.id_category = id_category;
  }

  setDone(value) {
    this.done = value;
  }
}

function getWindowSize() {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
}

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodoText, setNewTodoText] = useState("");
  const [activeCategory, setActiveCategory] = useState("0");
  const [login, setLogin] = useState(false);
  const [signup, setSignup] = useState(false);
  const [myWidth, setMyWidth] = useState(300);
  const [categories, setCategories] = useState([
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
  const [newTodoCategory, setNewTodoCategory] = useState("All");
  const [isLogged, setIsLogged] = useState(false);
  const [userMail, setUserMail] = useState("");
  const [userName, setUserName] = useState("");

  // get window height/width
  const [windowSize, setWindowSize] = useState(getWindowSize());
  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    windowSize.innerWidth < 592 ? setMyWidth(56) : setMyWidth(300);
  }, [windowSize]);

  let colorOptionCount = -1;

  const updateTodos = async (values = "") => {
    let todosFinal = [];

    if (values != "") {
      values.forEach((element) => {
        todosFinal.push(
          new TodoItem(
            element.id,
            element.text,
            element.done,
            element.id_category
          )
        );
      });
    } else {
      const response = await fetch("/getTodos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userMail,
        }),
      });
      const data = await response.json();

      data.forEach((element) => {
        todosFinal.push(
          new TodoItem(
            element.id,
            element.text,
            element.done,
            element.id_category
          )
        );
      });
    }

    setTodos(todosFinal);
  };

  const handleCheckbox = async (text, value) => {
    if (!isLogged) {
      let array = todos;
      array.map((e) => {
        if (e.text == text) e.setDone(value);
      });

      updateTodos(array);
    } else {
      const id = todos.filter((e) => e.text == text)[0].id;
      const email = userMail;

      const response = await fetch("/updateTodos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          email: email,
          value: value,
        }),
      });

      updateTodos();
    }
  };

  const handleTodoAdd = () => {
    if (newTodoText === "" || todos.includes(newTodoText)) {
      setNewTodoText("");
      return;
    }

    if (!isLogged)
      setTodos((oldTodos) => [
        ...oldTodos,
        new TodoItem(
          oldTodos.length,
          newTodoText,
          0,
          categories.filter((e) => e.name === newTodoCategory)[0].id
        ),
      ]);

    if (isLogged) {
      fetch("/addTodo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: newTodoText,
          id_user: userMail,
          id_category: categories.filter((e) => e.name == newTodoCategory)[0]
            .id,
        }),
      }).then((response) => updateTodos());
    }

    setNewTodoText("");
  };

  const updateCategories = async (values = "") => {
    if (values != "") {
      console.log(values);
      setCategories(values);
      return;
    }

    const response = await fetch("/getCategories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userMail,
      }),
    });
    const data = await response.json();

    setCategories(data);
  };

  const deleteTodo = async (text) => {
    if (!isLogged) {
      setTodos((oldTodos) =>
        oldTodos.filter((element) => element.text != text)
      );
      return;
    } else {
      const response = await fetch("/deleteTodos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userMail,
          id: todos.filter((e) => e.text == text)[0].id,
        }),
      });
      const data = response.status;

      if (data == 200) updateTodos();
    }
  };

  const deleteCategory = async (id) => {
    if (id <= 4) return;

    setActiveCategory(0);

    if (!isLogged) {
      setTodos((oldTodos) =>
        oldTodos.filter((element) => element.id_category != id)
      );
      setCategories((oldCategories) =>
        oldCategories.filter((element) => element.id != id)
      );
      return;
    }

    const response = await fetch("/deleteCategory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userMail,
        id: id,
      }),
    });

    if (response.ok) {
      console.log("ok");
      setTodos([]);
      updateCategories();
      updateTodos();
    }
  };

  useEffect(async () => {
    const response = await fetch("/getCookies");

    if (!response.ok) return;

    const data = await response.json();

    setUserMail(data.usermail);
    setUserName(data.username);
    setIsLogged(true);
  }, []);

  useEffect(() => {
    updateCategories();
    updateTodos();
  }, [isLogged]);

  const deleteCategoryF = (id) => {
    deleteCategory(id);
  };
  const setLoginF = (value) => {
    setLogin(value);
  };
  const setSignupF = (value) => {
    setSignup(value);
  };
  const setLoggedinF = (value) => {
    setIsLogged(value);
  };
  const setUserMailF = (value) => {
    setUserMail(value);
  };
  const setUserNameF = (value) => {
    setUserName(value);
  };
  const setActiveCategoryF = (value) => {
    setActiveCategory(value);
  };
  const setCategoriesF = (value) => {
    setCategories(value);
  };
  const setTodosF = (value) => {
    setTodos(value);
  };

  return (
    <>
      {login && (
        <LogIn
          updateTodos={updateTodos}
          updateCategories={updateCategories}
          setLoginF={setLoginF}
          setLoggedinF={setLoggedinF}
          setUserMailF={setUserMailF}
          setUserNameF={setUserNameF}
        />
      )}
      {signup && (
        <SignUp
          setTodos={setTodosF}
          setCategories={setCategories}
          setSignup={setSignupF}
          setLoggedinF={setLoggedinF}
          setUserMailF={setUserMailF}
          setUserNameF={setUserNameF}
        />
      )}
      {!login && !signup && (
        <>
          <TopLine
            activeCategoryObject={
              categories.filter((e, i) => i == parseInt(activeCategory))[0]
            }
            username={userName}
            isLogged={isLogged}
            setLoginF={setLoginF}
            setSignupF={setSignupF}
            setLoggedinF={setLoggedinF}
            setUserMailF={setUserMailF}
            setUserNameF={setUserNameF}
            setCategories={setCategoriesF}
            setTodos={setTodosF}
            updateTodos={updateTodos}
            updateCategories={updateCategories}
            setActiveCategory={setActiveCategoryF}
          />
          <Navbar
            setActiveCategoryF={setActiveCategoryF}
            activeCategory={activeCategory}
            width={windowSize.innerWidth}
            categories={categories}
            isLogged={isLogged}
            email={userMail}
            updateCategories={updateCategories}
            deleteCategory={deleteCategoryF}
          />

          <div
            style={{
              width: "calc(100% - " + myWidth + "px)",
              marginLeft: myWidth,
            }}>
            <div className="container my-3">
              <div className="d-flex justify-content-center align-items-center">
                {/* INPUT FOR NEW TODO */}
                <label className="add-todo-label p-3 d-flex align-items-center fs-4">
                  <input
                    type="text"
                    placeholder="New Todo"
                    className="add-todo-input"
                    onChange={(e) => setNewTodoText(e.target.value)}
                    value={newTodoText}
                  />
                  <select
                    className="me-4 text-secondary"
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      fontSize: "0.6em",
                    }}
                    onChange={(e) => setNewTodoCategory(e.target.value)}>
                    {categories.map((e) => (
                      <option
                        key={colorOptionCount++}
                        className="text-secondary bg-nav bg-nav-item">
                        {e.name}
                      </option>
                    ))}
                  </select>
                  <button
                    className="btn add-todo rounded-5 text-light"
                    style={{ display: "inline-block" }}
                    onClick={handleTodoAdd}>
                    +
                  </button>
                </label>
              </div>
              <h3 className="text-secondary">To Do</h3>
              {todos
                .filter((e) =>
                  activeCategory == "0"
                    ? true
                    : categories.indexOf(
                        categories.filter(
                          (element) => e.id_category == element.id
                        )[0]
                      ) == parseInt(activeCategory)
                )
                .filter((e) => e.done == 0).length == 0 && (
                <>
                  <p className="text-secondary text-center fs-5">
                    <BsArrowUp />
                  </p>
                  <p className="text-secondary text-center fs-5">
                    Nothing here... (I think you should add a todo!)
                  </p>
                </>
              )}
              {
                // ? displays todos
                todos
                  .filter((e) =>
                    activeCategory == "0"
                      ? true
                      : categories.indexOf(
                          categories.filter(
                            (element) => e.id_category == element.id
                          )[0]
                        ) == parseInt(activeCategory)
                  )
                  .filter((e) => e.done == 0)
                  .map((e) => (
                    <Todo
                      key={e.id}
                      text={e.text}
                      category={
                        categories.filter(
                          (category) => category.id == e.id_category
                        )[0]
                      }
                      handleCheckbox={handleCheckbox}
                      deleteFunction={deleteTodo}
                      checked={e.done}
                    />
                  ))
              }
              {todos
                .filter((e) =>
                  activeCategory == "0"
                    ? true
                    : categories.indexOf(
                        categories.filter(
                          (element) => e.id_category == element.id
                        )[0]
                      ) == parseInt(activeCategory)
                )
                .filter((e) => e.done == 1).length != 0 && (
                <h3 className="text-secondary">Completed</h3>
              )}
              {
                // ? displays done todos
                todos
                  .filter((e) =>
                    activeCategory == "0"
                      ? true
                      : categories.indexOf(
                          categories.filter(
                            (element) => e.id_category == element.id
                          )[0]
                        ) == parseInt(activeCategory)
                  )
                  .filter((e) => e.done == 1)
                  .map((e) => (
                    <Todo
                      key={e.id}
                      text={e.text}
                      category={
                        categories.filter(
                          (category) => category.id == e.id_category
                        )[0]
                      }
                      handleCheckbox={handleCheckbox}
                      deleteFunction={deleteTodo}
                      checked={e.done}
                    />
                  ))
              }
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default App;
