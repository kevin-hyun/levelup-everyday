import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

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
} from "./SignInElements.js";

import AuthContext from "../../store/auth-context.js";

const SignIn = (props) => {
  const authCtx = useContext(AuthContext);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  let body = {
    email,
    password,
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const config = {
      headers: {
        Authorization: `Bearer ${authCtx.token}`,
      },
    };
    axios
      .post(
        "http://ec2-52-78-79-223.ap-northeast-2.compute.amazonaws.com:5000/api/users/login",
        body
      )

      .then((response) => {
        if (response.data.success) {
          authCtx.login(response.data.data.token);
          //작동은 하는데 버벅임-
          window.location.replace("goal");
        }
      })
      .catch((err) => {
        const statusCode = err.message.slice(-3, err.message.length);
        if (statusCode === "401") {
          alert("이메일 또는 비밀번호를 확인해주세요");
          window.location = "/signin";
        }
      });
  };

  const signUpRedirect = (event) => {
    event.preventDefault();
    props.history.push("/signup");
  };

  return (
    <>
      <Container>
        <FormWrap>
          <Icon to="/">
            <LogoIcon
              src={process.env.PUBLIC_URL + "./img/logo.png"}
              alt={`logo`}
            ></LogoIcon>
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
              <Text onClick={signUpRedirect}>회원가입</Text>
              <Text> 비밀번호를 잊어버렸어요.</Text>
            </Form>
          </FormContent>
        </FormWrap>
      </Container>
    </>
  );
};

export default withRouter(SignIn);
