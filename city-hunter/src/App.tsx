import React from "react";
import { useSelector } from "react-redux";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";
import { Routes } from "react-router";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { IAuthState } from "./redux/auth/state";
import { IRootState } from "./redux/state";
// import { Provider, useSelector } from "react-redux";
import store from "./redux/store";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Feed from "./components/Feed/Feed";
import Error404 from "./components/Error404/Error404";
import Mainpage from "./components/Mainpage/Mainpage";

export default function App() {
  const isLoggedIn = useSelector((state: IRootState) => state.auth.isLoggedIn);

  return (
    <div className="App">
      <BrowserRouter>
        <nav>
          {/* {!isLoggedIn && <Login />}
          {isLoggedIn && <Link to="main">Mainpage</Link>} */}
          {/* <Link to="main">Main page</Link> */}
        </nav>

        <Routes>
          <Route path="login" element={<Login />}></Route>
          <Route path="/" element={<Login />}></Route>
          <Route path="main" element={<Mainpage />}></Route>
          <Route path="*" element={<Error404 />}></Route>
        </Routes>

        {/* {!isLoggedIn && <Login />
        {isLoggedIn && ( */}

        {/* <div>
          <Header />
          <div className="app_side">
            <div className="app_body">
              <Sidebar />
              <Feed />
            </div>
          </div>
        </div> */}
      </BrowserRouter>
    </div>
  );
}
