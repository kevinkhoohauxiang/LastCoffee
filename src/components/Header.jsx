import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { signOutAPI } from "../action";
import { Link } from "react-router-dom";

const Container = styled.div`
  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  padding: 0 24px;
  position: sticky;
  top: 0;
  left: 0;
  /* width: 100vw; */
  z-index: 10;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  height: 100%;
  max-width: 800px;
`;

const Logo = styled.span`
  margin-left: -100px;
  margin-right: 100px;
  font-size: 0;
`;

const Nav = styled.nav`
  margin-left: auto;
  display: block;
  @media (max-width: 768px) {
    position: fixed;
    left: 0;
    bottom: 0;
    background: white;
    width: 100%;
  }
`;

const NavListWrap = styled.ul`
  display: flex;
  flex-wrap: nowrap;
  list-style-type: none;
  justify-content: space-between;
  .active {
    span::after {
      content: "";
      transform: scaleX(1);
      border-bottom: 2px solid var(--white, #fff);
      position: absolute;
      left: 0;
      bottom: 0;
      transition: transform 0.2s ease-in-out;
      width: 100%;
      border-color: rgba(0, 0, 0, 0.9);
    }
  }
`;

const NavList = styled.li`
  display: flex;
  align-items: center;
  a {
    align-items: center;
    background: transparent;
    display: flex;
    flex-direction: column;
    font-size: 12px;
    font-weight: 400;
    justify-content: center;
    line-height: 1.5;
    min-height: 52px;
    min-width: 100px;
    position: relative;
    text-decoration: none;
    span {
      color: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
      text-align: center;
    }
    @media (max-width: 768px) {
      min-width: 50px;
      font-size: 9px;
      span > img {
        width: 40%;
      }
    }
  }
  &:hover,
  &:active {
    a {
      span {
        color: rgba(0, 0, 0, 0.9);
      }
    }
  }
`;

const SignOut = styled.div`
  position: absolute;
  top: 45px;
  background: white;
  border-radius: 0 0 5px 5px;
  width: 100px;
  height: 40px;
  font-size: 16px;
  text-align: center;
  transition-duration: 167ms;
  display: none;
  z-index: 15;
`;

const User = styled(NavList)`
  a > img {
    border-radius: 50%;
    width: 40px;
    height: 40px;
  }
  span {
    display: flex;
    align-items: center;
  }
  &:hover {
    ${SignOut} {
      @media (min-width: 768px) {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
`;

const Work = styled(User)`
  border-left: 1px solid rgba(0, 0, 0, 0.08);
`;

function Header(props) {
  return (
    <Container>
      <Content>
        <Logo>
          <Link to="/home">
            <a href="/home">
              <img src="/images/lastcoffeelogo.svg" alt="" />
            </a>
          </Link>
        </Logo>

        {/* <Search>
					<div>
						<input type="text" placeholder="Search" />
					</div>
					<SearchIcon>
						<img src="/images/search-icon.svg" alt="" />
					</SearchIcon>
				</Search>
	*/}

        <Nav>
          <NavListWrap>
            <NavList>
              <Link to="/home">
                <a href="/home">
                  <img src="/images/Home.svg" alt="" />
                  <span>Home</span>
                </a>
              </Link>
            </NavList>
            <NavList>
              <Link to="/myprofile">
                <a href="/myprofile">
                  <img src="/images/Profile.svg" alt="" />
                  <span>My Profile</span>
                </a>
              </Link>
            </NavList>
            <NavList>
              <Link to="/mycalendar">
                <a href="/mycalendar">
                  <img src="/images/Calendar.svg" alt="" />
                  <span>My Calender</span>
                </a>
              </Link>
            </NavList>
            <NavList>
              <Link to="/todolist">
                <a href="/todolist">
                  <img src="/images/Todo.svg" alt="" />
                  <span>To-Do List</span>
                </a>
              </Link>
            </NavList>
            <NavList>
              <Link to="/studybuddies">
                <a href="/studybuddies">
                  <img src="/images/StudyBuddy.svg" alt="" />
                  <span>Study Buddies</span>
                </a>
              </Link>
            </NavList>

            <NavList>
              <Link to="/aboutus">
                <a href="/aboutus">
                  <img src="/images/abtus.svg" alt="" />
                  <span>About Us</span>
                </a>
              </Link>
            </NavList>

            <User>
              <a>
                {props.user && props.user.photoURL ? (
                  <img src="/images/LogOut.svg" alt="" />
                ) : (
                  <img src="/images/user.svg" alt="" />
                )}
                <span>Sign Out</span>
              </a>
              <SignOut onClick={() => props.signOut()}>
                <a>Sign Out</a>
              </SignOut>
            </User>
          </NavListWrap>
        </Nav>
      </Content>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOutAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
