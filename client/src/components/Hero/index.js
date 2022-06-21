import React, { useState, useContext } from "react";
import {
  HeroContainer,
  HeroBg,
  VideoBg,
  HeroContent,
  HeroH1,
  HeroP,
  HeroBtnWrapper,
  ArrowForward,
  ArrowRight,
} from "./HeroElements";
import { Button } from "../ButtonElement";
import video from "../../videos/hero.mp4";
import AuthContext from "../../store/auth-context";

const Hero = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggendIn;
  const [hover, setHover] = useState(false);

  const onHover = () => {
    setHover(!hover);
  };

  return (
    <HeroContainer>
      <HeroBg>
        <VideoBg autoPlay loop muted src={video} type="video/mp4" />
      </HeroBg>
      <HeroContent>
        <HeroH1>하루에 하나의 행동이라도 꾸준히! </HeroH1>

        <HeroP>목표를 꾸준히 하지못하는 자신에게 실망하셨나요?</HeroP>
        <HeroP>절대 멈춰있는 게 아니에요.</HeroP>
        <HeroBtnWrapper>
          {!isLoggedIn ? (
            <Button
              to="/signup"
              onMouseEnter={onHover}
              onMouseLeave={onHover}
              primary="true"
              dark="true"
              smooth={true}
              duration={500}
              spy={true}
              exact="true"
              offset={-80}
            >
              기록 시작하기 {hover ? <ArrowForward /> : <ArrowRight />}
            </Button>
          ) : (
            <Button
              to="/goal"
              onMouseEnter={onHover}
              onMouseLeave={onHover}
              primary="true"
              dark="true"
              smooth={true}
              duration={500}
              spy={true}
              exact="true"
              offset={-80}
            >
              기록 시작하기 {hover ? <ArrowForward /> : <ArrowRight />}
            </Button>
          )}
        </HeroBtnWrapper>
      </HeroContent>
    </HeroContainer>
  );
};

export default Hero;
