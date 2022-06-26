import React from "react";

import {
  FooterContainer,
  WedsiteRights,
  SocialMedia,
  SocialMediaWrap,
  SocialLogo,
} from "./FooterElements";

const Footer = () => {
  return (
    <FooterContainer>
      <SocialMedia>
        <SocialMediaWrap>
          <SocialLogo to="/">오늘도 레벨업</SocialLogo>
          <WedsiteRights>
            오늘도레벨업 {new Date().getFullYear()}© All rights reserved.
          </WedsiteRights>
        </SocialMediaWrap>
      </SocialMedia>
    </FooterContainer>
  );
};

export default Footer;
