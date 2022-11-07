import React from "react";
import GridCSS from "./ItemGrid.module.css";
import Item from "../Item/Item";

const ItemGrid = ({items, baseDir, is_song=false, response, loading}) => {
  const messageCSS = loading ? GridCSS.loading : GridCSS.error;
  const messageText = loading ? "Loading..." : "Error: Could not load!";

  return (
    <div className={GridCSS.gridContainer}>
      {!response ? <div className = {messageCSS}><div>{messageText}</div></div> :
      <div className={GridCSS.itemsGrid}>
        {items.map((item) => {
          return (
            <Item key={item["_id"]} myItem={item} page={baseDir} is_song={is_song} />
          );
        })}
      </div>}
    </div>
  );
};

export default ItemGrid;
