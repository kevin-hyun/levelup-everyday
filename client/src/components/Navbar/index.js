import React, { useState, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import { animateScroll as scroll } from 'react-scroll';

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
} from './NavbarElements';
import logo from '../../images/logo.png';

const Navbar = ({ token, toggle }) => {
  const [scrollNav, setScrollNav] = useState(false);

  const changeNav = () => {
    if (window.scrollY >= 80) {
      setScrollNav(true);
    } else {
      setScrollNav(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', changeNav);
  }, []);

  const togglehome = () => {
    scroll.scrollToTop();
  };

  return (
    <>
      <Nav scrollNav={scrollNav}>
        <NavbarContainer>
          <NavLogo to="/" onClick={togglehome}>
            <NavIcon src={logo} alt={'logo'} />
          </NavLogo>
          <MobileIcon onClick={toggle}>
            <FaBars />
          </MobileIcon>
          <NavMenu>
            <NavItem>
              <NavLinks
                to="about"
                smooth={true}
                duration={500}
                spy={true}
                exact="true"
                offset={-80}
              >
                오늘도레벨업?
              </NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks
                to="목표설정"
                smooth={true}
                duration={500}
                spy={true}
                exact="true"
                offset={-80}
              >
                목표설정
              </NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks
                to="services"
                smooth={true}
                duration={500}
                spy={true}
                exact="true"
                offset={-80}
              >
                성장곡선
              </NavLinks>
            </NavItem>
            <NavItem>
              <NavRouterLink
                to="/signup"
                duration={500}
                exact="true"
                offset={-80}
              >
                회원가입
              </NavRouterLink>
            </NavItem>
          </NavMenu>
          <NavBtn>
            {/* {token ? (
              <NavBtnLink to="/signin">로그아웃</NavBtnLink>
            ) : (
              <NavBtnLink to="/signin">로그인</NavBtnLink>
            )} */}
          </NavBtn>
        </NavbarContainer>
      </Nav>
    </>
  );
};

export default Navbar;
