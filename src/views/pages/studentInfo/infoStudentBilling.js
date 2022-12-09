import React from "react";
import { Card, CardBody, CardHeader, CardTitle, Input } from "reactstrap";
import AddNewDetails from "./billing/billingModal";
import { connect } from "react-redux";
import { ContextLayout } from "../../../utility/context/Layout";
import { AgGridReact } from "ag-grid-react";
import ActionFinance from "./ActionFinance";
import NoDataImage from "../../../../src/assets/img/nodatafound.png";
import ConfirmationModal from "../../../components/gloabal/confirmation";
import {
  DELETE_STRIPE_PAYMENT_METHOD,
  STRIPE_PAYMENT_METHODS_LIST,
  SET_DEFAULT_PAYMENT_METHOD,
} from "../../../redux/actions/stripe/index";

class DataTableFixedHeader extends React.Component {
  state = {
    rowData: [],
    actionOn: {},
    modal: false,
    editCategoryStatus: false,
    editCategory: {},
    defaultAlert: false,
    pageSize: 10,
    collapse: true,
    status: "Opened",
    role: "All",
    defaultColDef: {
      resizable: true,
      flex: 1,
    },
    searchVal: "",
    columnDefs: [
      {
        headerName: "Card Holder",
        field: "card_holder_name",
      },
      // {
      //   headerName: "Card type",
      //   field: "card_type",
      // },
      {
        headerName: "Card Type",
        field: "brand",
      },
      // {
      //   headerName: "Card Category",
      //   field: "Credit_card_type",
      // },
      {
        headerName: "Card Number",
        field: "last4",
        cellRendererFramework: (data) => {
          return (
            <>
              <span>{`xxxx ${data.value}`} </span>
            </>
          );
        },
      },
      {
        headerName: "Card Expiry",
        field: "",
        cellRendererFramework: (params) => {
          return (
            <>{`${params?.data?.exp_month} / ${String(
              params?.data?.exp_year
            ).slice(-2)}`}</>
          );
        },
      },
      {
        headerName: "",
        field: "isDefault",
        cellRendererFramework: (data) => {
          return <>{data.value ? "default" : ""}</>;
        },
      },
      {
        headerName: "Action",
        field: "",
        cellRendererFramework: (params) => {
          return (
            <>
              {/* <Trash2
                className="mr-50"
                size={18}
                onClick={() =>
                  this.actionOn('delete', params.data)
                }
              />
              <Edit
                className="mr-50"
                size={18}
                onClick={() =>
                  this.actionOn('edit', params.data)
                }
              /> */}
              <ActionFinance actionOn={this.actionOn} params={params.data} />
            </>
          );
        },
      },
    ],
    getRowHeight: function (params) {
      return 50;
    },
  };

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  updateSearchQuery = (val) => {
    this.gridApi.setQuickFilter(val);
    this.setState({
      searchVal: val,
    });
  };

  componentDidMount() {
    const { studentId } = this.props;
    this.props.STRIPE_PAYMENT_METHODS_LIST(studentId);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.stripePaymentMethodList !== this.props.stripePaymentMethodList
    ) {
      this.setState({
        rowData: this.props.stripePaymentMethodList,
        loading: false,
      });
    }
  }
  toggleModal = () => {
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }));
  };
  actionOn = (type, item) => {
    if (type === "delete") {
      this.setState({ actionOn: item, defaultAlert: true });
    } else if (type === "setDefault") {
      this.props.SET_DEFAULT_PAYMENT_METHOD(item?.studentId, item?.card_id);
    } else {
      this.setState({ actionOn: item, modal: true });
    }
  };

  ConFirmDelete = () => {
    this.props.DELETE_STRIPE_PAYMENT_METHOD(this.state?.actionOn);
    this.setState({ defaultAlert: false });
  };
  render() {
    const { defaultColDef, columnDefs, rowData, pageSize, modal, actionOn } =
      this.state;
    return (
      <div>
        <Card>
          <CardHeader className="d-flex justify-content-between">
            <CardTitle>Finance</CardTitle>
            <div className="d-flex ">
              <div className="filter-actions d-flex">
                <Input
                  className="mr-1"
                  type="text"
                  placeholder="Search..."
                  onChange={(e) => this.updateSearchQuery(e.target.value)}
                  value={this.state.searchVal}
                />
              </div>
              <AddNewDetails
                toggleModal={this.toggleModal}
                modal={modal}
                actionOn={actionOn}
              />
            </div>
          </CardHeader>
          <CardBody>
            {rowData.length > 0 ? (
              <div
                className="ag-theme-material ag-grid-table"
                style={{ height: "70vh" }}
              >
                <ContextLayout.Consumer>
                  {(context) => (
                    <AgGridReact
                      gridOptions={{}}
                      rowSelection="multiple"
                      defaultColDef={defaultColDef}
                      columnDefs={columnDefs}
                      rowData={rowData}
                      onGridReady={this.onGridReady}
                      animateRows={false}
                      floatingFilter={false}
                      pagination={true}
                      paginationPageSize={pageSize}
                      resizable={true}
                      getRowHeight={this.state.getRowHeight}
                      enableRtl={context.state.direction === "rtl"}
                    />
                  )}
                </ContextLayout.Consumer>
              </div>
            ) : (
              <center>
                <img src={NoDataImage} height="160px" alt="No Data" />
                <b />
                <h4>No Data</h4>
              </center>
            )}
          </CardBody>
        </Card>
        <ConfirmationModal
          primaryColor="#0483fd"
          secondaryColor="#fff"
          imagePath="/images/delete.png"
          open={this.state.defaultAlert}
          title="Are you sure?"
          onConfirm={this.ConFirmDelete}
          onCancel={() => {
            this.setState({ defaultAlert: false });
          }}
          onCancelButtonTitle={"Cancel"}
          contiunuebuttonTitle={"Delete"}
          description=" You won't be able to revert this!"
        />

        {/* <SweetAlert title="Are you sure?"
          warning
          show={this.state.defaultAlert}
          showCancel
          reverseButtons
          cancelBtnBsStyle="danger"
          confirmBtnText="Yes, delete it!"
          cancelBtnText="Cancel"
          onConfirm={this.ConFirmDelete}
          onCancel={() => { this.setState({ defaultAlert: false }) }}
        >
          You won't be able to revert this! */}
        {/* </SweetAlert> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    getStudentFinanceInfo: state.billingFinance.getStudentFinanceInfo,
    stripePaymentMethodList: state.stripe.stripePaymentMethodList,
  };
};
export default connect(mapStateToProps, {
  STRIPE_PAYMENT_METHODS_LIST,
  SET_DEFAULT_PAYMENT_METHOD,
  DELETE_STRIPE_PAYMENT_METHOD,
})(DataTableFixedHeader);
