//import { useContext } from 'react';
import Card from './Card';
import classes from './ContactUsItem.module.css';


function ContactUsItem(props) {

  /*
  const mPostReference = FirebaseDatabase.getInstance().getReference()
                        .child("quotes").child(mPostKey);
                mPostReference.removeValue();
  */

  

  return (
    <li className={classes.item}>
      <Card>
        
        <div className={classes.content}>
          <h3>{props.name}</h3>
        </div>
        
        
      </Card>
    </li>
  );
}

export default ContactUsItem;
