import { useHistory } from 'react-router-dom';
//import db from '../../firebase';
//import { getUID } from '../../action';
import NewToDoForm from './NewToDoForm';

function NewToDoPage(props) {
  const history = useHistory();
  console.log(props.userUID)

  function addToDoHandler(todoData) {
    console.log("sheesh")
    //add data to db
    /*
    return db.collection("TEST").doc(userUID).add({        
      TDLDB: {todoData}
    });
    */
    fetch(
      'https://the-last-coffee-default-rtdb.asia-southeast1.firebasedatabase.app/todolist.json',
      {
        method: 'POST',
        body: JSON.stringify(todoData),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ).then(() => {
      history.replace('/todolist');
    });
  }


  return (
    <section>
      <h1>Add New To Do Event</h1>
      <NewToDoForm onAddtodo={addToDoHandler} />
    </section>
  );
}


export default NewToDoPage;
