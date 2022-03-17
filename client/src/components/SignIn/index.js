import React from 'react';
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
  Text,
  LogoIcon,
} from './SignInElements.js';
import logo from '../../images/logo.png';

import { loginUser } from '../_actions/user_action';

const SignIn = (props) => {
  const dispatch = useDispatch();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [token, setToken] = React.useState('');

  let body = {
    email,
    password,
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    dispatch(loginUser(body)).then((response) => {
      if (response.payload.success) {
        console.log(response.payload);
        localStorage.setItem('token', response.data);
        props.history.push('/');
      } else {
        alert('이메일과 비밀번호를 확인해주세요');
      }
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
              {/* <FormH1> 하루하루 성장하는 나를 위해서 </FormH1> */}

              <FormInput
                type="email"
                placeholder="이메일"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />

              <FormInput
                type="password"
                placeholder="비밀번호"
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <FormButton type="submit" onClick={onSubmitHandler}>
                로그인
              </FormButton>
              <Text> 비밀번호를 잊어버렸어요.</Text>
            </Form>
          </FormContent>
        </FormWrap>
      </Container>
    </>
  );
};

export default withRouter(SignIn);
