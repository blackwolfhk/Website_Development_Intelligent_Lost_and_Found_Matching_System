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
import Error404 from "./components/Error404/Error404";
import Mainpage from "./components/Mainpage/Mainpage";
import { IRootState } from "./redux/state";
import { IAuthState } from "./redux/auth/state";
// import { Provider, useSelector } from "react-redux";
import Register from "./components/Register/Register";
import store from "./redux/store";
import LossItem from "./components/LossItem/LossItem";
import AboutUs from "./components/AboutUs/AboutUs";
import Guidelines from "./components/Guidelines/Guidelines";
import Nearby from "./components/Nearby/Nearby";
import Messenger from "./components/Messenger/Messenger";
import UserProfile from "./components/UserProfile/UserProfile";
import ItemDetailPage from "./components/ItemDetailPage/ItemDetailPage";
import { GoogleOAuthProvider } from "@react-oauth/google";
import CreateLossPost from "./components/CreateLosspost/CreateLossPost";

export default function App() {
  const isLoggedIn = useSelector((state: IRootState) => state.auth.isLoggedIn);
  return (
    <div className="App">
      <GoogleOAuthProvider clientId="544255968816-l0v84t6erfrl4p791k8m8ha4kjb3ed3q.apps.googleusercontent.com">
        <BrowserRouter>
          <Routes>
            <Route path="login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/" element={<Login />}></Route>
            <Route path="/main" element={<Mainpage />}>
              <Route path="lossitem" element={<LossItem />}>
                <Route
                  path="createlostpost"
                  element={<CreateLossPost />}
                ></Route>
              </Route>
              <Route path="ItemDetailPage" element={<ItemDetailPage />}></Route>
              <Route path="lossitem" element={<LossItem />}></Route>
              <Route
                path="ItemDetailPage/:id"
                element={<ItemDetailPage />}
              ></Route>
              <Route path="aboutus" element={<AboutUs />}></Route>
              <Route path="guideline" element={<Guidelines />}></Route>
              <Route path="nearby" element={<Nearby />}></Route>
              <Route path="messenger" element={<Messenger />}></Route>
              <Route path="userprofile" element={<UserProfile />}></Route>
            </Route>
            <Route path="*" element={<Error404 />}></Route>
          </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </div>
  );
}
