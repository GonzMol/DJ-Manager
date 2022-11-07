//import styles from "./DjSetFrom.module.css";

const DjSetForm = (props) => {

  const {title, artists, tags} = props.state;

  const {setTitle, setArtists, setTags} = props.setters;

  const changeTitleText = (e) => {
    setTitle(e.target.value);
  };

  const changeArtistsText = (e) => {
    setArtists(e.target.value);
  };

  const changeTagsText = (e) => {
    setTags(e.target.value);
  };

  return (
    <div>
      <form action="">
        <div>
          <label htmlFor="title">Title: </label>
          <input type="text" id="title" onChange={changeTitleText} value={title}/>
        </div>
        <div>
          <label htmlFor="artists">Artists: </label>
          <input type="text" id="artists" onChange={changeArtistsText} value={artists}/>
        </div>
        <div>
          <label htmlFor="tags">Tags: </label>
          <input type="text" id="tags" onChange={changeTagsText} value={tags}/>
        </div>
      </form>
    </div>
  );
};
export default DjSetForm;
