import ItemGrid from "../../components/ItemGrid/ItemGrid";
import AddItem from "../../components/AddItem/AddItem";
import GridDisplayCSS from "../album-library/albumLibrary.module.css";
import useAxios from "../../api/useAxios";
import axios from "../../api/api";

export default function SetLibrary() {
  const { response, error, loading } = useAxios({
    axiosInstance: axios,
    method: "GET",
    url: "sets",
  });
  const sets = response?.data;
  const backendErrors = response?.errors;
  const success = response?.success;

  if (error) {
    console.log("Error: " + error.message);
  }
  if (!success && backendErrors) {
    for (let i = 0; i < backendErrors.length; i++) {
      console.log("Backend Error: " + backendErrors[i].msg);
    }
  }

  return (
    <>
      <h1 className={GridDisplayCSS.gridTitle}>My Sets</h1>
      <>
        {<ItemGrid items={sets ? sets : []} baseDir={"../view-set"} response = {response} loading = {loading}/>}
        <AddItem title={"DJ Set"} link={"/new-set"} />
      </>
    </>
  );
}
