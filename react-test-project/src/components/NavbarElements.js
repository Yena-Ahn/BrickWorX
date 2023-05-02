import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";
//
//
// MOVE TO STYLE SHEET LATER
//
//
export const Nav = styled.nav`
background: #00467F;
height: 75px;
display: flex;
justify-content: space-between;
padding: 0.1rem calc((100vw - 1000px) / 2);
z-index: 12;
`;

export const NavLink = styled(Link)`
color: white;
display: flex;
align-items: center;
text-decoration: none;
padding: 0 1.3rem;
margin: 0 30px;
height: 100%;
cursor: pointer;
&.active {
	color: #009AC7;
	background-color: #F2F2F2;
}

&:hover {
	text-decoration: none;
	background-color: #F2F2F2;
	color: #00467F;
	font-weight: bold;
}

&:focus {
	color: #009AC7;
}
`;

export const Bars = styled(FaBars)`
display: none;
color: #808080;
@media screen and (max-width: 768px) {
	display: block;
	position: absolute;
	top: 0;
	right: 0;
	transform: translate(-100%, 75%);
	font-size: 1.8rem;
	cursor: pointer;
}
`;

export const NavMenu = styled.div`
display: flex;
align-items: center;
margin-right: -130px;
margin-left: 30px;
/* Second Nav */
/* margin-right: 24px; */
/* Third Nav */
/* width: 100vw;
white-space: nowrap; */
@media screen and (max-width: 768px) {
	display: none;
}
`;
