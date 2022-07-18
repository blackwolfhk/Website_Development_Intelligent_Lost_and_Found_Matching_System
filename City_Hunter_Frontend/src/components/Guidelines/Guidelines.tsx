import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./Guidelines.css";
import lostitem from "../../assets/lostitem.png";
import formfilling from "../../assets/formfilling.png";
import lostandfound from "../../assets/lostandfound.png";

function Guidelines() {
  return (
    <div className="guideline">
      <h1>Guidelines</h1>
      <br></br>
      <div className="guidelines-details">
        <Container fluid>
          <Row>
            <Col>
              <h2>Intelligent Lost & Found Matching System</h2>
              <br></br>
              <p>
                Losing or misplacing your property can be frustrating and become
                such a hassle to find. At Lostings we answer that by providing
                an intelligent lost and found matching system, which
                automatically identifies, matches, and pairs recently lost or
                found items with one another.
              </p>
              <p>
                We’ve also partnered with local and regional businesses to
                submit found items into our matching system. This helps to
                maximize reach and gives users a higher rate of success when
                attempting to locate and find lost property.
              </p>
            </Col>
          </Row>
        </Container>
        <br></br> <br></br>
        <Container>
          <h2 className="guideline-white-font">How City Hunter works?</h2>
          <br></br>
          <Row>
            <Col>
              <div className="guideline-img-box">
                <img src={lostitem} alt="" />
              </div>
            </Col>
            <br></br>
            <Col>
              <h4 className="guideline-white-font">
                Register your lost item online
              </h4>
              <p>
                Please note we cannot begin to query our 'Found' item database
                until you have Register your Item Lost by completing the online
                form - it's quick and easy to complete. Once your lost item has
                been registered 'Lost' via the online form our Lost Property
                Offices are alerted. If a possible match is established by Lost
                Property Officers, you will be emailed for more information to
                verify ownership of the item.
              </p>
              <p>
                To be reunited with your item you must{" "}
                <a href="">register your item lost</a> by via the online form.
              </p>
            </Col>
          </Row>
          <br></br>
          <Row>
            <Col>
              <h4 className="guideline-white-font">
                Maximise the chance of your item being identified
              </h4>
              <p>
                Please provide us with as much detail as you can to help
                identify your item from the thousands of similar items lost on
                transport networks daily. Providing as detailed a description as
                possible when <a href="">registering your item lost</a> will
                help Lost Property Officers identify, and match, your item.
              </p>
              <p>
                <b className="guideline-white-font">Bags / Suitcases</b> -
                please provide full content details Mobile
                <br></br>
                <b className="guideline-white-font">Phones</b> - IMEI number,
                Lock Screen Wallpaper Image
                <br></br>
                <b className="guideline-white-font">Electronic Devices</b> -
                Serial number
                <br></br>
                <b className="guideline-white-font">All Other Items</b> - any
                unique distinguishing features specific to your belongings
              </p>
            </Col>

            <Col>
              {" "}
              <div className="guideline-img-box">
                <img src={formfilling} alt="" />
              </div>
            </Col>
          </Row>
          <br></br>
          <Row>
            <Col>
              {" "}
              <div className="guideline-img-box">
                <img src={lostandfound} alt="" />
              </div>
            </Col>
            <Col>
              <h4 className="guideline-white-font">
                Reuniting you with your item if a potential match is established
              </h4>

              <p>
                Please note the finder will only be in touch when he/she has a
                potential item match. If there is no one yet been in touch, it
                is not yet have a potential match to your registered lost item.
              </p>
              <p>
                As a team of City Hunter, we always do our best to re-unite
                passengers with their lost items but our ability to do so is
                dependent on factors outside our control:
              </p>
              <p>
                (a) the item being found
                <br></br>
                (b) the found item being handed in
                <br></br>
                (c) the time it takes for the finder to get the found item
              </p>
              <p>
                If the item does not reach a <a href="">Lost Property</a> from
                our online platform, we will not be able to assist. Please be
                aware not all lost items are found and handed in.
              </p>
            </Col>
          </Row>
        </Container>
        <br></br>
        <Container fluid>
          <Row>
            <Col>
              <div className="finditemquery">
                <div>
                  <b>
                    Did you lose or find something? Click below to submit a lost
                    or found item.
                  </b>
                </div>
                <br></br>

                <div className="feature-buttons">
                  <div className="guideline-from-submission">
                    <button>Submit Found Item</button>
                  </div>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <div className="guideline-from-submission">
                    <button>Submit Lost Item</button>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Guidelines;
