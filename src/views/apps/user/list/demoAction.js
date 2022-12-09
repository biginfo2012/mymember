import React, { useState, useRef } from "react";
import { Download, Phone, Trash2, X } from "react-feather";
import { Button } from "reactstrap";
import { connect } from "react-redux";
import MergeForm from "./MergeForm";
import CandidateModal from "./CandidateModal";
import { Row, Col } from "reactstrap";
import TestModal from "./TestModal";
import Grid from "@mui/material/Grid";

import {
  STUDENTS_REMOVE,
  GET_ACTIVE_STUDENT,
  GET_FILTER_STDUNET_BY_FIELD,
  GET_SERACH_STDUNET_BY_INTREST,
  GET_SERACH_STDUNET_BY_TYPE,
} from "../../../../redux/actions/newstudent";
import { GET_PROGRAM_LIST } from "../../../../redux/actions/programe";
import { GET_COUNT_OF_STUDENT_BY_TYPE } from "../../../../redux/actions/member";
import { GET_CANDIDATE_LIST } from "../../../../redux/actions/newstudent";
import { Link } from "react-router-dom";
import ConfirmationModal from "../../../../components/gloabal/confirmation";
import moment from "moment";
import { CSVLink } from "react-csv";
import LocalMallOutlinedIcon from "@material-ui/icons/LocalMallOutlined";
import AddIcon from "@material-ui/icons/Add";
import FloatingLabels from "../../../../views/pages/shop/testing/TestingMain";
import { Dialog, DialogContent } from "@material-ui/core";
import InputAutoComplete from "./components/autoComplete";

const ActionsOnStudent = (props) => {
  const {
    selectedRows,
    checkboxSelectionIds,
    GET_SERACH_STDUNET_BY_INTREST,
    GET_SERACH_STDUNET_BY_TYPE,
    clearSelect,
    GET_FILTER_STDUNET_BY_FIELD,
    programList,
    GET_PROGRAM_LIST,
    studentType,
    getDataBack,
    listofStudentdata,
  } = props;

  const [alertopen, setAlertOpen] = useState(false);
  const [csvData, setCsvData] = useState([]);
  const [openProductForm, setOpenProductForm] = useState(false);
  const [selectProgram, setSelectedProgram] = useState([]);
  const [FilterPayload, setFilterPayload] = useState({
    studentType: [studentType],
    program: [],
    current_rank_name: [],
    after_camp: [],
    membership_name: [],
    membership_type: [],
  });
  const csvLink = useRef();

  const ConFirmDelete = async () => {
    const res = await props.STUDENTS_REMOVE(checkboxSelectionIds);
    if (res) {
      clearSelect();
      props.GET_COUNT_OF_STUDENT_BY_TYPE();
      getDataBack();
    }
    setAlertOpen(false);
  };

  const handleCancel = () => {
    setAlertOpen(false);
  };
  const handleOpenProductForm = () => {
    setOpenProductForm(!openProductForm);
  };

  const HandleSearchingAll = async (e) => {
    const { value } = e.target;
    if (value.length > 2) {
      if (studentType === "camp" || studentType === "After School") {
        await GET_SERACH_STDUNET_BY_INTREST(value, studentType);
      } else {
        await GET_SERACH_STDUNET_BY_TYPE(value, studentType);
      }
    }
    if (value === "") {
      getDataBack();
    }
  };

  const getFilterValueFromList = (data, keyName) => {
    let filterResult = [];
    for (let item of data) {
      filterResult.push(item[keyName]);
    }
    return filterResult;
  };

  const handleSelectAutoComp = (e, newValue, name) => {
    let payload = FilterPayload;
    if (name === "programName") {
      setFilterPayload({
        ...FilterPayload,
        program: getFilterValueFromList(newValue, name),
      });
      payload["program"] = getFilterValueFromList(newValue, name);
      setSelectedProgram(newValue.map((i) => i?.program_rank || []));
    } else if (name === "rank_name") {
      payload["current_rank_name"] = getFilterValueFromList(newValue, name);
      setFilterPayload({
        ...FilterPayload,
        current_rank_name: getFilterValueFromList(newValue, name),
      });
    } else if (name === "membership_type") {
      payload["membership_type"] = getFilterValueFromList(newValue, name);
      setFilterPayload({
        ...FilterPayload,
        membership_type: getFilterValueFromList(newValue, "membership_type"),
      });
    } else if (name === "after_camp_category") {
      payload["after_camp"] = getFilterValueFromList(newValue, name);
      setFilterPayload({
        ...FilterPayload,
        after_camp: getFilterValueFromList(newValue, name),
      });
    }
    GET_FILTER_STDUNET_BY_FIELD(payload);
  };

  const formateDataForExport = () => {
    let csvlist = [];
    for (let row of listofStudentdata) {
      let item = {
        "Full Name": `${row?.firstName}  ${row?.lastName}`,
        DOB: moment(row?.dob).format("MM/DD/YYYY"),
        Age: row?.age,
        "Primary Phone": row?.primaryPhone,
        "Secondary Phone": row?.secondaryNumber,
        Email: row?.email,
        Status: row?.status?.toLowerCase() === "active" ? "Active" : "New",
        Program: row?.program,
        Rank: row?.rank_order,
        "Membership Type":
          row?.membership_details?.slice(-1)[0]?.membership_type ||
          row?.data?.membership_type ||
          "None",
        "Start Date": moment(row?.createdAt).format("MM/DD/YYYY"),
        "End Date": moment(
          row?.membership_details?.slice(-1)[0]?.expiry_date
        ).format("MM/DD/YYYY"),
        Rating: row?.rating,
        Tag: row?.after_camp?.join(),
        State: row?.state,
        Street: row?.street,
        Town: row?.town,
        "Zip Postal Code": row?.zipPostalCode,
        "Complete profile": `https://mymember.com/student-info/${row._id}`,
        Note: row?.notes,
      };

      csvlist.push(item);
    }
    setCsvData(csvlist);
  };

  const downloadCsv = async () => {
    await formateDataForExport();
    csvLink.current.link.click();
  };
  return (
    <React.Fragment>
      <div className="d-flex justify-content-between align-items-center w-100 datatableIcons">
        <div className="st-list pl-1">
          <h6 className="line-height-2">
            Total Members{" "}
            <span className="st-number">
              {props.listofStudentdata?.length || 0}
            </span>
          </h6>
        </div>
        <div className="list-icon d-flex justify-content-end">
          <div>
            <input
              className={`pl-1 login-input `}
              type="text"
              placeholder="Search for students..... "
              onChange={HandleSearchingAll}
              id="standard-basic"
              variant="standard"
            />
          </div>
          {checkboxSelectionIds?.length > 0 ? (
            <>
              <Button
                style={{ color: "#565656" }}
                className="btn-lg  btn waves-effect waves-danger"
                onClick={handleOpenProductForm}
              >
                <LocalMallOutlinedIcon size={20} />
                <br></br>
                Buy
              </Button>
              <Dialog
                fullWidth
                maxWidth="lg"
                open={openProductForm}
                onClose={handleOpenProductForm}
              >
                <div className="close-icon d-flex justify-content-end w-100">
                  <X
                    className="cursor-pointer m-1"
                    size={20}
                    onClick={handleOpenProductForm}
                  />
                </div>
                <DialogContent>
                  <FloatingLabels />
                </DialogContent>
              </Dialog>
            </>
          ) : (
            ""
          )}

          <Link to={`/data-list/add-new-student/${studentType}`}>
            <Button
              style={{ color: "#565656" }}
              className="btn-lg btn waves-effect waves-light"
            >
              <AddIcon size={30} />
              <br></br>
              Add
            </Button>
          </Link>
          <Button
            style={{ color: "#565656" }}
            className="btn-lg btn waves-effect waves-light"
          >
            <Phone size={20} />
            <br></br>
            Contact
          </Button>
          <CandidateModal
            selectedRows={selectedRows}
            clearSelect={clearSelect}
            gobackData={props.GET_CANDIDATE_LIST}
          />
          <TestModal
            checkboxSelectionIds={checkboxSelectionIds}
            getDataBack={props.getDataBack}
            clearSelect={props.clearSelect}
            onSelectionChanged={props.onSelectionChanged}
          />
          <MergeForm
            data={checkboxSelectionIds}
            isrecommendedOrregistered={"student"}
          />
          <Button
            onClick={downloadCsv}
            style={{ color: "#565656" }}
            className="btn-lg btn waves-effect waves-light"
          >
            <Download size={20} />
            <br></br>
            Export
          </Button>
          {checkboxSelectionIds.length > 0 ? (
            <Button
              style={{ color: "#565656" }}
              className="btn-lg btn waves-effect waves-light"
              onClick={() => {
                setAlertOpen(true);
              }}
            >
              <Trash2 size={20} />
              <br></br>
              Delete
            </Button>
          ) : (
            ""
          )}

          <Button
            style={{ color: "#565656" }}
            className="btn-lg btn waves-effect waves-light"
          >
            <br></br>
            Tag
          </Button>
          <Button
            style={{ color: "#565656" }}
            className="btn-lg btn waves-effect waves-light"
          >
            <br></br>
            Filter
          </Button>
        </div>
      </div>
      <ConfirmationModal
        primaryColor="#0483fd"
        secondaryColor="#fff"
        imagePath="/images/delete.png"
        open={alertopen}
        title="Delete Location?"
        onConfirm={ConFirmDelete}
        onCancel={handleCancel}
        onCancelButtonTitle={"Cancel"}
        contiunuebuttonTitle={"Delete"}
        description="  You won't be able to revert this!"
      />
      <CSVLink
        data={csvData}
        filename={studentType + "_StudentList.csv"}
        className="hidden"
        ref={csvLink}
        target="_blank"
      />

      {/* <Row className="justify-content-between">
        <Col xs="12" sm="6" className="d-flex justify-content-end">
          <Grid container spacing={1}>
            <Grid item sm={12} md={3} lg={3}>
              <InputAutoComplete
                labelName={"Program"}
                keyName="programName"
                data={programList || []}
                handleSelect={handleSelectAutoComp}
              />
            </Grid>
            <Grid item sm={12} md={3} lg={3}>
              <InputAutoComplete
                labelName={"Rank Name"}
                keyName="rank_name"
                data={selectProgram[0] || []}
                handleSelect={handleSelectAutoComp}
              />
            </Grid>

            <Grid item sm={12} md={3} lg={3}>
              <InputAutoComplete
                labelName={"Type"}
                keyName="membership_name"
                handleSelect={handleSelectAutoComp}
                data={memebeshipType}
              />
            </Grid>
            <Grid item sm={12} md={3} lg={3}>
              <InputAutoComplete
                labelName={"Tags"}
                keyName="after_camp_category"
                data={props.getAfterCamps || []}
                handleSelect={handleSelectAutoComp}
              />
            </Grid>
          </Grid>
        </Col>
      </Row> */}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    active_student: state.student.active_student,
    programList: state.program.programList,
    listofStudentdata: state.student.listofStudentdata,
  };
};

export default connect(mapStateToProps, {
  STUDENTS_REMOVE,
  GET_ACTIVE_STUDENT,
  GET_SERACH_STDUNET_BY_INTREST,
  GET_FILTER_STDUNET_BY_FIELD,
  GET_SERACH_STDUNET_BY_TYPE,
  GET_CANDIDATE_LIST,
  GET_PROGRAM_LIST,
  GET_COUNT_OF_STUDENT_BY_TYPE,
})(ActionsOnStudent);

const memebeshipType = [
  { membership_name: "Trial" },
  { membership_name: "Beginner" },
  { membership_name: "BBC" },
  { membership_name: "LC" },
  { membership_name: "IC" },
  { membership_name: "MC" },
  { membership_name: "After School" },
];
