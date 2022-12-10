import React from "react"
import {
  Card,
  CardBody,
  FormGroup,
  Row,
  Col,
  Alert,
  Input,
  Form,
  Label
} from "reactstrap"

import "../../../../assets/scss/pages/users.scss"
import ImgPaypal from "../../../../assets/img/pages/paypal-logo.png"
import ImgPayment from "../../../../assets/img/pages/paymentsecure.png"
import { useSelector } from "react-redux"

const baseUrl = process.env.REACT_APP_BASE_URL;

const FloatingLabels = ({
  cardNum,
  setCardNum,
  cvc,
  setCvc,
  exp_month,
  setexp_month,
  setZip,
  zip
}) => {
  let { userinformation } = useSelector(state => state.userinfo)

  return (
    <Card>
      <CardBody>
        <Form className="mt-10">
          <Row>
            <Col sm="6">
              <FormGroup className="form-label-group">
                <Input
                  // onChange={(e)=>this.myChangeHandler(e, 'radio')}
                  type="radio"
                  name=""
                  id="radioFloating"
                  placeholder="radio"
                />
                <span> Credit or Debit Card</span>
              </FormGroup>
            </Col>
            <Col sm="6">
              <FormGroup className="form-label-group">
                <p>All major cards accepted </p>
              </FormGroup>
            </Col>
            <Col sm="8">
              <FormGroup className="form-label-group">
                <Input
                  value={cardNum}
                  onChange={(e) => setCardNum(e.target.value)}
                  type="text"
                  name="name"
                  id="nameFloating"
                  placeholder=""
                />
                <Label for="nameFloating">Card Number</Label>
              </FormGroup>
            </Col>
            <Col sm="4">
              <FormGroup className="form-label-group">
                <Input
                  value={exp_month}
                  onChange={(e) => setexp_month(e.target.value)}
                  type="date"
                  name="expery "
                  id="experyFloating"
                  placeholder=""
                />
                <Label for="emailFloating">Expery Date</Label>
              </FormGroup>
            </Col>
            <Col sm="5">
              <FormGroup className="form-label-group">
                <Input
                  value={userinformation?.email}
                  // onChange={(e)=>this.myChangeHandler(e, 'Cardholder')}
                  type="text"
                  name="phCardholderone"
                  id="CardholderFloating"
                  placeholder=""
                />
                <Label for="CardholderFloating">Cardholder name:</Label>
              </FormGroup>
            </Col>
            <Col sm="3">
              <FormGroup className="form-label-group">
                <Input
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value)}
                  type="text"
                  name="CCV"
                  id="CCVFloating"
                  placeholder=""
                />
                <Label for="CCVFloating">CCV/CVV:</Label>
              </FormGroup>
            </Col>
            <Col sm="4">
              <FormGroup className="form-label-group">
                <Input
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  type="text"
                  name="zip"
                  id="zipFloating"
                  placeholder=""
                />
                <Label for="zipFloating">Zip Code:</Label>
              </FormGroup>
            </Col>
            <Col sm="12">
              <FormGroup className="form-label-group">
                <img src={ImgPayment} className="paymentsecureimg" alt="I" />
              </FormGroup>
            </Col>

            {/* <Col sm="12">
                {this.state.error===true && <Alert color="danger">
                  {this.state.errorMsg}
                </Alert>}
                {this.state.formfilled===true && <Alert color="success">
                  Program created successfully
                </Alert>}
                </Col> */}
          </Row>
        </Form>
      </CardBody>
    </Card>
  )

}
export default FloatingLabels
