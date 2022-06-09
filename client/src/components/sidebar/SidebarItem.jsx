import React, {Component} from "react";
import {Link} from "react-router-dom";

class SidebarItem extends Component {
   render() {
      return (
          <Link to={this.props.link} className="link">
            <li className="sidebarListItem">
                {this.props.children}
            </li>
          </Link>
      )
   }
}

export default SidebarItem;