import React from "react";
import "./AboutUs.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Container } from "react-bootstrap";
import easeuse from "../../assets/ease-of-use.png";
import intelligentmatching from "../../assets/intelligent-matching.png";
import outreach from "../../assets/outreach.png";
import map from "../../assets/map.jpeg";

function AboutUs() {
  return (
    <div className="aboutus aboutus-background">
      <h1>About Us</h1>
      <div className="context">
        <Container fluid>
          <Row>
            <Col>
              <div className="title">Intelligent Online Lost & Found</div>
              <br></br>
              <div>
                <a href="">City Hunter</a> is an entirely new intelligent lost
                and found matching system. We have taken a different approach
                than the traditional lost & founds by creating a multi-level
                platform for businesses and individuals to submit lost or found
                items into our matching system. Once the lost or found items are
                submitted and placed into our matching system, we intelligently
                help find and locate the misplaced goods and who has them.
              </div>
            </Col>
          </Row>
        </Container>

        <br></br>
        <br></br>

        <Container>
          <Row className="box-container">
            <Col md={3} className="image-box">
              <div className="context-border">
                <div className="img-container">
                  <img src={easeuse} alt="" />
                </div>

                <br></br>
                <div className="sub-title">Ease of Use</div>
                <br></br>
                <span className="sub-context">
                  Submitting lost or found items is simple and hassle free.
                  Input the required information and let our system go to work.
                </span>
              </div>
            </Col>

            <Col md={1}></Col>

            <Col md={3} className="image-box">
              <div className="context-border">
                <div className="img-container">
                  <img src={intelligentmatching} alt="" />
                </div>
                <br></br>
                <div className="sub-title">Intelligent Matching</div>
                <br></br>
                <span className="sub-context">
                  Our lost and found matching system intelligently finds and
                  locates items lost or found and who potentially has them.
                </span>
              </div>
            </Col>

            <Col md={1}></Col>

            <Col md={3} className="image-box">
              <div className="context-border">
                <div className="img-container">
                  <img src={outreach} alt="" />
                </div>
                <br></br>
                <div className="sub-title">Out Reach</div>
                <br></br>
                <span className="sub-context">
                  With our multi-level platform, your lost or found submission
                  will automatically be sent to local businesses and
                  individuals.
                </span>
              </div>
            </Col>
          </Row>
        </Container>

        <br></br>
        <br></br>

        <Container fluid>
          <Row>
            <Col sm={2}></Col>
            <Col sm={8}>
              <div className="map-area">
                <img src={map} alt="" />
              </div>
            </Col>
            <Col sm={2}></Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default AboutUs;
