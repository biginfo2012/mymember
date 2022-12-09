import moment from "moment"
import React, { useEffect } from "react"
import { connect } from "react-redux"
import {  useHistory, useParams } from "react-router-dom"
import { Row, Col, Card, CardImg, CardBody } from "reactstrap"
import { FETCH_PUBLIC_EVENTS } from "../../../../../redux/actions/test"
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';




const EventPreview = (props) => {
    const { FETCH_PUBLIC_EVENTS, fetchSingleEvents } = props
    const { eventId } = useParams()
    const history = useHistory()
    const selectedEvent = props?.fetchSingleEvents
    console.log(selectedEvent)
    useEffect(() => {
        FETCH_PUBLIC_EVENTS(eventId)
    }, [FETCH_PUBLIC_EVENTS])

    return (
        <div className="m-4">

            <div className="text-center  eventPreviewTexts">
                <h1 className="text-capitalize">
                {selectedEvent?.title}
                </h1>

            </div>
            <div className="mt-1">
                <Row>
                    <Col sm={4} md={4} lg={4}>
                        <Card>
                            <button className="btn btn-primary m-2">Register</button>
                            <CardBody>
                                <Row>
                                    <Col md={3} className="text-center">
                                        <h2>{moment(selectedEvent?.start).format("ddd")}<br />{moment(selectedEvent?.start).format("DD")}</h2>

                                    </Col>
                                    <div className="vr"></div>
                                    <Col md={8}>
                                        <h3 className="text-capitalize">{selectedEvent?.title}</h3>
                                        {/* <CardSubtitle>Meet worlds popular developers</CardSubtitle> */}
                                    </Col>
                                    <Col md={10} className="ml-2">
                                        <div className="d-flex mt-1 ml-2">
                                            <div
                                                className="d-flex justify-content-center align-items-center p-1"
                                                style={{
                                                    width: "50px",
                                                    height: "50px",
                                                    fontSize: "24px",
                                                    color: "#0783fb",
                                                    background: "#d9edfe",
                                                    borderRadius: "5px",
                                                    margin: "10px",
                                                }}
                                            >
                                                <CalendarTodayIcon />
                                            </div>
                                            <div>
                                                <p className="mt-1 font-weight-bold" style={{ fontSize: "18px" }}>
                                                    {moment(selectedEvent?.start).format("ddd DD YYYY")}
                                                    <br />
                                                    <span className="font-weight-normal" style={{ fontSize: "16px" }}>{moment(selectedEvent?.start_time).format("h:mm A")} To {moment(selectedEvent?.start_time).format("h:mm A")}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="d-flex ml-2">
                                            <div
                                                className="d-flex justify-content-center align-items-center p-1"
                                                style={{
                                                    width: "50px",
                                                    height: "50px",
                                                    fontSize: "24px",
                                                    color: "#0783fb",
                                                    background: "#d9edfe",
                                                    borderRadius: "5px",
                                                    margin: "10px",
                                                }}
                                            >
                                                <i className="fa fa-map-marker" ></i>
                                            </div>
                                            <div>
                                                <p className="mt-1 font-weight-bold" style={{ fontSize: "18px" }}>
                                                    {selectedEvent?.eventCity}
                                                    <br />
                                                    <span className="font-weight-normal" style={{ fontSize: "16px" }}>{selectedEvent?.eventStreet}, {selectedEvent?.eventState}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>

                        <Card>
                            <CardBody>
                                <Row>
                                    <h3 className="ml-2">Host Information</h3>
                                    <Col md={10} className="ml-2">
                                        <div className="d-flex ml-2">
                                            <div
                                                className="d-flex justify-content-center align-items-center p-1"
                                                style={{
                                                    width: "50px",
                                                    height: "50px",
                                                    fontSize: "24px",
                                                    color: "#0783fb",
                                                    background: "#d9edfe",
                                                    borderRadius: "5px",
                                                    margin: "10px",
                                                }}
                                            >
                                                <i className="fa fa-user" ></i>
                                            </div>
                                            <div>
                                                <p className="mt-1 font-weight-bold text-capitalize" style={{ fontSize: "18px" }}>
                                                    {selectedEvent?.hostName}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="d-flex ml-2">
                                            <div
                                                className="d-flex justify-content-center align-items-center p-1"
                                                style={{
                                                    width: "50px",
                                                    height: "50px",
                                                    fontSize: "24px",
                                                    color: "#0783fb",
                                                    background: "#d9edfe",
                                                    borderRadius: "5px",
                                                    margin: "10px",
                                                }}
                                            >
                                                <i className="fa fa-phone" ></i>
                                            </div>
                                            <div>
                                                <p className="mt-1 font-weight-bold text-capitalize" style={{ fontSize: "18px" }}>
                                                    {selectedEvent?.hostMobileNumber}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="d-flex ml-2">
                                            <div
                                                className="d-flex justify-content-center align-items-center p-1"
                                                style={{
                                                    width: "50px",
                                                    height: "50px",
                                                    fontSize: "24px",
                                                    color: "#0783fb",
                                                    background: "#d9edfe",
                                                    borderRadius: "5px",
                                                    margin: "10px",
                                                }}
                                            >
                                                <i className="fa fa-envelope-o" ></i>
                                            </div>
                                            <div>
                                                <p className="mt-1 font-weight-bold" style={{ fontSize: "18px" }}>
                                                    {selectedEvent?.hostEmail}
                                                </p>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col sm={8} md={8} lg={8}>
                        <Card>
                            <CardImg
                                alt="Card image caps"
                                src={selectedEvent?.eventBanner}
                                top
                                width="100%"
                                height="10%"
                                className="eventDetailsImage p-1 a"
                            />
                            <Col className="ml-1">
                                {/* <h3>Biggest Developer Meetup In The History Of NYC</h3> */}
                                <button className="btn btn-primary">Register</button>
                                <div className="mt-2">
                                    <h2>Event Description</h2>
                                </div>
                                <div className="mt-1 mr-1">
                                    <p>{selectedEvent?.notes}</p>
                                </div>
                            </Col>
                        </Card>
                    </Col>
                </Row>
            </div>
            <div className="text-center mt-3 font-weight-bold mapTitle">
                <h1>Find Us Here</h1>
                <div className="dv">
                    <hr />
                </div>
            </div>
            <div className="map">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6753.649862266358!2d76.31998407578007!3d32.18199532462287!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391b51c788a0bc61%3A0x75e5dd1b8005faa5!2sAlphanzo%20Technology%20Private%20Limited!5e0!3m2!1sen!2sin!4v1655899987388!5m2!1sen!2sin"
                        width="100%"
                        height="500"
                        frameborder="0"
                        allowfullscreen=""
                        aria-hidden="false"
                        tabindex="0" />

            </div>

            <div className="footerText mt-5 mb-5 text-center">
                <i className="fa fa-map-marker"></i>
                <h4>7935 Foster St. <br />Lockport, NY 14094</h4>
            </div>

        </div >
    )
}

const mapStateToProps = (state) => {
    return {
        fetchSingleEvents: state.appointmentAndEvent.fetchSingleEvents,
    };
};

export default connect(mapStateToProps, { FETCH_PUBLIC_EVENTS })(EventPreview);
