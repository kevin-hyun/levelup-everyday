import React from 'react';
import { withRouter } from 'react-router-dom';

import axios from 'axios';
import {
  Container,
  Form,
  FormButton,
  FormContent,
  FormInput,
  FormWrap,
  Icon,
  Text,
  LogoIcon,
} from './SignInElements.js';
import logo from '../../images/logo.png';

const SignIn = (props) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [token, setToken] = React.useState('');

  let body = {
    email,
    password,
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    axios
      .post('http://localhost:5000/users/login', body)
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          localStorage.setItem('token', response.data.data.token);
          props.history.push('/');
          // console.log(localStorage.getItem('token'));
        }
      })
      .catch((err) => {
        const statusCode = err.message.slice(-3, err.message.length);
        if (statusCode === '401') {
          alert('이메일 또는 비밀번호를 확인해주세요');
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
