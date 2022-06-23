import { useHistory } from 'react-router-dom';
import db from '../../firebase';
import { getUID } from '../../action';
import NewCalendarForm from './NewCalendarForm';


function NewCalendarPage() {
  //const history = useHistory();
  //const userUID = getUID(props);

  function addMeetupHandler(meetupData) {
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
      <h1>Add New Calendar Event</h1>
      <NewCalendarForm onAddMeetup={addMeetupHandler} />
    </section>
  );
}

export default NewCalendarPage;
