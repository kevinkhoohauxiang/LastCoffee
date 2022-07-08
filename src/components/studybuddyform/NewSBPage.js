import { useHistory } from "react-router-dom";
//import db from '../../firebase';
//import { getUID } from '../../action';
import NewSBForm from "./NewSBForm";

function NewSBPage(props) {
  const history = useHistory();
  const userUID = props.userUID;

  function addSBHandler(SBData) {
    console.log("sheesh");
    //add data to db
    /*
    return db.collection("TEST").doc(userUID).add({        
      TDLDB: {SBData}
    });
    */
    fetch(
      "https://the-last-coffee-default-rtdb.asia-southeast1.firebasedatabase.app/SB.json",
      {
        method: "POST",
        body: JSON.stringify(SBData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(() => {
      history.replace("/findstudybuddy");
    });
  }

  return (
    <section>
      <h1>Submit Request to Find Study Buddies</h1>
      <NewSBForm onAddSB={addSBHandler} userUID={userUID} />
    </section>
  );
}

export default NewSBPage;
