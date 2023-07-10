
import React from "react";
import { Nav, NavLink, NavMenu } 
    from "./NavbarElements";
import "./navlogo.css";
  
const Navbar = () => {
  return (
    <>
      
      <Nav>
      <div className="navlogo">
          <img src="../UoA_White.png" className="logo" alt="logo" width="45" height="45" position="left"/>
          <h4 className="brick" alt="BrickWorx" color="white"> BrickWorx </h4>
      </div>
        
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
