import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import { WorkHistoryPanel } from "./time-tracker-page";
import { useParams } from "react-router-dom";

const WorHistory = (props) => {
  const { employeeId } = useParams();
  console.log("sub-user-id is", employeeId);
  return (
    <Fragment>
      <WorkHistoryPanel employeeId={employeeId} />
    </Fragment>
  );
};

export default connect(null, null)(WorHistory);
