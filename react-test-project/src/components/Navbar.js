import React from "react";
import { Nav, NavLink, NavMenu } 
    from "./NavbarElements";
  
const Navbar = () => {
  return (
    <>
      <Nav>
        <NavMenu>
          <NavLink to="/Upload" title={"Upload Canvas CSV"} activeStyle>
            <p>Upload Canvas CSV</p>
          </NavLink>
          <NavLink to="/Create" title={"Create Rubric"} activeStyle>
            <p>Create Rubric</p>
          </NavLink>
          <NavLink to="/Mark" title={"Mark"} activeStyle>
            <p>Mark</p>
          </NavLink>
          <NavLink to="/Review" title={"Review"} activeStyle>
            <p>Review</p>
          </NavLink>
          <NavLink to="/Download" title={"Download Canvas CSV"} activeStyle>
            <p>Download Canvas CSV</p>
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};
  
export default Navbar;