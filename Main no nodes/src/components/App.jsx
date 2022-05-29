import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import MyProfile from "./MyProfile";
import MyCalendar from "./MyCalendar";
import ToDoList from "./ToDoList";
import StudyBuddies from "./StudyBuddies";
import FindStudyBuddy from "./FindStudyBuddy";
import MyStudyBuddies from "./MyStudyBuddies";
import StudyBuddyNotifications from "./StudyBuddyNotifications";
import MyHistory from "./MyHistory";
import { useEffect } from "react";
import { getUserAuth } from "../action";
import { connect } from "react-redux";


function App(props) {
	useEffect(() => {
		props.getUserAuth();
	}, []);

	return (
		<div className="App">
			<Router>
				<Switch>
					<Route exact path="/">
						<Login />
					</Route>
					<Route path="/home">
						<Home />
					</Route>
					<Route path="/myprofile">
						<MyProfile />
					</Route>
					<Route path="/mycalendar">
						<MyCalendar />
					</Route>
					<Route path="/todolist">
						<ToDoList />
					</Route>
					<Route path="/studybuddies">
						<StudyBuddies />
					</Route>
					<Route path="/myhistory">
						<MyHistory />
					</Route>
					<Route path="/findstudybuddy">
						<FindStudyBuddy />
					</Route>
					<Route path="/mystudybuddies">
						<MyStudyBuddies />
					</Route>
					<Route path="/studybuddynotifications">
						<StudyBuddyNotifications />
					</Route>

				</Switch>
			</Router>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch) => ({
	getUserAuth: () => dispatch(getUserAuth()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
