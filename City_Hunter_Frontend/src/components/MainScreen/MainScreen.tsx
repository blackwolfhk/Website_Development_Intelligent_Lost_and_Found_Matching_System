import React from "react";
import { Container, Row } from "react-bootstrap";
import "./MainScreen.scss";

function MainScreen({ children, title }: { children: any; title: any }) {
  return (
    <div className="mainback">
      <Container>
        <Row>
          <div className="page">
            {title && (
              <>
                <h1 className="heading">{title}</h1>
                <hr />
              </>
            )}
            {children}
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default MainScreen;
