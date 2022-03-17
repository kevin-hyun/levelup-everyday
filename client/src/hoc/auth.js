import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../components/_actions/user_action';

export default function (SpecificCompenet, option) {
  //null  => 아무나 출입 가능한 페이지
  //true  => 로그인한 유저만 출입이 가능한 페이지
  //false => 로그인한 유저는 출입이 불가능한 페이지

  function AuthenticationCheck(props) {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(auth()).then((response) => {
        console.log(response);
        // 로그인하지 않은 상태
        if (!response.header.Authorization) {
          if (option) {
            props.history('/login');
          }
        } else {
          // 로그인한 상태
          {
            if (option === false) props.history('/');
          }
        }
      });
    }, []);
    return <SpecificCompenet {...props} />;
  }

  return AuthenticationCheck;
}
