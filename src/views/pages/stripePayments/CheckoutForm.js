import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { Box, Typography } from "@material-ui/core";
import {
  Button
} from "reactstrap";
import { toast } from "react-toastify";
import { FormGroup, Input, Label, Row, Col } from "reactstrap";
import axios from "axios";
import { useSelector } from "react-redux";

import StatusMessages, { useMessages } from './statusMessage';
import { CircularProgress } from "@material-ui/core";
import { toastCSS } from "../../../redux/actions/admin/emails";
let baseUrl = process.env.REACT_APP_BASE_URL;

const CheckoutForm = ({ num, setModal, buyCredits }) => {
  const [loader, setLoader] = useState(false)
  let { userinformation } = useSelector(state => state.userinfo)
  // console.log("user info", userinformation?.is_Already_Purchase)
  const [messages, addMessage] = useMessages();
  const [cardNum, setCardNum] = useState("")
  const [cvc, setCvc] = useState("")
  const [exp_year, setexp_year] = useState("")
  const [exp_month, setexp_month] = useState("")

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoader(true)
    let user_id = await localStorage.getItem("user_id");
    // console.log('user id', user_id);
    console.log("num here", num)
    console.log("buyCredits", buyCredits)
    if (num == "buyCredits") {
      console.log("call ");
      // const { error, paymentMethod } = await stripe.createPaymentMethod({
      //   type: "card",
      //   card: elements.getElement(CardElement),
      // });
      // if (!error) {
      //   console.log("Stripe 23 | token generated!", paymentMethod);
      const stripePayment = async () => {
        let pData = {
          email: userinformation.email,
          amount: +buyCredits == 5 ? 4.99 : +buyCredits == 10 ? 9.99 : 14.99,
          currency: "USD",
          description: "Your Company Description",
          payment_method: 0,
          confirm: true,
          exp_month: exp_month,
          exp_year: exp_year,
          country: 'US',
          cardNum: cardNum,
          cvc: cvc
        }
        console.log('stripe data', pData)
        return await axios.post(`${baseUrl}/api/stripePayment`, pData)
      }
      // const Addcredits = async () => {
      //   let cData =
      //   {
      //     credits: +buyCredits == 5 ? 300 : +buyCredits == 10 ? 700 : 1500,
      //     payment_method: 0,
      //   }
      //   return await axios.put(`${baseUrl}/api/Addcredits/${userinformation?.userPakages?._id}`, cData)
      // }
      // const BuyingHistory = async () => {
      //   return await axios.post(`${baseUrl}/api/BuyingHistory`, { userId: user_id, creditsBuy: +buyCredits == 5 ? 4.99 : +buyCredits == 10 ? 9.99 : 14.99, })
      // }
      const DepositAmount = async () => {
        let newData = {
          wallet: buyCredits,
          user_id: user_id
        }
        return await axios.post(`${baseUrl}/api/depositAmount`, newData)
      }
      Promise.all([
        stripePayment(),
        DepositAmount()
      ])
        .then(function (results) {
          const data = results[0];
          const data1 = results[1];
          toast.success("Transaction Successfully", toastCSS());
          setModal(false)
          setLoader(false)
        }).catch(e => {
  
          setLoader(false)
          setLoader(false)
          toast.error("Something Went Wrong", toastCSS());
        });



    } else {

      // update user record start
      const purchase_num = async () => {
        let data1 = {
          purchased_Num: num,
          is_Already_Purchase: true,
          credits: 300
        }
        return await axios.put(`${baseUrl}/api/purchase_num/${user_id}`, data1)
      }
      // add credits  start
      const addNewCredits = async () => {
        let ndata = {
          credits: 300,
          userDocumentId: user_id
        }
        return await axios.post(`${baseUrl}/api/addNewCredits`, ndata)
      }
      const stripePayment = async () => {

        let pData = {
          email: userinformation.email,
          amount: 9.99,
          currency: "USD",
          description: "Your Company Description",
          // payment_method: paymentMethod?.id,
          payment_method: 0,
          confirm: true,
          // exp_month: paymentMethod?.card?.exp_month,
          // exp_year: paymentMethod?.card?.exp_year,
          exp_month: exp_month,
          exp_year: exp_year,
          // country: paymentMethod?.card?.country,
          country: 'US',

          cardNum: cardNum,
          cvc: cvc
        }
        return await axios.post(`${baseUrl}/api/stripePayment`, pData)
      }

      const BuyingHistory = async () => {
        return axios.post(`${baseUrl}/api/BuyingHistory`, { userId: user_id, creditsBuy: 9.99 })
      }
      // if already buy a number start
      if (userinformation?.is_Already_Purchase) {
        Promise.all([purchase_num(), addNewCredits(), stripePayment(), BuyingHistory()])
          .then(function (results) {
            const data = results[0];
            const data1 = results[1];
            const data2 = results[2];
            const data3 = results[3];

            toast.success("Transaction Successfully", toastCSS());
            setModal(false)
            setLoader(false)
          }).catch(e => {
            console.log('e', e)
            setLoader(false)
            setLoader(false)
            toast.error("Something Went Wrong", toastCSS());
          });

      }
      // if already buy a number end
      else {
        Promise.all([purchase_num(), addNewCredits(), BuyingHistory()])
          .then(function (results) {
            const data = results[0];
            const data1 = results[1];
            const data2 = results[2];
            toast.success("Transaction Successfully", toastCSS());
            setModal(false)
            setLoader(false)
          }).catch(e => {
            console.log('e', e)
            setLoader(false)
            setLoader(false)
            toast.error("Something Went Wrong", toastCSS());
          });
      }
    }



  }
  // useEffect(() => {
  //   const getUsserInfo = async () => {
  //     let user_id = await localStorage.getItem("user_id");
  //     let data = await axios.get(`${baseUrl}/api/user/${user_id}`)
  //     console.log('get uer data',data.data);
  //   }
  //   getUsserInfo()
  // }, [])
  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
      <StatusMessages messages={messages} />
      <Col sm="12" md="12" lg="12">
        <Typography
          style={{ color: "#393939", fontSize: "1.6rem" }}
          className="mt-1"
        >
          Card Details
        </Typography>
      </Col>

      <Col md="12" sm="12" lg="6">
        <Row>
          <Col md="12" sm="12" lg="12">
            <FormGroup className="form-label-group">


              <div>
                <Label htmlFor="CardHolder">Card Holder Name</Label>
              </div>
              <Input
                disabled
                required
                type="text"
                name="card_holder_name"
                id="CardHolder"
                placeholder="card holder name"
                defaultValue={userinformation.firstname + " " + userinformation.lastname}
              />

            </FormGroup>
          </Col>
          <Col md="12" sm="12" lg="12">
            <FormGroup className="form-label-group">


              <div>
                <Label htmlFor="CardHolder">Email</Label>
              </div>
              <Input
                disabled
                required

                type="text"
                name="card_holder_name"
                id="CardHolder"
                placeholder="card holder name"
                defaultValue={userinformation.email}
              />

            </FormGroup>
          </Col>
          <Col md="12" sm="12" lg="12">
            <FormGroup className="form-label-group">


              <div>
                <Label htmlFor="CardHolder">Amount</Label>
              </div>
              <Input
                disabled
                required

                type="text"
                name="card_holder_name"
                id="CardHolder"
                placeholder="card holder name"
                defaultValue={buyCredits ? "$" + buyCredits : "$10.00"}
              />

            </FormGroup>
          </Col>
          {userinformation?.is_Already_Purchase ?
            <div>
              <Col md="12" sm="12" lg="12">
                <FormGroup className="form-label-group">


                  <div>
                    <Label htmlFor="CardHolder">Enter Card Num</Label>
                  </div>
                  <Input

                    required

                    type="text"
                    name="card_holder_name"
                    id="CardHolder"
                    placeholder="Enter Card Num"
                    value={cardNum}
                    onChange={(e) => setCardNum(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col md="12" sm="12" lg="12">
                <FormGroup className="form-label-group">


                  <div>
                    <Label htmlFor="CardHolder">CVC</Label>
                  </div>
                  <Input

                    required

                    type="text"
                    name="card_holder_name"
                    id="CardHolder"
                    placeholder="CVC"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value)}
                  />

                </FormGroup>
              </Col>
              <Col md="12" sm="12" lg="12">
                <FormGroup className="form-label-group">


                  <div>
                    <Label htmlFor="CardHolder">Exp month</Label>
                  </div>
                  <Input
                    required
                    type="text"
                    name="exp month"
                    id="exp month"
                    placeholder="expmonth"
                    value={exp_month}
                    onChange={(e) => setexp_month(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col md="12" sm="12" lg="12">
                <FormGroup className="form-label-group">


                  <div>
                    <Label htmlFor="CardHolder">exp year</Label>
                  </div>
                  <Input
                    required
                    type="text"
                    name="exp year"
                    id="exp year"
                    placeholder="exp year"
                    value={exp_year}
                    onChange={(e) => setexp_year(e.target.value)}
                  />
                </FormGroup>
              </Col>
            </div> : null}
        </Row>
      </Col>
      {/* <Box pt={5} pb={5}>
        <CardElement onChange={(e) => console.log("ee", e)} />
      </Box> */}
      <Box display='flex' alignItems="center">
        <Button onClick={() => setModal(false)} color="secondary" style={{ border: "1px solid black", color: 'black' }} >Cancel</Button>
        {loader ? <CircularProgress /> :
          <Button color="primary" >Pay </Button>}
      </Box>

    </form>
  );
};


export default CheckoutForm;