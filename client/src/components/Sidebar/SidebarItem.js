import React, {Component} from "react";
import {Link} from "react-router-dom";
import styles from "./Sidebar.module.css";

class SidebarItem extends Component {
   render() {
      return (
          <Link to={this.props.link} className={styles.item}>
            <li className={styles.item}>
                {this.props.children}
            </li>
          </Link>
      )
   }
}

export default SidebarItem;