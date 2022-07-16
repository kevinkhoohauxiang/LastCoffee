import { useHistory } from "react-router-dom";
import SearchSBForm from "./SearchSBForm";
import db from "../../../firebase";

function SearchSBPage(props) {
  const history = useHistory();
  const userUID = props.userUID;

  function addDataHandler(newData) {
    db.collection("SB Searches")
      .doc(userUID)
      .set(newData)
      .then(() => {
        history.replace("/searchedSB");
      });
  }

  return (
    <section>
      <SearchSBForm onAddData={addDataHandler} userUID={userUID} />
    </section>
  );
}

export default SearchSBPage;
