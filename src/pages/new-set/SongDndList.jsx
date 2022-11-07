import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styles from "./SongDndList.module.css";

const SongDndList = (props) => {
  const songs = props.songs;
  const setSongs = props.setSongs;
  const deleteSong = props.deleteSong;

  // handle deleting song from list
  const handleDelete = (event, songToDelete) => {
    event.preventDefault();
    deleteSong(songToDelete);
  };

  // after dropping dragged item, we want to update list
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const newSongs = [...songs];
    const [removed] = newSongs.splice(result.source.index, 1);
    newSongs.splice(result.destination.index, 0, removed);
    setSongs(newSongs);
  };

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="songsList">
          {(provided) => (
            <div className={styles["song__list__container"]}>
              <ul
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={styles["song__list"]}
              >
                {songs.map((song, index) => {
                  return (
                    <Draggable
                      key={song.title}
                      draggableId={song.title}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={styles["song__list__item"]}
                        >
                          {song.title} - {song.artists.join(", ")}
                          <div className={styles["delete__btn"]} onClick={(e) => handleDelete(e, song)}>&times;</div>
                        </li>
                      )}
                    </Draggable>
                  );
                })}
              </ul>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default SongDndList;
