import React from 'react';
// import { FaInstagram, FaTwitter, FaYoutube, FaFacebook } from 'react-icons/fa';
import {
  FooterContainer,
  FooterWrap,
  //   FooterLinkItems,
  //   FooterLink,
  //   FooterLinkTitle,
  //   FooterLinksWrapper,
  WedsiteRights,
  //   SocialIconLink,
  SocialMedia,
  SocialMediaWrap,
  SocialLogo,
  //   SocialIcons,
} from './FooterElements';

const Footer = () => {
  return (
    <FooterContainer>
      {/* <FooterWrap> */}
      {/* <FooterLinksWrapper>
          <FooterLinkItems>
            <FooterLinkTitle>Column1 </FooterLinkTitle>
            <FooterLink to="signin">About us</FooterLink>
            <FooterLink to="signin">How it works</FooterLink>
            <FooterLink to="signin">testimonails</FooterLink>
            <FooterLink to="signin">About us</FooterLink>
          </FooterLinkItems>
        </FooterLinksWrapper>
        <FooterLinksWrapper>
          <FooterLinkItems>
            <FooterLinkTitle>Column2 </FooterLinkTitle>
            <FooterLink to="signin">About us</FooterLink>
            <FooterLink to="signin">How it works</FooterLink>
            <FooterLink to="signin">testimonails</FooterLink>
            <FooterLink to="signin">About us</FooterLink>
          </FooterLinkItems>
        </FooterLinksWrapper> */}
      {/* </FooterWrap> */}
      <SocialMedia>
        <SocialMediaWrap>
          <SocialLogo to="/">오늘도 레벨업</SocialLogo>
          <WedsiteRights>
            오늘도레벨업 {new Date().getFullYear()}© All rights reserved.
          </WedsiteRights>
          {/* <SocialIcons>
            <SocialIconLink
              href="//www.facebook.com"
              target="_blank"
              aria-label="Facebook"
            >
              <FaFacebook />
            </SocialIconLink>
            <SocialIconLink href="/" target="_blank" aria-label="Instagram">
              <FaInstagram />
            </SocialIconLink>
            <SocialIconLink href="/" target="_blank" aria-label="Youtube">
              <FaYoutube />
            </SocialIconLink>
            <SocialIconLink href="/" target="_blank" aria-label="Twitter">
              <FaTwitter />
            </SocialIconLink>
          </SocialIcons> */}
        </SocialMediaWrap>
      </SocialMedia>
    </FooterContainer>
  );
};

export default Footer;
