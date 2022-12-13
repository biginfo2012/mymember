import React, {useEffect, useState} from "react"
import { FormGroup, Input, Label, Row, Col, CustomInput } from "reactstrap";
import { TextField, Typography } from "@material-ui/core";
import InputAutoComplete from "../../../pages/newstudent/components/autoComplete";
import moment from "moment";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
const ProductSettings = (props) => {

  const {
    studentList,
    editor,
    membershipList
  } = props;

  const [studentData, setStudentData] = useState(undefined)
  const [memberData, setMemberData] = useState(undefined)
  const [mActivateDate, setMActivateDate] = useState(moment().format("YYYY-MM-DD"))
  const [expireDate, setExpireDate] = useState(moment().format("YYYY-MM-DD"))
  const [registerFee, setRegisterFee] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const [dPayment, setDPayment] = useState(0)
  const [balance, setBalance] = useState(0)
  const [paymentTime, setPaymentTime] = useState(0)
  const [paymentType, setPaymentType] = useState('monthly');
  const [paymentMoney, setPaymentMoney] = useState(0)
  const [due, setDue] = useState("0")
  const [startPaymentDate, setStartPaymentDate] = useState(moment().format("YYYY-MM-DD"))
  const [payInout, setPayInout] = useState('In house')
  const getSelectedHtmlElement = () => {
    return editor.getSelected();
  };
  const handleSelectStudent = (e, newValue, keyName) =>{
    console.log(newValue);
    setStudentData(newValue);
    let selectElement = getSelectedHtmlElement();
    let attributes = selectElement.getAttributes();
    attributes.studentData = newValue._id;
    selectElement.setAttributes(attributes);
  }

  const handleSelectMember = (e, newValue, keyName) =>{
    console.log(newValue);
    setMemberData(newValue);
    let selectElement = getSelectedHtmlElement();
    let attributes = selectElement.getAttributes();
    attributes.memberData = newValue._id;
    selectElement.setAttributes(attributes);
  }

  const changeDateHandler = (value, name) => {
    let selectElement = getSelectedHtmlElement();
    let attributes = selectElement.getAttributes();
    switch (name) {
      case 'mactive_date':
        attributes.mActivateDate = value;
        setMActivateDate(value);
        break;
      case 'expiry_date':
        attributes.expireDate = value;
        setExpireDate(value);
        break;
      case 'start_payment_Date':
        attributes.startPaymentDate = value;
        setStartPaymentDate(value);
        break;
    }
  }
  const changeHandler = (e) => {
    let selectElement = getSelectedHtmlElement();
    let attributes = selectElement.getAttributes();
    const { value, name } = e.target;
    switch (name) {
      case 'totalp':
        attributes.totalPrice = value;
        setTotalPrice(value);
        break;
      case 'register_fees':
        attributes.registerFee = value;
        setRegisterFee(value);
        break;
      case 'dpayment':
        attributes.dPayment = value;
        setDPayment(value);
        break;
      case 'balance':
        attributes.balance = value;
        setBalance(value);
        break;
      case 'payment_time':
        attributes.paymentTime = value;
        setPaymentTime(value);
        break;
      case 'payment_type':
        attributes.paymentType = value;
        setPaymentType(value);
        break;
      case 'payment_money':
        attributes.paymentMoney = value;
        setPaymentMoney(value);
        break;
      case 'due_every':
        attributes.due = value;
        setDue(value);
        break;
      case 'pay_inout':
        attributes.payInout = value;
        setPayInout(value);
        break;
    }
    selectElement.setAttributes(attributes);
  }

  useEffect(() => {
    console.log(membershipList);
    let selectElement = getSelectedHtmlElement();
    let attributes = selectElement.getAttributes();
    if(attributes.studentData) {
      if(studentList && studentList.active_std) {
        for(let student of studentList.active_std) {
          if(student._id == attributes.studentData) {
            setStudentData(student)
          }
        }
      }
    }

    if(attributes.memberData) {
      if(membershipList && membershipList.data) {
        for(let membership of membershipList.data) {
          if(membership._id == attributes.memberData) {
            setMemberData(membership)
          }
        }
      }
    }

    setMActivateDate(attributes.mActivateDate ?? Date())
    setExpireDate(attributes.expireDate ?? Date())
    setTotalPrice(attributes.totalPrice);
    setRegisterFee(attributes.registerFee);
    setDPayment(attributes.dPayment);
    setBalance(attributes.balance);
    setPaymentTime(attributes.paymentTime);
    setPaymentType(attributes.paymentType);
    setPaymentMoney(attributes.paymentMoney);
    setDue(attributes.due);
    setStartPaymentDate(attributes.startPaymentDate);
    setPayInout(attributes.payInout);
  }, [studentList, membershipList]);
  return (
    <div style={{ width: "100%" }}>
      <form className="p-1">
        <Row>
          <Col sm="12" md="12" lg="12">
            <Typography
              style={{ color: "#393939", fontSize: "1.5rem" }}
              className="mt-1"
            >
              Membership Info
            </Typography>
          </Col>

          <Col sm="12">

            <FormGroup>
              <div>
                <Label>
                  <b>Select Student</b>
                </Label>
              </div>
              <InputAutoComplete
                labelName={"firstName"}
                keyName="firstName"
                defaultValueIs={studentData?.firstName}
                data={studentList?.active_std || []}
                handleSelect={handleSelectStudent}
                isEdit={true}
              />
            </FormGroup>

          </Col>
          <Col sm="12">

            <FormGroup>
              <div>
                <Label>
                  <b>Select Membership</b>
                </Label>
              </div>
              <InputAutoComplete
                labelName={"Membership Name"}
                keyName="membership_name"
                defaultValueIs={memberData?.membership_name}
                data={membershipList?.data || []}
                handleSelect={handleSelectMember}
                isEdit={true}
              />
            </FormGroup>


          </Col>
          <Col sm="12" md="6">
            <FormGroup>
              <div>
                <Label for="EmailVertical">Start Date</Label>
              </div>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  required
                  style={{
                    borderRadius: "0.4em",
                    border: "1px solid #b8c2cc",
                    margin: "0",
                    padding: "6px",
                  }}
                  format="MM/dd/yyyy"
                  InputProps={{
                    disableUnderline: true,
                  }}
                  margin="normal"
                  id="date-picker-inline"
                  value={moment(mActivateDate).format("MM/DD/YYYY")}
                  onChange={(date) => {
                    changeDateHandler(date, "mactive_date");
                  }}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
            </FormGroup>
          </Col>
          <Col sm="12" md="6">
            <FormGroup>
              <div>
                <Label for="expiryVertical">Expiry Date:</Label>
              </div>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  required
                  style={{
                    borderRadius: "0.4em",
                    border: "1px solid #b8c2cc",
                    margin: "0",
                    padding: "6px",
                  }}
                  format="MM/dd/yyyy"
                  InputProps={{
                    disableUnderline: true,
                  }}
                  margin="normal"
                  id="date-picker-inline"
                  value={moment(expireDate).format("MM/DD/YYYY")}
                  onChange={(date) => {
                    changeDateHandler(date, "expiry_date");
                  }}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
            </FormGroup>
          </Col>
          
          <Col sm={"12"} md={"12"}>
            {" "}
            <Typography style={{ fontSize: "1.5rem" }}>
              Payment Information
            </Typography>
          </Col>
          <Col sm="12" md="6">
            <FormGroup>
              <div>
                <Label for="totalpriceVertical">Total Price:</Label>
              </div>
              <Input
                required
                type="number"
                name="totalp"
                value={totalPrice}
                onChange={changeHandler}
                id="totalpriceVertical"
                placeholder="$"
              />
            </FormGroup>
          </Col>
          <Col sm="12" md="6">
            <FormGroup>
              <div>
                <Label for="registrationVertical">Registration Fee:</Label>
              </div>
              <Input
                required
                type="number"
                name="register_fees"
                value={registerFee}
                onChange={changeHandler}
                id="registrationVertical"
                placeholder="$"
              />
            </FormGroup>
          </Col>
          <Col sm="12" md="6">
            <FormGroup>
              <div>
                <Label for="totalpriceVertical">Down Payment:</Label>
              </div>
              <Input
                required
                type="number"
                name="dpayment"
                value={dPayment}
                onChange={changeHandler}
                id="downPaymentVertical"
                placeholder="$"
              />
            </FormGroup>
          </Col>
          <Col sm="12" md="6">
            <FormGroup>
              <div>
                <Label for="totalpriceVertical"> Balance:</Label>
              </div>
              <Input
                required
                disabled={paymentType === "pif" ? true : false}
                type="number"
                name="balance"
                value={balance}
                onChange={changeHandler}
                id="balanceVertical"
                placeholder="$"
              />

            </FormGroup>
          </Col>
          <Col sm="12" md="6">
            <div className="d-flex justify-content-start">
              <FormGroup style={{ width: "100px" }} className="form-label-group">
                <div>
                  <Label for="PaymentsFloating"># of Payments</Label>
                </div>
                <Input
                  required
                  disabled={paymentType === "pif" ? true : false}
                  type="number"
                  name="payment_time"
                  value={paymentTime}
                  onChange={changeHandler}
                  id="paymentsFloating"
                  placeholder="Payments"
                />

              </FormGroup>
              <FormGroup className="ml-1 form-label-group">
                <div>
                  <Label> Frequency</Label>
                </div>
                <CustomInput
                  required
                  type="select"
                  name="payment_type"
                  value={paymentType}
                  onChange={changeHandler}
                  id="paymentType"
                >
                  <option value="monthly">Monthly</option>
                  <option value="weekly">Weekly</option>
                  <option value="pif">PIF</option>
                </CustomInput>
              </FormGroup>
            </div>
          </Col>
          <Col sm="12" md="6">
            <FormGroup className="form-label-group">
              <div>
                <Label for="dollerFloating">Amount</Label>
              </div>
              <Input
                required
                disabled={paymentType === "pif" ? true : false}
                type="text"
                name="payment_money"
                value={paymentMoney}
                onChange={changeHandler}
                id="dollerFloating"
                placeholder="$"
              />

            </FormGroup>
          </Col>
          <Col sm="12" md="6">
            <FormGroup className="form-label-group">
              <div>
                <Label>Due</Label>
              </div>
              <CustomInput
                required
                type="select"
                name="due_every"
                value={due}
                onChange={changeHandler}
                disabled={paymentType === "pif" ? true : false}
                id="Due"
              >
                <option value="0">No due</option>
                <option value="1">1st</option>
                <option value="5">5th</option>
                <option value="10">10th</option>
                <option value="15">15th</option>
                <option value="20">20th</option>
                <option value="25">25th</option>
                <option value="30">30th</option>
              </CustomInput>

            </FormGroup>
          </Col>
          <Col sm="12" md="6">
            <FormGroup>
              <div>
                <Label for="expiryVertical">Next payment</Label>
              </div>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  style={{
                    borderRadius: "0.4em",
                    border: "1px solid #b8c2cc",
                    margin: "0",
                    padding: "6px",
                  }}
                  format="MM/dd/yyyy"
                  InputProps={{
                    disableUnderline: true,
                  }}
                  margin="normal"
                  id="date-picker-inline"
                  value={moment(startPaymentDate).format("MM/DD/YYYY")}
                  onChange={(date) => {
                    changeDateHandler(date, "start_payment_Date");
                  }}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
            </FormGroup>
          </Col>
          <Col sm="12" md="6">
            <FormGroup className="form-label-group">
              <div>
                <Label>Payment Type </Label>
              </div>
              <CustomInput
                required
                type="select"
                name="pay_inout"
                defaultValue={payInout}
                onChange={changeHandler}
                id="Due"
              >
                <option value="In house">In house</option>
                <option value="auto pay">Auto pay</option>
              </CustomInput>
            </FormGroup>
          </Col>
        </Row>
      </form>
    </div>
  );
}

export default ProductSettings;
