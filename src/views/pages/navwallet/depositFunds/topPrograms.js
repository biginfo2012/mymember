import React, { useState, useEffect } from "react"
import { DollarSign, PhoneCall, Square, } from "react-feather"
import { toast } from "react-toastify"
// import Input from "react-select/src/components/Input"
// import Input from "react-select/src/components/Input"
import { CircularProgress } from "@material-ui/core";
import { loadStripe } from "@stripe/stripe-js"
//import CheckoutForm from '../../stripePayments/CheckoutForm';
import {
  Row, Col, CardBody, Card, CustomInput, Button,
  Modal, ModalBody, Input, FormGroup, ModalFooter
} from "reactstrap"
import "../../../../assets/scss/pages/users.scss"
import { toastCSS } from "../../../../redux/actions/admin/emails"
import DepositForm from "./depositForm"
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useSelector } from "react-redux";
import AvailabeSearchNum from "../../settings/AvailableNumber/AvailabeSearchNum";

let baseUrl = process.env.REACT_APP_BASE_URL;
const PUBLIC_KEY = "pk_test_51KRZKuEqCRWTYE4oajfAApSgOqzCU9ruLRd7zwW10FEX8B3W4mLTnnloeN14ukofwhWSnZeAPgTQxIIGPsZPbXd400qKPcMKF5"
// const PUBLIC_KEY = process.env.STRIPE_PUBLISHABLE_KEY
const stripeTestPromise = loadStripe(PUBLIC_KEY);
const TopProgram = () => {
  const [loader, setLoader] = useState(false)
  let { userinformation } = useSelector(state => state.userinfo)
  const [model, setModal] = useState(false);
  const [selectedNum, setSelectedNum] = useState('buyCredits')
  const [buyCredits, setBuyCredits] = useState('')
  const [payBtn, setPayBtn] = useState(false)
  // child component data end
  const [cardNum, setCardNum] = useState("");
  const [cvc, setCvc] = useState("");

  const [exp_month, setexp_month] = useState("");
  const [zip, setZip] = useState("");
  // sms buying credits
  const [SmsBuyCredits, setSmsBuyCredits] = useState("")
  // buy month subscription
  const [buySubscription, setbuySubscription] = useState("")
  // region
  const [region, setRegion] = useState("US")
  const [num_List, setNum_List] = useState([]);
  // selected number
  const [selectedNumNew, setSelectedNumNew] = useState('')
  // submit handler
  const [PurchaseModel, setPurchaseModel] = useState(false)
  // for showing availabe credits and balance
  const [BalanceInfo, setBalanceInfo] = useState({})
  // setSelectAny
  const [SelectAny, setSelectAny] = useState(false)
  const [SelectAnySubscriptions, setSelectAnySubscriptions] = useState(false)


  useEffect(() => {
    const init = async () => {
      let user_id = await localStorage.getItem("user_id");
      let ndata = {
        user_id: user_id
      }
      let data = await axios.post(`${baseUrl}/api/balanceInfo`, ndata)
      console.log("daara balance and credits", data?.data?.data)
      if (data?.data?.success) {
        // data?.data?.data
        setBalanceInfo(data?.data?.data)
      }
    }
    init()
  }, [])

  const BuyCreditsBtn = async () => {
    let user_id = await localStorage.getItem("user_id");

    let year = exp_month.split('-')[0]
    let month = exp_month.split('-')[1]
    if (!buyCredits) {
      toast.error("Please Select deposit Amount ", toastCSS());
    }
    else if (!cardNum) {
      toast.error("Card Number  is Required", toastCSS());
    }
    else if (!exp_month) {
      toast.error("Expery date is Required", toastCSS());
    }
    else if (!cvc) {
      toast.error("CVC is Required", toastCSS());
    }
    else if (!zip) {
      toast.error("Zip is Required", toastCSS());
    }
    else {
      const stripePayment = async () => {
        let pData = {
          email: userinformation?.email,
          amount: parseFloat(buyCredits).toFixed(2),
          currency: "USD",
          description: "Your Company Description",
          payment_method: 0,
          confirm: true,
          exp_month: month,
          exp_year: year,
          country: 'US',
          cardNum: cardNum,
          cvc: cvc
        }
        return await axios.post(`${baseUrl}/api/stripePayment`, pData)
      }
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
          window.location.reload()
        }).catch(e => {
          console.log('e', e)
          setLoader(false)
          setLoader(false)
          toast.error("Something Went Wrong", toastCSS());
        });
    }
  }
  const SmsBuyCreditsBtn = async () => {

    let user_id = await localStorage.getItem("user_id");
    try {
      if (!SmsBuyCredits) {
        toast.error("Please select funds for Buy Sms credits ", toastCSS());
      }
      else if (+SmsBuyCredits > +BalanceInfo?.wallet) {
        toast.error("Please Deposit Funds First ", toastCSS());
      }
      else {
        const DepositAmount = async () => {
          let newData = {
            wallet: SmsBuyCredits,
            cretits: +SmsBuyCredits == 5 ? 300 : +SmsBuyCredits == 10 ? 700 : 1500,
            user_id: user_id
          }
          console.log('data here', newData)
          return await axios.post(`${baseUrl}/api/withdrawAmount`, newData)
        }
        Promise.all([
          DepositAmount()
        ])
          .then(function (results) {
            const data = results[0];
            toast.success("Transaction Successfully", toastCSS());
            setModal(false)
            setLoader(false)
            setSelectAny(false)
            window.location.reload()
          }).catch(e => {
            console.log('e', e)
            setLoader(false)
            setLoader(false)
            setSelectAny(false)
            toast.error("Something Went Wrong", toastCSS());
          });
      }
    } catch (e) {
      console.log("e", e)
    }
  }
  const NumberBuyCreditsBtn = async () => {
    let user_id = await localStorage.getItem("user_id");
    try {
      if (!selectedNumNew) {
        toast.error("Please select Phone Number ", toastCSS());
      } else if (10 > +BalanceInfo?.wallet) {
        toast.error("Please Deposit Funds First ", toastCSS());
      }
      else {
        const DepositAmount = async () => {
          let newData = {
            wallet: userinformation?.is_Already_Purchase ? 10 : 0,
            // cretits: +SmsBuyCredits == 5 ? 300 : +SmsBuyCredits == 10 ? 700 : 1500,
            user_id: user_id
          }
          return await axios.post(`${baseUrl}/api/withdrawAmountForBuyingNumber`, newData)
        }
        const Purchase_num = async () => {
          let ndata = {
            purchased_Num: selectedNumNew,
            is_Already_Purchase: true,
          }
          return await axios.put(`${baseUrl}/api/purchase_num/${user_id}`, ndata)
        }

        Promise.all([
          DepositAmount(),
          Purchase_num()
        ])
          .then(function (results) {
            const data = results[0];
            const data1 = results[1];
            toast.success("Transaction Successfully", toastCSS());
            setModal(false)
            setLoader(false)
            setSelectAny(false)
            window.location.reload()
          }).catch(e => {
            console.log('e', e)
            setLoader(false)
            setLoader(false)
            setSelectAny(false)
            toast.error("Something Went Wrong", toastCSS());
          });
      }
    }
    catch (e) {
      console.log("e", e)
    }
  }
  // const DepositCreditsBtn = async () => {
  //   let user_id = await localStorage.getItem("user_id");
  //   try {
  //     if (!SmsBuyCredits) {
  //       toast.error("Please select funds for Buy Sms credits ", toastCSS());
  //     } else {
  //       const DepositAmount = async () => {
  //         let newData = {
  //           wallet: SmsBuyCredits,
  //           cretits: +SmsBuyCredits == 5 ? 300 : +SmsBuyCredits == 10 ? 700 : 1500,
  //           user_id: user_id
  //         }
  //         console.log('data here', newData)
  //         return await axios.post(`${baseUrl}/api/withdrawAmount`, newData)
  //       }
  //       Promise.all([
  //         DepositAmount()
  //       ])
  //         .then(function (results) {
  //           const data = results[0];
  //           toast.success("Transaction Successfully", toastCSS());
  //           setModal(false)
  //           setLoader(false)
  //         }).catch(e => {
  //           console.log('e', e)
  //           setLoader(false)
  //           setLoader(false)
  //           toast.error("Something Went Wrong", toastCSS());
  //         });
  //     }
  //   } catch (e) {
  //     console.log("e", e)
  //   }
  // }
  //

  useEffect(() => {

    const init = async () => {
      try {
        setLoader(true)
        let data = await axios.post(`${baseUrl}/api/availablePhoneNumbers`, { value: region })
        setNum_List(data.data.data)
        setLoader(false)
      } catch (error) {
        console.log('errrrrr', error)
        setLoader(false)
      }
    }
    init()
  }, [region])
  const handleByRegion = async (e) => {
    setPurchaseModel(true)
    setSelectAny(true)
    let { value } = e.target
    setRegion(value)
  }
  const onHandelBuySubscription = async () => {
    try {
      let user_id = await localStorage.getItem("user_id");

      let year = exp_month.split('-')[0]
      let month = exp_month.split('-')[1]
      if (!buySubscription) {
        toast.error("Please Select Subscription", toastCSS());
      }
      else if (!cardNum) {
        toast.error("Card Number  is Required", toastCSS());
      }
      else if (!exp_month) {
        toast.error("Expery date is Required", toastCSS());
      }
      else if (!cvc) {
        toast.error("CVC is Required", toastCSS());
      }
      else if (!zip) {
        toast.error("Zip is Required", toastCSS());
      }
      else {
        const stripePayment = async () => {
          let pData = {
            userId: user_id,
            email: userinformation?.email,
            amount: parseFloat(buySubscription).toFixed(2),
            currency: "USD",
            description: "Your Company Description",
            payment_method: 0,
            confirm: true,
            exp_month: month,
            exp_year: year,
            country: 'US',
            cardNum: cardNum,
            cvc: cvc
          }
          return await axios.post(`${baseUrl}/api/stripePaymentSubscriptions`, pData)
        }
        Promise.all([
          stripePayment(),
          // DepositAmount()
        ])
          .then(function (results) {
            const data = results[0];
            // const data1 = results[1];
            toast.success("Transaction Successfully", toastCSS());
            setModal(false)
            setLoader(false)
            window.location.reload()
          }).catch(e => {
            console.log('e', e)
            setLoader(false)
            setLoader(false)
            toast.error("Something Went Wrong", toastCSS());
          });
      }
    } catch (e) {
      console.log('e buy sub', e)
    }
  }
  return (
    <React.Fragment>
      {loader ?
        <div className="my-5 text-center"><CircularProgress /></div>
        : null}
      <div className="title-deposit-form">
        <h3>Deposit Fund or Select a Plan</h3>
      </div>
      <Row>
        <Col lg="3" md="12">
          {/* sms start  */}
          <Card>
            <CardBody className="card-content">
              <DollarSign className="icon-circle-diposit"
                fontSize="25"
              />
              <h3 className="mass1"> Deposit Funds</h3>
              <p className="mass">You can deposit your funds here </p>

              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <span>Balance : ${BalanceInfo?.wallet}</span>
                <span>Credits:{BalanceInfo?.cretits} </span>
              </div>

              <Input
                type="number"
                name="Deposit Funds"
                id="merch"
                placeholder="Deposit Funds"
                value={buyCredits}
                onChange={(e) => {
                  // const re = /^[0-9\b]+$/;
                  const re = /^[+-]?\d*(?:[.,]\d*)?$/ // work
                  if (e.target.value === '' || re.test(e.target.value)) {
                    console.log('value', parseInt(e.target.value).toFixed(2))
                    setBuyCredits(e.target.value)
                  }
                }}
              />
              {/* <form>
                <CustomInput type="select"
                  onChange={(e) => setBuyCredits(e.target.value)}
                >
                  <option>Select Location</option>
                  <option value={"5"}>$5 1212</option>
                  <option value={"10"}>$10</option>
                  <option value={"15"}>$15</option>

                </CustomInput>
              </form>  */}
            </CardBody>

          </Card>
          {/* sms end  */}
        </Col>
        {/* subscription plan start */}
        <Col lg="3" md="12">
          <Card>
            <CardBody className="card-content">
              <PhoneCall className="icon-circle-diposit"
                fontSize="25"
              />
              <h3 className="mass1"> Subscriptions</h3>
              <p > 9.99/mo includes </p>
              <form>
                <CustomInput type="select"
                  onChange={(e) => { setbuySubscription(e.target.value); setSelectAnySubscriptions(true); }}
                >
                  <option value={"0"}>Select </option>
                  <option value={"9.99"}>$9.99 for 300 credits</option>
                </CustomInput>
              </form>
              {SelectAnySubscriptions ?
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button onClick={() => { setSelectAnySubscriptions(false); setbuySubscription('') }} className="cnfn-btn" style={{ marginTop: 10, marginBottom: 10 }}
                    color="danger"
                    outline
                  >
                    Cancel
                  </Button>
                </div> : null}
            </CardBody>
          </Card>

        </Col>
        {/* end  */}
        {/* availabe number start  */}
        <Col lg="3" md="12">
          <Card>
            <CardBody className="card-content">
              <Square className="icon-circle-diposit"
                fontSize="25"
              />
              <h3 className="mass1">SMS</h3>
              <p className="mass">View and add additional SMS Credits
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <span>Balance : ${BalanceInfo?.wallet}</span>
                <span>Credits:{BalanceInfo?.cretits} </span>
              </div>
              <form>
                <CustomInput type="select"
                  onChange={(e) => { setSmsBuyCredits(e.target.value); setSelectAny(true); }}
                >
                  <option value={"0"}>Select Location</option>
                  <option value={"5"}>$5 for 300 credits</option>
                  <option value={"10"}>$10 for 700 credits</option>
                  <option value={"15"}>$15 for 1500 credits</option>
                </CustomInput>
              </form>
              {+SmsBuyCredits > 0 ?
                <div style={{ display: 'flex' }}>
                  <Button className="cnfn-btn" style={{ marginTop: 10 }}
                    onClick={() => SmsBuyCreditsBtn()}
                  > Buy Sms</Button>
                  <Button onClick={() => { setSelectAny(false); setSmsBuyCredits('') }} className="cnfn-btn" style={{ marginTop: 10, marginBottom: 10 }}
                    color="danger"
                    outline
                  >
                    Cancel
                  </Button>

                </div> : null}
            </CardBody>
          </Card>
        </Col>
        {/* availabe number end  */}
        {/* voice card  start*/}
        <Col lg="3" md="12">
          <Card>
            <CardBody className="card-content">
              <PhoneCall className="icon-circle-diposit"
                fontSize="25"
              />
              <h3 className="mass1">Buy Number</h3>
              <p className="mass">Buy or Exchange Phone Number for $10.</p>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <span>Balance:  ${BalanceInfo?.wallet}</span>
                <span>Credits:{BalanceInfo?.cretits} </span>
              </div>
              {selectedNumNew ? <p className="mass">Selected number: {selectedNumNew} </p> : null}
              <FormGroup>
                <CustomInput
                  type="select"
                  name="select"
                  id="exampleSelect"
                  value={region}
                  //   onChange={e => this.setState({ region: e.target.region })}
                  onChange={handleByRegion}
                >
                  <option value="US">United States</option>
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  <option value="AR">Arkansas</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DE">Delaware</option>
                  <option value="DC">District Of Columbia</option>
                  {/* <option value="FL">Florida</option> */}
                  <option value="GA">Georgia</option>
                  <option value="HI">Hawaii</option>
                  <option value="ID">Idaho</option>
                  <option value="IL">Illinois</option>
                  <option value="IN">Indiana</option>
                  <option value="IA">Iowa</option>
                  {/* <option value="KS">Kansas</option> */}
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="ME">Maine</option>
                  <option value="MD">Maryland</option>
                  <option value="MA">Massachusetts</option>
                  <option value="MI">Michigan</option>
                  <option value="MN">Minnesota</option>
                  <option value="MS">Mississippi</option>
                  <option value="MO">Missouri</option>
                  <option value="MT">Montana</option>
                  <option value="NE">Nebraska</option>
                  <option value="NV">Nevada</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option>
                  <option value="NY">New York</option>
                  <option value="NC">North Carolina</option>
                  <option value="ND">North Dakota</option>
                  <option value="OH">Ohio</option>
                  <option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option>
                  <option value="SD">South Dakota</option>
                  <option value="TN">Tennessee</option>
                  <option value="TX">Texas</option>
                  <option value="UT">Utah</option>
                  <option value="VT">Vermont</option>
                  <option value="VA">Virginia</option>
                  <option value="WA">Washington</option>
                  <option value="WV">West Virginia</option>
                  <option value="WI">Wisconsin</option>
                  <option value="WY">Wyoming</option>
                  <option value="CA_AB">Alberta</option>
                  <option value="CA_BC">British Columbia</option>
                  <option value="CA_MB">Manitoba</option>
                  <option value="CA_NB">New Brunswick</option>
                  <option value="CA_NL">Newfoundland</option>
                  <option value="CA_NS">Nova Scotia</option>
                  <option value="CA_ON">Ontario</option>
                  <option value="CA_PE">Prince Edward Island</option>
                  <option value="CA_QC">Quebec</option>
                  <option value="CA_SK">Saskatchewan</option>
                </CustomInput>
              </FormGroup>
              {+selectedNumNew ?

                <div style={{ display: 'flex' }}>
                  <Button className="cnfn-btn" style={{ marginTop: 10 }}
                    onClick={() => NumberBuyCreditsBtn()}

                  > Buy Number</Button>
                  <Button onClick={() => { setSelectAny(false); setSelectedNumNew('') }} className="cnfn-btn" style={{ marginTop: 10, marginBottom: 10 }}
                    color="danger"
                    outline
                  >
                    Cancel
                  </Button>

                </div> : null}
            </CardBody>
          </Card>
          {/* voice card  end*/}
        </Col>
        {/* <Col lg="3" md="12">
          <Card>
            <CardBody className="card-content">
              <PhoneCall className="icon-circle-diposit"
                fontSize="25"
              />
              <h3 className="mass1"> Voice</h3>
              <p className="mass">View and add additional Voice Credits.</p>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <span>Balance : ${BalanceInfo?.wallet}</span>
                <span>Credits:{BalanceInfo?.cretits} </span>
              </div>
              <form>
                <CustomInput type="select">
                  <option>Select Location</option>
                  <option>Quentin Rd</option>
                </CustomInput>
              </form>
            </CardBody>
          </Card>

        </Col> */}
      </Row>

      <div className="title-deposit-form">
        <h3>Select Payment Method</h3>
      </div>
      <Row>
        <Col lg="1" md="12">
        </Col>
        <Col lg="5" md="12">
          <Card className="crdheight">
            <CardBody >
              <DepositForm
                cardNum={cardNum}
                setCardNum={setCardNum}
                cvc={cvc}
                setCvc={setCvc}

                exp_month={exp_month}
                setexp_month={setexp_month}
                zip={zip}
                setZip={setZip}
              />

            </CardBody>
          </Card>

        </Col>
        <Col lg="5" md="12">
          <Card className="crdheight">
            <CardBody className="card-content">
              {/* <h4 className="T-total">Selected Plan: None</h4> */}
              <div className="T-total">
                <h5 className="T-total-h5" >Total</h5>
                {SelectAnySubscriptions ? <p className="T-total-p">{buySubscription}</p> :
                  <p className="T-total-p">{buyCredits ? '$' + parseFloat(buyCredits).toFixed(2) : '$0.00'}</p>}
              </div>
              {SelectAnySubscriptions ? <Button className="cnfn-btn"

                onClick={() => onHandelBuySubscription()}

              > Confirm & PAY Subscriptions</Button> :
                <Button className="cnfn-btn"
                  disabled={SelectAny ? true : false}
                  onClick={() => BuyCreditsBtn()}
                > Confirm & PAY</Button>}
              <p>You agree to authorize the use of your card for this deposit and future payments.</p>
            </CardBody>
          </Card>

        </Col>
        <Col lg="1" md="12">
        </Col>
      </Row>
      {/* model box  start */}
      <div>
        <Modal isOpen={PurchaseModel}>
          <ModalBody className="HandelScroll" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AvailabeSearchNum setSelectedNumNew={setSelectedNumNew}
              setPurchaseModel={setPurchaseModel}
              region={region} setRegion={setRegion}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => setPurchaseModel(false)}>cancel </Button>
          </ModalFooter>
        </Modal>
      </div>
      {/* model box  end */}

    </React.Fragment>
  )

}

export default TopProgram
