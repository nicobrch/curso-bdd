import "./home.css";
import FeaturedInfoItem from "../../components/featuredInfo/FeaturedInfoItem";
import {
  Person, Keyboard, EmojiEvents, WorkspacePremium, SportsScore, Map, Public, Mouse, Monitor, BorderColor
} from "@mui/icons-material";
import React from "react";
import WidgetLg from "../../components/widgetLg/WidgetLg";

export default function Home() {
    return (
        <div className="home">
            <div className="featured">
                <FeaturedInfoItem
                    titulo={'Usuarios'}
                    cantidad={'10'}
                    linkTitulo={'/users'}
                    linkInsert={'/'}
                    icon={<Person className="featuredIcon"/>}
                />
                <FeaturedInfoItem
                    titulo={'Perifericos'}
                    cantidad={'1'}
                    linkTitulo={'/perifericos'}
                    linkInsert={'/'}
                    icon={<Keyboard className="featuredIcon"/>}
                />
                <FeaturedInfoItem
                    titulo={'Torneos'}
                    cantidad={'0'}
                    linkTitulo={'/torneos'}
                    linkInsert={'/'}
                    icon={<EmojiEvents className="featuredIcon"/>}
                />
            </div>
            <div className="featured">
                <FeaturedInfoItem
                    titulo={'Badges'}
                    cantidad={'0'}
                    linkTitulo={'/badges'}
                    linkInsert={'/'}
                    icon={<WorkspacePremium className="featuredIcon"/>}
                />
                <FeaturedInfoItem
                    titulo={'API Score'}
                    cantidad={'10'}
                    linkTitulo={'/'}
                    linkInsert={'/'}
                    icon={<SportsScore className="featuredIcon"/>}
                />
                <FeaturedInfoItem
                    titulo={'API Map'}
                    cantidad={'10'}
                    linkTitulo={'/'}
                    linkInsert={'/'}
                    icon={<Map className="featuredIcon"/>}
                />
            </div>
            <div className="featured">
                <FeaturedInfoItem
                    titulo={'Red Social'}
                    cantidad={'10'}
                    linkTitulo={'/'}
                    linkInsert={'/'}
                    icon={<Public className="featuredIcon"/>}
                />
                <FeaturedInfoItem
                    titulo={'Config Mouse'}
                    cantidad={'10'}
                    linkTitulo={'/'}
                    linkInsert={'/'}
                    icon={<Mouse className="featuredIcon"/>}
                />
                <FeaturedInfoItem
                    titulo={'Config Teclado'}
                    cantidad={'10'}
                    linkTitulo={'/'}
                    linkInsert={'/'}
                    icon={<Keyboard className="featuredIcon"/>}
                />
                <FeaturedInfoItem
                    titulo={'Config Monitor'}
                    cantidad={'10'}
                    linkTitulo={'/'}
                    linkInsert={'/'}
                    icon={<Monitor className="featuredIcon"/>}
                />
                <FeaturedInfoItem
                    titulo={'Config Tablet'}
                    cantidad={'10'}
                    linkTitulo={'/'}
                    linkInsert={'/'}
                    icon={<BorderColor className="featuredIcon"/>}
                />
            </div>
            <div className={"homeWidgets"}>
                <WidgetLg/>
            </div>
        </div>
    )
}