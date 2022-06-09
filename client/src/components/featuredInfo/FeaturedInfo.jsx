import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import FeaturedInfoItem from "./FeaturedInfoItem";

export default function FeaturedInfo() {
  return (
    <div className="featured">
      <FeaturedInfoItem
          titulo={'Usuarios'}
          cantidad={'10'}
          linkTitulo={'/'}
          linkInsert={'/'}
      />
        <FeaturedInfoItem
          titulo={'Usuarios'}
          cantidad={'10'}
          linkTitulo={'/'}
          linkInsert={'/'}
      />
        <FeaturedInfoItem
          titulo={'Usuarios'}
          cantidad={'10'}
          linkTitulo={'/'}
          linkInsert={'/'}
      />
        <FeaturedInfoItem
          titulo={'Usuarios'}
          cantidad={'10'}
          linkTitulo={'/'}
          linkInsert={'/'}
      />
    </div>
  );
}
