import React, { useEffect } from "react";
import {
  Row,
  Col,
} from "reactstrap";
import "react-circular-progressbar/dist/styles.css";
import Breadcrumbs from "../../../../../components/@vuexy/breadCrumbs/BreadCrumb";
import "../../../../../assets/scss/pages/finance.scss";
import PageLink from "../components/PageLink";
import Invoicesidbar from "./Invoicesidbar";
import Invoicecontent from "./Invoicecontent";
import { connect, useDispatch } from "react-redux";
import { GET_ALL_INVOICE } from "../../../../../redux/actions/mymoney";

const InvoiceMain = ({ getallinvoice }) => {
  const disptach = useDispatch()
  useEffect(() => {
    disptach(GET_ALL_INVOICE())
  }, [])
  return (
    <div>
      <Breadcrumbs
        breadCrumbTitle="My Money"
        breadCrumbParent="My Money"
        breadCrumbActive="P&amp;L"
      />
      <Row>
        <Col md="3" xs="12">
          <PageLink>
            <div className="section-header">
              <span className="section-title">Filters</span>
              <div className="divider" />
            </div>
          </PageLink>
        </Col>
        <Col md="9" xs="12">
          <div className="d-flex">
            <Invoicesidbar />
            <Invoicecontent />
          </div>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    getallinvoice: state?.invoiceReducer?.getallinvoice
  }
}
export default connect(mapStateToProps)(InvoiceMain)
