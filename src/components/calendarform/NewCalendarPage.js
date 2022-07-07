import { useHistory } from 'react-router-dom';
import NewCalendarForm from './NewCalendarForm';

function NewCalendarPage(props) {
  const history = useHistory();
  //const userUID = props.user.UID;

  function addCalendarHandler(CalendarData) {
    console.log("sheesh")
    //add data to db
    /*
    return db.collection("TEST").doc(userUID).add({        
      TDLDB: {CalendarData}
    });
    */
    fetch(
      'https://the-last-coffee-default-rtdb.asia-southeast1.firebasedatabase.app/Calendar.json',
      {
        method: 'POST',
        body: JSON.stringify(CalendarData),
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
      <NewCalendarForm onAddCalendar={addCalendarHandler} />
    </section>
  );
}


export default NewCalendarPage;
