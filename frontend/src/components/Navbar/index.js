import React, { useContext } from "react";
import { FaBars } from "react-icons/fa";
import { animateScroll as scroll } from "react-scroll";

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

import AuthContext from "../../store/auth-context";
import GoalContext from "../../store/goal-context";

const Navbar = ({ toggle }) => {
  const authCtx = useContext(AuthContext);
  const goalCtx = useContext(GoalContext);
  const isLoggendIn = authCtx.isLoggendIn;
  const logoutHandler = () => {
    authCtx.logout();
    goalCtx.reset();
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
            {!isLoggendIn && (
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
            {!isLoggendIn && (
              <NavItem>
                <NavRouterLink to="/signup">회원가입</NavRouterLink>
              </NavItem>
            )}
          </NavMenu>
          <NavBtn>
            {isLoggendIn ? (
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
