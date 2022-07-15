import { useHistory } from "react-router-dom";
import EditProfileForm from "./EditProfileForm";
import db from "../../firebase";

function EditProfilePage(props) {
  const history = useHistory();
  const userUID = props.userUID;

  function addDataHandler(newData) {
    db.collection("DPDB")
      .doc(userUID)
      .set(newData)
      .then(() => {
        history.replace("/myprofile");
      });
  }

  return (
    <section>
      <EditProfileForm onAddData={addDataHandler} userUID={userUID} />
    </section>
  );
}

export default EditProfilePage;
