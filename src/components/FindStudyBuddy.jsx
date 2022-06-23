import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import styled from "styled-components";
import Main from "./Main";
import Header from "./Header";
import {BrowserRouter as Router} from "react-router-dom";
import db from "../firebase";


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

class StudyBuddiesThing {

	constructor(modules, description, gender, info, location, num_buddies, study_timing, title) {
		this.modules = modules; // array of strings
		this.gender = gender; // string -- male, female, no preference
		this.info = info ; // String
		this.location = location; // string
		this.title = title; // string
		this.description = description; // string
		this.numBuddies = num_buddies; // number
		this.studyTiming = study_timing; // string
	}

	toString() {
        return this.title + ', ' 
			+ this.description + ', '
			+ this.modules + ', ' 
			+ this.gender + ', ' 
			+ this.info + ', ' 
			+ this.location + ', ' 
			+ this.numBuddies + ', ' 
			+ this.studyTiming;
    }
}

const initState = {
	name: "",
	type: "Volunteer",
	email: "",
	startDate: new Date(),
	timeDay: "",
	age: "",
	listingTitle: "",
	description: "",
  };

//home page upon signing in
function FindStudyBuddy(props) {
	const userUID = props.user.uid;
	
	const DPupload = (props) => {

		const [loading, setLoading] = useState(false);
		const [jobDetails, setJobDetails] = useState(initState);
		const [startDate, setStartDate] = useState(new Date());

		const handleChange = (e) => {
			setJobDetails((oldState) => ({
			...oldState,
			[e.target.name]: e.target.value,
			}));
		};

		const handleDateChange = (date) => {
			setStartDate(date);
			setJobDetails((oldState) => ({
			...oldState,
			startDate: startDate,
			}));
		}; 

		const handleSubmit = async () => {
			setLoading(true);
			await props.PostJob(jobDetails);
			closeModal();
			Router.reload(window.location.pathname);
		};

		const closeModal = () => {
			setJobDetails(initState);
			setLoading(false);
			props.closeJobModal();
		};

		
        db.collection("TEST").doc(userUID).set({      
            CLDDB: {},
            DPDB: {},
            HSDB: {},
            SBDB: {},
            TDLDB: {}
        }
    );
	}

	return (

		<Container>
			
			<Header />
			{!props.user && <Redirect to="/" />}
			<Content>
				<Section>
					<h5>
						<a>THIS IS FIND STUDY BUDDY</a>
					</h5>
				
				</Section>
				<Layout>
					
					<Main />
					
				</Layout>
			</Content>
		</Container>
	);
}

const mapStateToProps = (state) => {
	return {
		user: state.userState.user,
	};
};

export default connect(mapStateToProps)(FindStudyBuddy);
