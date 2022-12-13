import React, { Fragment } from "react";
import {
  Card,
  CardBody,
  FormGroup,
  Row,
  Col,
  Input,
  Form,
  Button,
  Label,
  CustomInput,
  ButtonGroup,
} from "reactstrap";
import { TextField } from "@material-ui/core";
import { connect } from "react-redux";
import { CREATE_MEMBERSHIP } from "../../../../redux/actions/shop";
import { GET_PROGRAM_LIST } from "../../../../redux/actions/programe";
import { GET_FUNNEL } from "../../../../redux/actions/form-builder";
//import Autocomplete from "@material-ui/lab/Autocomplete";
import Autocomplete from "@mui/lab/Autocomplete";
import AttachDocxfile from "./components/attacheFiles";

class FloatingLabels extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      membership_name: "",
      color: "#d42f2f",
      membership_type: "",
      duration_time: "0",
      duration_type: "month",
      total_price: "0",
      down_payment: "0",
      payment_type: "monthly",
      balance: "",
      pay: "",
      no_of_payment: "",
      due_every: "1",
      amount: "",
      isRecurring: 1,
      regular_price: "",
      folderId: null,
      errorFound: false,
      docType: "None",
      
    };

    this.changeHandler = this.changeHandler.bind(this);
    this.handleDocument = this.handleDocument.bind(this);
  }
  componentDidMount() {
    this.props.GET_PROGRAM_LIST();
    this.props.GET_FUNNEL();
  }
  handleSelectsubFolder = (e, item) => {
    this.setState({ folderId: item?._id });
  };

  changeHandler(e) {
    this.setState({ ...this.state, [e.target.name]: e.target.value }, () => {
      var total_price = Number(this.state.total_price);
      var down_payment = Number(this.state.down_payment);
      var no_of_payment = Number(this.state.no_of_payment);
      var balance_amount = total_price - down_payment;
      var emi_amount = balance_amount / no_of_payment || 0;
      this.setState({
        balance: String(balance_amount),
        amount: String(emi_amount),
      });
    });
  }

  handleDocument = (docFile) => {
    this.setState({ ...this.state, docs: docFile });
  };
  onsubmit = (e) => {
    e.preventDefault();
    if (this.state.folderId === null) {
      this.setState({ errorFound: true });
      return;
    }
    let payload = {
      ...this.state,
    };
    delete payload.errorFound;
    delete payload.folderId;
    this.props.CREATE_MEMBERSHIP(payload, this.state.folderId);
    this.props.toggle();
  };

  render() {
    console.log(this.props)
    
    return (
      <Card className="w-70 p-0">
      
        <CardBody>
          <Form className="mt-10" onSubmit={this.onsubmit}>
            <Row>
              <Col sm="6" md="6">
                <div>
                  <Label htmlFor="nameFloating">
                    Membership Name<sup>*</sup>
                  </Label>
                </div>
                <FormGroup className="form-label-group">
                  <Input
                    type="text"
                    name="membership_name"
                    value={this.state.membership_name}
                    id="nameFloating"
                    placeholder="Membership Name"
                    onChange={this.changeHandler}
                    required
                  />
                </FormGroup>
              </Col>
              <Col sm="6" md="6">
                <FormGroup className="form-label-group">
                  <div>
                    <Label>
                      Membership Type <sup>*</sup>
                    </Label>
                  </div>
                  <CustomInput
                    type="select"
                    name="membership_type"
                    value={this.state.membership_type}
                    id="status"
                    onChange={this.changeHandler}
                    required
                  >
                    <option value="">Select Membership Type </option>
                    <option value="Trial">Trial</option>
                    <option value="Beginner">Beginner</option>
                    <option value="BBC">BBC</option>
                    <option value="LC">LC</option>
                    <option value="IC">IC</option>
                    <option value="MC">MC </option>
                    <option value="TC">TC </option>
                    <option value="After School">After School</option>
                  </CustomInput>
                </FormGroup>
              </Col>
              <Col sm="12" md="12" lg="12">
                <div>Pricing</div>
                <div className="w-100">
                  <ButtonGroup>
                    <button
                      type="button"
                      className={
                        this.state.isRecurring === 1
                          ? `btn btn-primary`
                          : "btn btn-outline-primary"
                      }
                      onClick={() => {
                        this.setState({ ...this.state, isRecurring: 1 });
                      }}
                    >
                      Recurring
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        this.setState({
                          ...this.state,
                          isRecurring: 2,
                          payment_type: "pif",
                        });
                      }}
                      className={
                        this.state.isRecurring === 2
                          ? `btn btn-primary`
                          : "btn btn-outline-primary"
                      }
                    >
                      One Time
                    </button>
                  </ButtonGroup>
                </div>
              </Col>
              <Col sm="12" md="6" lg="6">
                <FormGroup className="form-label-group">
                  <div>
                    <Label for="PaymentsFloating">Regular Price</Label>
                  </div>
                  <Input
                    type="number"
                    name="regular_price"
                    onChange={this.changeHandler}
                    value={this.state?.regular_price}
                    id="regular_price"
                    placeholder="Regular Pice"
                  />
                </FormGroup>
              </Col>
              <Col sm="6" md="6">
                <FormGroup className="form-label-group">
                  <div>
                    <Label htmlFor="passwordFloating">Total Price</Label>
                  </div>
                  <Input
                    type="number"
                    name="total_price"
                    value={this.state.total_price}
                    onChange={this.changeHandler}
                    onBlur={this.calculateBalanceAmount}
                    onFocus={this.calculateBalanceAmount}
                    id="PriceFloating"
                    placeholder="Total Price"
                    required
                  />
                </FormGroup>
              </Col>
              <Col sm="6" md="6">
                <FormGroup className="form-label-group">
                  <div>
                    <Label htmlFor="BalanceFloating">Balance</Label>
                  </div>
                  <Input
                    type="number"
                    name="balance"
                    required
                    value={this.state.balance}
                    id="BalanceFloating"
                    placeholder="Balance"
                  />
                </FormGroup>
              </Col>
              <Fragment>
                <Col sm="6" md="6">
                  <FormGroup className="form-label-group">
                    <div>
                      <Label htmlFor="nameFloating">Down Payment</Label>
                    </div>
                    <Input
                      type="number"
                      name="down_payment"
                      value={this.state.down_payment}
                      onChange={this.changeHandler}
                      id="paymentFloating"
                      placeholder="Down Payment"
                      required
                    />
                  </FormGroup>
                </Col>
                <Col sm="4" md="4">
                  <FormGroup className="form-label-group">
                    <div>
                      <Label htmlFor="nameFloating">
                        Duration <sup>*</sup>
                      </Label>
                    </div>
                    <Input
                      type="text"
                      name="duration_time"
                      value={this.state.duration_time}
                      id="durationFloating"
                      placeholder="Please Specify Year"
                      onChange={this.changeHandler}
                      required
                    />
                  </FormGroup>
                </Col>
              </Fragment>
              <Col sm="4" md="4">
                <FormGroup className="form-label-group">
                  <div>
                    <Label>
                      Type <sup>*</sup>
                    </Label>
                  </div>
                  <CustomInput
                    type="select"
                    name="docType"
                    value={this.state.docType}
                    onChange={this.changeHandler}
                    style={{
                      height: "40px !importent",
                    }}
                    id="docType"
                    required
                  >
                    <option>Please Select</option>
                    <option value="month">Months </option>
                    <option value="week">Weeks </option>
                  </CustomInput>
                </FormGroup>
              </Col>
              <Col sm="4" md="4">
                <FormGroup className="form-label-group">
                  <div>
                    <Label for="PaymentsFloating">Color</Label>
                  </div>
                  <Input
                    name="color"
                    value={this.state.color}
                    onChange={this.changeHandler}
                    type="color"
                    id="colorFloating"
                  />
                </FormGroup>
              </Col>
              <Col sm="12" md="6" lg="6">
                <FormGroup className="form-label-group">
                  <div>
                    <Label for="PaymentsFloating"># of Payments</Label>
                  </div>
                  <Input
                    type="number"
                    name="no_of_payment"
                    onChange={this.changeHandler}
                    value={this.state.no_of_payment}
                    id="paymentsFloating"
                    placeholder="Payments"
                  />
                </FormGroup>
              </Col>
              <Col sm="12" md="6" lg="6">
                <FormGroup className="form-label-group">
                  <div>
                    <Label for="dollerFloating">Amount</Label>
                  </div>
                  <Input
                    type="number"
                    name="amount"
                    value={this.state.amount === NaN ? 0 : this.state.amount}
                    onChange={this.changeHandler}
                    id="dollerFloating"
                    placeholder="$"
                  />
                </FormGroup>
              </Col>
              <Col sm="12" md="6" lg="6">
                <FormGroup>
                  <div>
                    <label> Payment Type</label>
                  </div>
                  <div className="d-flex align-content-around">
                    {this.state.isRecurring === 2 ? (
                      <Fragment>
                        <div className="m-1">
                          <input
                            type="radio"
                            id="periph1"
                            name="payment_type"
                            value="pif"
                            checked={this.state.payment_type === "pif"}
                            onChange={this.changeHandler}
                          />
                          <label htmlFor="periph1">PIF</label>
                        </div>
                      </Fragment>
                    ) : (
                      <Fragment>
                        <div className="m-1 d-flex justify-content-center">
                          <input
                            type="radio"
                            id="periph2"
                            name="payment_type"
                            value="monthly"
                            checked={this.state.payment_type === "monthly"}
                            onChange={this.changeHandler}
                          />
                          <label htmlFor="periph1">Monthly</label>
                        </div>
                        <div className="m-1 d-flex  justify-content-center">
                          <input
                            type="radio"
                            id="periph3"
                            name="payment_type"
                            value="weekly"
                            checked={this.state.payment_type === "weekly"}
                            onChange={this.changeHandler}
                          />
                          <label htmlFor="periph1">Weekly</label>
                        </div>
                      </Fragment>
                    )}
                  </div>
                </FormGroup>
              </Col>
              <Col xs="12" sm="12" md="6" lg="6">
                <FormGroup className="mb-0">
                  <span>Folder</span>
                  <Autocomplete
                    size="small"
                    style={{ border: "1px solid #d9d9d9", borderRadius: "8px" }}
                    options={this.props?.getmebershipfolderlisting}
                    onChange={(e, newValue) => {
                      this.handleSelectsubFolder(e, newValue);
                    }}
                    getOptionLabel={(option) => option?.folderName}
                    renderInput={(params) => (
                      <TextField
                        fullWidth
                        size="small"
                        variant={"outlined"}
                        {...params}
                        placeholder={"Folder"}
                      />
                    )}
                  />
                </FormGroup>
              </Col>
              <Col xs="12" sm="12" md="6" lg="6">
                <FormGroup>
                  <Label>Document Type</Label>
                  <div className="d-flex">
                    <div className="d-flex" style={{ margin: "5px" }}>
                      <input
                        type="radio"
                        value={"None"}
                        name="docType"
                        onChange={this.changeHandler}
                      />
                      <Label style={{ marginLeft: "2px" }}>None</Label>
                    </div>
                    <div className="d-flex" style={{ margin: "5px" }}>
                      <input
                        type="radio"
                        value={"Digital"}
                        name="docType"
                        onChange={this.changeHandler}
                      />
                      <Label style={{ marginLeft: "2px" }}>Digital</Label>
                    </div>
                    <div className="d-flex" style={{ margin: "5px" }}>
                      <input
                        type="radio"
                        value={"Attach File"}
                        name="docType"
                        onChange={this.changeHandler}
                      />
                      <Label style={{ marginLeft: "2px" }}>Attach File</Label>
                    </div>
                  </div>

                  {/* <CustomInput
                    type="select"
                    name="docType"
                    value={this.state.docType}
                    id="docType"
                    onChange={this.changeHandler}
                    required
                  >
                    <option value={"None"}>None</option>
                    <option value={"Digital"}>Digital</option>
                    <option value={"Attach File"}>Attach File</option>
                  </CustomInput> */}
                </FormGroup>
              </Col>
              {this.state.docType === "Digital" && (
                <>
                  <Col sm="12" md="6" lg="6">
                    <FormGroup className="form-label-group">
                      <div>
                        <Label for="PaymentsFloating">Folder Name</Label>
                      </div>
                      <Input
                        type="number"
                        name="no_of_payment"
                        onChange={this.changeHandler}
                        value={this.state.no_of_payment}
                        id="paymentsFloating"
                        placeholder="Folder Name"
                      />
                    </FormGroup>
                  </Col>
                  <Col xs="12" sm="6" md="6" lg="6">
                    <FormGroup className="form-label-group">
                      <div>
                        <Label for="PaymentsFloating">File name</Label>
                      </div>
                      <Input
                        type="number"
                        name="no_of_payment"
                        onChange={this.changeHandler}
                        value={this.state.no_of_payment}
                        id="paymentsFloating"
                        placeholder="File Name"
                      />
                    </FormGroup>
                  </Col>
                  <Col xs="12" sm="6" md="6" lg="6">
                    <FormGroup className="form-label-group">
                      <div>
                        <Label for="formbuilderdata">Form Builder Name</Label>
                      </div>
                      <CustomInput type="select" name="docType" id="docType">
                        {
                          this.props.uforms?.memberdata?.map((data) => {
                            console.log(data)
                            return(
                              <option>{data?.funnelName}</option>
                            )
                          })
                        }
                      </CustomInput>
                    </FormGroup>
                  </Col>
                </>
              )}
              {this.state.docType === "Attach File" && (
                <Col xs="12" sm="6" md="6" lg="6">
                  <AttachDocxfile
                    title={"Click or drag and drop to Attach your DocxFile"}
                    handleDocument={this.handleDocument}
                  />
                </Col>
              )}
              {/* <Col xs="12" sm="6" md="6" lg="6">
                <FormGroup className="form-label-group">
                  <div>
                    <Label for="PaymentsFloating">Select color</Label>
                  </div>
                  <Input
                    name="color"
                    value={this.state.color}
                    onChange={this.changeHandler}
                    type="color"
                    id="colorFloating"
                  />
                </FormGroup>
              </Col> */}
              <Col xs="12" sm="12" md="12" lg="12">
                <div className="d-flex justify-content-end">
                  <FormGroup className="form-label-group">
                    <Button.Ripple
                      color="primary"
                      value={this.state.color}
                      type="submit"
                      className="m-1"
                      onSubmit={this.onsubmit}
                    >
                      Save
                    </Button.Ripple>
                    {this.state.errorFound && this.state.folderId === null ? (
                      <div className="alert alert-danger" role="alert">
                        Please Select Folder and Fields are required before you
                        save!
                      </div>
                    ) : null}
                  </FormGroup>
                </div>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    getmebershipfolderlisting: state.shop.getmebershipfolderlisting,
    programList: state.program.programList,
    uforms: state?.formbuilder?.uforms,
  };
};
export default connect(mapStateToProps, {
  CREATE_MEMBERSHIP,
  GET_PROGRAM_LIST,
  GET_FUNNEL,
})(FloatingLabels);
