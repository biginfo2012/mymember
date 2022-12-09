import React, { useState } from "react";

import { Row, Col } from "reactstrap";
import "react-circular-progressbar/dist/styles.css";
import Breadcrumbs from "../../components/@vuexy/breadCrumbs/BreadCrumb";

const EventManager = () => {
  return (
    <>
      <Breadcrumbs
        breadCrumbTitle="Events"
        breadCrumbParent="Event Manager"
        breadCrumbActive="Events"
      />
      <Row>
        <Col md="3">test</Col>
        <Col md="9">test</Col>
      </Row>
    </>
  );
};

export default EventManager;
