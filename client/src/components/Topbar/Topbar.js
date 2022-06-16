import {Component} from "react";
import "./Topbar.css";
import { Settings } from "@mui/icons-material";
import {Link} from "react-router-dom";

class Topbar extends Component {
    render () {
        return (
            <div className="topbar">
                <div className="topbarWrapper">
                <Link to={'/'} className={"topLeft"}>
                    <div className="topLeft">
                        <img src="https://images.emojiterra.com/twitter/512px/1f5ff.png" alt="Logo" className="topLogo" />
                        <span className="logo">LA BASE</span>
                    </div>
                </Link>
                <div className="topRight">
                    <div className="topbarIconContainer">
                        <Settings/>
                    </div>
                    <img src="https://a.ppy.sh/5252968" alt="" className="topAvatar" />
                </div>
                </div>
            </div>
        )
    }
}

export default Topbar;