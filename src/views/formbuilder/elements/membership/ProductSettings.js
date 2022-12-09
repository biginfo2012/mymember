import React, {useEffect, useState} from "react"
import { FormGroup, Input, Label, Row, Col, CustomInput } from "reactstrap";
import { TextField, Typography } from "@material-ui/core";
import InputAutoComplete from "../../../pages/newstudent/components/autoComplete";
import moment from "moment";
const ProductSettings = (props) => {

  const {
    studentList,
    productFolderList,
    editor
  } = props;
  const [productList, setProductList] = useState([])
  const [studentData, setStudentData] = useState(undefined)
  const [product, setProduct] = useState(undefined)
  const [deposit, setDeposit] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const [paymentMoney, setPaymentMoney] = useState(0)
  const [startPaymentDate, setStartPaymentDate] = useState(moment().format("YYYY-MM-DD"))
  const [payInout, setPayInout] = useState('In house')
  const getSelectedHtmlElement = () => {
    return editor.getSelected();
  };
  const handleSelectStudent = (e, newValue, keyName) =>{
    setStudentData(newValue);
    let selectElement = getSelectedHtmlElement();
    let attributes = selectElement.getAttributes();
    attributes.studentData = newValue._id;
    selectElement.setAttributes(attributes);
  }

  const changeStudentNameHandler = (e) =>{

  }

  const changeProductHandler = (e, newValue, keyName) => {
    let selectElement = getSelectedHtmlElement();
    let attributes = selectElement.getAttributes();
    attributes.productData = newValue._id;
    setProduct(newValue);
    selectElement.setAttributes(attributes);
  }

  const changeHandler = (e) => {
    let selectElement = getSelectedHtmlElement();
    let attributes = selectElement.getAttributes();
    const { value, name } = e.target;
    switch (name) {
      case 'total_price':
        attributes.totalPrice = value;
        setTotalPrice(value);
        break;
      case 'deposite':
        attributes.deposit = value;
        setDeposit(value);
        break;
      case 'payment_money':
        attributes.paymentMoney = value;
        setPaymentMoney(value);
        break;
      case 'next_payment_date':
        attributes.startPaymentDate = value;
        setStartPaymentDate(value);
        break;
      case 'pay_inout':
        attributes.payInout = value;
        setPayInout(value);
        break;
    }
    console.log(attributes);
    selectElement.setAttributes(attributes);
  }

  useEffect(() => {
    let productArray = [];
    console.log(productFolderList);
    for(let productFolder of productFolderList) {
      productArray = productArray.concat(productFolder["products"])
    }
    setProductList(productArray);
    console.log(productArray);
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

    if(attributes.productData) {
      if(productArray) {
        for(let product of productArray) {
          if(product._id == attributes.productData) {
            setProduct(product)
          }
        }
      }
    }

    setTotalPrice(attributes.totalPrice);
    setDeposit(attributes.deposit);
    setPaymentMoney(attributes.paymentMoney);
    setStartPaymentDate(attributes.startPaymentDate);
    setPayInout(attributes.payInout);
  }, [studentList, productFolderList]);
  return (
    <div style={{ width: "100%" }}>
      <form className="p-1">
        <Row>
          <Col sm="12" md="12" lg="12">
            <Typography
              style={{ color: "#393939", fontSize: "1.5rem" }}
              className="mt-1"
            >
              Product Info
            </Typography>
          </Col>
          <Col>

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
          <Col sm="12" md="6" lg="6">
            <FormGroup>
              <Label>Select Product </Label>
              <InputAutoComplete
                labelName={"Product Name"}
                keyName="product_name"
                defaultValueIs={product?.product_name}
                data={productList || []}
                handleSelect={changeProductHandler}
                isEdit={true}
              />

            </FormGroup>
          </Col>
          <Col sm={"12"} md={"12"}>
            <Typography style={{ fontSize: "1.5rem" }}>
              Payment Information
            </Typography>
          </Col>
          <Col sm="12" md="4" lg="4">
            <FormGroup>
              <div>
                <Label for="totalPrice">Total Price:</Label>
              </div>
              <Input
                required
                type="number"
                name="total_price"
                value={totalPrice}
                onChange={changeHandler}
                id="total_price"
                placeholder="$"
              />
            </FormGroup>
          </Col>
          <Col sm="12" md="4" lg="4">
            <FormGroup>
              <div>
                <Label for="deposit"> Pay Now:</Label>
              </div>
              <Input
                required
                type="number"
                name="deposite"
                value={deposit}
                onChange={changeHandler}
                id="deposite"
                placeholder="$"
              />
            </FormGroup>
          </Col>
          <Col sm="12" md="4" lg="4">
            <FormGroup className="form-label-group">
              <div>
                <Label for="amount">Pay Later*</Label>
              </div>
              <TextField
                required
                type="text"
                name="payment_money"
                id="amount"
                placeholder=""
                onChange={changeHandler}
                value={paymentMoney}
                style={{
                  background:
                    (deposit == totalPrice) === true
                      ? "#dcdfe3"
                      : "#fff",
                  borderRadius: "0.4em",
                  border: "1px solid #b8c2cc",
                  width: "10rem",
                  height: "2.6em",
                  marginRight: "1em",
                }}
                InputProps={{
                  disableUnderline: true,
                }}
                disabled={
                  paymentMoney === 0 ||
                  deposit == totalPrice
                    ? true
                    : false
                }
              />
            </FormGroup>
          </Col>
          <Col sm="12" md="6" lg="6">
            <FormGroup className="form-label-group">
              <div>
                <Label for="next_payment_date">Next Payment</Label>
              </div>
              <TextField
                required
                type="date"
                name="next_payment_date"
                defaultValue={startPaymentDate}
                onChange={changeHandler}
                disabled={
                  deposit == totalPrice
                }
                style={{
                  background:
                    (deposit == totalPrice) === true
                      ? "#dcdfe3"
                      : "#fff",
                  borderRadius: "0.4em",
                  border: "1px solid #b8c2cc",
                  height: "2.6em",
                  marginRight: "1em",
                }}
                fullWidth
                InputProps={{
                  disableUnderline: true,
                }}
                id="next_payment_date"
                placeholder="Next Payment Date:"
              />
            </FormGroup>
          </Col>
          <Col sm="12" md="6" lg="6">
            <FormGroup>
              <div>
                <Label>Payment Type </Label>
              </div>
              <CustomInput
                required
                type="select"
                name="pay_inout"
                defaultValue={payInout}
                onChange={changeHandler}
                id="pay_inout"
              >
                <option defaultValue="In house">In house</option>
                <option defaultValue="auto pay">Credit Card</option>
              </CustomInput>
            </FormGroup>
          </Col>
        </Row>
      </form>
    </div>
  );
}

export default ProductSettings;
