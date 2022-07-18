import React from "react";
import "./Login.scss";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginAction } from "../../redux/auth/actions";
import logo from "../../assets/logo.png";
import { fbThunk, loginThunk, googleThunk } from "../../redux/auth/thunks";
import { useSelector } from "react-redux";
import { IRootState } from "../../redux/state";
import { Link, useNavigate } from "react-router-dom";
import ReactFacebookLogin, {
  ReactFacebookLoginInfo,
} from "react-facebook-login";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { userInfo } from "os";

const Login = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const displayName = useSelector(
    (state: IRootState) => state.auth.displayName
  );
  // useNavigate hook returns a function that lets you navigate programmatically
  let navigate = useNavigate();
  const onSubmit = (e: any) => {
    e.preventDefault();

    // 用dispatch搵reducer
    dispatch(
      loginThunk({
        username,
        password,
      })
    )
      // 用unwrap()會return個promise;
      .unwrap()
      // handle result here
      .then((originalPromiseResult: any) => {
        console.log("Login success :", originalPromiseResult);
        navigate("/main/lossitem");
      })
      // handle error here
      .catch((rejectedValueOrSerializedError: any) => {
        console.log("Login fail :", rejectedValueOrSerializedError);
      });
  };

  const fBOnCLick = () => {};

  const fBCallback = async (userInfo: ReactFacebookLoginInfo) => {
    if (userInfo.accessToken) {
      await dispatch(fbThunk(userInfo.accessToken)).unwrap();
      navigate("/main/lossitem");
    }
    return null;
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse.access_token);
      if (tokenResponse.access_token) {
        await dispatch(googleThunk(tokenResponse.access_token)).unwrap();
        navigate("/main/lossitem");
      }
      return null;
    },
  });

  return (
    <div className="login">
      <div className="wrapper">
        <h1 className="loginTitle">Please Choose a Login Method</h1>

        <div className="row align-items-center justify-content-center">
          <div className="left col-lg-4">
            <button
              className="loginButton google"
              onClick={() => googleLogin()}
            >
              LOGIN WITH GOOGLE{" "}
            </button>
            <ReactFacebookLogin
              appId={process.env.REACT_APP_FACEBOOK_APP_ID || ""}
              autoLoad={false}
              fields="name,email,picture"
              onClick={fBOnCLick}
              callback={fBCallback}
            />
          </div>

          <div className="center col-lg-2">
            <div className="or">OR</div>
          </div>
          <div className="right col-lg-4">
            <form onSubmit={onSubmit} className="w-100">
              <div>
                <label className="w-100">
                  <div>Username:</div>
                  <input
                    className="w-100"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  ></input>
                </label>
              </div>
              <div>
                <label className="w-100">
                  <div>Password:</div>
                  <input
                    className="w-100"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></input>
                </label>
              </div>
              <br />
              <button className="submit w-100">Login</button>
            </form>
          </div>
          <div className="registerHere">
            Don't have an account? <Link to="/register">Register here</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
