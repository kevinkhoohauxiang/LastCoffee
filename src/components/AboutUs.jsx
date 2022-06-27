import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import styled from "styled-components";
import Left from "./Left";
import Main from "./Main";
import Right from "./Right";
import Header from "./Header";
import ContactUsList from "./contactusform/ContactUsList";
import NewContactUsPage from "./contactusform/NewContactUsPage";

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

const Homepage = styled.div`
	display: flex;
	flex-flow: column nowrap;
	align-items: center;
	justify-content: space-evenly;
	background-color: white;
	width: 100%;
	margin-left: auto;
	margin-right: auto;

	h1 {
		font-size: 5rem;
		text-align: center;
		font-family: "Montserrat";
		line-height: 1em;
		font-weight: 600;
		margin-left: auto;
		margin-right: auto;
		margin-top: 30px;
		max-width: 53.125rem;
		margin-bottom: 30px;
	}

    h2 {
		font-size: 5rem;
		text-align: center;
		font-family: "Montserrat";
		line-height: 1em;
		font-weight: 600;
		margin-left: auto;
		margin-right: auto;
		margin-top: 30px;
		max-width: 53.125rem;
		margin-bottom: 30px;
	}

	p {
		font-size: 1.25rem;
		margin: 0;
		font-weight: lighter;
		line-height: 1.6em;
		letter-spacing: 0.01em;
		text-align: center;
		margin-bottom: 20px;
	}

	img {
	margin-top: 30px;
	width: 1100px; 
	height: 549px; 
	object-fit: cover;
	}

	button {
		border: 0.0625rem solid rgb(17, 109, 255);
		background-color: rgb(17, 109, 255);
		border-radius: 1.875rem;
		font-family: var(--main-text-font);
		width: 12.125rem;
		height: 3.5rem;
		cursor: pointer;
		color: #ffffff;
		font-size: 1.5rem;
		font-weight: 300;
		margin-top: 0.625rem;
		align-items: center;
	}
	  
`

//home page upon signing in
function AboutUs(props) {
    return (

        <Container>
           
            <Header />
            {!props.user && <Redirect to="/" />}
            <Content>
                <Homepage>
                    <h1>
                        <a>About Us</a>
                    </h1>
                    <p>
                        "The Last Coffee" is an Orbital Project founded by 2 Business Analytics Undergraduate from NUS, Zen and Kevin.
                        As students that have just completed our first year at NUS, we hoped to create a better and more enjoyable transition
                        for incoming freshies and current undergraduates by having an all-in-one student planner application that can function as both a tracker and a scheduler.
                    </p>
                    <p>
                        Our Motivation:
                        COVID-19 has reduced the chances for networking. Simultaneously, there are no online platforms that completely integrate
                        both the aspects of individual and communal learning, for example, a student planner that doubles as a networking channel.
                        Thus, we hope "The Last Coffee" can serve this purpose.
                    </p>
                    <p>
                        Objectives:
                        To allow students to have an all-in-one study application that encompasses the following
                        - to track and monitor their academic progress and connect them with like-minded students who wish to network
                    </p>

                    <h2>
                        Contact Us
                    </h2>
				</Homepage>

				<NewContactUsPage />

               
            </Content>
        </Container>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.userState.user,
    };
};

export default connect(mapStateToProps)(AboutUs);


