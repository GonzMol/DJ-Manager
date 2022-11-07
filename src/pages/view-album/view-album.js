import ViewAlbumCSS from "./viewAlbum.module.css";
import AlbumDetails from "../../components/AlbumDetails/AlbumDetails";
import SongList from "../../components/SongList/SongList";
//import DeleteAlbumPopup from "../../components/DeleteAlbumPopup/DeleteAlbumPopup";
//import Popup from "../../components/Popup/Popup";
import { useNavigate, useParams } from "react-router-dom";
import useAxios from "../../api/useAxios";
import useAxiosFunction from "../../api/useAxiosFunction";
import axios from "../../api/api";
import { useEffect, useState } from "react";

export default function ViewAlbum() {
  let { id } = useParams();
  const navigate = useNavigate();
  const {
    response: albumRes,
    error: albumError,
    loading: albumLoading,
  } = useAxios({
    axiosInstance: axios,
    method: "GET",
    url: "album-details/" + id,
  });

  const {
    response: songsRes,
    error: songsError,
    loading: songsLoading,
  } = useAxios({
    axiosInstance: axios,
    method: "GET",
    url: "songs/album_id=" + id,
  });
  const {
    response: deletedRes,
    error: deletedError,
    loading: deletedLoading,
    axiosFetch,
  } = useAxiosFunction();
  const [clickedDelete, setClickedDelete] = useState(false);

  // useEffect for clicking delete button;
  useEffect(() => {
    if (deletedLoading) return;
    if (!clickedDelete) return;
    if (!deletedRes) return;
    if (deletedRes.success) {
      setClickedDelete(false);
      navigate("/albums");
    }

    // if unsuccessful, we will have error object.
    if (deletedError) {
      // error in post.
      const backendErrors = deletedError.response.data.errors;
      let strs = [];
      for (let i = 0; i < backendErrors.length; i++) {
        strs.push(backendErrors[i].msg);
      }
      strs = strs.join(" ");
      alert(strs);
      console.log(backendErrors);
    }
    // reset clickedAdd state
    setClickedDelete(false);
  }, [deletedRes, deletedError, deletedLoading, navigate, clickedDelete]);

  // clicking delete button
  const handleDeleteSubmit = async (event) => {
    event.preventDefault();
    setClickedDelete(true);
    // need to delete function for both album details and songs.
    axiosFetch({
      axiosInstance: axios,
      method: "DELETE",
      url: "album-details/" + id,
    });
  };

  if ((!albumRes || !songsRes) && (albumLoading || songsLoading))
    return <div className={ViewAlbumCSS.loading}><div>Loading...</div></div>;
  if ((!albumRes || !songsRes) && !albumLoading && !songsLoading) {
    // no data found, so most likely invalid id or network error.
    return (
      <div className = {ViewAlbumCSS.error}><div>
        Error: No Data Found. Bad album id: {id} or no internet connection.
      </div></div>
    );
  }
  const albumDetails = albumRes.data;
  const albumBackendErrors = albumRes?.errors;
  const albumSuccess = albumRes.success;

  const albumSongs = songsRes.data;
  const songsBackendErrors = songsRes?.errors;
  const songsSuccess = songsRes.success;

  if (albumError) console.log("Error: " + albumError.message);
  if (songsError) console.log("Error: " + songsError.message);

  if (
    (!albumSuccess || !songsSuccess) &&
    (albumBackendErrors || songsBackendErrors)
  ) {
    for (let i = 0; i < albumBackendErrors?.length; i++) {
      console.log("Album Backend Error: " + albumBackendErrors[i]?.msg);
    }
    for (let j = 0; j < songsBackendErrors?.length; j++) {
      console.log("Songs Backend Error: " + songsBackendErrors[j]?.msg);
    }
  }

  return (
    <div className={ViewAlbumCSS.container}>
      {albumDetails && (
        <div className={ViewAlbumCSS.title}>{albumDetails.title}</div>
      )}
      <div className={ViewAlbumCSS.contents}>
        <div className={ViewAlbumCSS.item}>
          {albumDetails && <AlbumDetails data={albumDetails} disabled={true} />}
          <div className={ViewAlbumCSS.songContainer}>
            {albumSongs && <SongList songs={albumSongs} />}
          </div>
        </div>
      </div>
      <button className={ViewAlbumCSS["delete-btn"]} onClick={handleDeleteSubmit}>Delete Album</button>
    </div>
  );
}
/*

        <Popup
          PopupContent={<DeleteAlbumPopup />}
          openText="Delete Album"
          styleClass={"deleteAlbum"}
          disableSubmit={true}
        />

*/


/*
  const changeLabelNumber = (newLabelNumber) => {
    //setAlbumDetails({ ...albumDetails, label_number: newLabelNumber });
  };

  const changeRecordLabel = (newRecordLabel) => {
    //setAlbumDetails({ ...albumDetails, record_label: newRecordLabel });
  };
  */
/*

  return loading ||
    songsLoading ||
    (!albumDetails && albumSongs.length === 0) ? (
    <></>
  ) : (
    <div className={ViewAlbumCSS.container}>
      {albumDetails && (
        <div className={ViewAlbumCSS.title}>{albumDetails.title}</div>
      )}
      <div className={ViewAlbumCSS.contents}>
        <div className={ViewAlbumCSS.item}>
          {albumDetails && (
            <AlbumDetails
              data={albumDetails}
              setRecordLabel={changeRecordLabel}
              setLabelNumber={changeLabelNumber}
              disabled={true}
            />
          )}
          <div className={ViewAlbumCSS.songContainer}>
            {albumSongs && <SongList songs={albumSongs} />}
          </div>
        </div>
        <Popup
          PopupContent={<DeleteAlbumPopup />}
          openText="Delete Album"
          styleClass={"deleteAlbum"}
          disableSubmit={true}
        />
      </div>
    </div>
  );




*/
