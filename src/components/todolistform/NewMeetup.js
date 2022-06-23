import { useHistory } from 'react-router-dom';
import NewMeetupForm from './NewMeetupForm';
import db from '../../firebase';
import { getUID } from '../../action';

function NewMeetupPage() {
  const history = useHistory();
  //const userUID = getUID(props);

  function addMeetupHandler(meetupData) {
    //add data to db
    /*
    db.collection("TEST").add({ 
      TDLDB: {meetupData}
    });
    */
  
  }

  return (
    <section>
      <h1>Add New Meetup</h1>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </section>
  );
}

export default NewMeetupPage;
