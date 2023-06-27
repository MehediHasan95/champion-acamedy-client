import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import loginPic from "../../assets/login.png";
import registerPic from "../../assets/ragister.png";
import google from "../../assets/google.png";
import {
  faCamera,
  faEnvelope,
  faEye,
  faEyeSlash,
  faLock,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import useAuth from "../../hooks/useAuth";

function Authentication() {
  const [toggle, setToggle] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const { googleSignIn, createUser, updateUserProfile, userLogIn } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    const { displayName, email, pasasword, confirmPassword, photoURL, agree } =
      data;
    setSpinner(true);
    if (agree) {
      if (pasasword === confirmPassword) {
        createUser(email, pasasword)
          .then((res) => {
            updateUserProfile(displayName, photoURL)
              .then(() => {
                const { uid, displayName, email, photoURL } = res.user;
                axios
                  .post("http://localhost:5000/users", {
                    uid,
                    displayName,
                    email,
                    photoURL,
                    role: "student",
                  })
                  .then((res) => {
                    if (res.data.acknowledged) {
                      navigate(from, { replace: true });
                      setSpinner(false);
                    }
                  });
              })
              .catch((err) => {
                setErrMsg(err.code);
                setSpinner(false);
              });
          })
          .catch((err) => {
            setErrMsg(err.code);
            setSpinner(false);
          });
      } else {
        setSpinner(false);
        enqueueSnackbar("Password didn't match", {
          variant: "error",
          autoHideDuration: 3000,
        });
      }
    } else {
      userLogIn(email, pasasword)
        .then(() => {
          navigate(from, { replace: true });
          setSpinner(false);
        })
        .catch((err) => {
          setErrMsg(err.code);
          setSpinner(false);
        });
    }
  };

  const handleGooglSignIn = () => {
    googleSignIn()
      .then((res) => {
        const { uid, displayName, email, photoURL } = res.user;
        axios
          .post("http://localhost:5000/users", {
            uid,
            displayName,
            email,
            photoURL,
            role: "student",
          })
          .then((res) => {
            if (res.data.acknowledged) {
              navigate(from, { replace: true });
            }
          });
      })
      .catch((err) => setErrMsg(err.code));
  };

  return (
    <div className="min-h-[80vh] grid place-items-center">
      <div className="grid lg:grid-cols-2 w-full">
        <div className="col-span-1 hidden lg:block">
          <img
            src={toggle ? registerPic : loginPic}
            alt="auth_picture"
            className="w-3/4 ms-auto"
          />
        </div>
        <div className="col-span-1 grid place-items-center w-11/12 lg:w-3/6 mx-auto min-h-[70vh] lg:min-h-0">
          <div className="w-full">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="my-5">
                <h1 className="text-5xl font-bold">Welcome back!</h1>
                <p>{toggle ? "Register" : "Login"} to continue</p>
              </div>
              {toggle && (
                <div className="relative mb-3">
                  <input
                    type="text"
                    {...register("displayName", {
                      required: "Username is required",
                      pattern: {
                        value: /^[a-z A-Z]{0,}$/i,
                        message:
                          "Username should contain only alphanumeric characters",
                      },
                    })}
                    className="w-full border border-black ps-10 py-3 focus:outline-royalPurple"
                    placeholder="Enter Name"
                  />
                  <FontAwesomeIcon
                    icon={faUser}
                    className="absolute top-4 left-3"
                  />
                  <p className="text-red-600 text-xs">
                    {errors.displayName && (
                      <span>{errors?.displayName?.message}</span>
                    )}
                  </p>
                </div>
              )}
              <div className="relative mb-3">
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className="w-full border border-black ps-10 py-3 focus:outline-royalPurple"
                  placeholder="Enter Email"
                />
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="absolute top-4 left-3"
                />
                <p className="text-red-600 text-xs">
                  {errors.email && <span>{errors?.email?.message}</span>}
                </p>
              </div>
              <div className="relative mb-3">
                <input
                  type={showPass ? "text" : "password"}
                  {...register("pasasword", {
                    required: "Password is required",
                    maxLength: {
                      value: 6,
                      message: "Password must be less than 6 characters long",
                    },
                    pattern: {
                      value: /^[^A-Z!@#$%^&*()_+=\-[\]{};':"\\|,.<>/?]*$/,
                      message:
                        "Password must be contain a single digit and one uppercase letter, Don't use  uppercase letter and special character",
                    },
                  })}
                  className="w-full border border-black ps-10 py-3 focus:outline-royalPurple"
                  placeholder="Enter Password"
                />
                <FontAwesomeIcon
                  icon={faLock}
                  className="absolute top-4 left-3 cursor-pointer"
                />
                <FontAwesomeIcon
                  onClick={() => setShowPass(!showPass)}
                  icon={showPass ? faEye : faEyeSlash}
                  className="absolute top-4 right-4 cursor-pointer text-base-300 dark:text-base-content"
                />
                <p className="text-red-600 text-xs">
                  {errors.pasasword && (
                    <span>{errors?.pasasword?.message}</span>
                  )}
                </p>
              </div>
              {toggle && (
                <div className="relative mb-3">
                  <input
                    type={showPass ? "text" : "password"}
                    {...register("confirmPassword", {
                      required: "Password is required",
                      maxLength: {
                        value: 6,
                        message: "Password must be less than 6 characters long",
                      },
                      pattern: {
                        value: /^[^A-Z!@#$%^&*()_+=\-[\]{};':"\\|,.<>/?]*$/,
                        message:
                          "Password must be contain a single digit and one uppercase letter, Don't use  uppercase letter and special character",
                      },
                    })}
                    className="w-full border border-black ps-10 py-3 focus:outline-royalPurple"
                    placeholder="Enter Confirm Password"
                  />
                  <FontAwesomeIcon
                    icon={faLock}
                    className="absolute top-4 left-3 cursor-pointer"
                  />
                  <FontAwesomeIcon
                    onClick={() => setShowPass(!showPass)}
                    icon={showPass ? faEye : faEyeSlash}
                    className="absolute top-4 right-4 cursor-pointer text-base-300 dark:text-base-content"
                  />
                  <p className="text-red-600 text-xs">
                    {errors.confirmPassword && (
                      <span>{errors?.confirmPassword?.message}</span>
                    )}
                  </p>
                </div>
              )}
              {toggle && (
                <div className="relative">
                  <input
                    type="text"
                    {...register("photoURL", {
                      required: "Photo URL is required",
                      pattern: {
                        value: /^(ftp|http|https):\/\/[^ "]+$/i,
                        message: "Invalid photo URL",
                      },
                    })}
                    className="w-full border border-black ps-10 py-3 focus:outline-royalPurple"
                    placeholder="Enter Photo URL"
                  />
                  <FontAwesomeIcon
                    icon={faCamera}
                    className="absolute top-4 left-3 cursor-pointer"
                  />
                  <p className="text-red-600 text-xs">
                    {errors.photoURL && (
                      <span>{errors?.photoURL?.message}</span>
                    )}
                  </p>
                </div>
              )}

              {toggle && (
                <div className="my-5">
                  <label>
                    <input
                      type="checkbox"
                      {...register("agree")}
                      className="me-2"
                      required
                    />
                    <span>
                      I have read and agree to the{" "}
                      <span className="text-royalPurple underline cursor-pointer">
                        terms and conditons
                      </span>
                    </span>
                  </label>
                </div>
              )}

              <div className="my-5 flex">
                <button className="bg-royalPurple hover:bg-deepRoyalPurple text-base-100 dark:text-base-content p-3 uppercase w-[49%] border-none outline-none">
                  {toggle ? (
                    <>
                      {spinner ? (
                        <span className="loading loading-bars loading-xs"></span>
                      ) : (
                        "Register"
                      )}
                    </>
                  ) : (
                    <>
                      {spinner ? (
                        <span className="loading loading-bars loading-xs"></span>
                      ) : (
                        "Login"
                      )}
                    </>
                  )}
                </button>
                {toggle && (
                  <p className="text-base-content hover:text-royalPurple hover:underline p-3 uppercase w-[49%] text-center cursor-pointer">
                    Forget Password?
                  </p>
                )}
              </div>
            </form>
            <p>
              {toggle ? "Already have an account" : "Don't have an account"}
              <button
                onClick={() => {
                  reset();
                  setToggle(!toggle);
                }}
                className="mx-2 hover:text-royalPurple underline border-none"
              >
                {toggle ? "Login" : "Register"}
              </button>
            </p>

            <div className="my-5 flex items-center">
              <p className="me-5">Login with</p>
              <button
                onClick={handleGooglSignIn}
                className="border-none outline-none w-12 h-12 p-3 bg-base-300 rounded-full"
              >
                <img src={google} alt="google" className="w-full" />
              </button>
            </div>

            <p className="text-red-600">{errMsg}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Authentication;
