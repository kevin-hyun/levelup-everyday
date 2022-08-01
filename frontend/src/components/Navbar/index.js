import React from "react";
import { FaBars } from "react-icons/fa";
import { animateScroll as scroll } from "react-scroll";
import { useSelector, useDispatch } from "react-redux";

import {
  Nav,
  NavLogo,
  NavIcon,
  NavbarContainer,
  MobileIcon,
  NavMenu,
  NavLinks,
  NavItem,
  NavBtnLink,
  NavBtn,
  NavRouterLink,
} from "./NavbarElements";

import { authActions } from "../../store/auth";
import { goalActions } from "../../store/goal";

const Navbar = ({ toggle }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const logoutHandler = () => {
    dispatch(authActions.logout());
    dispatch(goalActions.reset());
  };
  const togglehome = () => {
    scroll.scrollToTop();
  };

  return (
    <>
      <Nav>
        <NavbarContainer>
          <NavLogo to="/" onClick={togglehome}>
            <NavIcon
              src={process.env.PUBLIC_URL + "/img/logo.png"}
              alt={"logo11"}
            />
          </NavLogo>
          <MobileIcon onClick={toggle}>
            <FaBars />
          </MobileIcon>
          <NavMenu>
            {!isAuthenticated && (
              <NavItem>
                <NavLinks to="about" duration={500} exact="true" offset={-80}>
                  오늘도레벨업?
                </NavLinks>
              </NavItem>
            )}
            <NavItem>
              <NavRouterLink to="/goal">목표 설정</NavRouterLink>
            </NavItem>
            <NavItem>
              <NavRouterLink to="/score/main">성장곡선</NavRouterLink>
            </NavItem>
            {!isAuthenticated && (
              <NavItem>
                <NavRouterLink to="/signup">회원가입</NavRouterLink>
              </NavItem>
            )}
          </NavMenu>
          <NavBtn>
            {isAuthenticated ? (
              <NavBtnLink to="/signin" onClick={logoutHandler}>
                로그아웃
              </NavBtnLink>
            ) : (
              <NavBtnLink to="/signin">로그인</NavBtnLink>
            )}
          </NavBtn>
        </NavbarContainer>
      </Nav>
    </>
  );
};

export default Navbar;
