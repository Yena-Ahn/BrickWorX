import React from "react";
import { Nav, NavLink, NavMenu } 
    from "./NavbarElements";
  
const Navbar = () => {
  return (
    <>
      <Nav>
        <NavMenu>
          <NavLink to="/Upload" activeStyle>
            upload canvas csv
          </NavLink>
          <NavLink to="/Create" activeStyle>
            Create Rubric
          </NavLink>
          <NavLink to="/Mark" activeStyle>
            Mark
          </NavLink>
          <NavLink to="/Review" activeStyle>
            review
          </NavLink>
          <NavLink to="/Download" activeStyle>
            download canvas csv
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};
  
export default Navbar;
