import styled from 'styled-components';

import { Link } from 'react-router-dom';

export const Container = styled.div`
  min-height: 600px;
  height: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  top: 0;
  right: 0;
  z-index: 0;
  overflow: hidden;
  background: #8080ff;
  margin-bottom: 64px;
  /* background: linear-gradient(
    108deg,
    rgba(1, 147, 86, 1) 0%,
    rgba(10, 201, 122, 1) 100%
  ); */
`;

export const FormWrap = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 64px;

  @media screen and (max-width: 400px) {
    height: 80%;
  }
`;

export const Icon = styled(Link)`
  margin-left: 32px;
  margin-top: 32px;
  text-decoration: none;
  color: #fff;
  font-weight: 700;
  font-size: 32px;

  @media screen and (max-width: 480px) {
    margin-left: 16px;
    margin-top: 8px;
  }
`;

export const LogoIcon = styled.img`
  height: 100px;
`;

export const FormContent = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media screen and (max-width: 480px) {
    padding: 10px;
  }
`;

export const Form = styled.form`
  background: #ffff80;
  max-width: 700px;
  height: 90%;
  width: 80%;
  z-index: 1;
  display: grid;
  margin: 0 auto;
  padding: 80px 32px;
  border-radius: 20px;
  box-shadow: 0px 5px 31px 1px rgba(0, 0, 0, 0.75);
  border: none;

  @media screen and (max-width: 500px) {
    height: 100%;
    padding: 32px 32px;
  }
`;

export const FormH1 = styled.h1`
  margin-bottom: 40px;
  color: #010106;
  font-size: 1.3rem;
  font-weight: 700;
  text-align: center;

  @media screen and (max-width: 468px) {
    margin-bottom: 10px;
    padding: 32px 20px;
    font-size: 1rem;
  }
`;

export const FormLabel = styled.label`
  margin-bottom: 8px;
  font-weight: 700;
  font-size: 1rem;
  color: #010106;

  @media screen and (max-width: 400px) {
    font-size: 0.7rem;
  }
`;

export const FormInput = styled.input`
  padding: 16px 16px;
  margin-bottom: 32px;
  border: none;
  border-radius: 10px;

  @media screen and (max-width: 400px) {
    margin-bottom: 16px;
  }
`;

export const FormButton = styled.button`
  background: #8080ff;
  padding: 16px 0;
  border: none;
  border-radius: 10px;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
`;

export const Text = styled.small`
  margin-bottom: 5px;
  margin-left: 5px;
  margin-right: 5px;
  color: #b2b2b2;

  font-weight: 400;
`;
