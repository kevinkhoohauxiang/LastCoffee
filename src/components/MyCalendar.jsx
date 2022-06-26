import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import styled from "styled-components";
import Header from "./Header";
import db from "../firebase";
import { Link } from "react-router-dom";
import Calendar from "react-calendar/dist/umd/Calendar";
import CalendarList from "./calendar/CalendarList";
import Card from "./calendar/Card";
import classes from './calendar/NewCalendarForm.module.css';

const DUMMY_DATA = [
	{
		title: "FOW",
		startDate: "2022-06-28",
		startTime: "10:00",
		endDate: "2022-06-30",
		endTime: "22:00",
		description: "milestone 2 deadline"
	}
]

const Container = styled.div`
	max-width: 100%;
`;

const Content = styled.div`
	max-width: 1128px;
	margin: auto;
`;

const Section = styled.section`
	min-height: 50px;
	margin: 16px 0 -30px;
	box-sizing: content-box;
	text-align: center;
	text-decoration: underline;
	display: flex;
	justify-content: center;
	h5 {
		color: #0a66c2;
		font-size: 14px;
		margin-block-start: 0;
		margin-block-end: 0;
		a {
			font-weight: 700;
		}
	}
	p {
		font-size: 14px;
		color: #434649;
		margin-block-start: 0;
		margin-block-end: 0;
		font-weight: 600;
	}

	@media (max-width: 768px) {
		flex-direction: column;
		padding: 0 5px;
		margin: 16px 0;
	}
`;

const Layout = styled.div`
	display: grid;
	grid-template-areas: "left main right";
	grid-template-columns: minmax(0, 5fr) minmax(0, 12fr) minmax(300px, 7fr);
	column-gap: 25px;
	row-gap: 25px;
	margin: 25px 0;
	@media (max-width: 768px) {
		display: flex;
		flex-direction: column;
		padding: 0 5px;
	}
`;

class CalendarThings {

	constructor(description, end_date, start_date, title) {
		this.startDate = start_date; // date
		this.endDate = end_date ; // date
		this.description = description; // string
		this.title = title; // string
	}

	toString() {
        return this.startDate + ', ' + this.endDate + ', ' + this.description + ', ' + this.title;
    }
}

//home page upon signing in
function MyCalendar(props) {

	//const currDateInputRef = useRef();
	const [currDate, setcurrDate] = useState("");

	//const [isLoading, setIsLoading] = useState(true);
	const [loadedcalendarlist, setLoadedEvents] = useState([]);

	function SelectDate() {
		const currDateInputRef = useRef();
		//console.log(currDateInputRef)
		console.log(currDate)
		
	  
		function submitHandler(event) {
			event.preventDefault();
			const currDate1 = currDateInputRef.current.value;

			setcurrDate(currDate1)

			//console.log(currDate1)
			//console.log(currDate)
			//window.location.reload(false);
		}

		return (
		  <Card>
			<form className={classes.form} onSubmit={submitHandler}>
			  
			  <div className={classes.control}>
				<label htmlFor='currDate'>Calendar Event Start Date</label>
				<input type='date' required id='currDate' ref={currDateInputRef} />
			  </div>
			  
			  <div className={classes.actions}>
				<button>Select Date</button>
			  </div>
			</form>
		  </Card>
		);
	}

	useEffect(() => {
	  //setIsLoading(true);
	  fetch(
		'https://the-last-coffee-default-rtdb.asia-southeast1.firebasedatabase.app/Calendar.json'
	  )
		.then((response) => {
		  return response.json();
		})
		.then((data) => {
		  const calendars = [];
  
		  for (const key in data) { 
			const info = data[key];
			console.log(info.startDate)
			console.log(currDate)
			if (currDate == info.startDate) {
				const calendar = {
				id: key,
				...data[key]
				};
				calendars.push(calendar);
				};
		  }
  
		  //setIsLoading(false);
		  setLoadedEvents(calendars);
		});
	}, []);

	return (

		<Container>
			{!props.user && <Redirect to="/" />}
			<Header />
			<Section>
				<h5>
					<a>THIS IS MY CALENDAR</a>
				</h5>
					
			</Section>

			<button>
				<Link to="/createnewcalendar">
					<a href="/createnewcalendar">
					<span>Add new Calendar Event</span>
					</a>
				</Link>
			</button>

			<Calendar />

			<SelectDate />

			<CalendarList events={loadedcalendarlist} />

		</Container>
	);
}

const mapStateToProps = (state) => {
	return {
		user: state.userState.user,
	};
};

export default connect(mapStateToProps)(MyCalendar);
