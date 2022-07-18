import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
// import Logo from "../assets/logo.svg";
import "./ContactList.scss";

export default function ContactList({ contacts, changeChat }: any) {
  // useState returns a stateful value, and a function to update it
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  // The function passed to useEffect will run after the render is committed to the screen
  //   useEffect(async () => {
  //     const data = await JSON.parse(
  //       localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
  //     );
  //     setCurrentUserName(data.username);
  //     setCurrentUserImage(data.avatarImage);
  //   }, []);
  const changeCurrentChat = (index: any, contact: any) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <div className="contactlistbar">
      Contact bar area
      {currentUserImage && currentUserImage && (
        <Container className="container-style">
          <div className="brand">
            <img src={""} alt="logo" />
            <h3>snappy</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact: any, index: any) => {
              return (
                <div
                  key={contact._id}
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img src={``} alt="" />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </div>
  );
}
