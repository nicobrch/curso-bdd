import React from "react";
import "./topbar.css";
import { Settings } from "@material-ui/icons";
import {Link} from "react-router-dom";

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <Link to={'/'} className={"topLeft"}>
          <div className="topLeft">
            <img src="https://www.personality-database.com/profile_images/440768.png" alt="Logo" className="topLogo" />
            <span className="logo">LA BASE</span>
          </div>
        </Link>
        <div className="topRight">
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <img src="https://a.ppy.sh/5252968" alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  );
}
