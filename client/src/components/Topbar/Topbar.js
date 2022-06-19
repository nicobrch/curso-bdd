import {Component} from "react";
import styles from "./Topbar.module.css";
import { Settings } from "@mui/icons-material";
import {Link} from "react-router-dom";

class Topbar extends Component {
    render () {
        return (
            <div className={styles.topbar}>
                <div className={styles.wrapper}>
                <Link to={'/'} className={styles.topLeft}>
                    <div className={styles.topLeft}>
                        <img src="https://images.emojiterra.com/twitter/512px/1f5ff.png" alt="Logo" className={styles.logo} />
                        <span className={styles.titulo}>LA BASE</span>
                    </div>
                </Link>
                <div className={styles.topRight}>
                    <div className={styles.iconContainer}>
                        <Settings/>
                    </div>
                    <img src="https://a.ppy.sh/5252968" alt="" className={styles.avatar} />
                </div>
                </div>
            </div>
        )
    }
}

export default Topbar;