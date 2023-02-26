import { Sidenav, Nav } from "rsuite";
import PlusRoundIcon from "@rsuite/icons/PlusRound";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DoingRoundIcon from "@rsuite/icons/DoingRound";

const Navbar = (props) => {
  const [expanded, setExpanded] = useState(true);
  const [activeKey, setActiveKey] = useState("0");
  const [newCategory, setNewCategory] = useState("");
  const [navWidth, setNavWidth] = useState(300);
  const [newColor, setNewColor] = useState(
    <DoingRoundIcon
      style={{
        color: "red",
        marginRight: "10px",
        height: 22,
        width: 22,
      }}
    />
  );
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    props.setActiveCategory("0");
    props.width < 780 ? setNavWidth("auto") : setNavWidth(300);
  }, []);

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
              {props.categories.map((e) => (
                <Nav.Item
                  onClick={props.setActiveCategory(activeKey)}
                  className="text-secondary bg-nav bg-nav-item"
                  eventKey={props.categories.indexOf(e)}
                  icon={e}>
                  {props.categoriesText[props.categories.indexOf(e)]}
                </Nav.Item>
              ))}
              <Nav.Item
                onClick={handleShow}
                eventKey="0"
                className="text-secondary bg-nav bg-nav-item"
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
              onChange={(e) => setNewCategory(e.target.value)}
              value={newCategory}
            />
          </label>
          <div className="d-flex flex-row justify-content-center align-items-center flex-wrap">
            <Button
              className="mx-3 text-center"
              variant="link"
              onClick={() => {
                setNewColor(
                  <DoingRoundIcon
                    style={{
                      color: "red",
                      marginRight: "10px",
                      height: 22,
                      width: 22,
                    }}
                  />
                );
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
                setNewColor(
                  <DoingRoundIcon
                    style={{
                      color: "orange",
                      marginRight: "10px",
                      height: 22,
                      width: 22,
                    }}
                  />
                );
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
                setNewColor(
                  <DoingRoundIcon
                    style={{
                      color: "yellow",
                      marginRight: "10px",
                      height: 22,
                      width: 22,
                    }}
                  />
                );
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
                setNewColor(
                  <DoingRoundIcon
                    style={{
                      color: "green",
                      marginRight: "10px",
                      height: 22,
                      width: 22,
                    }}
                  />
                );
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
                setNewColor(
                  <DoingRoundIcon
                    style={{
                      color: "blue",
                      marginRight: "10px",
                      height: 22,
                      width: 22,
                    }}
                  />
                );
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
                setNewColor(
                  <DoingRoundIcon
                    style={{
                      color: "indigo",
                      marginRight: "10px",
                      height: 22,
                      width: 22,
                    }}
                  />
                );
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
                setNewColor(
                  <DoingRoundIcon
                    style={{
                      color: "violet",
                      marginRight: "10px",
                      height: 22,
                      width: 22,
                    }}
                  />
                );
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
            onClick={() => {
              if (
                newCategory == "" ||
                props.categoriesText.includes(newCategory)
              )
                return;
              handleClose();

              props.setCategories((oldCategories) => [
                ...oldCategories,
                newColor,
              ]);
              props.setCategoriesText((oldCategoriesText) => [
                ...oldCategoriesText,
                newCategory,
              ]);

              setNewCategory("");
            }}>
            Add Category
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Navbar;
