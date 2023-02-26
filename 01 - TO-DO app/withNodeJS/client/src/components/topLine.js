import { Navbar, Nav, Dropdown } from "rsuite";
import DoingRoundIcon from "@rsuite/icons/DoingRound";
import AdminIcon from "@rsuite/icons/Admin";
import { useEffect } from "react";

const TopLine = (props) => {
  useEffect(() => {
    console.log(props.activeCategoryObject);
  }, [props.activeCategoryObject]);

  const logOut = () => {
    props.setTodos([]);
    props.updateCategories([
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
    props.setLoggedinF(false);
    props.setUserMailF("");
    props.setUserNameF("");
    props.setActiveCategory(0);

    fetch("/deleteCookies");
  };

  return (
    <>
      <Navbar className="bg-nav w-100">
        <Nav>
          {!props.isLogged && (
            <>
              <Nav.Item className="fs-4">
                <button
                  className="btn log-in"
                  onClick={() => props.setLoginF(true)}>
                  Log in
                </button>
              </Nav.Item>
              <Nav.Item className="fs-4">
                <button
                  className="btn sign-up"
                  onClick={() => props.setSignupF(true)}>
                  Sign up
                </button>
              </Nav.Item>
            </>
          )}
          {props.isLogged && (
            <Nav.Menu icon={<AdminIcon />} title={props.username}>
              <Nav.Item onClick={logOut}>Logout</Nav.Item>
            </Nav.Menu>
          )}
        </Nav>
        <Nav pullRight>
          <Nav.Item className="text-secondary fs-5 no-hover">
            <DoingRoundIcon
              style={{
                color: props.activeCategoryObject.color,
                marginRight: "10px",
                height: 22,
                width: 22,
              }}
            />
            {props.activeCategoryObject.name}
          </Nav.Item>
        </Nav>
      </Navbar>
    </>
  );
};

export default TopLine;
