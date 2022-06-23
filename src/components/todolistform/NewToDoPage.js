import { useHistory } from 'react-router-dom';
import db from '../../firebase';
//import { getUID } from '../../action';
import NewToDoForm from './NewToDoForm';

function NewToDoPage(props) {
  const history = useHistory();
  //const userUID = props.user.UID;

  function addMeetupHandler(meetupData) {
    console.log("sheesh")
    //add data to db
    /*
    return db.collection("TEST").doc(userUID).add({        
      TDLDB: {meetupData}
    });
    */
    fetch(
      'https://the-last-coffee-default-rtdb.asia-southeast1.firebasedatabase.app/todolist.json',
      {
        method: 'POST',
        body: JSON.stringify(meetupData),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ).then(() => {
      history.replace('/');
    });
  }


  return (
    <section>
      <h1>Add New To Do Event</h1>
      <NewToDoForm onAddMeetup={addMeetupHandler} />
    </section>
  );
}


export default NewToDoPage;
