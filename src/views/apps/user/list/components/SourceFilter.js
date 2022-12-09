import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { FILTER_LEAD_BY_SOURCE } from "../../../../../redux/actions/newstudent";
import { GET_LEADS_TRACKING } from "../../../../../redux/actions/member";
import { Box } from "@material-ui/core";
import MultiSourceSelector from "./multiSourceSelector";
import Button from "@mui/material/Button";

const SourceFilter = (props) => {
  const { FILTER_LEAD_BY_SOURCE, GET_LEADS_TRACKING, getLeadTrackingList } =
    props;
  const [date, setDate] = useState(dayjs());
  const [state, setState] = useState({
    modal: false,
    defaultAlert: false,
    isOpen: false,
    candidate: "",
    id: "",
    keyname: "",
  });
  const [studentinfo, setStudentInfo] = useState([]);

  useEffect(() => {
    GET_LEADS_TRACKING();
  }, [GET_LEADS_TRACKING]);

  useEffect(() => {}, [getLeadTrackingList]);

  const openSweetAlt = () => {
    setState({
      ...state,
      modal: !state.modal,
    });
  };

  const changeHandlerforleads = (value) => {
    let data = studentinfo;
    if (data.includes(value)) {
      let filteredState = data.filter((i) => i !== value);
      setStudentInfo(filteredState);
    } else {
      setStudentInfo([...studentinfo, value]);
    }
  };

  const handleFilter = () => {
    if (date !== "" && studentinfo.length > 0) {
      FILTER_LEAD_BY_SOURCE({
        leadFilter: studentinfo,
        year: date.year(),
        month: date.month() + 1,
      });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        width: "50%",
        margin: "0px",
        alignItems: "center",
        background: "#f8f8f8",
      }}
    >
      <Box
        sx={{
          width: "40%",
          padding: "5px",
          margin: "5px",
          background: "#fff",
          display: "flex-start",
        }}
      >
        <MultiSourceSelector
          getLeadTrackingList={getLeadTrackingList}
          studentinfo={studentinfo}
          openSweetAlt={openSweetAlt}
          isEdit={true}
          changeHandlerforleads={changeHandlerforleads}
        />
      </Box>
      <Box
        sx={{
          margin: "5px",
          width: "40%",
          padding: "5px",
          background: "#fff",
          display: "flex-start",
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            views={["year", "month"]}
            // label="Year and Month"
            minDate={dayjs("2018-03-01")}
            maxDate={dayjs("2030-06-01")}
            value={date}
            onChange={(newValue) => {
              setDate(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                helperText={null}
                sx={{
                  ".MuiInputBase-input": { padding: "10px" },
                }}
              />
            )}
          />
        </LocalizationProvider>
      </Box>
      <Box
        sx={{
          margin: "5px",
          width: "20%",
          padding: "5px",
          background: "#fff",
          display: "flex-start",
          borderRadius: "10px",
          textAlign: "center",
        }}
      >
        <Button
          onClick={handleFilter}
          sx={{ background: "#fff" }}
          size="medium"
        >
          submit
        </Button>
      </Box>
    </Box>
  );
};
const mapStateToProps = (state) => {
  return {
    listofStudentdata: state.student.listofStudentdata,
    getLeadTrackingList: state.member.getLeadTrackingList,
  };
};

export default connect(mapStateToProps, {
  FILTER_LEAD_BY_SOURCE,
  GET_LEADS_TRACKING,
})(SourceFilter);
