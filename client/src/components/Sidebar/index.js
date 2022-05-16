import React, { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import {
  SidebarContainer,
  Icon,
  CloseIcon,
  SidebarWrapper,
  SidebarMenu,
  SidebarLink,
  SideBtnWrap,
  SidebarRoute,
  SidebarRouter,
  SidebarRouteNoBtn,
} from './SidebarElements';

const Sidebar = ({ isOpen, toggle }) => {
  const authCtx = useContext(AuthContext);
  const isLoggendIn = authCtx.isLoggendIn;
  const logoutHandler = () => {
    authCtx.logout();
  };
  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
      <Icon onClick={toggle}>
        <CloseIcon />
      </Icon>
      <SidebarWrapper>
        <SidebarMenu>
          {!isLoggendIn && (
            <SidebarLink to="about" onClick={toggle}>
              오늘도레벨업?
            </SidebarLink>
          )}
          <SidebarRouteNoBtn to="/goal"> 목표 설정 </SidebarRouteNoBtn>

          <SidebarLink to="/score/main" onClick={toggle}>
            성장곡선
          </SidebarLink>
          {!isLoggendIn && (
            <SidebarRouter to="/signup" onClick={toggle}>
              회원가입
            </SidebarRouter>
          )}
        </SidebarMenu>
        {isLoggendIn ? (
          <SideBtnWrap>
            <SidebarRoute to="/signin" onClick={logoutHandler}>
              로그아웃
            </SidebarRoute>
          </SideBtnWrap>
        ) : (
          <SideBtnWrap>
            <SidebarRoute to="/signin"> 로그인 </SidebarRoute>
          </SideBtnWrap>
        )}
      </SidebarWrapper>
    </SidebarContainer>
  );
};

export default Sidebar;
