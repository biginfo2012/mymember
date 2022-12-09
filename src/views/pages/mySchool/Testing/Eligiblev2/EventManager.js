import React, { useEffect, useState } from "react";
import { Row, Col } from "reactstrap";
import "react-circular-progressbar/dist/styles.css";
import Breadcrumbs from "../../../../../components/@vuexy/breadCrumbs/BreadCrumb";
import "../../../../../assets/scss/pages/finance.scss";
import {
  APPOINTMENT_CATEGORYLIST,
  ACTIVE_EVENT,
} from "../../../../../redux/actions/appointment";
import TabsMain from "./eventDetailsTable"
import { connect } from "react-redux";
import moment from "moment";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  GET_INVITEES_OF_EVENT,
  GET_REGISTERED_FOR_EVENT,
  GET_ATTENDED_INVITESE,
  EVENT_ID,
  EVENT_FILTER,
  FETCH_EVENTS,
  MANAGE_EVENT_SELECTED_REGISTER_STUDENT,
  FETCH_TEST_LIST
} from "../../../../../redux/actions/test";
import RenderEventFilters from "./RenderEventFilters"
import EventListingCards from "./EventListingCards"
import { Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';

const Eventmanager = (props) => {
  const {
    istoggle,
    FETCH_EVENTS,
    fetchAllEvents,
    APPOINTMENT_CATEGORYLIST,
    getDataBackOfStudent,
  } = props;
  const [monthNum, setMonthNum] = useState(moment(new Date()).format("MM-DD-YYYY"));
  const [loading, setloading] = useState(true)
  const fetchdata = async () => {
    await APPOINTMENT_CATEGORYLIST();
    const data = await FETCH_EVENTS(monthNum);
    if (data) {
      await setloading(false)
    }
  }
  useEffect(() => {
    fetchdata()
  }, []);

  const antIcon = <LoadingOutlined style={{ fontSize: 26 }} spin />;

  return (
    <div>
      {istoggle === undefined && (
        <Breadcrumbs
          breadCrumbTitle="Event Manager"
          breadCrumbParent="My School"
          breadCrumbActive="Events"
        />
      )}
      <Spin spinning={loading} indicator={antIcon}>
        <div>
          <Row>
            <Col md="12">
              <RenderEventFilters
                setMonth={setMonthNum}
                Month={monthNum}
                setloading={setloading} />
            </Col>
            <Col md="12">
              <EventListingCards fetchAllEvents={fetchAllEvents} />
            </Col>
          </Row>
          <ToastContainer />
          {props.data?.length > 0 ? (
            <>{props.iSTest ? <TabsMain getDataBackOfStudent={getDataBackOfStudent} /> : <TabsMain />}</>
          ) : null}
        </div>
      </Spin>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    eventsAndAppointment: state.appointmentAndEvent.eventsAndAppointment,
    appointmentCategoryList: state.appointmentAndEvent?.appointmentCategoryList,
    manageEventSelectedRegisterStudent:
      state?.test?.manageEventSelectedRegisterStudent,
    fetchAllEvents: state.appointmentAndEvent.fetchAllEvents,
  };
};
export default connect(mapStateToProps, {
  MANAGE_EVENT_SELECTED_REGISTER_STUDENT,
  FETCH_EVENTS,
  APPOINTMENT_CATEGORYLIST,
  GET_INVITEES_OF_EVENT,
  GET_REGISTERED_FOR_EVENT,
  GET_ATTENDED_INVITESE,
  EVENT_ID,
  EVENT_FILTER,
  ACTIVE_EVENT,
  FETCH_TEST_LIST
})(Eventmanager);
