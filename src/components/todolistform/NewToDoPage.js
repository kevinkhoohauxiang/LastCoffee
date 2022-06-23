import { useHistory } from 'react-router-dom';
import db from '../../firebase';
import { getUID } from '../../action';
import NewToDoForm from './NewToDoForm';

function NewToDoPage() {
  //const history = useHistory();
  //const userUID = getUID(props);

  function addMeetupHandler(Data) {
    //add data to db
    /*
    db.collection("TEST").add({ 
      TDLDB: meetupData
    });
    */

    console.log("sheesh")
    
   
  }

  return (
    <section>
      <h1>Add New To Do Event</h1>
      <NewToDoForm onAddMeetup={addMeetupHandler} />
    </section>
  );
}

export default NewToDoPage;
