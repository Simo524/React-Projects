import { Navbar, Nav } from "rsuite";

const TopLine = (props) => {
  return (
    <Navbar className="bg-nav w-100">
      <Nav pullRight>
        <Nav.Item className="text-secondary fs-5 no-hover">
          {props.categories[parseInt(props.activeCategory)]}{" "}
          {props.categoriesText[props.activeCategory]}
        </Nav.Item>
      </Nav>
    </Navbar>
  );
};

export default TopLine;
