import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

// import Logo from "../../assets/img/logo.png";
import FormZ from "../../components/FormZ";
import { sendNotify, fetchApi } from "../../helper";
import { checkLogged } from "../../store/auth/authSlice";

export default function SignUp() {
  const dispatch = useDispatch();
  const formRef = useRef();

  const [customError, setCustomError] = useState({});
  const [usernameLoading, setUsernameLoading] = useState(true);
  const [formData, setFormData] = useState({});
  const [passValid, setPassValid] = useState({});

  const [loading, setLoading] = useState(false);

  let formSchema = [
    {
      name: "email",
      value: "john@northlark.com",
      type: "text",
      label: "Email",
      placeholder: "Enter email",
      required: true,
      disabled: true,
    },
    {
      name: "username",
      value: "",
      type: "text",
      label: "Username",
      placeholder: "Enter username",
      required: true,
      infoIcon: (
        <span
          className={`input-after ${
            customError["username"]
              ? "color-red"
              : usernameLoading
              ? "icon-spin-ani"
              : "color-green"
          }`}
        >
          {formData["username"] && (
            <i
              className={
                customError["username"]
                  ? "ri-close-circle-line"
                  : usernameLoading
                  ? "ri-loader-4-line"
                  : "ri-checkbox-circle-line"
              }
            ></i>
          )}
        </span>
      ),
    },
    {
      name: "password",
      value: "",
      type: "password",
      label: "Password",
      placeholder: "Enter password",
      required: true,
      autoComplete: false,
      customClass: "mb-2",
      validation: true,
    },
    {
      customElement: (
        <ul
          className={`pass-validation ${formData["password"] ? "pass-in" : ""}`}
        >
          <li className={passValid["length"] ? "valid" : "not-valid"}>
            <i
              className={
                passValid["length"]
                  ? "ri-checkbox-circle-fill"
                  : "ri-close-circle-fill"
              }
            ></i>{" "}
            Password is more than 8 characters
          </li>
          <li className={passValid["upper"] ? "valid" : "not-valid"}>
            <i
              className={
                passValid["upper"]
                  ? "ri-checkbox-circle-fill"
                  : "ri-close-circle-fill"
              }
            ></i>{" "}
            Upper and lowercase letters
          </li>
          <li className={passValid["number"] ? "valid" : "not-valid"}>
            <i
              className={
                passValid["number"]
                  ? "ri-checkbox-circle-fill"
                  : "ri-close-circle-fill"
              }
            ></i>{" "}
            At least one number
          </li>
          <li className={passValid["special"] ? "valid" : "not-valid"}>
            <i
              className={
                passValid["special"]
                  ? "ri-checkbox-circle-fill"
                  : "ri-close-circle-fill"
              }
            ></i>{" "}
            At least one special character
          </li>
        </ul>
      ),
    },
    {
      name: "confirmPassword",
      value: "",
      type: "password",
      label: "Confirm Password",
      validation: false,
      placeholder: "Enter confirm password",
      required: true,
    },
  ];

  const getFormData = (data, field) => {
    // console.log(data);
    let { username, password } = data;
    let valid = { ...passValid };
    let error = { ...customError };

    valid["upper"] = /[A-Z]/?.test(password);
    valid["number"] = /[0-9]/?.test(password);
    valid["special"] = /[(@!#\$%\^\&*\)\(+=._-]/?.test(password);
    valid["length"] = password?.length > 8;

    if (field == "username") {
      if (username) {
        if (/[(@!#\$%\^\&*\)\(+=._-]/?.test(username)) {
          error["username"] = "Use only letters (a-z) and numbers (0-9) only";
        } else {
          error["username"] = "";
          setUsernameLoading(true);
          setTimeout(() => {
            setUsernameLoading(false);
          }, 1000);
        }
      } else {
        error["username"] = "Username is required";
      }
    }
    setCustomError(error);
    setPassValid(valid);
    setFormData(data);
  };

  //   const login = () => {
  //     let valid = formRef.current.validForm();
  //     if (valid) {
  //       setLoading(true);
  //       let obj = formRef.current.getPayload();
  //       let payload = {
  //         method: "post",
  //         url: "/auth/login",
  //         data: obj,
  //       };
  //       fetchApi(payload)
  //         .then((response) => {
  //           if (response) {
  //             setLoading(false);
  //             if (response.error) {
  //               sendNotify("error", response.error?.response?.data?.message);
  //             } else {
  //               sendNotify("success", "Login successfully");
  //               localStorage.setItem(
  //                 process.env.REACT_APP_JWT_TOKEN,
  //                 JSON.stringify(response?.data?.tokenObj?.accessToken)
  //               );
  //               dispatch(checkLogged());
  //               formRef.current.clearForm();
  //             }
  //           }
  //         })
  //         .catch((error) => ({ error: JSON.stringify(error) }));
  //     } else {
  //       sendNotify("error", "Some fields are missing!");
  //     }
  //   };

  return (
    <div className="auth-form">
      <FormZ
        formSchema={formSchema}
        ref={formRef}
        onChange={getFormData}
        customValidation={customError}
      />
      <button
        className={`primary-btn mt-5 auth-btn ${loading ? "btn-loading" : ""}`}
      >
        {loading ? <i className="far fa-spinner-third fa-spin"></i> : ""}
        Sign Up
      </button>
    </div>
  );
}
