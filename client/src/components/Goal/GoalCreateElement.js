import styled from 'styled-components';
import { Link as LinkRouter } from 'react-router-dom';

export const GoalContainer = styled('div')`
  background: #8080ff;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 0 30px;
  height: 1000px;
  position: relative;
  z-index: 1;

  @media screen and (max-width: 400px) {
    padding: 10px 24px;
    height: 550px;
  }
`;

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

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
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

export const GoalCreateForm = styled('form')`
  width: 70%;
  margin-top: 30px;
  margin-bottom: 30px;
  margin-left: -30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  vertical-align: top;
`;

export const FormInput = styled.input`
  width: 60%;
  padding: 16px 16px;
  margin: 20px;
  border: none;
  border-radius: 10px;
  box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.3);

  @media screen and (max-width: 400px) {
    width: 120px;
    padding: 10px 10px;
    margin: 10px 5px;
    margin-bottom: 16px;
  }
`;

export const FormSelect = styled('select')`
  border-radius: 5px;
  border: none;
  height: 45px;
  width: 110px;
  /* font-weight: 700; */
  font-size: 13px;
  text-align: center;
  box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.3);

  @media screen and (max-width: 400px) {
    position: relative;
    bottom: 3px;
    margin-left: 5px;
    height: 35px;
    width: 60px;
  }

  .option {
    position: relative;
  }
`;

export const FormButton = styled.button`
  background: #ffff80;
  height: 45px;
  width: 15%;
  margin: 10px 30px;
  padding: 5px;
  border: none;
  border-radius: 10px;
  color: black;
  font-size: 16px;
  font-weight: 550;
  cursor: pointer;
  box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.3);

  @media screen and (max-width: 400px) {
    margin-left: 5px;

    font-size: 13px;
  }
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
