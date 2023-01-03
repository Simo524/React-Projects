import "./App.css";
import { useState, useEffect } from "react";
import { BsArrowUp } from "react-icons/bs";
import DoingRoundIcon from "@rsuite/icons/DoingRound";

import Todo from "./components/todo";
import Navbar from "./components/navbar";
import TopLine from "./components/topLine";

function getWindowSize() {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
}

function App() {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);
  const [activeCategory, setActiveCategory] = useState("0");
  const [categories, setCategories] = useState([
    <DoingRoundIcon
      style={{ color: "white", marginRight: "10px", height: 22, width: 22 }}
    />,
    <DoingRoundIcon
      style={{ color: "orange", marginRight: "10px", height: 22, width: 22 }}
    />,
    <DoingRoundIcon
      style={{ color: "red", marginRight: "10px", height: 22, width: 22 }}
    />,
    <DoingRoundIcon
      style={{ color: "blue", marginRight: "10px", height: 22, width: 22 }}
    />,
    <DoingRoundIcon
      style={{ color: "purple", marginRight: "10px", height: 22, width: 22 }}
    />,
  ]);
  const [categoriesText, setCategoriesText] = useState([
    "All",
    "Study",
    "Coding",
    "Books",
    "Movies",
  ]);
  const [newColor, setNewColor] = useState(categoriesText[0]);
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

  let colorOptionCount = -1;

  const completeTodo = (color, text) => {
    setTodos((oldTodos) => oldTodos.filter((element) => element[1] != text));
    setCompletedTodos((oldCompletedTodos) => [
      ...oldCompletedTodos,
      [color, text],
    ]);
  };
  const uncompleteTodo = (color, text) => {
    setTodos((oldTodos) => [...oldTodos, [color, text]]);
    setCompletedTodos((oldCompletedTodos) =>
      oldCompletedTodos.filter((element) => element[1] != text)
    );
  };
  const deleteTodo = (color, text) => {
    setTodos((oldTodos) => oldTodos.filter((element) => element[1] != text));
  };
  const deleteCompletedTodo = (color, text) => {
    setCompletedTodos((oldCompletedTodos) =>
      oldCompletedTodos.filter((element) => element[1] != text)
    );
  };

  return (
    <>
      <TopLine
        categories={categories}
        categoriesText={categoriesText}
        activeCategory={activeCategory}
      />
      <Navbar
        setActiveCategory={setActiveCategory}
        width={windowSize.innerWidth}
        categories={categories}
        categoriesText={categoriesText}
      />

      <div className="container my-3">
        <div className="d-flex justify-content-center align-items-center">
          {/* INPUT FOR NEW TODO */}
          <label className="add-todo-label p-3 d-flex align-items-center fs-4">
            <input
              type="text"
              placeholder="New Todo"
              className="mx-2 add-todo-input"
              onChange={(e) => setTodoText(e.target.value)}
              value={todoText}
            />
            <select
              className="mx-2 text-secondary"
              style={{ backgroundColor: "transparent", border: "none" }}
              onChange={(e) => setNewColor(e.target.value)}>
              {categoriesText.map((e) => (
                <option
                  key={colorOptionCount++}
                  className="text-secondary bg-nav bg-nav-item">
                  {e}
                </option>
              ))}
            </select>
            <button
              className="btn add-todo rounded-5 text-light"
              style={{ display: "inline-block" }}
              onClick={() => {
                if (todoText === "" || todos.includes(todoText)) {
                  setTodoText("");
                  return;
                }
                setTodos((oldTodos) => [
                  ...oldTodos,
                  [categories[categoriesText.indexOf(newColor)], todoText],
                ]);
                setTodoText("");
              }}>
              +
            </button>
          </label>
        </div>
        <h3 className="text-secondary">To Do</h3>
        {todos.filter((e) =>
          activeCategory == "0"
            ? true
            : categories.indexOf(e[0]) == activeCategory
        ).length == 0 && (
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
                : categories.indexOf(e[0]) == activeCategory
            )
            .map((e) => (
              <Todo
                key={todos.indexOf(e)}
                text={e[1]}
                color={e[0]}
                checkboxFunction={completeTodo}
                deleteFunction={deleteTodo}
                checked={false}
              />
            ))
        }
        {completedTodos.filter((e) =>
          activeCategory == "0"
            ? true
            : categories.indexOf(e[0]) == activeCategory
        ).length > 0 && <h3 className="text-secondary">Completed</h3>}
        {
          // ? displays completed todos
          completedTodos
            .filter((e) =>
              activeCategory == "0"
                ? true
                : categories.indexOf(e[0]) == activeCategory
            )
            .map((e) => (
              <Todo
                key={completedTodos.indexOf(e)}
                text={e[1]}
                color={e[0]}
                checkboxFunction={uncompleteTodo}
                deleteFunction={deleteCompletedTodo}
                checked={true}
              />
            ))
        }
      </div>
    </>
  );
}

export default App;
