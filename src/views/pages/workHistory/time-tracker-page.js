import React from "react";
import ReactDOM from "react-dom";
import Chart from "react-google-charts";
import BasicTable from "./Table";
import { Card } from "@mui/material";
import { Col, Row } from "reactstrap";
import axios from "axios";
import TimeLineCard from "./TimeLine";
import { Grid } from "@material-ui/core";
import "../../../assets/scss/pages/dashboard2.scss";
import { Bar } from "react-chartjs-2";
import { useParams } from "react-router";

const mockDonutData = [
  {
    label: "Project 1",
    value: 6,
  },
  {
    label: "Project 2",
    value: 3,
  },
  {
    label: "Project 3",
    value: 1,
  },
];

// const base_url = "http://localhost:3001";
const base_url = "https://mymember.com";
const columns = [
  { type: "string", id: "Room" },
  { type: "string", id: "Name" },
  { type: "datetime", id: "Start" },
  { type: "datetime", id: "End" },
];

const donutColors = ["#000000", "#60b644", "#ff4361"];

const rows = [
  ["Magnolia Room", "", new Date(0, 0, 0, 0, 0, 0), new Date(0, 0, 0, 0, 0, 0)],
  [
    "Magnolia Room",
    "Project 1",
    new Date(0, 0, 0, 12, 0, 0),
    new Date(0, 0, 0, 13, 30, 0),
  ],
  [
    "Magnolia Room",
    "Project 2",
    new Date(0, 0, 0, 14, 0, 0),
    new Date(0, 0, 0, 15, 30, 0),
  ],
  [
    "Magnolia Room",
    "Project 1",
    new Date(0, 0, 0, 16, 0, 0),
    new Date(0, 0, 0, 17, 30, 0),
  ],
  [
    "Magnolia Room",
    "",
    new Date(0, 0, 0, 24, 0, 0),
    new Date(0, 0, 0, 24, 0, 0),
  ],
];
const data = [columns, ...rows];

const pieChartColumns = [
  { type: "string", id: "DailyReport" },
  { type: "number", id: "WorkPercent" },
];

export const options = {
  title: "Top projects",
};

export const donutData = [
  ["Task", "Hours per Day"],
  ["Project 1", 11],
  ["Project 2", 2],
  ["Project 3", 3],
];

export const donutOptions = {
  title: "Top projects",
  pieHole: 0.4,
  is3D: false,
};

const mockChartDataset = [3, 5, 7, 4, 3, 2, 1];
const mockLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const WorkHistoryPanel = (props) => {
  const [timelineData, setTimelineData] = React.useState([]);
  const [pieChartData, setPieChartData] = React.useState([]);
  const [tableData, setTableData] = React.useState([]);

  const [dailyOverview, setDailyOverview] = React.useState(0);
  const [weeklyOverview, setWeeklyOverview] = React.useState(0);
  const [monthlyOverview, setMonthlyOverview] = React.useState(0);
  const [workDays, setWorkDays] = React.useState(0);
  const [weeklyReport, setWeeklyReport] = React.useState([]);

  const { id } = useParams();

  React.useEffect(() => {
    async function initialize() {
      const response = await axios.get(`${base_url}/api/workhistory/${id}`);

      const overviewresponse = await axios.get(
        `${base_url}/api/workhistory/overview/${id}`
      );

      // const overviewresponse = {data: {}};

      setDailyOverview(overviewresponse.data.dailytime);
      setWeeklyOverview(overviewresponse.data.weeklyTime);
      setMonthlyOverview(overviewresponse.data.monthlytime);
      setWorkDays(overviewresponse.data.workDays);
      setWeeklyReport(overviewresponse.data.weeklyReport);

      const responseTimeline = [
        ["Shimiro", "", new Date(0, 0, 0, 0, 0, 0), new Date(0, 0, 0, 0, 0, 0)],
      ];
      let totalworktime = 0;
      setTableData(response.data);
      console.log("response is", response.data);
      const timelinedata = response.data.map((item) => {
        const start = new Date(item.startTime);
        const end = new Date(item.endTime);
        totalworktime += end - start;
        return { start, end };
      });
      setTimelineData(timelinedata);
      console.log("total work time is", totalworktime);
      const totalDaytime =
        new Date(0, 0, 0, 24, 0, 0) - new Date(0, 0, 0, 0, 0, 0);
      const currentTime = new Date();
      const remainingTime = 24*60 - currentTime.getHours() * 60 - currentTime.getMinutes();
      const restTime = 24*60 - remainingTime - overviewresponse.data.dailytime;

      setPieChartData([
        ["Task", "Hours per Day"],
        ["Work", overviewresponse.data.dailytime],
        ["Rest", restTime],
        ["Remaining", remainingTime],
      ]);
      responseTimeline.push([
        "Shimiro",
        "",
        new Date(0, 0, 0, 24, 0, 0),
        new Date(0, 0, 0, 24, 0, 0),
      ]);
      // setTimelineData([columns, ...responseTimeline]);
    }
    initialize();
  }, []);

  return (
    <div className="App" style={{ backgroundColor: "#f8f8f8" }}>
      <Col sm="12">
        <Row>
          <Col xs="12" sm="12">
            <div className="section-title">Overview</div>
            <Grid container spacing={1}>
              <Grid item sm={12} md={6} xl={3}>
                <Card className="single-stat-card">
                  <span className="mini-card-title">Today</span>
                  <div className="mini-card-content">
                    <span className="mini-card-amt">
                      {Math.floor(dailyOverview / 60)} hrs {dailyOverview % 60}{" "}
                      Mins
                    </span>
                    <button className="viewAllBtn">View All</button>
                  </div>
                </Card>
              </Grid>
              <Grid item sm={12} md={6} xl={3}>
                <Card className="single-stat-card">
                  <span>This Week</span>
                  <div className="mini-card-content">
                    <span className="mini-card-amt">
                      {Math.floor(weeklyOverview / 60)} hrs{" "}
                      {weeklyOverview % 60} Mins{" "}
                    </span>
                    <button className="viewAllBtn">View All</button>
                  </div>
                </Card>
              </Grid>
              <Grid item sm={12} md={6} xl={3}>
                <Card className="single-stat-card">
                  <span>This Month</span>
                  <div className="mini-card-content">
                    <span className="mini-card-amt">
                      {Math.floor(monthlyOverview / 60)} hrs{" "}
                      {monthlyOverview % 60} Mins
                    </span>
                    <button className="viewAllBtn">View All</button>
                  </div>
                </Card>
              </Grid>
              <Grid item sm={12} md={6} xl={3}>
                <Card className="single-stat-card">
                  <span>Total days worked</span>
                  <div className="mini-card-content">
                    <span className="mini-card-amt">{workDays} days</span>
                    <button className="viewAllBtn">View All</button>
                  </div>
                </Card>
              </Grid>
            </Grid>
          </Col>
        </Row>
        <Row>
          {/* {timelineData && timelineData.length && (
            <Chart
              chartType="Timeline"
              data={timelineData}
              width="100%"
              height="100px"
              controls={[
                {
                  controlType: "CategoryFilter",

                  options: {
                    filterColumnIndex: 1,
                  },
                  controlPosition: "bottom",
                },
              ]}
            />
          )} */}
          <TimeLineCard timelineData={timelineData} />
        </Row>
        <Row>
          <Col sm="6">
            <Card style={{ width: "100%" }}>
              <Chart
                chartType="PieChart"
                width="100%"
                height="400px"
                data={pieChartData}
                options={donutOptions}
              />
              {/* <DonutChart colors={donutColors} data={mockDonutData} /> */}
            </Card>
          </Col>
          <Col sm="6">
            <Card style={{ width: "100%", height: "400px", padding: "20px" }}>
              <Bar
                data={{
                  labels: mockLabels,
                  datasets: [
                    {
                      label: "Weekely minutes tracked",
                      data: weeklyReport,
                      backgroundColor: "#0184FF",
                      borderWidth: 1,
                      barThickness: 15,
                    },
                  ],
                }}
                height={230}
                width={1000}
                options={{
                  maintainAspectRatio: false,
                  responsive: true,
                  scales: {
                    yAxes: [
                      {
                        ticks: {
                          beginAtZero: true,
                        },
                      },
                    ],
                  },
                  legend: {
                    labels: {
                      padding: 20,
                      usePointStyle: true,
                      boxWidth: 8,
                    },
                  },
                }}
              />
            </Card>
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col sm="12">
            <BasicTable data={tableData} />
          </Col>
        </Row>
      </Col>
    </div>
  );
};
