import React from 'react';
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
} from './SidebarElements';

const Sidebar = ({ isOpen, toggle }) => {
  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
      <Icon onClick={toggle}>
        <CloseIcon />
      </Icon>
      <SidebarWrapper>
        <SidebarMenu>
          <SidebarLink to="about" onClick={toggle}>
            오늘도레벨업?
          </SidebarLink>
          <SidebarLink to="discover" onClick={toggle}>
            목표 설정
          </SidebarLink>
          <SidebarLink to="services" onClick={toggle}>
            성장곡선
          </SidebarLink>
          <SidebarRouter to="/signup" onClick={toggle}>
            회원가입
          </SidebarRouter>
        </SidebarMenu>
        <SideBtnWrap>
          <SidebarRoute to="/signin"> 로그인 </SidebarRoute>
        </SideBtnWrap>
      </SidebarWrapper>
    </SidebarContainer>
  );
};

export default Sidebar;
