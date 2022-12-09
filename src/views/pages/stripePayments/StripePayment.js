import { makeStyles, Typography } from "@material-ui/core";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import React, { useState, useEffect } from "react";
import { FormGroup, Input, Label, Row, Col } from "reactstrap";
import NumberFormat from "react-number-format";
import PaymentandBillingInfo from "../shop/membership/components/payment-and-billinfo";
import BillingAddress from "../shop/membership/components/billingAddress";
import CreditCard from "../shop/membership/components/credit-card/Credit-Card.png";
import { connect } from "react-redux";
import { STRIPE_PAYMENT_METHODS_LIST } from "../../../redux/actions/stripe/index";
import PaymentMethods from "./paymentMethods";

const useStyles = makeStyles(() => ({
  cardlogoWrapper: {
    margin: "0 4px",
    borderRadius: "4px",
    padding: "6px",
    boxShadow: "0px 2px 5px 0px rgb(0 0 0 / 10%) !important",
    display: "flex",
    justifyContent: "center",
  },
  cardlogo: {
    objectFit: "contain",
    width: "60%",
    height: "2.6em",
  },
}));

const StripePayment = (props) => {
  const {
    state,
    HandleChange,
    addressChanges,
    membershipInfo,
    paymentValidation,
    loading,
    setStripePayload,
    stripePaymentMethodList,
    STRIPE_PAYMENT_METHODS_LIST,
    studentId,
  } = props;
  const [value, setValue] = React.useState("newCard");
  const classes = useStyles();
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    STRIPE_PAYMENT_METHODS_LIST(studentId);
  }, [STRIPE_PAYMENT_METHODS_LIST, studentId]);

  const addressChange = (e) => {
    addressChanges(e);
  };

  const handelToggle = () => {
    setToggle(!toggle);
  };

  const handleChange = (event, paymentBy) => {
    let PaymentMethod = { stripePaymentMethod: paymentBy };
    if (paymentBy === "existingCard") {
      PaymentMethod.card_id = stripePaymentMethodList[0]?.card_id;
      PaymentMethod.email = stripePaymentMethodList[0]?.email;
    } else {
      PaymentMethod.card_id = "";
    }
    setStripePayload(PaymentMethod);
    setValue(paymentBy);
  };
  console.log(state.expiry_date, "state.expiry_date");
  return (
    <Row>
      <Col sm="12" md="12" lg="12">
        <Typography
          style={{ color: "#393939", fontSize: "1.6rem" }}
          className="mt-1"
        >
          Payment Details
        </Typography>
      </Col>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Pay with Card" value="newCard" />
              <Tab label="Pay with Saved Cards" value="existingCard" />
            </TabList>
          </Box>
          <TabPanel value="newCard">
            <Row>
              <Col md="6" sm="12" lg="6">
                <Row>
                  <Col md="12" sm="12" lg="12">
                    <FormGroup className="form-label-group">
                      {/* <StripeCheck /> */}

                      <div>
                        <Label htmlFor="CardHolder">Card Holder Name</Label>
                      </div>
                      <Input
                        required
                        type="text"
                        name="card_holder_name"
                        id="CardHolder"
                        placeholder="card holder name"
                        //  defaultValue={state.card_holder_name}
                        onChange={(e) => HandleChange(e, "valorPIF")}
                      />
                      {paymentValidation?.card_holder_name && (
                        <span style={{ color: "red", fontSize: "12px" }}>
                          {paymentValidation?.card_holder_name}
                        </span>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md="12" sm="12" lg="12">
                    <FormGroup className="form-label-group">
                      <div>
                        <Label htmlFor="card_number">Card Number</Label>
                      </div>
                      <NumberFormat
                        required
                        type="text"
                        name="card_number"
                        id="card_number"
                        placeholder="Card number"
                        //  defaultValue={state.card_number}
                        onChange={(e) => HandleChange(e, "valorPIF")}
                        format="#### #### #### ####"
                        className="form-control"
                      />
                      {paymentValidation?.card_number && (
                        <span style={{ color: "red", fontSize: "12px" }}>
                          {paymentValidation?.card_number}
                        </span>
                      )}
                    </FormGroup>
                  </Col>

                  <Col md="4" sm="6" lg="4">
                    <FormGroup className="form-label-group">
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                      </div>
                      <NumberFormat
                        type="text"
                        name="cvv"
                        id="cvv"
                        placeholder="cvv"
                        // defaultValue={state.cvv}
                        onChange={(e) => HandleChange(e, "valorPIF")}
                        format="###"
                        className="form-control"
                      />
                      {paymentValidation?.cvv && (
                        <span style={{ color: "red", fontSize: "12px" }}>
                          {paymentValidation?.cvv}
                        </span>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md="4" sm="6" lg="4">
                    <FormGroup>
                      <div>
                        <Label htmlFor="expiry_date">Expiry Date</Label>
                      </div>
                      <NumberFormat
                        type="text"
                        required
                        name="expiry_date"
                        id="expiry_date"
                        placeholder="MM YY"
                        //value={state.expiry_date}
                        onChange={(e) => HandleChange(e, "valorPIF")}
                        format="## / ##"
                        className="form-control"
                      />
                      {paymentValidation?.expiry_date && (
                        <span style={{ color: "red", fontSize: "12px" }}>
                          {paymentValidation?.expiry_date}
                        </span>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md="4" sm="12" lg="4">
                    <FormGroup className="form-label-group">
                      <div>
                        <Label htmlFor="Amount">Amount</Label>
                      </div>
                      <Input
                        required
                        type="number"
                        name="amount"
                        id="Amount"
                        placeholder="Amount"
                        value={state.amount}
                        onChange={(e) => HandleChange(e, "valorPIF")}
                      />
                      {paymentValidation?.amount && (
                        <span style={{ color: "red", fontSize: "12px" }}>
                          {paymentValidation?.amount}
                        </span>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md="6" sm="6" lg="6">
                    <FormGroup className="form-label-group">
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                      </div>
                      <NumberFormat
                        required
                        type="text"
                        name="phone"
                        id="phone"
                        placeholder="phone"
                        value={state.phone}
                        onChange={(e) => HandleChange(e, "valorPIF")}
                        format="## #### ####"
                        className="form-control"
                      />
                      {paymentValidation?.phone && (
                        <span style={{ color: "red", fontSize: "12px" }}>
                          {paymentValidation?.phone}
                        </span>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md="6" sm="6" lg="6">
                    <FormGroup className="form-label-group">
                      <div>
                        <Label htmlFor="email">Email</Label>
                      </div>
                      <Input
                        required
                        type="email"
                        name="email"
                        id="email"
                        placeholder="email"
                        defaultValue={state.email}
                        onChange={(e) => HandleChange(e, "valorPIF")}
                      />
                      {paymentValidation?.email && (
                        <span style={{ color: "red", fontSize: "12px" }}>
                          {paymentValidation?.email}
                        </span>
                      )}
                    </FormGroup>
                  </Col>

                  {toggle && (
                    <>
                      <Col sm="12" md="12" lg="12">
                        <Typography>Billing Address</Typography>
                      </Col>
                      <Col sm="6" md="6" lg="6">
                        <FormGroup>
                          <Label>Street Number</Label>
                          <Input
                            type="text"
                            name="street_no"
                            placeholder="Street no.."
                            defaultValue={state?.address?.street_no}
                            onChange={(e) => HandleChange(e, "valorPIF", true)}
                          />
                        </FormGroup>
                      </Col>
                      <Col sm="6" md="6" lg="6">
                        <FormGroup>
                          <Label>Zip</Label>
                          <Input
                            type="number"
                            name="zip"
                            placeholder="Zip code.."
                            defaultValue={state?.address?.zip}
                            onChange={(e) => HandleChange(e, "valorPIF", true)}
                          />
                        </FormGroup>
                      </Col>
                      <Col sm="12" md="12" lg="12">
                        <FormGroup>
                          <Label>Address</Label>
                          <Input
                            type="textarea"
                            name="address"
                            placeholder="address.."
                            defaultValue={state?.address?.address}
                            onChange={(e) => HandleChange(e, "valorPIF", true)}
                          />
                        </FormGroup>
                      </Col>
                    </>
                  )}
                  <Col md="12" sm="12" lg="12">
                    <div className={classes.cardlogoWrapper}>
                      <img
                        src={CreditCard}
                        className={classes.cardlogo}
                        alt={"Card"}
                      />
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col md="6" sm="12" lg="6">
                <div style={{ background: "#f6f6f6" }}>
                  <BillingAddress
                    addressChange={addressChange}
                    address={state?.address}
                    handelToggle={handelToggle}
                    HandleChange={HandleChange}
                  />
                  <PaymentandBillingInfo
                    HandleChange={HandleChange}
                    membershipInfo={membershipInfo}
                    loading={loading}
                  />
                </div>
              </Col>
            </Row>
          </TabPanel>
          <TabPanel value="existingCard">
            {stripePaymentMethodList && stripePaymentMethodList.length > 0 ? (
              <Row>
                <Col md="6" sm="12" lg="6">
                  <PaymentMethods
                    stripePaymentMethodList={stripePaymentMethodList}
                    setStripePayload={setStripePayload}
                  />
                  {toggle && (
                    <>
                      <Col sm="12" md="12" lg="12">
                        <Typography>Billing Address</Typography>
                      </Col>
                      <Col sm="12" md="12" lg="12">
                        <FormGroup>
                          <Label>Address</Label>
                          <Input
                            type="textarea"
                            name="address"
                            placeholder="address.."
                            defaultValue={state?.address?.address}
                            onChange={(e) => HandleChange(e, "valorPIF", true)}
                          />
                        </FormGroup>
                      </Col>
                      <Box sx={{ display: "inline-flex" }}>
                        <Col sm="6" md="6" lg="6">
                          <FormGroup>
                            <Label>Street Number</Label>
                            <Input
                              type="text"
                              name="street_no"
                              placeholder="Street no.."
                              defaultValue={state?.address?.street_no}
                              onChange={(e) =>
                                HandleChange(e, "valorPIF", true)
                              }
                            />
                          </FormGroup>
                        </Col>
                        <Col sm="6" md="6" lg="6">
                          <FormGroup>
                            <Label>Zip</Label>
                            <Input
                              type="number"
                              name="zip"
                              placeholder="Zip code.."
                              defaultValue={state?.address?.zip}
                              onChange={(e) =>
                                HandleChange(e, "valorPIF", true)
                              }
                            />
                          </FormGroup>
                        </Col>
                      </Box>
                    </>
                  )}
                  <Col md="12" sm="12" lg="12">
                    <div className={classes.cardlogoWrapper}>
                      <img
                        src={CreditCard}
                        className={classes.cardlogo}
                        alt={"Card"}
                      />
                    </div>
                  </Col>
                </Col>

                <Col md="6" sm="12" lg="6">
                  <div style={{ background: "#f6f6f6" }}>
                    <BillingAddress
                      addressChange={addressChange}
                      address={state?.address}
                      n
                      handelToggle={handelToggle}
                      HandleChange={HandleChange}
                    />
                    <PaymentandBillingInfo
                      HandleChange={HandleChange}
                      membershipInfo={membershipInfo}
                      loading={loading}
                    />
                  </div>
                </Col>
              </Row>
            ) : (
              "No payment method Found!"
            )}
          </TabPanel>
        </TabContext>
      </Box>
    </Row>
  );
};
const mapStateToProps = (state) => {
  return { stripePaymentMethodList: state.stripe.stripePaymentMethodList };
};
export default connect(mapStateToProps, { STRIPE_PAYMENT_METHODS_LIST })(
  StripePayment
);
