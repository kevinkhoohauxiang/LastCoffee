import { useHistory } from "react-router-dom";
import NewContactUsForm from "./NewContactUsForm";

function NewContactUsPage(props) {
  const history = useHistory();
  const userUID = props.userUID;

  function addContactUsHandler(ContactUsData) {
    console.log("sheesh");
    //add data to db
    /*
    return db.collection("TEST").doc(userUID).add({        
      TDLDB: {ContactUsData}
    });
    */
    fetch(
      "https://the-last-coffee-default-rtdb.asia-southeast1.firebasedatabase.app/ContactUs.json",
      {
        method: "POST",
        body: JSON.stringify(ContactUsData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(() => {
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
