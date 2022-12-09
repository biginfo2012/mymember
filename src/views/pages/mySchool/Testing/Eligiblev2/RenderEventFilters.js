import React, { useState } from "react";
import { Row, Col, FormGroup, Label, Input } from "reactstrap";
// import TestTabs from "../../../../apps/user/list/TestTabs";
import { MenuItem, Select, } from "@material-ui/core";
// import { CircularProgressbar } from "react-circular-progressbar";
// import { buildStyles } from "react-circular-progressbar";
// import moment from "moment";
import { Link } from 'react-router-dom'
// import SelectBox from "../../../../../components/@vuexy/SelectBox/SelectBox";
// import DateField from "../../../../../components/@vuexy/DateField/DateField";
import SearchIcon from "@material-ui/icons/Search";
import moment from "moment";

import { connect } from "react-redux";
import { FETCH_EVENTS } from "../../../../../redux/actions/test";
const Months = {
  "January": 1,
  "February": 2,
  "March": 3,
  "April": 4,
  "May": 5,
  "June": 6,
  "July": 7,
  "August": 8,
  "September": 9,
  "October": 10,
  "November": 11,
  "December": 12,
}
const RenderEventFilters = ({ setMonth, Month, FETCH_EVENTS, setloading }) => {
  const [currentYear, setcurrentYear] = useState(new Date().getFullYear())

  const handleChange = async (e) => {
    await setloading(true)
    const date = await moment(` ${e.target.value + 1} ,01 ${currentYear}`).format('MM-DD-YYYY')
    await setMonth(date)
    const data = await FETCH_EVENTS(date)
    if (data) {
      await setloading(false)
    }
  }
  const handleChangeYear = async (e) => {
    await setloading(true)
    const date = await moment(` ${Months[moment(Month).format("MMMM")]} ,01 ${e.target.value}`).format('MM-DD-YYYY')
    await setcurrentYear(e.target.value)
    const data = await FETCH_EVENTS(date)
    if (data) {
      await setloading(false)
    }
  }
  const [years] = useState(() => {
    let data = [];
    let currentYear = new Date().getFullYear();
    for (let i = 1; i < 10; i++) {
      data.push(currentYear + i);
    }
    return [currentYear, ...data];
  });
  return (
    <div className="mt-2">
      <Row>
        <Col sm={5} md={5} lg={5}>
          <div className="d-flex align-items-center">
            <div id="date-filed" style={{ position: "relative" }}>
              <input
                placeholder="Search Event"
                className="form-control"
                type="text"
              />
              <SearchIcon
                style={{
                  color: "#a2a2a2",
                  fontSize: "20px",
                  position: "absolute",
                  top: 10,
                  right: 10,
                }}
              />
            </div>
            <div className="months">
              <Select
                className="ml-1"
                variant="outlined"
                onChange={handleChange}
                value={Months[moment(Month).format("MMMM")] - 1}
                style={{
                  border: '1px solid #ced4da',
                  background: "white"
                }}>

                {Object.entries(Months).map((key, value) => {
                  return (
                    <MenuItem key={key} value={value}>
                      {key[0]}
                    </MenuItem>
                  )
                })}
              </Select>

            </div>
            <div className="years">
              <Select
                className="ml-1"
                variant="outlined"
                onChange={handleChangeYear}
                value={currentYear}
                style={{
                  border: '1px solid #ced4da',
                  background: "white"
                }}>

                {years?.map((key) => {
                  return (
                    <MenuItem
                      key={key} value={key}>
                      {key}
                    </MenuItem>
                  )
                })}
              </Select>
            </div>
          </div>
        </Col>
        <Col sm={7} md={7} lg={7}>
          <div className="d-flex justify-content-end align-items-center">
            <div className="mr-2" style={{ width: "150px" }}>
              {/* <SelectBox
                options={[{ label: "Program", value: "Program" }]}
                optionKey="value"
                optionValue="value"
                optionName="label"
                // onChange={(e) => setUnit(e)}
                selected={"Program"}
              /> */}

            </div>
            <div className="mr-2" style={{ width: "150px" }}>
              {/* <SelectBox
                options={[{ label: "Type", value: "Type" }]}
                optionKey="value"
                optionValue="value"
                optionName="label"
                // onChange={(e) => setUnit(e)}
                selected={"Type"}
              /> */}
            </div>
            <div className="mr-2" style={{ width: "150px" }}>
              {/* <SelectBox
                options={[{ label: "Tags", value: "tags" }]}
                optionKey="value"
                optionValue="value"
                optionName="label"
                // onChange={(e) => setUnit(e)}
                selected={"Tags"}
              /> */}
            </div>
            <Link
              className="member_primary_btn_style btn btn-primary"
              to="/app/event/Create/0"
            >
              Create Event
            </Link>
          </div>
        </Col>
      </Row>
    </div>
  );
};


export default connect(null, { FETCH_EVENTS })(RenderEventFilters)
