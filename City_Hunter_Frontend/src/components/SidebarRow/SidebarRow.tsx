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
      <span className="sidebarRowWords">{title}</span>
    </div>
  );
}
