import "./sidebar.css";
import {
  Dashboard, Person, Keyboard, EmojiEvents, InsertLink, ManageSearch, Update, Delete, WorkspacePremium
} from "@mui/icons-material";
import SidebarItem from "./SidebarItem";
import SidebarMenu from "./SidebarMenu";

export default function Sidebar() {
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
          <SidebarItem link={'/users'}>
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
        <SidebarMenu title={'Admin'}>
          <SidebarItem link={'/insert'}>
            <InsertLink className='sidebarIcon'/>
            Insertar
          </SidebarItem>
          <SidebarItem link={'/select'}>
            <ManageSearch className='sidebarIcon'/>
            Seleccionar
          </SidebarItem>
          <SidebarItem link={'/update'}>
            <Update className='sidebarIcon'/>
            Actualizar
          </SidebarItem>
          <SidebarItem link={'/delete'}>
            <Delete className='sidebarIcon'/>
            Borrar
          </SidebarItem>
        </SidebarMenu>
      </div>
    </div>
  );
}
