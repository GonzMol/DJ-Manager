import ViewSetCSS from "./viewSet.module.css";
import SetDetails from "../../components/SetDetails/SetDetails";
import SongList from "../../components/SongList/SongList";

import useAxios from "../../api/useAxios";
import axios from "../../api/api";

import { useNavigate, useParams } from "react-router-dom";
import useAxiosFunction from "../../api/useAxiosFunction";
import { useEffect, useState } from "react";

export default function ViewSet() {
  let { id } = useParams();
  const navigate = useNavigate();

  const [clickedDelete, setClickedDelete] = useState(false);

  // response for deleting
  const {
    response: deleteRes,
    error: deleteError,
    loading: deleteLoading,
    axiosFetch,
  } = useAxiosFunction();

  // useEffect for clicking delete button
  useEffect(() => {
    if (deleteLoading) return;
    if (!clickedDelete) return;
    if (!deleteRes && !deleteError) return;
    if (deleteRes.success) {
      setClickedDelete(false);
      navigate("/sets");
    }

    // if unsuccessful, we will have error object.
    if (deleteError) {
      // error in post.
      const backendErrors = deleteError?.response?.data?.errors;
      let strs = [];
      for (let i = 0; i < backendErrors?.length; i++) {
        strs.push(backendErrors[i].msg);
      }
      strs = strs.join(" ");
      alert(strs);
      console.log(backendErrors);
    }
    // reset clickedAdd state
    setClickedDelete(false);
  }, [deleteRes, deleteError, deleteLoading, navigate, clickedDelete]);

  // clicking delete button
  const handleDeleteSubmit = async (e) => {
    e.preventDefault();
    setClickedDelete(true);
    // send DELETE request
    axiosFetch({
      axiosInstance: axios,
      method: "DELETE",
      url: "sets/" + id,
    });
  };

  // getting the specific dj set from api.
  const { response, error, loading } = useAxios({
    axiosInstance: axios,
    method: "GET",
    url: "sets/" + id,
  });

  if (loading && !response)
    return (
      <div className={ViewSetCSS.loading}>
        <div>Loading...</div>
      </div>
    );
  if (!loading && !response)
    return (
      <div className={ViewSetCSS.error}>
        <div>Error: No Data Found.</div>
      </div>
    );
  const djSet = response.data;
  const backendErrors = response?.errors;
  const success = response.success;

  // separating details and songs array.
  const details = {
    title: djSet.title,
    creator: djSet.creator,
    tags: djSet.tags,
  };
  const songs = djSet.songs;

  if (error) {
    console.log("Error: " + error.message);
  }

  if (!success && backendErrors) {
    for (let i = 0; i < backendErrors.length; i++) {
      console.log("Backend Error: " + backendErrors[i].msg);
    }
  }

  return (
    <div className={ViewSetCSS.container}>
      {djSet && <div className={ViewSetCSS.title}>{djSet.title}</div>}
      <div className={ViewSetCSS.contents}>
        <div className={ViewSetCSS.item}>
          {details && <SetDetails data={details} disabled={true} />}
          {songs && (
            <div className={ViewSetCSS.songContainer}>
              {" "}
              <SongList songs={songs} />{" "}
            </div>
          )}
        </div>
        <button
          className={ViewSetCSS["delete-btn"] + " " + ViewSetCSS.edit}
          onClick={handleDeleteSubmit}
        >
          Delete Set
        </button>
      </div>
    </div>
  );
}