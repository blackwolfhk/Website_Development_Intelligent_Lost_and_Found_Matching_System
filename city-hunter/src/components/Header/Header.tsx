import React from "react";
import "./Header.css";
import logo from "../../assets/logo.png";
import { AccessAlarm, ThreeDRotation } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import MessageIcon from "@mui/icons-material/Message";
import { Avatar } from "@mui/material";

export default function Header() {
  return (
    <div className="header">
      <div className="header_left">
        <img src={logo} alt="" />
      </div>

      <div className="header_company_name">City Hunter</div>

      <div className="header_input">
        <SearchIcon />
        <input placeholder="Search items" type="text" />
      </div>

      <div className="header_center">
        <div className="header_option Header_option--active">
          <HomeIcon fontSize="large" />
        </div>

        <div className="header_option">
          <PeopleAltIcon fontSize="large" />
        </div>

        <div className="header_option">
          <FactCheckIcon fontSize="large" />
        </div>
      </div>

      <div className="header_right">
        <div className="header_option">
          <NotificationsActiveIcon fontSize="large" />
        </div>

        <div className="header_option">
          <MessageIcon fontSize="large" />
        </div>

        <div className="header_info">
          <Avatar />
          <h4>Ken Chan</h4>
        </div>
      </div>
    </div>
  );
}
