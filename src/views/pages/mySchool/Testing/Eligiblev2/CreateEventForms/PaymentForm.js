import React, { useEffect } from "react";
import { Button, MenuItem, Select } from "@material-ui/core";
import "../style.css"
import { Input } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { GET_FUNNEL } from "../../../../../../redux/actions/form-builder";



const PaymentForm = (props) => {
    const { uform } = useSelector((state) => state?.FormBuilderReducer);
    // console.log(uform)
    const dispatch = useDispatch()
    const { setPayload, payload, setOption, option, selectedEvent, action } = props

    const handleOnChange = (e) => {
        let { value, name } = e.target
        setPayload({ ...payload, [name]: value, [name === "ticketPrice" ? "totalIncome" : null]: `${payload?.ticketAvailabeQuantity * value}` })
    }
    const handleOnChangeForms = (e) => {
        let { value, name } = e.target
        setPayload({ ...payload, [name]: value, [name === "ticketPrice" ? "totalIncome" : null]: `${payload?.ticketAvailabeQuantity * value}` })
    }
    useEffect(() => {
        dispatch(GET_FUNNEL())
    }, [])

    return (
        <>
            <div className="row">
                <div className="col-md-1 ">
                    <div className="verticalText">
                        <h3>REGISTER</h3>
                    </div>
                </div>
                <div className="col-md-10 ml-2">
                    <div className="headerIcons">
                        <i className="fa fa-ticket"></i>
                        <div className="headerText">
                            <span>Let's Create Tickets</span>
                        </div>
                    </div>
                    <div className="row my-2">
                        <div className="col-md-12 mb-1">
                            <label>Ticket Type</label>
                            <div className="d-flex justify-content-start">
                                <Button
                                    onClick={() => setOption("Paid")}
                                    style={{
                                        color: option === "Paid" ? "#0483fd" : "#6b6b6b",
                                        height: 50,
                                        background: option === "Paid" ? "#e6f3fe" : "",
                                        borderRadius: "4px",
                                        width: "100px",
                                        border: option === "Paid" ? "1px solid #0483fd" : "1px solid #b8c2cc",
                                    }}
                                >
                                    Paid
                                </Button>
                                <Button
                                    className="ml-1"
                                    onClick={() => setOption("Free")}
                                    style={{
                                        color: option !== "Paid" ? "#0483fd" : "#6b6b6b",
                                        height: 50,
                                        background: option !== "Paid" ? "#e6f3fe" : "",
                                        borderRadius: "4px",
                                        width: "100px",
                                        border: option !== "Paid" ? "1px solid #0483fd" : "1px solid #b8c2cc",
                                    }}
                                >
                                    Free
                                </Button>
                            </div>
                        </div>
                        <div className="col-md-6 mb-1">
                            <label>Ticket Name</label>
                            <Input
                                required
                                onChange={handleOnChange}
                                style={{ height: "50px" }}
                                className="form-control"
                                defaultValue={action === "Edit" ? selectedEvent[0]?.ticketName : payload?.ticketName}
                                name="ticketName"
                                placeholder="Give Your Ticket A Name"
                            />
                        </div>
                        <div className="col-md-6 mb-1">
                            <label>Available Quantity</label>
                            <Input
                                required
                                onChange={handleOnChange}
                                style={{ height: "50px" }}
                                className="form-control"
                                defaultValue={action === "Edit" ? selectedEvent[0]?.ticketAvailabeQuantity : payload?.ticketAvailabeQuantity}
                                name="ticketAvailabeQuantity"
                                type="number"
                                placeholder="Number Of Ticket Available"
                            />
                        </div>
                        <div className="col-md-6 mb-1">
                            <label>Price</label>
                            <Input
                                required
                                style={{ height: "50px" }}
                                className="form-control"
                                defaultValue={action === "Edit" ? selectedEvent[0]?.ticketPrice : payload?.ticketPrice}
                                name="ticketPrice"
                                type="number"
                                placeholder="Ticket Price"
                                onChange={handleOnChange}
                            />
                        </div>
                        <div className="col-md-6 mb-1">
                            <label>Registeration Form</label>

                            <Select
                                variant="outlined"
                                defaultValue="select a form"
                                onChange={handleOnChangeForms}
                                name="forms"
                                style={{
                                    border: '1px solid #ced4da',
                                    background: "white",
                                    width: "100%",
                                    height: "50px",
                                    margin: "0 !important"
                                }}>

                                {uform?.map((item, i) => {
                                    return (
                                        <MenuItem key={i}>
                                            {console.log(item)}
                                            {item?.title}</MenuItem>
                                    )
                                }
                                )}

                            </Select>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PaymentForm;