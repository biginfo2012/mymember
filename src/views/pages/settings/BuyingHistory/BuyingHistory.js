
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
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from '../../stripePayments/CheckoutForm';
import { useSelector } from 'react-redux';
let baseUrl = process.env.REACT_APP_BASE_URL
export default function BuyingHistory() {
    let { userinformation } = useSelector(state => state.userinfo)
    // console.log("userInfo", userinformation?.userPakages);
    const [loader, setLoader] = useState(false)
    const [buy_list, setBuy_list] = useState([])

    const getUserAccount = async () => {
        return await axios.get(`${baseUrl}/api/BuyHistory`)
    }
    useEffect(() => {
        const init = async () => {
            let user_id = await localStorage.getItem("user_id");
            try {
                setLoader(true)
                Promise.all([getUserAccount()])
                    .then(function (results) {
                        const data = results[0];
                        setLoader(false)
                        let filerData = data?.data?.data.filter(item => item?.userId == user_id)
                        // console.log("filerData ", filerData)
                        setBuy_list(filerData)
                    }).catch(e => {
                        console.log('e', e)
                        setLoader(false)
                    });

            } catch (e) {
                setLoader(false)
            }
        }
        init()
    }, [])

    return (
        <div>
            {loader ?
                <div className="my-5 text-center"><CircularProgress /></div> :
                <Card>
                    <h2>
                        Buying History
                    </h2>
                    <Row>
                        <Col md="6" sm="12">

                            {buy_list?.length > 0 ? buy_list?.map((item, i) => {
                                return <ListGroup>
                                    <ListGroupItem className="justify-content-between">
                                        <Box display={'flex'} justifyContent="space-between" alignItems={'center'}>
                                            <Box>
                                                <span style={{ paddingRight: 5 }}>
                                                    <WifiCalling3Icon />
                                                </span>
                                                {item.userId}
                                            </Box>
                                            <Button color="success" >
                                                $ {item.creditsBuy}
                                            </Button></Box>
                                    </ListGroupItem>
                                </ListGroup>
                            }) : <Label>No Record Found Yet</Label>}
                        </Col>
                    </Row>

                </Card>}
        </div>
    )
}
