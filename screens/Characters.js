import React from "react";
import { characters } from "../services/characters";
import ListScreen from "./ListScreen";

class Characters extends React.Component {

  render() {
    return (
      <ListScreen
        title="Karakterler"
        searchPlaceholder="Karakter Ara"
        getData={characters}
        calcRenderItemData={(item) => ({
          id: item.id,
          title: item.name,
          image: { uri: item.thumbnail.path + "/landscape_incredible." + item.thumbnail.extension },
          cta: 'Karakter Detayları',
          body: `Çizgi Roman : ${item.comics.available} | Dizi : ${item.series.available} | Hikaye : ${item.stories.available}`,
          ...item
        })}
        detailPage='CharacterDetail'
      />
    );
  }
}

export default Characters;
