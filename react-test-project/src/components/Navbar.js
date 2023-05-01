import React from "react";
import { Nav, NavLink, NavMenu } 
    from "./NavbarElements";
  
const Navbar = () => {
  return (
    <>
      <Nav>
        <NavMenu>
          <NavLink to="/Upload" activeStyle>
            Upload Canvas CSV
          </NavLink>
          <NavLink to="/Create" activeStyle>
            Create Rubric
          </NavLink>
          <NavLink to="/Mark" activeStyle>
            Mark
          </NavLink>
          <NavLink to="/Review" activeStyle>
            Review
          </NavLink>
          <NavLink to="/Download" activeStyle>
            Download Canvas CSV
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};
  
export default Navbar;
