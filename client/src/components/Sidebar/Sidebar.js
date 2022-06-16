import {Component} from "react";
import "./sidebar.css";
import {
  Dashboard, Person, Keyboard, EmojiEvents, WorkspacePremium
} from "@mui/icons-material";
import SidebarItem from "./SidebarItem";
import SidebarMenu from "./SidebarMenu";

class Sidebar extends Component {
    render () {
        return (
            <div className="sidebar">
                <div className="sidebarWrapper">
                    <SidebarMenu title={'Dashboard'}>
                        <SidebarItem link={'/'}>
                            <Dashboard className='sidebarIcon'/>
                            Home
                        </SidebarItem>
                    </SidebarMenu>
                    <SidebarMenu title={'Tablas'}>
                        <SidebarItem link={'usuarios'}>
                            <Person className='sidebarIcon'/>
                            Usuarios
                        </SidebarItem>
                        <SidebarItem link={'/perifericos'}>
                            <Keyboard className='sidebarIcon'/>
                            Perifericos
                        </SidebarItem>
                        <SidebarItem link={'/torneos'}>
                            <EmojiEvents className='sidebarIcon'/>
                            Torneos
                        </SidebarItem>
                        <SidebarItem link={'/badges'}>
                            <WorkspacePremium className='sidebarIcon'/>
                            Badges
                        </SidebarItem>
                    </SidebarMenu>
                </div>
            </div>
        )
    }
}

export default Sidebar;