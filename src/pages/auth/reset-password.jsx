import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";

import FormZ from "../../components/FormZ";
import ModalZ from "../../components/ModalZ";

import LoadingImg from "../../assets/img/loading.png";

export default function ResetPassword() {
  const dispatch = useDispatch();
  const formRef = useRef();

  const [formData, setFormData] = useState({});
  const [passValid, setPassValid] = useState({});

  const [loading, setLoading] = useState(false);
  const [resetModalShow, setResetModalShow] = useState(false);

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

  const getFormData = (data) => {
    let valid = { ...passValid };
    let { password } = data;

    valid["upper"] = /[A-Z]/?.test(password);
    valid["number"] = /[0-9]/?.test(password);
    valid["special"] = /[(@!#\$%\^\&*\)\(+=._-]/?.test(password);
    valid["length"] = password?.length > 8;

    setPassValid(valid);
    setFormData(data);
  };

  const resetPassword = () => {
    console.log(passValid);
    if (
      formRef.current.validForm() &&
      Object.keys(passValid).every(function (k) {
        return passValid[k];
      })
    ) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setResetModalShow(true);
        setPassValid({});
        setFormData({});
        formRef.current.clearForm();
      }, 1000);
    }
  };

  return (
    <div className="auth-form">
      <FormZ formSchema={formSchema} ref={formRef} onChange={getFormData} />
      <button
        className="primary-btn mt-5 auth-btn"
        disabled={loading}
        onClick={resetPassword}
      >
        Change Password
      </button>
      {loading && (
        <div className="text-center mt-5">
          <img className="auth-loading" src={LoadingImg} />
        </div>
      )}
      <ModalZ
        show={resetModalShow}
        title={
          <>
            <i className="ri-checkbox-circle-fill color-green"></i> Password
            Reset Successful
          </>
        }
        onOk={() => setResetModalShow(false)}
        onCancel={() => setResetModalShow(false)}
      >
        <p>
          Your password has been updated successfully. You can now log in with
          your new password.
        </p>
      </ModalZ>
    </div>
  );
}
