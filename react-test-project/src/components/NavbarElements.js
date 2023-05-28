
import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";
//
//
// MOVE TO STYLE SHEET LATER
//
//
export const Nav = styled.nav`
overflow: hidden;
position: sticky;
top: 0;
background: #00467F;
height: 60px;
display: flex;
justify-content: space-between;
padding: 0.05rem calc((100vw - 1000px) / 2);
z-index: 12;
`;

export const NavLink = styled(Link)`
color: white;
display: flex;
align-items: center;
text-decoration: none;
padding: 0 1.9rem;
margin: 0 0;
height: 100%;
cursor: pointer;
justify-content: space-around;

&.active:before {
	position: absolute;
	color: #00467F;
	font-weight: bold;
	text-decoration: underline;
	content: ${({title}) => `"${title}"`};
}

&.active {
	color: #00467F;
	background-color: #FFFFFF;
	text-decoration: underline;

	p {
		visibility: hidden;
	}
}

&:hover {
	text-decoration: none;
	background-color: #FFFFFF;
	color: #00467F;

	p {
		visibility: hidden;
	}
}

&:hover:before {
	position: absolute;
	color: #00467F;
	font-weight: bold;
	content: ${({title}) => `"${title}"`};
}

&:focus {
	color: #00467F;
}

& p {
	display: flex;
	margin: auto;
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
display: inline-flex;
justify-content: center;
margin: 0 auto;
/* margin-right: -130px; */
/* margin-left: 30px; */
/* Second Nav */
/* margin-right: 24px; */
/* Third Nav */
/* width: 100vw;
white-space: nowrap; */
@media screen and (max-width: 768px) {
	display: none;
}
`;