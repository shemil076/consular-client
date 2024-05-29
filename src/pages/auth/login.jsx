import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";

import FormZ from "../../components/FormZ";
import ModalZ from "../../components/ModalZ";

import { sendNotify, fetchApi } from "../../helper";
import { checkLogged } from "../../store/auth/authSlice";

import LoadingImg from "../../assets/img/loading.png";

export default function Login() {
  const dispatch = useDispatch();
  const formRef = useRef();

  const [loading, setLoading] = useState(false);
  const [customError, setCustomError] = useState({});
  const [resetModalShow, setResetModalShow] = useState(false);
  const [contactBtnShow, setContactBtnShow] = useState(false);

  let formSchema = [
    {
      name: "email",
      value: "",
      type: "text",
      label: "Email Address",
      placeholder: "Enter email address",
      required: true,
    },
    {
      name: "password",
      value: "",
      type: "password",
      label: "Password",
      placeholder: "Enter password",
      required: true,
    },
  ];

  const getFormData = (data) => {
    // let { email, password } = data;
    setCustomError({});
  };

  const login = () => {
    let valid = formRef.current.validForm();
    if (valid) {
      setLoading(true);
      let obj = formRef.current.getPayload();
      let payload = {
        method: "post",
        url: "/auth/login",
        data: obj,
      };
      fetchApi(payload)
        .then((response) => {
          if (response) {
            setLoading(false);
            if (response.error) {
              let meg = response.error?.response?.data?.message;
              if (meg == "Invalid Credentials") {
                setCustomError({
                  password: "Incorrect password. Please try again.",
                });
              }
              if (meg == "Invalid User") {
                setCustomError({
                  email: "This email address is not registered with us.",
                });
                setContactBtnShow(true);
              }
            } else {
              sendNotify("success", "Login successfully");
              localStorage.setItem(
                process.env.REACT_APP_JWT_TOKEN,
                JSON.stringify(response?.data?.tokenObj?.accessToken)
              );
              dispatch(checkLogged());
              formRef.current.clearForm();
            }
          }
        })
        .catch((error) => ({ error: JSON.stringify(error) }));
    }
  };

  const forgotPass = () => {
    let { email } = formRef.current.getPayload();

    var emailValidate =
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (email) {
      if (emailValidate.test(email)) {
        setResetModalShow(true);
      } else {
        setCustomError({
          email: "Please enter a valid email address.",
        });
      }
      // setLoading(true);
      // let payload = {
      //   method: "post",
      //   url: "/auth/forgot-password",
      //   data: { email },
      // };
      // fetchApi(payload)
      //   .then((response) => {
      //     if (response) {
      //       setLoading(false);
      //       if (response.error) {
      //         let meg = response.error?.response?.data?.message;
      //         if (meg == "Invalid User") {
      //           setCustomError({
      //             email: "This email address is not registered with us.",
      //           });
      //         }
      //       } else {
      //         setResetModalShow(true);
      //         formRef.current.clearForm();
      //       }
      //     }
      //   })
      //   .catch((error) => ({ error: JSON.stringify(error) }));
    } else {
      setCustomError({
        email: "Please enter your email to reset your password.",
      });
    }
  };

  return (
    <div className="auth-form">
      <FormZ
        formSchema={formSchema}
        ref={formRef}
        onKeyPress={login}
        onChange={getFormData}
        customValidation={customError}
      />
      <button className="auth-link my-5" onClick={forgotPass}>
        Forgot Password?
      </button>
      <button
        className={`primary-btn auth-btn mb-4`}
        onClick={login}
        disabled={loading}
      >
        Log In
      </button>
      {contactBtnShow && (
        <a
          href="mailto:contact@northlark.com"
          className="secondary-btn auth-btn"
        >
          Contact Support
        </a>
      )}
      {loading && (
        <div className="text-center mt-5">
          <img className="auth-loading" src={LoadingImg} />
        </div>
      )}
      <ModalZ
        show={resetModalShow}
        title={
          <>
            <i className="ri-mail-fill"></i> Password Reset Requested
          </>
        }
        onOk={() => setResetModalShow(false)}
        onCancel={() => setResetModalShow(false)}
      >
        <p>
          We've notified our team to reset your password. Soon, you'll receive
          an email with a link to set up a new password.
        </p>
      </ModalZ>
    </div>
  );
}
