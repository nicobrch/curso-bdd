import React, {Component} from "react";
import {Link} from "react-router-dom";
import "./sidebar.css";

class SidebarItem extends Component {
   render() {
      return (
          <Link to={this.props.link} className="sidebarListItemLink">
            <li className="sidebarListItem">
                {this.props.children}
            </li>
          </Link>
      )
   }
}

export default SidebarItem;