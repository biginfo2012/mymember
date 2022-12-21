import React, { useEffect } from "react";

import { Row, Col, Card, CardBody } from "reactstrap";

import "react-circular-progressbar/dist/styles.css";
import "../../assets/scss/pages/dashboard2.scss";
import StudentCountChart from "./studentCountChart";

import { useDispatch, useSelector } from "react-redux";
import {
  GET_SALES_STATE_ACTION,
  GET_TODAY_PAYMENT_DUE_ACTION,
  GET_WEEKLY_PAYMENT_DUE_ACTION,
  GET_MONTHLY_PAYMENT_DUE_ACTION,
} from "./../../redux/actions/dashboard2";

// Components
import StudentState from "./component/StudentState";
import ActiveTrial from "./component/ActiveTrial";
import Leads from "./component/Leads";
import MemberList from "./component/MemberList";
import Birthday from "./component/Birthday";
import MissUCall from "./component/MissUCall";
import Membership from "./component/Membership";
import MyTask from "./component/MyTask";
import Candidate from "./component/Candidate";
import {Grid} from "@material-ui/core";

const Dashboard2 = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GET_SALES_STATE_ACTION());
    dispatch(GET_TODAY_PAYMENT_DUE_ACTION());
    dispatch(GET_WEEKLY_PAYMENT_DUE_ACTION());
    dispatch(GET_MONTHLY_PAYMENT_DUE_ACTION());
  }, [dispatch]);

  const { saleState, paymentDueState } = useSelector(
    (state) => state.dashboard2
  );

  return (
    <>
      <Row className="mb-1">
        <Col xs="12" sm="6">
          <div className="section-title">Sales</div>
          <Grid container spacing={1}>
            <Grid item sm={4} md={4} lg={4}>
              <Card className="single-stat-card">
                <span className="mini-card-title">Today</span>
                <div className="mini-card-content">
                  <span className="mini-card-amt">{saleState.state.today}</span>
                  <button className="viewAllBtn">View All</button>
                </div>
              </Card>

            </Grid>
            <Grid item sm={4} md={4} lg={4}>
              <Card className="single-stat-card">
                <span>This Week</span>
                <div className="mini-card-content">
                  <span className="mini-card-amt">{saleState.state.weekly}</span>
                  <button className="viewAllBtn">View All</button>
                </div>
              </Card>

            </Grid>
            <Grid item sm={4} md={4} lg={4}>
              <Card className="single-stat-card">
                <span>This Month</span>
                <div className="mini-card-content">
                  <span className="mini-card-amt">{saleState.state.monthly}</span>
                  <button className="viewAllBtn">View All</button>
                </div>
              </Card>

            </Grid>
          </Grid>

        </Col>
        <Col xs="12" sm="6">
          <div className="section-title">Payment Due </div>
          <Grid container spacing={1}>
            <Grid item sm={4} md={4} lg={4}>
              <Card className="single-stat-card">
                <span className="mini-card-title">Today</span>
                <div className="mini-card-content">
                  <span className="mini-card-amt">{paymentDueState.today}</span>
                  <button className="viewAllBtn">View All</button>
                </div>
              </Card>
            </Grid>
            <Grid item sm={4} md={4} lg={4}>
              <Card className="single-stat-card">
                <span>This Week</span>
                <div className="mini-card-content">
                  <span className="mini-card-amt">{paymentDueState.weekly}</span>
                  <button className="viewAllBtn">View All</button>
                </div>
              </Card>
            </Grid>
            <Grid item sm={4} md={4} lg={4}>
              <Card className="single-stat-card">
                <span>This Month</span>
                <div className="mini-card-content">
                  <span className="mini-card-amt">{paymentDueState.month}</span>
                  <button className="viewAllBtn">View All</button>
                </div>
              </Card>
            </Grid>
          </Grid>
        </Col>
      </Row>
      <div className="second-row">
        <div className="second-row-left mr-10 mb-3">
          <div className="section-title">Student Statistics</div>
          <StudentState />
        </div>
        <div className="second-row-right mb-3">
          <div className="section-title">Student Count</div>
          <Card>
            <CardBody>
              <StudentCountChart />
            </CardBody>
          </Card>
        </div>
      </div>
      <div className="stat-row">
        <div className="left-stat">
          <ActiveTrial />
        </div>
        <div className="right-stat">
          <Leads />
        </div>
      </div>
      <div className="stat-row">
        <div className="left-stat">
          <MemberList />
        </div>
        <div className="right-stat">
          <Birthday />
        </div>
      </div>
      <div className="stat-row">
        <div className="left-stat">
          <MyTask />
        </div>
        <div className="right-stat">
          <MissUCall />
        </div>
      </div>
      <div className="stat-row">
        <div className="left-stat">
          <Membership />
        </div>
        <div className="right-stat">
          <Candidate />
        </div>
      </div>
    </>
  );
};

export default Dashboard2;
