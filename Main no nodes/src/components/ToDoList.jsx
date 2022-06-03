import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import styled from "styled-components";
import Header from "./Header";
import Filter from "./todo src/components/ui/Filter";
import KeyStrokeHandler from "./todo src/components/wrappers/KeyStrokeHandler";
import StateProvider from "./todo src/components/wrappers/StateProvider";
import TodoItem from "./todo src/components/ui/TodoItem";
import Footer from "./todo src/components/ui/Footer";
import SearchBox from "./todo src/components/ui/SearchBox";
import KeyCode from 'keycode-js';
// import { compose, withState, withHandlers } from 'recompose';
// need to npm install recompose

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

//home page upon signing in
function ToDoList(props) {
	return (

		<Container>
			
			<Header />
			{!props.user && <Redirect to="/" />}
			<Content>
				<Section>
					<h5>
						<a>THIS IS TO DO LIST</a>
					</h5>
					
				</Section>

			</Content>

		</Container>
	);
}

const mapStateToProps = (state) => {
	return {
		user: state.userState.user,
	};
};

export default connect(mapStateToProps)(ToDoList);
