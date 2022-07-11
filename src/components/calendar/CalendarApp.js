import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";
import "firebase/firestore";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const DUMMY_EVENTS = [
  {
    title: "Big Meeting",
    start: new Date(2022, 6, 10, 10, 0),
    end: new Date(2022, 6, 10, 14, 0),
  },
  {
    title: "Vacation",
    start: new Date(2022, 6, 7, 10, 0),
    end: new Date(2022, 6, 10, 14, 0),
  },
  {
    title: "Conference",
    start: new Date(2022, 6, 17, 8, 0),
    end: new Date(2022, 6, 17, 9, 0),
  },
  {
    title: "Orbital",
    start: new Date(2022, 6, 20, 0, 0),
    end: new Date(2022, 6, 23, 0, 0),
  },
];

function CalendarApp(props) {
  const events = props.events;

  return (
    <div className="App">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "50px" }}
      />
    </div>
  );
}

export default CalendarApp;
