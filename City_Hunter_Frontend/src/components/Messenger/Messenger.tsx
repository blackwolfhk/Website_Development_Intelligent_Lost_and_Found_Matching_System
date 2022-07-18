import React from "react";
import ContactList from "../ContactList/ContactList";
import MessengerContact from "../MessengerContact/MessengerContact";
import "./Messenger.css";

function Messenger() {
  return (
    <div className="messenger">
      <div className="messenger-container">
        <h1>Messenger</h1>
        <div className="messenger-border">
          <ContactList />
          {/* testing (hardcode only) */}
          <MessengerContact />
        </div>
      </div>
    </div>
  );
}

export default Messenger;
