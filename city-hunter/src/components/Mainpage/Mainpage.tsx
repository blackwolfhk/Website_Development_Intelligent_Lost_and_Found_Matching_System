import React from "react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Feed from "../Feed/Feed";

function Mainpage() {
  return (
    <div>
      <div>
        <Header />
        <div className="app_side">
          <div className="app_body">
            <Sidebar />
            <Feed />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mainpage;
