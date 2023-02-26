import { Sidenav, Nav } from "rsuite";
import PlusRoundIcon from "@rsuite/icons/PlusRound";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DoingRoundIcon from "@rsuite/icons/DoingRound";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Navbar = (props) => {
  const [expanded, setExpanded] = useState(true);
  const [activeKey, setActiveKey] = useState("0");
  const [newCategoryText, setNewCategoryText] = useState("");
  const [navWidth, setNavWidth] = useState(300);
  const [newCategoryColor, setNewCategoryColor] = useState("red");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAddCategory = async () => {
    if (
      newCategoryText == "" ||
      props.categories.filter((e) => e.name == newCategoryText).length != 0
    )
      return;

    handleClose();

    const id = props.categories[props.categories.length - 1].id + 1;
    const name = newCategoryText;
    setNewCategoryText("");
    const color = newCategoryColor;

    if (props.isLogged) {
      const response = await fetch("/addCategory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          color: color,
          id_user: props.email,
        }),
      });

      if (response.ok) props.updateCategories("");
    } else {
      props.updateCategories([
        ...props.categories,
        {
          id: id,
          name: name,
          color: color,
        },
      ]);
    }
  };

  useEffect(() => {
    props.width < 592 ? setNavWidth(56) : setNavWidth(300);
  }, [props.width]);

  return (
    <>
      <div
        style={{
          width: navWidth,
          top: 56,
          left: 0,
          height: "calc(100% - 56px)",
        }}
        className="position-absolute">
        <Sidenav
          className="h-100 bg-nav"
          expanded={props.width < 600 ? false : true}>
          <Sidenav.Body>
            <Nav activeKey={activeKey} onSelect={setActiveKey}>
              {props.categories.map((e, i) => (
                <>
                  <Nav.Item
                    key={e.id}
                    onClick={() => {
                      if (i != props.activeCategory)
                        props.setActiveCategoryF(i);
                    }}
                    className="text-secondary bg-nav bg-nav-item d-flex justify-content-between"
                    eventKey={i}
                    icon={
                      <DoingRoundIcon
                        style={{
                          color: e.color,
                          marginRight: "10px",
                          height: 22,
                          width: 22,
                        }}
                      />
                    }>
                    <p>{e.name}</p>
                    {i > 4 && i == props.activeCategory && (
                      <div
                        className="text-danger"
                        style={{ cursor: "pointer" }}
                        onClick={() => props.deleteCategory(e.id)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </div>
                    )}
                  </Nav.Item>
                </>
              ))}
              <Nav.Item
                onClick={handleShow}
                className="text-secondary bg-nav bg-nav-item"
                eventKey="0"
                icon={
                  <PlusRoundIcon
                    style={{
                      color: "black",
                      marginRight: "10px",
                      height: 22,
                      width: 22,
                    }}
                  />
                }>
                Add Category
              </Nav.Item>
            </Nav>
          </Sidenav.Body>
        </Sidenav>
      </div>

      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header style={{ border: 0 }} closeButton closeVariant="white">
          <h1>Add New Category</h1>
        </Modal.Header>
        <hr />
        <Modal.Body style={{ border: 0 }}>
          <label className="add-todo-label p-3 d-flex align-items-center fs-4 w-100">
            <input
              type="text"
              placeholder="New Category"
              className="mx-2 add-todo-input w-100"
              onChange={(e) => {
                setNewCategoryText(e.target.value);
              }}
              value={newCategoryText}
            />
          </label>
          <div className="d-flex flex-row justify-content-center align-items-center flex-wrap">
            <Button
              className="mx-3 text-center"
              variant="link"
              onClick={() => {
                setNewCategoryColor("red");
              }}>
              <DoingRoundIcon
                style={{
                  color: "red",
                  marginRight: "10px",
                  height: 22,
                  width: 22,
                }}
              />
            </Button>
            <Button
              className="mx-3 text-center"
              variant="link"
              onClick={() => {
                setNewCategoryColor("orange");
              }}>
              <DoingRoundIcon
                style={{
                  color: "orange",
                  marginRight: "10px",
                  height: 22,
                  width: 22,
                }}
              />
            </Button>
            <Button
              className="mx-3 text-center"
              variant="link"
              onClick={() => {
                setNewCategoryColor("yellow");
              }}>
              <DoingRoundIcon
                style={{
                  color: "yellow",
                  marginRight: "10px",
                  height: 22,
                  width: 22,
                }}
              />
            </Button>
            <Button
              className="mx-3 text-center"
              variant="link"
              onClick={() => {
                setNewCategoryColor("green");
              }}>
              <DoingRoundIcon
                style={{
                  color: "green",
                  marginRight: "10px",
                  height: 22,
                  width: 22,
                }}
              />
            </Button>
            <Button
              className="mx-3 text-center"
              variant="link"
              onClick={() => {
                setNewCategoryColor("blue");
              }}>
              <DoingRoundIcon
                style={{
                  color: "blue",
                  marginRight: "10px",
                  height: 22,
                  width: 22,
                }}
              />
            </Button>
            <Button
              className="mx-3 text-center"
              variant="link"
              onClick={() => {
                setNewCategoryColor("indigo");
              }}>
              <DoingRoundIcon
                style={{
                  color: "indigo",
                  marginRight: "10px",
                  height: 22,
                  width: 22,
                }}
              />
            </Button>
            <Button
              className="mx-3 text-center"
              variant="link"
              onClick={() => {
                setNewCategoryColor("violet");
              }}>
              <DoingRoundIcon
                style={{
                  color: "violet",
                  marginRight: "10px",
                  height: 22,
                  width: 22,
                }}
              />
            </Button>
          </div>
        </Modal.Body>
        <hr />
        <Modal.Footer style={{ border: 0 }}>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            className="add-todo"
            style={{ border: 0 }}
            onClick={() => handleAddCategory()}>
            Add Category
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Navbar;
