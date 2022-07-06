import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

import {
  Container,
  Form,
  FormButton,
  FormContent,
  FormH1,
  FormInput,
  FormWrap,
  Icon,
  LogoIcon,
  Text,
} from "./SignUpElements.js";

const SignUp = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setpasswordConfirm] = useState("");
  const [name, setName] = useState("");

  const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

  const onSubmitHandler = (event) => {
    // 자동 새로고침 방지
    event.preventDefault();

    let body = {
      email,
      password,
      passwordConfirm,
      name,
    };
    const config = {
      headers: {
        "Access-Control-Allow-Origin":
          "http://ec2-52-78-79-223.ap-northeast-2.compute.amazonaws.com:3000",
      },
    };
    axios
<<<<<<< HEAD
      .post(
        "http://ec2-52-78-79-223.ap-northeast-2.compute.amazonaws.com:5000/api/users/register",
        config,
        body
      )
=======
      .post("http://localhost:5000/api/users/register", body)
>>>>>>> parent of 4da0178 (Feat: Change api uri localhost to aws uri)
      .then((response) => {
        if (response.data.success) {
          alert("가입 완료!");
          props.history.push("/signin");
        }
      })
      .catch((err) => {
        const statusCode = err.message.slice(-3, err.message.length);
        if (statusCode === "401") {
          alert("중복된 이메일이 존재합니다.");
        } else if (statusCode === "400") {
          alert("내용을 입력해주세요");
        }
      });
  };

  return (
    <>
      <Container>
        <FormWrap>
          <Icon to="/">
            <LogoIcon
              src={process.env.PUBLIC_URL + "/img/logo.png"}
              alt={`logo`}
            ></LogoIcon>
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

              {regex.test(password) === true && (
                <Text correct={true}>
                  영문,숫자, 특수문자 각 한개이상 포함하여 8자 이상
                </Text>
              )}
              {regex.test(password) === false && (
                <Text correct={false}>
                  영문,숫자, 특수문자 각 한개이상 포함하여 8자 이상
                </Text>
              )}
              <FormInput
                type="password"
                required
                placeholder="비밀번호 확인"
                onChange={(e) => {
                  setpasswordConfirm(e.target.value);
                }}
              />
              {(password === "" || password !== passwordConfirm) && (
                <Text correct={false}>비밀번호가 일치하지 않습니다.</Text>
              )}
              {password !== "" && password === passwordConfirm && (
                <Text correct={true}>비밀번호가 일치합니다.</Text>
              )}
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
