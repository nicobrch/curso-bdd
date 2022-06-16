import React, {Component} from "react";

class SidebarMenu extends Component {
    render() {
        return (
            <div className="sidebarMenu">
                <h3 className="sidebarTitle">{this.props.title}</h3>
                <ul className="sidebarList">
                    {this.props.children}
                </ul>
            </div>
        )
    }
}

export default SidebarMenu;