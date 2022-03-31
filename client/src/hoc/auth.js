import React, { useEffect, useState } from 'react';
import axios from 'axios';

// eslint-disable-next-line import/no-anonymous-default-export
export default function (SpecificCompenet, option) {
  //null  => 아무나 출입 가능한 페이지
  //true  => 로그인한 유저만 출입이 가능한 페이지
  //false => 로그인한 유저는 출입이 불가능한 페이지

  function AuthenticationCheck(props) {
    useEffect(() => {
      axios
        .get('http://localhost:5000/users', {
          header: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        .then((response) => {
          console.log(response);
          if (!response.success) {
            if (option) {
              props.history('/login');
            }
          } else {
            // 로그인한 상태
            // eslint-disable-next-line no-lone-blocks
            {
              if (option === false) props.history('/');
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);
    return <SpecificCompenet {...props} />;
  }

  return AuthenticationCheck;
}
