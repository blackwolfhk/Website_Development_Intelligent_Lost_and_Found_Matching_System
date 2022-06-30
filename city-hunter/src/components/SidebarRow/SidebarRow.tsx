import { Avatar } from "@mui/material";
import React from "react";
import "./SidebarRow.css";

export default function SidebarRow({
  src,
  Icon,
  title,
}: {
  src: any;
  Icon: any;
  title: string;
}) {
  return (
    <div className="sidebarRow">
      {src && <Avatar src={src} />}
      {Icon && <Icon />}
      <h4>{title}</h4>
    </div>
  );
}
