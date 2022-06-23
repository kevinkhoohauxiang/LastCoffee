import { useHistory } from 'react-router-dom';
import db from '../../firebase';
import { getUID } from '../../action';
import NewCalendarForm from './NewCalendarForm';


function NewCalendarPage() {
  const history = useHistory();
  //const userUID = getUID(props);

  function addCalendarHandler(meetupData) {
    //add data to db
    /*
    db.collection("TEST").add({ 
      TDLDB: meetupData
    });
    */

    console.log("sheesh")
    fetch(
      'https://the-last-coffee-default-rtdb.asia-southeast1.firebasedatabase.app/calendar.json',
      {
        method: 'POST',
        body: JSON.stringify(meetupData),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ).then(() => {
      history.replace('/mycalendar');
    });
  }
    
   
  

  return (
    <section>
      <h1>Add New Calendar Event</h1>
      <NewCalendarForm onAddMeetup={addCalendarHandler} />
    </section>
  );
}

export default NewCalendarPage;
