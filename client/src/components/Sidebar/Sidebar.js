import {Component} from "react";
import styles from "./Sidebar.module.css";
import {
  Dashboard, Person, Keyboard, EmojiEvents, WorkspacePremium
} from "@mui/icons-material";
import SidebarItem from "./SidebarItem";
import SidebarMenu from "./SidebarMenu";

class Sidebar extends Component {
    render () {
        return (
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <SidebarMenu title={'Dashboard'}>
                        <SidebarItem link={'/'}>
                            <Dashboard className={styles.icon}/>
                            Home
                        </SidebarItem>
                    </SidebarMenu>
                    <SidebarMenu title={'Tablas'}>
                        <SidebarItem link={'usuarios'}>
                            <Person className={styles.icon}/>
                            Usuarios
                        </SidebarItem>
                        <SidebarItem link={'/perifericos'}>
                            <Keyboard className={styles.icon}/>
                            Perifericos
                        </SidebarItem>
                        <SidebarItem link={'/torneos'}>
                            <EmojiEvents className={styles.icon}/>
                            Torneos
                        </SidebarItem>
                    </SidebarMenu>
                </div>
            </div>
        )
    }
}

export default Sidebar;