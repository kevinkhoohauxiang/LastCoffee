import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import styled from "styled-components";
import Header from "./Header";
import db from "../firebase";
import NewCalendarPage from "./calendar/NewCalendarPage";

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

	const [editorText, setEditorText] = useState("");
	const userUID = props.user.uid;
	const user = db.collection("TEST").doc(userUID);
	const CLDDB = user.get("CLDDB")
	const DPDB = user.get("DPDB")
	const HSDB= user.get("HSDB")
	const SBDB = user.get("SBDB")
	const TDLDB = user.get("TDLDB")

	const EventUpload = () => {

		//need to link front end to backend, upload the new name to the db and query it
		const handleEventUpload = () => {
			db.collection("TEST").doc(userUID).add({
				
			});
		}

		// events will be stored as arrays in the main array, TDLDB. aka arrays of events in the main array
		return (
			<div>
				<br/>
				<textarea value={editorText} onChange={(event) => setEditorText(event.target.value)} placeholder="Upload a calendar event!" autoFocus={true} />
				<button onClick = {handleEventUpload}>Upload Event</button>
				<br/>
			</div>
		);
	}



	return (
		

		<Container>
			{!props.user && <Redirect to="/" />}
			<Header />
			<Section>
				<h5>
					<a>THIS IS MY CALENDAR</a>
				</h5>
					
			</Section>

			<NewCalendarPage />
	


		</Container>
	);
}

const mapStateToProps = (state) => {
	return {
		user: state.userState.user,
	};
};

export default connect(mapStateToProps)(MyCalendar);
