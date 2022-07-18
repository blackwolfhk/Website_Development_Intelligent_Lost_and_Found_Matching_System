import React from "react";
import { Outlet } from "react-router";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Feed from "../Feed/Feed";
import "./Mainpage.css";

function Mainpage() {
  return (
    <div>
      <div>
        <Header />
        <div className="app_side">
          <div className="app_body">
            {/* <Sidebar /> */}
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mainpage;
