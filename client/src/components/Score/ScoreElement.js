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
export const ScoreContinuity = styled('h2')``;
export const ScoreCalc = styled('h1')``;
export const ScoreGraphLink = styled(LinkRouter)``;

export const GoalContent = styled('div')`
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
export const GoalCreateBtn = styled(LinkRouter)`
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
  margin-bottom: 20px;
  margin-left: 60%;

  @media screen and (max-width: 400px) {
    padding: 10px 24px;
    margin-left: 30%;
    font-size: 14px;
  }

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
  }
`;
export const GoalShow = styled('div')`
  width: 80%;
  background: #fff;
  border-radius: 10px;
  box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.33);
  transition: all 0.2s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const NoGoalImg = styled('img')`
  width: 40%;
  margin: 32px;

  @media screen and (max-width: 400px) {
    width: 60%;
  }
`;
export const NoGoalText = styled('h3')`
  margin-bottom: 32px;
  text-align: center;

  @media screen and (max-width: 400px) {
    width: 80%;
    font-size: 16px;
  }
`;

export const GoalCategoryImg = styled('img')`
  width: 500px;
  height: 500px;
  margin: 32px;

  @media screen and (max-width: 400px) {
    width: 150px;
    height: 150px;
  }
`;

export const GoalCreateH1 = styled('h1')`
  margin-top: 30px;
  margin-bottom: -40px;

  @media screen and (max-width: 400px) {
    margin-top: 10px;
    margin-bottom: -30px;
    font-size: 20px;
  }
`;
export const GoalCreateText = styled('span')`
  margin-top: -80px;
  margin-bottom: 30px;
  font-weight: 700;

  @media screen and (max-width: 400px) {
    margin-top: -50px;
    margin-bottom: -30px;
    font-size: 12px;
  }
`;

export const GoalForm = styled.form``;
export const GoalWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px;
  border: none;
  border-radius: 10px;
  box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.3);
  padding: 3px;
  background-color: #8080ff;
  color: #fff;
`;
export const GoalList = styled.li`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;
export const CheckboxAll = styled.input``;
export const Checkbox = styled.input`
  vertical-align: top;
  margin: 10px;
`;

export const GoalSubmitBtn = styled('button')`
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
