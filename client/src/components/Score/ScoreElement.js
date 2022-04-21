import styled from 'styled-components';
import { Link as LinkRouter } from 'react-router-dom';

export const ScoreContainer = styled('div')`
  background: #8080ff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
  margin-top: 80px;
  position: relative;
  z-index: 1;

  @media screen and (max-width: 400px) {
    padding: 10px 24px;
  }
`;
export const ScoreContent = styled('div')`
  margin-top: 90px;
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  border-radius: 30px;
  border: none;
  box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.33);
  transition: all 0.2s ease-in-out;

  @media screen and (max-width: 400px) {
    margin-top: 10px;
    width: 85%;
    padding: 10px 24px;

    font-size: 14px;
  }
`;
export const ScoreCircle = styled('div')`
  width: 350px;
  height: 350px;
  margin: 32px;
  background-color: #ffff80;
  border-radius: 100%;
  box-shadow: 5px 5px 5px 5px rgba(0, 0, 0, 0.3);
  border: none;

  @media screen and (max-width: 400px) {
    width: 150px;
    height: 150px;
  }
`;
export const ScoreContinuity = styled('div')``;
export const ScoreCalc = styled('h1')``;
export const ScoreGraphLink = styled(LinkRouter)`
  border-radius: 50px;
  background: #ffff80;
  white-space: nowrap;
  padding: 16px 30px;
  color: #010606;
  font-size: 16px;
  font-weight: 700;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  margin-top: 30px;
  margin-left: 40px;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
  }
`;
export const ScoreText = styled('small')``;
