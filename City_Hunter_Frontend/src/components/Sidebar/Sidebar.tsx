import React from "react";
import "./Sidebar.css";
import SidebarRow from "../SidebarRow/SidebarRow";

import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import NearbyErrorIcon from "@mui/icons-material/NearbyError";
import MapIcon from "@mui/icons-material/Map";

import EmojiFlagsIcon from "@mui/icons-material/EmojiFlags";
import PeopleIcon from "@mui/icons-material/People";
import ChatIcon from "@mui/icons-material/Chat";
import StorefrontIcon from "@mui/icons-material/Storefront";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <SidebarRow
        Icon={undefined}
        src="https://qph.cf2.quoracdn.net/main-qimg-fff84fac61437bac1019459baaab41c3-lq"
        title="Ken Chan"
      />

      <SidebarRow
        Icon={LocalHospitalIcon}
        title="COVID-19 Information"
        src={undefined}
      />

      <Link to="/main/lossitem">
        <SidebarRow Icon={NearbyErrorIcon} title="Lossitem" src={undefined} />
      </Link>

      <Link to="/main/lossitem2">
        <SidebarRow Icon={NearbyErrorIcon} title="Lossitem2" src={undefined} />
      </Link>

      <SidebarRow Icon={NearbyErrorIcon} title="Nearby" src={undefined} />
      <SidebarRow Icon={MapIcon} title="Hong Kong" src={undefined} />
      <SidebarRow Icon={MapIcon} title="Kowloon" src={undefined} />
      <SidebarRow Icon={MapIcon} title="New Territories" src={undefined} />
      <SidebarRow Icon={ChatIcon} title="Messenger" src={undefined} />
    </div>
  );
}
