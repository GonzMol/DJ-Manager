import React, { useEffect, useState } from "react";
import ViewAlbumCSS from "../view-album/viewAlbum.module.css";
import NewAlbumCSS from "../new-album/newAlbum.module.css";
import AlbumDetails from "../../components/AlbumDetails/AlbumDetails";
import SongList from "../../components/SongList/SongList";
import Popup from "../../components/Popup/Popup";
import AddSongPopupContent from "../../components/AddSongPopupContent/AddSongPopupContent";
import EditDetailsPopupContent from "../../components/EditAlbumDetailsPopupContent/EditAlbumDetailsPopupContent";
//import SubmitItemPopup from "../../components/SubmitItemPopup/SubmitItemPopup";

// custom imports for request.
import useAxiosFunction from "../../api/useAxiosFunction";
import axios from "../../api/api";
import { useNavigate } from "react-router-dom";

//<AddSongPopup active = {popupActive} cancel = {cancel} addSong = {addSong}/>

export default function NewAlbum() {
  const navigate = useNavigate();
  const [songs, setSongs] = useState([]);
  const [albumDetails, setAlbumDetails] = useState({
    title: "",
    artists: [],
    tags: [],
    record_label: "",
    label_number: "",
  });

  // add album button data.
  const { response, error, loading, axiosFetch } = useAxiosFunction();
  const [clickedAdd, setClickedAdd] = useState(false);

  const addSong = (song) => {
    setSongs(songs.concat(song));
  };

  const deleteSong = (song) => {
    setSongs(songs.filter((x) => !sameSong(x, song)));
  };

  const sameSong = (song1, song2) => {
    if (song1.title !== song2.title) return false;
    if (song1.artists.length !== song2.artists.length) return false;
    for (let i = 0; i < song1.length; i++)
      if (song1.artists[i] !== song2.artists[i]) return false;

    return true;
  };

  const updateTitle = (n) => {
    setAlbumDetails({
      title: n,
      artists: albumDetails.artists,
      tags: albumDetails.tags,
      record_label: albumDetails.record_label,
      label_number: albumDetails.label_number,
    });
  };

  const updateRecordLabel = (n) => {
    setAlbumDetails({
      title: albumDetails.title,
      artists: albumDetails.artists,
      tags: albumDetails.tags,
      record_label: n,
      label_number: albumDetails.label_number,
    });
  };

  const updateLabelNumber = (n) => {
    setAlbumDetails({
      title: albumDetails.title,
      artists: albumDetails.artists,
      tags: albumDetails.tags,
      record_label: albumDetails.record_label,
      label_number: n,
    });
  };

  const updateLegacyDetails = (n) => {
    setAlbumDetails({
      title: albumDetails.title,
      artists: n.artists,
      tags: n.tags,
      record_label: albumDetails.record_label,
      label_number: albumDetails.label_number,
    });
  };

  // handles the posting of the submitting the album
  const handleSubmit = async (event) => {
    event.preventDefault();
    setClickedAdd(true);
    // make data object
    let detailsAndSongs = {
      album_details: albumDetails,
      songs: songs,
    };

    // send post request
    await axiosFetch({
      axiosInstance: axios,
      method: "POST",
      url: "album-details-with-songs",
      data: detailsAndSongs,
    });
    // check for errors, send them back, check through useEffect?
  };

  useEffect(() => {
    if (loading) return;
    if (!clickedAdd) return;
    if (!response && !error) return;
    // check for errors after post request was sent.
    if (response?.success) {
      setClickedAdd(false);
      // successful post
      navigate("/albums");

    } 

    // if unsuccessful, we will have error object.
    if (error) {
      // error in post.
      const backendErrors = error?.response?.data?.errors;
      let strs = [];
      for (let i=0; i<backendErrors?.length; i++) {
        strs.push(backendErrors[i].msg);
      }
      strs = strs.join(" ");
      alert(strs);
    }
    // reset clickedAdd state
    setClickedAdd(false);
  }, [response, error, loading, navigate, clickedAdd]);

  return (
    <>
      <div className={ViewAlbumCSS.container}>
        <div className={ViewAlbumCSS.title}>
          {albumDetails.title === "" ? "New Album" : albumDetails.title}
        </div>
        <div className={ViewAlbumCSS.contents}>
          <div className={ViewAlbumCSS.item}>
            <div className={ViewAlbumCSS.detailsContainer}>
              <AlbumDetails
                data={albumDetails}
                setTitle={updateTitle}
                setRecordLabel={updateRecordLabel}
                setLabelNumber={updateLabelNumber}
                disabled={false}
              />
              <Popup
                PopupContent={<EditDetailsPopupContent />}
                modifyData={updateLegacyDetails}
                openText="Edit Details"
                styleClass={"editDetails"}
              />
            </div>
            <div className={ViewAlbumCSS.songContainer}>
              <SongList songs={songs} editable={true} deleteSong={deleteSong} />
              <Popup
                PopupContent={<AddSongPopupContent />}
                modifyData={addSong}
                openText="Add Song"
                styleClass={"addSong"}
              />
            </div>
          </div>
          <div className={NewAlbumCSS.what}></div>
        </div>
        <button className={NewAlbumCSS["add-album-btn"]} onClick={handleSubmit}>Add Album</button>
      </div>
    </>
  );
}

/* 

          <Popup
            PopupContent={<SubmitItemPopup />}
            modifyData={updateErrors}
            openText="Add Album"
            styleClass={"addAlbum"}
            data={errors}
            disableSubmit={true}
          />

*/

/*

  const updateErrors = () => {
    let newErrors = [];

    if (albumDetails.title.length === 0) newErrors.push("title");
    if (albumDetails.artists.length === 0) newErrors.push("artists");
    if (songs.length === 0) newErrors.push("songs");

    setErrors(newErrors);
  };
*/