import React from "react";
import { comics } from "../services/comics";
import ListScreen from "./ListScreen";

class Comics extends React.Component {
  render() {
    return (
      <ListScreen
        title="Çizgi Romanlar"
        searchPlaceholder="Çizgi Roman Ara"
        getData={comics}
        calcRenderItemData={(item) => ({
          id: item.id,
          image: { uri: item.thumbnail.path + "/landscape_incredible." + item.thumbnail.extension },
          cta: 'Çizgi Roman Detayları',
          body: `Sayfa Sayısı : ${item.pageCount}`,
          ...item
        })}
        detailPage='ComicDetail'
      />
    );
  }
}

export default Comics;
