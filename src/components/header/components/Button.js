import React from "react";
import "./Button.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { SignOutAPI } from "../../../action";

function Button(props) {
  return (
    <Link to="/signout">
      <button className="btn">
        <span>Sign Out</span>
      </button>
    </Link>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(SignOutAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Button);
