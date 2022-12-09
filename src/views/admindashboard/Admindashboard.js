import Memberstaticchart from './Memberstaticchart'
import React, { useEffect } from "react";
import "react-circular-progressbar/dist/styles.css";
import "./index.scss"
import { Row, Col, Card } from "reactstrap";
import { Grid } from '@mui/material';
import Memberstatics from './Memberstatics';
import Incomstatic from './Incomstatic';
import Rankstatics from './Rankstatics';
import Retentionstatus from './Retentionstatus';
import { GET_MEMBER_STATISTICS } from '../../redux/actions/admin/adminDashboard';
import { connect } from 'react-redux';


const Admindashboard = (props) => {

  return (
    <>
      <div className="section-title">General</div>
      <Row className="mb-1">
        <Col xs="12" sm="4">
          <div className="section-title">New</div>
          <Grid container spacing={1}>
            <Grid item sm={6} md={6} lg={6}>
              <Card className="single-stat-card">
                <span>This Month</span>
                <div className="mini-card-content">
                  <span className="mini-card-amt">{100}</span>
                  <button className="viewAllBtn">View All</button>
                </div>
              </Card>
            </Grid>
            <Grid item sm={6} md={6} lg={6}>
              <Card className="single-stat-card">
                <span>This Week</span>
                <div className="mini-card-content">
                  <span className="mini-card-amt">{100}</span>
                  <button className="viewAllBtn">View All</button>
                </div>
              </Card>
            </Grid>
          </Grid>
        </Col>
        <Col xs="12" sm="4">
          <div className="section-title">Lost</div>
          <Grid container spacing={1}>
            <Grid item sm={6} md={6} lg={6}>
              <Card className="single-stat-card">
                <span>This Month</span>
                <div className="mini-card-content">
                  <span className="mini-card-amt">{100}</span>
                  <button className="viewAllBtn">View All</button>
                </div>
              </Card>
            </Grid>
            <Grid item sm={6} md={6} lg={6}>
              <Card className="single-stat-card">
                <span>This Week</span>
                <div className="mini-card-content">
                  <span className="mini-card-amt">{100}</span>
                  <button className="viewAllBtn">View All</button>
                </div>
              </Card>
            </Grid>
          </Grid>
        </Col>
        <Col xs="12" sm="4">
          <div className="section-title">Leads</div>
          <Grid container spacing={1}>
            <Grid item sm={6} md={6} lg={6}>
              <Card className="single-stat-card">
                <span>Lead This Month</span>
                <div className="mini-card-content">
                  <span className="mini-card-amt">{100}</span>
                  <button className="viewAllBtn">View All</button>
                </div>
              </Card>
            </Grid>
            <Grid item sm={6} md={6} lg={6}>
              <Card className="single-stat-card">
                <span>Lead This Week</span>
                <div className="mini-card-content">
                  <span className="mini-card-amt">{100}</span>
                  <button className="viewAllBtn">View All</button>
                </div>
              </Card>
            </Grid>
          </Grid>
        </Col>
      </Row>
      <div className="second-row">
        <div className="second-row-left mr-10 mb-3">
          <div className='section-title'>
            Organization Statistics
          </div>
          <div className="single-stat-card mb-1">
            <span className="mini-card-title">Locations</span>
            <div className="mini-card-content">
              <span className="mini-card-amt">{0}</span>
              <button className="viewAllBtn">View All</button>
            </div>
          </div>
          <div className="single-stat-card mb-1">
            <span>Members</span>
            <div className="mini-card-content">
              <span className="mini-card-amt">{0}</span>
              <button className="viewAllBtn">View All</button>
            </div>
          </div>
          <div className="single-stat-card">
            <span>N/A</span>
            <div className="mini-card-content">
              <span className="mini-card-amt">{0}</span>
              <button className="viewAllBtn">View All</button>
            </div>
          </div>
        </div>
        <div className="second-row-right mb-3">
          <div className='section-title'>
            Member Statistics
          </div>
          <Memberstaticchart />
        </div>
      </div>
      <div className="stat-row">
        <div className="left-stat">
          <Memberstatics />
        </div>
        <div className="right-stat">
          <Incomstatic />
        </div>
      </div>
      <div className="stat-row">
        <div className="left-stat">
          <Retentionstatus />
        </div>
      </div>
      <div className="w-100%">
        <Rankstatics />
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    memberStatistic: state.adminEmailsReducer.memberStatistic,
  };
};
export default connect(mapStateToProps, {})(Admindashboard);
