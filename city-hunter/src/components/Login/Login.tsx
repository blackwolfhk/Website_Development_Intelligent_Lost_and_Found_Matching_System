import React from "react";
import "./Login.scss";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginAction } from "../../redux/auth/actions";
import logo from "../../assets/logo.png";
import Google from "../../img/google.png";
import Facebook from "../../img/facebook.png";
import { login } from "../../redux/auth/thunks";
import { useSelector } from "react-redux";
import { IRootState } from "../../redux/state";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState<string>("Veronica");
  const [password, setPassword] = useState<string>("1234");
  const displayName = useSelector(
    (state: IRootState) => state.auth.displayName
  );
  let navigate = useNavigate();
  const onSubmit = (e: any) => {
    e.preventDefault();

    // 用dispatch搵reducer
    dispatch(
      login({
        username,
        password,
      })
    )
      // 用unwrap()會return個promise;
      .unwrap()
      .then((originalPromiseResult: any) => {
        // handle result here
        console.log("success login :", originalPromiseResult);
        navigate("/main");
      })
      .catch((rejectedValueOrSerializedError: any) => {
        // handle error here
        console.log("login faiil :", rejectedValueOrSerializedError);
      });
  };

  const google = () => {
    window.open("http://localhost:8080/auth/google", "_self");
  };

  const facebook = () => {
    window.open("http://localhost:8080/auth/facebook", "_self");
  };

  return (
    <div className="login">
      <div className="wrapper">
        <h1 className="loginTitle">Please Choose a Login Method</h1>
        <div className="left">
          <div className="loginButton google" onClick={google}>
            <img src={Google} alt="" className="icon" />
            Google
          </div>
          <div className="loginButton facebook" onClick={facebook}>
            <img src={Facebook} alt="" className="icon" />
            Facebook
          </div>
        </div>
        <div className="center">
          <div className="or">OR</div>
        </div>
        <div className="right">
          <form onSubmit={onSubmit}>
            <div>
              <label>
                Username:
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                ></input>
              </label>
            </div>
            <div>
              <label>
                Password:
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </label>
            </div>
            <br />
            displayName={displayName}
            <button className="submit">Login</button>
          </form>
          <span className="registerHere">
            Don't have an account? Register <a href="#">here</a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
