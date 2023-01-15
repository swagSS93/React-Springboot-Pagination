import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

const HeaderComponent = () => {
  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
          <div>
            <a href="http://google.com" className="navbar-brand">
              Employee Management Application
            </a>
          </div>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Employees
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="/employees">Employee List</Dropdown.Item>
              <Dropdown.Item href="/">Home Page</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </nav>
      </header>
    </div>
  );
};

export default HeaderComponent;
