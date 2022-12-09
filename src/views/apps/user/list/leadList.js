import React, { useState, useEffect } from "react";
import { Row, Col } from "reactstrap";
import { Tabs, Tab, Box } from "@mui/material";
import Breadcrumbs from "../../../../components/@vuexy/breadCrumbs/BreadCrumb";
import {
  GET_LEAD_LIST,
  CLEAR_SELECTED_ROWS,
  GET_PAGE_NUMBER_PER_PAGE,
  FILTER_LEAD_BY_SOURCE,
} from "../../../../redux/actions/newstudent/index";
import { SELECTED_TEST_DATA } from "../../../../redux/actions/test";
import { connect } from "react-redux";
import "../../../../assets/scss/pages/users.scss";
import StudentTable from "./components/leadTable";
import ActionsOnStudent from "./components/actions";
import DragAndDropLeadView from "./components/DragAndDrop";

function UsersList(props) {
  const [checkboxSelectionIds, setCheckboxSelectionIds] = useState([]);
  const [rowData, setRowData] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState([]);
  const [leadView, setLeadView] = useState("Pipeline");

  const onSelectionChanged = (
    selectIds,
    selectedRows,
    pageNumber,
    rowsPerPage
  ) => {
    setCheckboxSelectionIds(selectIds);
    setSelectedRows(selectedRows);

    props.GET_PAGE_NUMBER_PER_PAGE({
      page: pageNumber,
      perpage: rowsPerPage,
    });
  };

  const clearSelect = () => {
    setSelectedRows([]);
    setCheckboxSelectionIds([]);

    props.GET_LEAD_LIST();
    props.SELECTED_TEST_DATA([]);
    props.CLEAR_SELECTED_ROWS(true);
  };

  useEffect(() => {
    FILTER_LEAD_BY_SOURCE({ leadFilter: ["Fair"] });
  }, []);
  return (
    <Row className="app-user-list">
      <Col sm="12">
        <Breadcrumbs
          breadCrumbTitle="Lead Members"
          breadCrumbParent="Members"
          breadCrumbActive="Lead Members"
        />
        <br />
        <Box
          sx={{
            width: "100%",
            paddingBottom: leadView === "List" ? "10px" : "0px",
          }}
        >
          <Tabs
            onChange={(event, newValue) => setLeadView(newValue)}
            value={leadView}
            centered
            sx={{
              "& .MuiTabs-flexContainer": {
                background: "rgb(1, 132, 255)",
                width: "195px",
                margin: "0 auto 20px",
                borderRadius: "5px",
                padding: "5px 0",
              },
              "& .MuiTab-root": {
                color: "#fff",
                padding: "0!important",
                minHeight: "35px!important",
              },
              "& .Mui-selected": {
                background: "#fff",
                color: "#000!important",
                borderRadius: "5px",
              },
              "& span.MuiTabs-indicator": {
                display: "none",
              },
            }}
          >
            <Tab value="Pipeline" label="Pipeline" />
            <Tab value="List" label="List" />
          </Tabs>
        </Box>
        {leadView === "Pipeline" ? (
          <DragAndDropLeadView
            activeUserActionComponent={
              <ActionsOnStudent
                studentType="Leads"
                clearSelect={clearSelect}
                checkboxSelectionIds={checkboxSelectionIds}
                getDataBack={props.GET_LEAD_LIST}
                selectedRows={selectedRows}
              />
            }
            SELECTED_TEST_DATA={props.SELECTED_TEST_DATA}
            getDataBack={props.GET_LEAD_LIST}
            checkboxSelectionIds={checkboxSelectionIds}
            onSelectionChanged={onSelectionChanged}
            StudentTypeOrInterest={"Leads"}
            clearSelect={clearSelect}
          />
        ) : (
          <StudentTable
            activeUserActionComponent={
              <ActionsOnStudent
                studentType="Leads"
                clearSelect={clearSelect}
                checkboxSelectionIds={checkboxSelectionIds}
                getDataBack={props.GET_LEAD_LIST}
                selectedRows={selectedRows}
              />
            }
            SELECTED_TEST_DATA={props.SELECTED_TEST_DATA}
            getDataBack={props.GET_LEAD_LIST}
            checkboxSelectionIds={checkboxSelectionIds}
            onSelectionChanged={onSelectionChanged}
            StudentTypeOrInterest={"Leads"}
            clearSelect={clearSelect}
          />
        )}
      </Col>
    </Row>
  );
}

export default connect(null, {
  GET_LEAD_LIST,
  SELECTED_TEST_DATA,
  CLEAR_SELECTED_ROWS,
  GET_PAGE_NUMBER_PER_PAGE,
})(UsersList);
