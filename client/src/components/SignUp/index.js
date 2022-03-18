import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import {
  Container,
  Form,
  FormButton,
  FormContent,
  FormH1,
  FormInput,
  FormLabel,
  FormWrap,
  Icon,
  LogoIcon,
  Text,
} from './SignUpElements.js';
import logo from '../../images/logo.png';

import { registerUser } from '../_actions/user_action';

const SignUp = (props) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setpasswordConfirm] = useState('');
  const [name, setName] = useState('');
  const onSubmitHandler = (event) => {
    // 자동 새로고침 방지
    event.preventDefault();
    console.log(11);
    let body = {
      email,
      password,
      passwordConfirm,
      name,
    };
    dispatch(registerUser(body))
      .then((response) => {
        console.log(response);
        // if (response.payload.registersuccess) {
        //   props.history('/signin');
        // }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Container>
        <FormWrap>
          <Icon to="/">
            <LogoIcon src={logo} alt={logo}></LogoIcon>
          </Icon>
          <FormContent>
            <Form action="#">
              <FormH1> 성장의 첫걸음을 응원합니다. </FormH1>

              <FormInput
                type="email"
                required
                placeholder="이메일"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />

              <FormInput
                type="password"
                required
                placeholder="비밀번호"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <Text>영문,숫자, 특수문자 각 한개이상 포함하여 8자 이상</Text>

              <FormInput
                type="password"
                required
                placeholder="비밀번호 확인"
                onChange={(e) => {
                  setpasswordConfirm(e.target.value);
                }}
              />

              <FormInput
                type="string"
                required
                placeholder="닉네임"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <FormButton type="submit" onClick={onSubmitHandler}>
                회원가입
              </FormButton>
            </Form>
          </FormContent>
        </FormWrap>
      </Container>
    </>
  );
};

export default withRouter(SignUp);
