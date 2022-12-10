
import React, { useState, useEffect } from 'react'
import {
  FormGroup,
  Input,
  Label,
  CustomInput,
  Row,
  Col,
  Card,
  CardBody,
  Form, ListGroup, ListGroupItem, Badge, Button, Modal, ModalHeader, ModalBody, ModalFooter
} from "reactstrap";

import { CircularProgress } from "@material-ui/core";
import { Elements } from "@stripe/react-stripe-js";
import axios from 'axios';
import WifiCalling3Icon from '@mui/icons-material/WifiCalling3';
import { Box } from '@mui/material';
import { loadStripe } from "@stripe/stripe-js"
//import CheckoutForm from '../../stripePayments/CheckoutForm';
import { useSelector } from 'react-redux'

let baseUrl = process.env.REACT_APP_BASE_URL

const PUBLIC_KEY = "pk_test_51KRZKuEqCRWTYE4oajfAApSgOqzCU9ruLRd7zwW10FEX8B3W4mLTnnloeN14ukofwhWSnZeAPgTQxIIGPsZPbXd400qKPcMKF5"

const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default function AvailabeSearchNum({
                                            selectedNumNew, setSelectedNumNew, setPurchaseModel , region, setRegion
                                          }) {
  let { userinformation } = useSelector(state => state.userinfo)
  // console.log("userInfo", userinformation?.userPakages);
  const [loader, setLoader] = useState(false)
  const [model, setModal] = useState(false)
  // const [selectedNum, setSelectedNum] = useState('')
  // const [region, setRegion] = useState("US")
  const [num_List, setNum_List] = useState([]);
  const HandelAxios = async () => {
    let user_id = await localStorage.getItem("user_id");
    let ndata = {
      credits: 300,
      userDocumentId: user_id
    }
    // let data = await axios.post(`${baseUrl}/api/addNewCredits`, ndata)
    // console.log('data', data.data.data.credits)

    let data = await axios.put(`${baseUrl}/api/credits/${userinformation?.userPakages?._id}`)
    console.log('data', data.data)

    // let data = await axios.put(`${baseUrl}/api/Addcredits/${userinformation?.userPakages?._id}`)
    // console.log('data', data.data.data.credits)
  }
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
    let { value } = e.target
    setRegion(value)
  }
  return (
    <div>
      <Card >
        <CardBody>
          {/* <Form className="mt-2" action="/"
                        onSubmit={this.handleRegister}
                      > */}
          <Row>
            <Col md="12" sm="12">
              <h2>
                Select Number
              </h2>
              <br />
              {/* <Button color="primary" onClick={() => HandelAxios()}>API</Button>{' '} */}
              <Label>Search for availabe numbers  by city or area code </Label>
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
            </Col>
          </Row>
          {/* </Form> */}
        </CardBody>
      </Card>
      {loader ?
        <div className="my-5 text-center"><CircularProgress /></div> :
        <Card >

          <Row>
            <Col>
              {userinformation?.is_Already_Purchase ?
                <Box>
                  <h3> Already Purchase Number : {userinformation?.purchased_Num}</h3>
                </Box>
                : null}
              <div className='AddScroll'>

                {num_List?.length > 0 ? num_List?.map((item, i) => {
                  return <ListGroup>
                    <ListGroupItem className="justify-content-between">
                      <Box display={'flex'} justifyContent="space-between" alignItems={'center'}>
                        <Box>
                                                    <span style={{ paddingRight: 5 }}>
                                                        <WifiCalling3Icon />
                                                    </span>
                          {item?.phoneNumber}
                        </Box>
                        <Button color="success" onClick={() => { setModal(true); setSelectedNumNew(item?.phoneNumber);

                          setPurchaseModel(false)

                        }}>
                          select
                        </Button></Box>
                    </ListGroupItem>
                  </ListGroup>
                }) : <Label>No Record Found Yet</Label>}
              </div>
            </Col>
          </Row>
        </Card>}

      {/* model box  start */}
      {/* <div>
                <Modal isOpen={model}>
                    <ModalBody>
                        <Elements stripe={stripeTestPromise}>
                            < CheckoutForm num={selectedNum} setModal={setModal} />
                        </Elements>
                    </ModalBody>
                </Modal>
            </div> */}

      {/* model box  end */}
    </div>
  )
}

