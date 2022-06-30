import React from "react";
import LossItem from "../LossItem/LossItem";
import "./Feed.css";

// import MessageSender from "./MessageSender";

export default function Feed() {
  return (
    <div className="feed">
      <LossItem />
      {/* <MessageSender /> */}
    </div>
  );
}
