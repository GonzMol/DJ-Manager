import { useEffect, useState } from "react";
import NewSetCSS from "./newSet.module.css";
import SetDetails from "../../components/SetDetails/SetDetails";
import AddSongListBar from "./AddSongListBar";
import SongDndList from "./SongDndList";
import ViewAlbumCSS from "../view-album/viewAlbum.module.css";
import Popup from "../../components/Popup/Popup";
import EditSetDetailsPopupContent from "../../components/EditSetDetailsPopupContent/EditSetDetailsPopupContent";

import useAxios from "../../api/useAxios";
import axios from "../../api/api";
import useAxiosFunction from "../../api/useAxiosFunction";
import { useNavigate } from "react-router-dom";

const NewSet = () => {
  const navigate = useNavigate();

  // state for form.
  const [setDetails, setSetDetails] = useState({
    title: "",
    creator: "",
    tags: [],
  });
  // song list state.
  const [songs, setSongs] = useState([]);

  // state for publish set click of button
  const [clickedPublish, setClickedPublish] = useState(false);

  // fetch song library
  const {
    response: libRes,
    error: libError,
    loading: libLoading,
  } = useAxios({
    axiosInstance: axios,
    method: "GET",
    url: "songs/search",
  });

  // publish dj set button request and data.
  const {
    response: publishSetRes,
    error: publishSetError,
    loading: publishSetLoading,
    axiosFetch,
  } = useAxiosFunction();

  useEffect(() => {
    // stuff for publish dj set. navigate to set library on success, printing errors etc.
    if (publishSetLoading) return;
    if (!clickedPublish) return;
    if (!publishSetRes && !publishSetError) return;
    // check for errors after post request was sent.
    if (publishSetRes?.success) {
      setClickedPublish(false);
      // successful post
      navigate("/sets");
    }

    // if unsuccessful, we will have error object
    if (publishSetError) {
      console.log(publishSetError);
      const backendErrors = publishSetError?.response?.data?.errors;
      let strs = [];
      for (let i = 0; i < backendErrors?.length; i++) {
        strs.push(backendErrors[i]?.msg);
      }
      strs = strs.join(" ");
      alert(strs);
    }
    // reset clickedPublish state
    setClickedPublish(false);
  }, [
    publishSetLoading,
    publishSetError,
    publishSetRes,
    clickedPublish,
    navigate,
  ]);

  // publish dj set button submit function
  const handlePublish = async (event) => {
    event.preventDefault();
    setClickedPublish(true);

    // making song id array
    let songIdArray = [];
    for (let i = 0; i < songs.length; i++) {
      songIdArray.push(songs[i]._id);
    }
    // making dj set object for POST request.
    let djSet = {
      ...setDetails,
      songs: songIdArray,
    };
    // need to set is_published status.
    djSet.is_published = true;
    // send POST request.
    axiosFetch({
      axiosInstance: axios,
      method: "POST",
      url: "sets",
      data: djSet,
    });
  };

  if (!libRes && libLoading) 
  {
    return <div className={NewSetCSS.loading}>
        <div>Loading...</div>
    </div>;
  }
  if (!libRes && !libLoading) {
    // could not load song library, most likely a network error.
    <div className={NewSetCSS.error}>
        <div>Error: No Data Found.</div>
      </div>
  }
  // storing data for song library in variables.
  const songLibrary = libRes?.data;
  const libBackendErrors = libRes?.errors;
  const libSuccess = libRes?.success;
  // function for updating state from child components
  const updateSetDetails = (n) => {
    setSetDetails({
      title: setDetails.title,
      creator: setDetails.creator,
      tags: n.tags,
    });
  };

  // function for updating state from child components
  const updateTitle = (n) => {
    setSetDetails({
      title: n,
      creator: setDetails.creator,
      tags: setDetails.tags,
    });
  };

  // function for updating state from child components
  const updateCreator = (n) => {
    setSetDetails({
      title: setDetails.title,
      creator: n,
      tags: setDetails.tags,
    });
  };

  // adds a song to the draggable list
  const addSongToList = (newSong) => {
    let list = [...songs];
    list.push(newSong);
    setSongs(list);
  };

  const deleteSongFromList = (songToDelete) => {
    let list = [...songs];
    let filteredList = list.filter((song) => {
      return song._id !== songToDelete._id;
    });
    setSongs(filteredList);
  };

  // function to log errors from a request
  const logErrors = (success, error, backendErrors) => {
    // errors from frontend or errors in fetching data.
    if (error) {
      console.log("Error: " + error.message);
    }

    // checks for fetching data
    if (!success && backendErrors) {
      for (let i = 0; i < backendErrors.length; i++) {
        console.log("Backend Error: " + backendErrors[i].msg);
      }
    }
  };

  // log errors from getting song library
  logErrors(libSuccess, libError, libBackendErrors);

  return libLoading ? (
    <div></div>
  ) : (
    <div className={ViewAlbumCSS.container}>
      <div className={ViewAlbumCSS.title}>
        {setDetails.title === "" ? "New DJ Set" : setDetails.title}
      </div>
      <div className={ViewAlbumCSS.contents}>
        <div className={ViewAlbumCSS.item}>
          <div className={ViewAlbumCSS.detailsContainer}>
            <SetDetails
              data={setDetails}
              setTitle={updateTitle}
              setCreator={updateCreator}
              disabled={false}
            />
            <Popup
              PopupContent={<EditSetDetailsPopupContent />}
              modifyData={updateSetDetails}
              openText="Edit Details"
              styleClass={"editDetails"}
            />
          </div>
          {songLibrary && (
            <AddSongListBar
              options={songLibrary}
              addSongToList={addSongToList}
              songs={songs}
            />
          )}
          {songs.length !== 0 ? (
            <SongDndList
              songs={songs}
              setSongs={setSongs}
              deleteSong={deleteSongFromList}
            />
          ) : (
            <div className={NewSetCSS.noSongs}>
              <p>No Songs currently in List.</p>
            </div>
          )}
          <div className={NewSetCSS.submit}>
            <button onClick={handlePublish}>Publish</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NewSet;
