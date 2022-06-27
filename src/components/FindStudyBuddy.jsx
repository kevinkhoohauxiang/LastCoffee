import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import styled from "styled-components";
import Main from "./Main";
import Header from "./Header";
import { Link } from "react-router-dom";
import SBList from "./studybuddyform/SBList";
import Left from "./Left";


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
	grid-template-areas: "left main";
	grid-template-columns: minmax(0, 5fr) minmax(0, 17fr);
	column-gap: 25px;
	row-gap: 25px;
	margin: 25px 0;
	@media (max-width: 768px) {
		display: flex;
		flex-direction: column;
		padding: 0 5px;
	}
`;

const HomePage = styled.div`
	display: flex;
	flex-flow: column nowrap;
	align-items: center;
	justify-content: space-evenly;
	background-color: white;
	width: 100%;
	margin-left: auto;
	margin-right: auto;
	
	button {
		border: 0.0625rem solid rgb(17, 109, 255);
		background-color: rgb(17, 109, 255);
		border-radius: 1.875rem;
		font-family: var(--main-text-font);
		width: 20rem;
		height: 3.5rem;
		cursor: pointer;
		color: #ffffff;
		font-size: 1.5rem;
		font-weight: 300;
		margin-top: 2rem;
		align-items: center;
		a:link { text-decoration: none; }

		a:visited { text-decoration: none; }

		a:hover { text-decoration: none; }

		a:active { text-decoration: none; }

		span {
			color: white;
			text-decoration: none; 
  		 	background-color: none;
		}
	}
	  
`

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
	
	const [loadedSBlist, setLoadedEvents] = useState([]);

  useEffect(() => {
    //setIsLoading(true);
    fetch(
      'https://the-last-coffee-default-rtdb.asia-southeast1.firebasedatabase.app/SB.json'
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const SBs = [];

		// we query and show only events which are not completed, aka .completed == false
        for (const key in data) {
			const tuple = data[key]
			//console.log(tuple.completed)
			if (!tuple.completed) {
				console.log('load')
				const SB = {
					id: key,
					...tuple
				};
			SBs.push(SB);
			} 
        }

        //setIsLoading(false);
        setLoadedEvents(SBs);
      });
  }, []);
	
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
				<HomePage>
					<button>
						<Link to="/findnewsb">
							<a href="/findnewsb">
							<span>Find Study Buddies!!! </span>
							</a>
						</Link>
					</button>
				</HomePage>

				<Layout>
					
					<Left />
					<SBList events={loadedSBlist} />
					
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
