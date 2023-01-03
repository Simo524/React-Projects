import { Sidenav, Nav } from "rsuite";
import PlusRoundIcon from "@rsuite/icons/PlusRound";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const Navbar = (props) => {
  const [expanded, setExpanded] = useState(true);
  const [activeKey, setActiveKey] = useState("0");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    props.setActiveCategory("0");
  }, []);

  return (
    <>
      <div
        style={{ width: 300, top: 56, left: 0, height: "calc(100% - 56px)" }}
        className="position-absolute">
        <Sidenav
          className="h-100 bg-nav"
          expanded={props.width < 600 ? false : true}>
          <Sidenav.Body>
            <Nav activeKey={activeKey} onSelect={setActiveKey}>
              {props.categories.map((e) => (
                <Nav.Item
                  onClick={props.setActiveCategory(activeKey)}
                  className="text-secondary bg-nav bg-nav-item "
                  eventKey={props.categories.indexOf(e)}
                  icon={e}>
                  {props.categoriesText[props.categories.indexOf(e)]}
                </Nav.Item>
              ))}
              <Nav.Item
                onClick={handleShow}
                eventKey="0"
                className="text-secondary bg-nav bg-nav-item "
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

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Navbar;
