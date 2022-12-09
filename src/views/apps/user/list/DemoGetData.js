import React from "react";
import { Row, Col } from "reactstrap";
import Breadcrumbs from "../../../../components/@vuexy/breadCrumbs/BreadCrumb";
import {
  GET_ACTIVE_STUDENT,
  GET_ACTIVE_TRAIL_LIST,
  CLEAR_SELECTED_ROWS,
  GET_SERACH_STDUNET_BY_INTREST,
  GET_SERACH_STDUNET_BY_TYPE,
  GET_PAGE_NUMBER_PER_PAGE,
} from "../../../../redux/actions/newstudent";
import { SELECTED_TEST_DATA } from "../../../../redux/actions/test";
import { connect } from "react-redux";
import "../../../../assets/scss/plugins/tables/_agGridStyleOverride.scss";
import "../../../../assets/scss/pages/users.scss";
import DemoTable from "./DemoTable"
import StudentTable from "./components/studentTable";
import ActionsOnStudent from "./demoAction";

class UsersLists extends React.Component {
  state = {
    checkboxSelectionIds: [],
    rowData: null,
    selectedRows: [],
    data: [],
    loading: true,
  };
  onSelectionChanged(selectIds, selectedRows, pageNumber, rowsPerPage) {
    this.setState({
      checkboxSelectionIds: selectIds,
      selectedRows: selectedRows,
    });
    this.props.GET_PAGE_NUMBER_PER_PAGE({
      page: pageNumber,
      perpage: rowsPerPage,
    });
  }
  clearSelect = () => {
    this.setState({
      selectedRows: [],
      rowData: this.props.active_student,
      checkboxSelectionIds: [],
    });
    this.props.SELECTED_TEST_DATA([]);
    this.props.CLEAR_SELECTED_ROWS(true);
  };
  render() {
    const { checkboxSelectionIds, selectedRows, loading } = this.state;
    return (
      <Row className="app-user-list">
        <Col sm="12">
          <Breadcrumbs
            breadCrumbTitle="Demo Table"
            breadCrumbParent="Members"
            breadCrumbActive="Demo Table"
          />
          <br />
          <DemoTable
            activeUserActionComponent={
              <ActionsOnStudent
                studentType="Active Student"
                clearSelect={this.clearSelect}
                checkboxSelectionIds={checkboxSelectionIds}
                selectedRows={selectedRows}
                getDataBack={this.props.GET_ACTIVE_STUDENT}
                GET_SERACH_STDUNET_BY_INTREST={this.props.GET_SERACH_STDUNET_BY_INTREST}
                GET_SERACH_STDUNET_BY_TYPE={this.props.GET_SERACH_STDUNET_BY_TYPE}
              />
            }
            SELECTED_TEST_DATA={this.props.SELECTED_TEST_DATA}
            getDataBack={this.props.GET_ACTIVE_STUDENT}
            checkboxSelectionIds={checkboxSelectionIds}
            onSelectionChanged={this.onSelectionChanged.bind(this)}
            StudentTypeOrInterest={"Active Student"}

          />
          {/* <StudentTable
            activeUserActionComponent={
              <ActionsOnStudent
                studentType="Active Student"
                clearSelect={this.clearSelect}
                checkboxSelectionIds={checkboxSelectionIds}
                selectedRows={selectedRows}
                getDataBack={this.props.GET_ACTIVE_STUDENT}
              />
            }
            SELECTED_TEST_DATA={this.props.SELECTED_TEST_DATA}
            getDataBack={this.props.GET_ACTIVE_STUDENT}
            checkboxSelectionIds={checkboxSelectionIds}
            onSelectionChanged={this.onSelectionChanged.bind(this)}
            StudentTypeOrInterest={"Active Student"}
          /> */}
        </Col>
      </Row>
    );
  }
}

export default connect(null, {
  GET_ACTIVE_STUDENT,
  SELECTED_TEST_DATA,
  GET_SERACH_STDUNET_BY_INTREST,
  GET_SERACH_STDUNET_BY_TYPE,
  GET_ACTIVE_TRAIL_LIST,
  GET_PAGE_NUMBER_PER_PAGE,
  CLEAR_SELECTED_ROWS,
})(UsersLists);