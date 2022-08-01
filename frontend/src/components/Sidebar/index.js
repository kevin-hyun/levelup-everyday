import React, { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";

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
} from "./SidebarElements";

import { authActions } from "../../store/auth";
import { goalActions } from "../../store/goal";

const Sidebar = ({ isOpen, toggle }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const logoutHandler = () => {
    dispatch(authActions.logout());
    dispatch(goalActions.reset());
  };
  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
      <Icon onClick={toggle}>
        <CloseIcon />
      </Icon>
      <SidebarWrapper>
        <SidebarMenu>
          {!isAuthenticated && (
            <SidebarLink to="about" onClick={toggle}>
              오늘도레벨업?
            </SidebarLink>
          )}
          <SidebarRouteNoBtn to="/goal"> 목표 설정 </SidebarRouteNoBtn>

          <SidebarLink to="/score/main" onClick={toggle}>
            성장곡선
          </SidebarLink>
          {!isAuthenticated && (
            <SidebarRouter to="/signup" onClick={toggle}>
              회원가입
            </SidebarRouter>
          )}
        </SidebarMenu>
        {isAuthenticated ? (
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
