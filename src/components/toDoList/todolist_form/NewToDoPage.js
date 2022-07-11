import { useHistory } from "react-router-dom";
import db from "../../../firebase";
import NewToDoForm from "./NewToDoForm";

function NewToDoPage(props) {
  const history = useHistory();
  const userUID = props.userUID;

  function addToDoHandler(todoData) {
    db.collection("TDLDB")
      .add(todoData)
      .then(() => {
        history.replace("/todolist");
      });
  }

  return (
    <section>
      <h1>Add New To Do Event</h1>
      <NewToDoForm onAddtodo={addToDoHandler} userUID={userUID} />
    </section>
  );
}

export default NewToDoPage;
