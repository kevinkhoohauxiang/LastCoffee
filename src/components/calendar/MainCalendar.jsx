import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { getCalendarAPI, CalendarDeleteAPI } from "../../action";

const Container = styled.div`
  grid-area: main;
`;

const CommonBox = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;

const Article = styled(CommonBox)`
  padding: 0;
  margin: 0 0 8px;
  overflow: visible;
`;

const SocialActions = styled.div`
  display: center;
  align-items: center;
  justify-content: flex-start;
  margin: 4px 12px;
  min-height: 40px;
  padding-bottom: 5px;
  button {
    display: inline-flex;
    align-items: center;
    padding: 8px;
    border: none;
    background: transparent;
    span {
      margin-left: 4px;
      color: rgba(0, 0, 0, 0.6);
      font-size: 14px;
    }
  }
  button.active {
    span {
      color: #0a66c2;
      font-weight: 600;
    }
    svg {
      fill: #0a66c2;
    }
  }
`;

const Content = styled.div`
  text-align: center;
  & > img {
    width: 30px;
  }
`;

function MainCalendar(props) {
  const userUID = props.user.uid;

  useEffect(() => {
    props.getCalendar(userUID);
  }, []);

  function changeDeleteState(event, id) {
    event.preventDefault();
    props.calendarDelete(id);
  }

  return (
    <Container>
      <Content>
        {
          //console.log(props.articles)}
        }
        {props.loading && <img src="/images/spin-loader.gif" alt="" />}
        {props.calendars.length > 0 &&
          props.calendars.map((article, key) => (
            <Article key={key}>
              {
                //console.log(props.ids[key])}
              }
              <br />
              <h2>Title: {article.title}</h2>
              <h3>
                Start Date: {article.startDate} {article.startTime}
              </h3>
              <h3>
                End Date: {article.endDate} {article.endTime}
              </h3>

              <SocialActions>
                <img
                  src="/images/Deletebtn1.svg"
                  alt=""
                  onClick={(event) => changeDeleteState(event, props.ids[key])}
                />
              </SocialActions>
            </Article>
          ))}
      </Content>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
    loading: state.calendarState.loading,
    calendars: state.calendarState.calendars,
    ids: state.calendarState.ids,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getCalendar: (userUID) => dispatch(getCalendarAPI(userUID)),
  calendarDelete: (id) => dispatch(CalendarDeleteAPI(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainCalendar);
