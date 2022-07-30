import React, { useState, useCallback, useEffect } from "react";
import "./Register.css";
import { Link } from "react-router-dom";
// import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

function Register() {
  // useState returns a stateful value, and a function to update it
  const [email, setemail] = useState("");
  const [username, setusername] = useState("");
  const [mobile, setmobile] = useState("");
  const [pwd1, setpwd1] = useState("");
  const [pwd2, setpwd2] = useState("");

  // const [name, setname] = useState("James");
  const [errorMsg, setMessage] = useState("");
  const handelsubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // setname("abc")
    console.log("registered handelsubmit");
    if (pwd1 !== pwd2) {
      setMessage("Password is not same");
      return;
    }
    const res = await fetch(process.env.REACT_APP_API_HOST + "/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: pwd1,
        mobileNo: mobile,
        email: email,
      }),
    });
    const data = await res.json();
    const msg = data.message;
    setMessage(msg);
  };

  // GoogleReCaptcha handling:
  // const { executeRecaptcha } = useGoogleReCaptcha();
  // useCallback will return a memoized version of the callback that only changes
  // if one of the dependencies has changed.
  // const handleReCaptchaVerify = useCallback(async () => {
  //   if (!executeRecaptcha) {
  //     console.log("Execute recaptcha not yet available");
  //     return;
  //   }

  //   const token = await executeRecaptcha("yourAction");
  //   // Do whatever you want with the token
  // }, [executeRecaptcha]);

  // Use useEffect to trigger the verification as soon as the component being loaded
  // useEffect(() => {
  //   handleReCaptchaVerify();
  // }, [handleReCaptchaVerify]);

  return (
    <div className="main-Register">
      <div className="right-side">
        <div className="top-right"></div>
        {/* <button onClick={handleReCaptchaVerify}>Verify recaptcha</button>; */}
        <div className="body-right align-items-center justify-content-center">
          <div className="container col-lg-5">
            <h1>CREATE ACCOUNT</h1>
            <form onSubmit={handelsubmit}>
              <div className="input-group">
                <h5> UserName</h5>
                <input
                  className="w-100"
                  type="text"
                  name="Fname"
                  value={username}
                  onChange={(e) => {
                    setusername(e.target.value);
                  }}
                  id="fname"
                />
              </div>
              <div className="input-group">
                <h5> Mobile Number</h5>
                <input
                  className="w-100"
                  type="text"
                  name="lname"
                  value={mobile}
                  onChange={(e) => {
                    setmobile(e.target.value);
                  }}
                  id="lname"
                />
              </div>
              <div className="input-group">
                <h5> Email</h5>
                <input
                  className="w-100"
                  type="Email"
                  name="email"
                  value={email}
                  onChange={(e) => {
                    setemail(e.target.value);
                  }}
                  id="email1"
                />
              </div>
              <div className="input-group">
                <h5> Password</h5>
                <input
                  className="w-100"
                  type="password"
                  value={pwd1}
                  onChange={(e) => {
                    setpwd1(e.target.value);
                  }}
                  name="pwd"
                  id="pwd1"
                />
              </div>
              <div className="input-group">
                <h5> Confirm Password</h5>
                <input
                  className="w-100"
                  type="password"
                  value={pwd2}
                  onChange={(e) => {
                    setpwd2(e.target.value);
                  }}
                  name="pwd"
                  id="pwd2"
                />
              </div>
              <input className="w-100" type="submit" id="sbtn" value="Submit" />
              <p>
                Already have an Account?
                <Link to="/login">Sign In</Link>
              </p>
              {/* <button onClick={handleReCaptchaVerify}>Verify recaptcha</button> */}
              <div className="error">
                {errorMsg.length > 0 && <h5>Message: {errorMsg}</h5>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
