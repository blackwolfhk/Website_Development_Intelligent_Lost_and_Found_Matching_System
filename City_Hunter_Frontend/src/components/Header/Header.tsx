import "./Header.css";
import logo from "../../assets/logo.png";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import MessageIcon from "@mui/icons-material/Message";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import MapIcon from "@mui/icons-material/Map";
import { useSelector } from "react-redux";
import { IRootState } from "../../redux/state";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Form } from "react-bootstrap";

export default function Header() {
  const username = useSelector((state: IRootState) => state.auth.username);

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      className="header"
    >
      <Container>
        <Link to="/main/aboutus">
          <div className="header_left">
            <img src={logo} alt="" />
          </div>
        </Link>
        <div className="header_company_name">City Hunter</div>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Form
              className="d-flex "
              style={{ alignItems: "center", height: "auto" }}
            >
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <SearchIcon />
            </Form>

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
          </Nav>
          <br></br>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Nav>
              <div className="header_info">
                <Avatar />
              </div>

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

                <Link
                  to="/main/userhistocialrecord"
                  style={{ display: "flex" }}
                >
                  {/* <span className="username">{username}</span> */}
                  <NavDropdown.Item href="#action/3.2">
                    Historical Record
                  </NavDropdown.Item>
                </Link>

                <Link to="/login">
                  <NavDropdown.Item href="#action/3.2">
                    Log out
                  </NavDropdown.Item>
                </Link>
              </NavDropdown>
            </Nav>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
