import ContactUsItem from './ContactUsItem';
import classes from './ContactUsList.module.css';

function ContactUsList(props) {
  return (
    <ul className={classes.list}>
      {props.events.map((event) => (
        <ContactUsItem
          key={event.id}
          name={event.name}
          email={event.email}
          subject={event.subject}
          description={event.description}
        />
      ))}
    </ul>
  );
}

export default ContactUsList;
