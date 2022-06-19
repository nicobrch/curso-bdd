import React, {Component} from "react";
import styles from "./Sidebar.module.css";

class SidebarMenu extends Component {
    render() {
        return (
            <div className={styles.menu}>
                <h3 className={styles.titulo}>{this.props.title}</h3>
                <ul className={styles.list}>
                    {this.props.children}
                </ul>
            </div>
        )
    }
}

export default SidebarMenu;