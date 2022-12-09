import React, { useState } from "react";
import { Grid, Typography, Select, MenuItem } from "@material-ui/core";
import SchoolIcon from "@material-ui/icons/School";
import LabelIcon from "@material-ui/icons/Label";
import LeadTracking from "./LeadTracking";
import SweetAlert from "react-bootstrap-sweetalert";
import ConfirmationModal from "../../../../../components/gloabal/confirmation";
import {
  CREATE_AFTER_CAMP,
  DELETE_AFTER_CAMP,
  CREATE_LEADS_TRACKING,
  EDIT_LEADS_TRACKING,
  EDIT_AFTER_CAMP,
  DELETE_LEAD_TRACKING,
} from "../../../../../redux/actions/member";
import { connect } from "react-redux";
import MultiSelect from "./MultiSelect";
import Multiselettforleads from "./Multiselettforleads";

function ProfileSchoolInfo(props) {
  const {
    studentinfo,
    isEdit,
    getLeadTrackingList,
    getAfterCamps,
    changeHandlerfortags,
    changeHandlerforleads,
  } = props;
  const [state, setState] = useState({
    modal: false,
    defaultAlert: false,
    isOpen: false,
    candidate: "",
    id: "",
    keyname: "",
  });
  const [after_camp_category, setafter_camp_category] = useState("");
  const [leads_category, setleads_category] = useState("");
  const openSweetAlt = () => {
    setState({
      ...state,
      modal: !state.modal,
    });
  };
  const toggleModal = () => {
    setState({
      modal: !state.modal,
      defaultAlert: false,
    });
  };
  const askeDeleteConfirmation = (item, keyname) => {
    setState({
      ...state,
      defaultAlert: true,
      id: item?._id,
      keyname: keyname,
    });
  };
  const oncancel = () => {
    setState({
      ...state,
      modal: !state.modal,
    });
  };
  const ConFirmDelete = () => {
    if (state.keyname === "after_camp_category") {
      props.DELETE_AFTER_CAMP(state.id);
      setState({ ...state, defaultAlert: false });
    } else if (state.keyname === "summer_camp_category") {
      props.DELETE_SUMMER_CAMP(state.id);
    } else if (state.keyname === "speciality_program1_category") {
      props.DELETE_SPECIALIATY_PROGRAM(state.id);
    } else if (state.keyname === "speciality_program2_category") {
      props.DELETE_SPECIALIATY_PROGRAM2(state.id);
    } else if (state.keyname === "leads_category") {
      props.DELETE_LEAD_TRACKING(state.id);
    }
    setState({
      ...state,
      defaultAlert: false,
    });
  };
  const HandleClick = (keyname, value) => {
    if (keyname === "after_camp_category") {
      let payload = {
        after_camp_category: value,
      };
      setState({
        modal: false,
        ...state,
      });
      props.CREATE_AFTER_CAMP(payload);
    } else if (keyname === "summer_camp_category") {
      let payload = {
        summer_camp_category: value,
      };
      setState({
        modal: false,
        ...state,
      });
      props.CREATE_SUMMER_CAMP(payload);
    } else if (keyname === "speciality_program1_category") {
      let payload = {
        speciality_program1_category: value,
      };
      setState({
        modal: false,
        ...state,
      });
      props.CREATE_SPECIALIATY_PROGRAM(payload);
    } else if (keyname === "speciality_program2_category") {
      let payload = {
        speciality_program2_category: value,
      };
      setState({
        modal: false,
        ...state,
      });
      props.CREATE_SPECIALIATY_PROGRAM2(payload);
    } else if (keyname === "leads_category") {
      let payload = {
        leads_category: value,
      };
      setState({
        modal: false,
        ...state,
      });
      props.CREATE_LEADS_TRACKING(payload);
    }
  };

  const HandleClick2 = (keyname, value, item) => {
    if (keyname === "after_camp_category") {
      let payload = {
        after_camp_category: value,
      };
      setState({
        modal: false,
      });
      props.EDIT_AFTER_CAMP(payload, item?._id);
    } else if (keyname === "summer_camp_category") {
      let payload = {
        summer_camp_category: value,
      };
      setState({
        modal: false,
      });
      props.EDIT_SUMMER_CAMP(payload, item?._id);
    } else if (keyname === "speciality_program1_category") {
      let payload = {
        speciality_program1_category: value,
      };
      setState({
        modal: false,
      });
      props.EDIT_SPECIALIATY_PROGRAM(payload, item?._id);
    } else if (keyname === "speciality_program2_category") {
      let payload = {
        speciality_program2_category: value,
      };
      setState({
        modal: false,
      });
      props.EDIT_SPECIALIATY_PROGRAM2(payload, item?._id);
    } else if (keyname === "leads_category") {
      let payload = {
        leads_category: value,
      };
      setState({
        modal: false,
      });
      props.EDIT_LEADS_TRACKING(payload, item?._id);
    }
  };
  return (
    <React.Fragment>
      <Grid container spacing={1}>
        <Grid item sm={12} md={12} lg={12}>
          <div className="d-flex align-items-center mt-1">
            <Typography style={{ fontSize: "1.2em" }} className="mb-0 mt-1">
              Custom
            </Typography>
          </div>
        </Grid>
        <Grid item sm={12} md={6} lg={6}>
          <Typography className="mb-0 fw-bolder" color="textSecondary">
            Leads Tracking
          </Typography>
          <div className="d-flex">
            <div className="d-flex">
              <div>
                <Multiselettforleads
                  getLeadTrackingList={getLeadTrackingList}
                  studentinfo={studentinfo}
                  openSweetAlt={openSweetAlt}
                  isEdit={isEdit}
                  changeHandlerforleads={changeHandlerforleads}
                />
              </div>
            </div>
            {isEdit ? (
              <LeadTracking
                state={state}
                HandleClick={HandleClick}
                HandleClick2={HandleClick2}
                updatefild={props.CREATE_LEADS_TRACKING}
                openSweetAlt={openSweetAlt}
                toggleModal={toggleModal}
                isEdit={isEdit}
                askeDeleteConfirmation={askeDeleteConfirmation}
                oncancel={oncancel}
                setState={setState}
                data={getLeadTrackingList}
                keyname={"leads_category"}
                value={leads_category}
                setvalue={setleads_category}
                title={"Leads Category"}
              />
            ) : null}
          </div>
        </Grid>
        <Grid item sm={12} md={6} lg={6}>
          <Typography className="mb-0 fw-bolder" color="textSecondary">
            Tags
          </Typography>
          <div className="d-flex">
            <div>
              <MultiSelect
                getAfterCamps={getAfterCamps}
                studentinfo={studentinfo}
                openSweetAlt={openSweetAlt}
                isEdit={isEdit}
                changeHandlerfortags={changeHandlerfortags}
              />
            </div>
            {isEdit ? (
              <LeadTracking
                state={state}
                HandleClick={HandleClick}
                HandleClick2={HandleClick2}
                updatefild={props.CREATE_AFTER_CAMP}
                openSweetAlt={openSweetAlt}
                toggleModal={toggleModal}
                isEdit={isEdit}
                askeDeleteConfirmation={askeDeleteConfirmation}
                oncancel={oncancel}
                setState={setState}
                data={getAfterCamps}
                keyname={"after_camp_category"}
                value={after_camp_category}
                setvalue={setafter_camp_category}
                title={"Tag Manager"}
                studentinfo={studentinfo}
                changeHandlerfortags={changeHandlerfortags}
              />
            ) : null}
          </div>
        </Grid>
      </Grid>
      <ConfirmationModal
        primaryColor="#0483fd"
        secondaryColor="#fff"
        imagePath="/images/delete.png"
        open={state.defaultAlert}
        title="Delete file ?"
        onConfirm={() => {
          ConFirmDelete();
        }}
        onCancel={() => {
          setState({
            defaultAlert: false,
          });
        }}
        ButtonTitle={"Cancel"}
        contiunuebuttonTitle={"Delete"}
        description=" Are you sure you want to delete?"
      />

      {/* <SweetAlert
        title="Are you sure?"
        warning
        show={state.defaultAlert}
        showCancel
        reverseButtons
        cancelBtnBsStyle="danger"
        confirmBtnText="Yes, delete it!"
        cancelBtnText="Cancel"
        onConfirm={() => {
          ConFirmDelete();
        }}
        onCancel={() => {
          setState({
            defaultAlert: false,
          });
        }}
      >
        You won't be able to revert this!
      </SweetAlert> */}
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    getLeadTrackingList: state.member.getLeadTrackingList,
    getAfterCamps: state?.member.getAfterCamps,
    member: state.member,
    getSummerCampList: state.member.getSummerCampList,
    getSpecialiatyProgram: state.member.getSpecialiatyProgram,
    getSpecialiatyProgram2: state.member.getSpecialiatyProgram2,
  };
};
export default connect(mapStateToProps, {
  CREATE_AFTER_CAMP,
  DELETE_AFTER_CAMP,
  CREATE_LEADS_TRACKING,
  EDIT_LEADS_TRACKING,
  DELETE_LEAD_TRACKING,
  EDIT_AFTER_CAMP,
})(ProfileSchoolInfo);
