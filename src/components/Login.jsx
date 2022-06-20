import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import styled from "styled-components";
import { signInAPI } from "../action";

const Container = styled.div`
	background-color: #fff;`;

const Nav = styled.nav`
	max-width: 1128px;
	margin: auto;
	padding: 12px 0 16px;
	display: flex;
	flex-wrap: nowrap;
	align-items: center;
	justify-content: space-between;
	position: relative;
	background-color: #fff;

	& > a {
		width: 130px;
		height: 70px;
		@media (max-width: 768px) {
			padding: 0 5px;
		}
	}
`;

const Join = styled.a`
	font-size: 16px;
	padding: 10px;
	text-decoration: none;
	border-radius: 5px;
	color: rgba(0, 0, 0, 0.6);
	margin-right: 8px;

	&:hover {
		background-color: rgba(0, 0, 0, 0.08);
		color: rgba(0, 0, 0, 1);
	}
`;

const SignIn = styled.a`
	box-shadow: inset 0 0 0 1px black;
	border-radius: 25px;
	color: black;
	font-size: 16px;
	font-weight: 600;
	transition-duration: 167ms;
	line-height: 40px;
	padding: 10px 25px;
	text-align: center;
	background-color: transparent;
	&:hover {
		background-color: rgba(0, 0, 0, 0.08);
		box-shadow: inset 0 0 0 2px grey;
	}
`;

const Section = styled.section`
	display: flex;
	background-color: #fff;
	flex-wrap: wrap;
	align-content: start;
	min-height: 700px;
	padding-bottom: 138px;
	padding-top: 40px;
	padding: 60px 0;
	position: relative;
	width: 100%;
	max-width: 1128px;
	align-items: center;
	margin: auto;
	@media (max-width: 768px) {
		min-height: 0;
	}
`;

const Hero = styled.div`
	width: 100%;
	h1 {
		padding-bottom: 0;
		width: 55%;
		font-size: 56px;
		color: black;
		font-weight: 200;
		line-height: 70px;
		background-color: #fff;
		@media (max-width: 768px) {
			text-align: center;
			width: 100%;
			font-size: 20px;
			line-height: 2;
		}
	}
	img {
		width: 700px;
		height: 570px;
		position: absolute;
		border-radius: 100px;
		bottom: 200px;
		right: -150px;
		@media (max-width: 768px) {
			border-radius: 100px;
			top: 230px;
			position: initial;
			width: initial;
			height: initial;
		}
	}
`;

const Form = styled.div`
	margin-top: 100px;
	width: 408px;
	background-color: #fff;
	@media (max-width: 768px) {
		margin: 20px auto 0;
	}
`;

const Google = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #fff;
	height: 56px;
	width: 100%;
	background-color: #fff;
	border-radius: 30px;
	box-shadow: inset 0 0 0 1px rgb(0 0 0 / 60%), inset 0 0 0 2px rgb(0 0 0 / 0%), inset 0 0 0 1px rgb(0 0 0 / 0);
	border: none;
	vertical-align: middle;
	transition-duration: 167ms;
	font-size: 20px;
	color: rgba(0, 0, 0, 0.6);
	z-index: 0;
	&:hover {
		background-color: rgba(207, 207, 207, 0.25);
		color: rgba(0, 0, 0, 0.75);
		box-shadow: inset 0 0 0 2px rgb(0 0 0 / 60%), inset 0 0 0 3px rgb(0 0 0 / 0%), inset 0 0 0 2px rgb(0 0 0 / 0);
	}
	img {
		margin-right: 25px;
	}
`;

function Login(props) {
	console.log(props.user);
	
	return (
		
		<Container>
			{props.user && <Redirect to="/home" />}
			
			<Nav>
				<a href="/">
					<img src="/images/lastcoffeelogo.svg" alt="" />
				</a>
				<div>
					<Join onClick={() => props.signIn()}>Join Now</Join>
					
					<SignIn onClick={() => props.signIn()}>Sign In</SignIn>
					
				</div>
			</Nav>
			<Section>
				<Hero>
					<h1>The Last Coffee: <br></br>Your Ultimate Study Companion</h1>
					<img src="/images/coffee.svg" alt="" />
				</Hero>
				<Form>
					<Google onClick={() => props.signIn()}>
						<img src="/images/google.svg" alt="" />
						Sign in with Google
					</Google>
				</Form>
				
			</Section>
			<Section>
				
			</Section>
		</Container>
	);
}

const mapStateToProps = (state) => {
	return {
		user: state.userState.user,
	};
};

const mapDispatchToProps = (dispatch) => ({
	signIn: () => dispatch(signInAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
