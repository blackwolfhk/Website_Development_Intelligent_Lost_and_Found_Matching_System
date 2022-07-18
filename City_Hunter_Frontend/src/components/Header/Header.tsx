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
import Mainpage from "../Mainpage/Mainpage";
import AboutUs from "../AboutUs/AboutUs";
import Guidelines from "../Guidelines/Guidelines";
import Notification from "../Notification/Notification";
import { Link, Route, Routes } from "react-router-dom";
import MapIcon from "@mui/icons-material/Map";
import { useSelector } from "react-redux";
import { IRootState } from "../../redux/state";
import { NavDropdown } from "react-bootstrap";

export default function Header() {
  const username = useSelector((state: IRootState) => state.auth.username);

  return (
    // <Routes>
    <div>
      <div className="header">
        <Link to="/main/aboutus">
          <div className="header_left">
            <img src={logo} alt="" />
          </div>
        </Link>

        <div className="header_company_name">City Hunter</div>

        <div className="header_input">
          <SearchIcon />
          <input placeholder="Search items" type="text" />
        </div>

        <div className="header_center">
          <Link to="/main/lossitem">
            <div className="header_option Header_option--active">
              <HomeIcon fontSize="large" />
              <div className="home font-setting">Home</div>
            </div>
          </Link>

          <Link to="/main/aboutus">
            <div className="header_option">
              <PeopleAltIcon fontSize="large" />
              <div className="aboutus font-setting">About Us</div>
            </div>
          </Link>

          <Link to="/main/guideline">
            <div className="header_option">
              <FactCheckIcon fontSize="large" />
              <div className="guidelines font-setting">Guidelines</div>
            </div>
          </Link>

          <Link to="/main/nearby">
            <div className="header_option">
              <MapIcon fontSize="large" />
              <div className="map font-setting">Nearby</div>
            </div>
          </Link>
        </div>

        <div className="header_right">
          <div className="header_option">
            <NotificationsActiveIcon fontSize="large" />
            <div className="notification font-setting">Notification</div>
          </div>

          <Link to="/main/messenger">
            <div className="header_option">
              <MessageIcon fontSize="large" />
              <div className="messenger font-setting">Messenger</div>
            </div>
          </Link>

          <div className="header_info">
            <Avatar />
            <NavDropdown
              title={username}
              id="basic-nav-dropdown"
              className="username"
            >
              <Link to="/main/userprofile" style={{ display: "flex" }}>
                {/* <span className="username">{username}</span> */}
                <NavDropdown.Item href="#action/3.1">
                  Edit Profile
                </NavDropdown.Item>
              </Link>
              <Link to="/login">
                <NavDropdown.Item href="#action/3.2">Log out</NavDropdown.Item>
              </Link>
            </NavDropdown>

          </div>
        </div>
      </div>
    </div>
  );
}

