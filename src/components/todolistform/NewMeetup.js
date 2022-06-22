import { useHistory } from 'react-router-dom';
import NewMeetupForm from './NewMeetupForm';

function NewMeetupPage() {
  const history = useHistory();

  function addMeetupHandler(meetupData) {
    //add data to db
  }

  return (
    <section>
      <h1>Add New Meetup</h1>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </section>
  );
}

export default NewMeetupPage;
