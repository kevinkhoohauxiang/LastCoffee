import { useHistory } from "react-router-dom";
import NewContactUsForm from "./NewContactUsForm";
import db from "../../firebase";

function NewContactUsPage(props) {
  const history = useHistory();
  const userUID = props.userUID;

  function addContactUsHandler(ContactUsData) {
    db.collection("ContactUsDB")
      .add(ContactUsData)
      .then(() => {
        history.replace("/aboutus");
      });
  }

  return (
    <section>
      <NewContactUsForm
        onAddContactUs={addContactUsHandler}
        userUID={userUID}
      />
    </section>
  );
}

export default NewContactUsPage;
