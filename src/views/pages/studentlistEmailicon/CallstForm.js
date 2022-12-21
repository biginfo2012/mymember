import React, { useState, useRef, useEffect } from "react";
import { Col, Row, Input, Button, Label, ButtonGroup, } from "reactstrap";
import { ArrowRight } from "react-feather";

import { EditorState } from "draft-js";
import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { SEND_EMAIL } from "../../../redux/actions/email";

import { connect } from "react-redux";
import { Select, MenuItem, makeStyles, IconButton } from "@material-ui/core";
import { Device } from "twilio-client";
import states from "./states";
import axios from "axios";
import TimerCountDown from "./Timer";
import moment from "moment";
import call_rec from "../../../assets/call_rec.gif";
import { Form, FormGroup, } from 'reactstrap';
import Switch from '@mui/material/Switch';

const baseUrl = process.env.REACT_APP_BASE_URL;
const label = { inputProps: { 'aria-label': 'Switch demo' } }
const useStyles = makeStyles(() => ({
    inputStyle: {
        marginBottom: "10px",
        borderRadius: "0.4em",
        width: "100%",
        height: "2.8rem",
        border: "1px solid #b8c2cc",
        "& div": {
            padding: "0px !important",
        },
    },
}));

const getLogedInUser = () => {
    return JSON.parse(localStorage.getItem("userdata"))?.data;
};
const HorizontalCallForm = (props) => {
    console.log('here is props', '+1' + props?.item?.primaryPhone?.replace(/-/g, ''))
    const classes = useStyles();
    const [editorState, setEditorState] = React.useState(
        EditorState.createEmpty()
    );
    const EmailEditorRef = useRef(null);
    const [emailBodyType, setEmailBodyType] = useState("BASIC");
    const [fileUploaded, setFileUploaded] = useState([]);
    const [num, setNum] = useState(props?.item?.primaryPhone?.replace(/-/g, ''));
    const [state, setState] = useState({
        from: "",
        to: [props.item?.email],
        subject: "",
        title: "test",
        template: "",
        repeat_mail: "every month",
        follow_up: "4",
        design: "",
        days_type: "after",
        immediately: true,
        content_type: "",
        html: "",
        isPlaceHolders: false,
    });
    const [fromList, setFromList] = useState(null);
    const { toggleModal } = props;
    const HandleSend = async () => {
        toggleModal();
    };
    const handleSetSatet = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    };
    const EditorChange = (newState) => {
        setEditorState(newState);
    };

    useEffect(() => {
        let bussinessEmail = getLogedInUser()?.email;
        setFromList([bussinessEmail]);
        if (bussinessEmail?.length > 0) {
            setState({
                ...state,
                from: bussinessEmail,
            });
        }
    }, []);
    // handel call module start
    const [stateCall, setStateCall] = useState(states.CONNECTING);
    const [number, setNumber] = useState("");
    const [conn, setConn] = useState(null);
    const [device, setDevice] = useState(null);
    const [token, setToken] = useState("");
    const [clicked, setClicked] = useState(false);
    const [ci_time, setci_time] = useState("")
    const [recording, setRecording] = useState(false)
    const handleClick = async () => {
        try {
            console.log("call");
            var jun = moment().format("x");
            setci_time(jun)
            const identity = "phil";
            setClicked(true);
            let data = await axios.get(`${baseUrl}/v1/voice/token?identity=${encodeURIComponent(identity)}`)
            console.log('data here', data?.data?.token)
            setToken(data?.data?.token)
            // fetch(`${baseUrl}/v1/voice/token?identity=${encodeURIComponent(identity)}`)
            //     .then(response => response.json())
            //     .then(({ token }) => setToken(token))
        }
        catch (e) {
            console.log("err in call", e);
        }
    }
    console.log('recording', recording)
    const handleChangeToggle = async (event) => {
        console.log("toggle", event.target.checked);
        setRecording(event.target.checked);

    };

    useEffect(() => {
        // handleCall()
        // handleClick()
        const init = async () => {
            try {
                console.log("tokne ==?",// token
                );
                let user_id = await localStorage.getItem("user_id");
                if (token) {
                    const device = new Device();
                    setDevice(device)
                    console.log('device ready', device)
                    setStateCall(states.READY)
                    device.setup(token, {
                        // Set Opus as our preferred codec. Opus generally performs better, requiring less bandwidth and
                        // providing better audio quality in restrained network conditions. Opus will be default in 2.0.
                        codecPreferences: ['opus', 'pcmu'],
                        // Use fake DTMF tones client-side. Real tones are still sent to the other end of the call,
                        // but the client-side DTMF tones are fake. This prevents the local mic capturing the DTMF tone
                        // a second time and sending the tone twice. This will be default in 2.0.
                        fakeLocalDTMF: true,
                        // Use `enableRingingState` to enable the device to emit the `ringing`
                        // state. The TwiML backend also needs to have the attribute
                        // `answerOnBridge` also set to true in the `Dial` verb. This option
                        // changes the behavior of the SDK to consider a call `ringing` starting
                        // from the connection to the TwiML backend to when the recipient of
                        // the `Dial` verb answers.
                        enableRingingState: true,
                        allowIncomingWhileBusy: true
                    });
                    // device.sounds.incoming(ignore_call);
                    // device.on('ready',function (device){
                    //   console.log('Twilio.Device Ready!');
                    // });
                    device.on("ready", () => {
                        console.log('Twilio.Device Ready!');
                        var params = {
                            To: '+18323041166',
                            //  To: '+1' + num
                            user_id: user_id,
                            recording: recording
                        };
                        device.connect(params);
                        setStateCall(states.READY)
                    });
                    device.on('error', function (error) {
                        console.log('Twilio.Device Error: ' + error.message);
                        setStateCall('Connection Declined');
                    });
                    device.on('connect', function (conn) {
                        console.log('Successfully established call!');
                        // conn.sendDigits($(this).attr('data-digit'));
                        setStateCall('On call');
                    });
                    device.on('disconnect', function (conn) {
                        console.log('Call ended.');
                        device.disconnectAll();
                        setStateCall("end")
                    });
                    device.on('incoming', function (conn) {
                        console.log("incoming call");
                        conn.accept();
                        setStateCall("Incoming");
                    });
                }
            }

            catch (e) {
                console.log("eee", e)
            }
        }
        init();
    }, [token])

    

    const handleHangup = () => {
        try {
            device.disconnectAll();
            console.log("hangeup success",);
            setStateCall("end")
        }
        catch (e) {
            console.log("hangeup error", e);
        }
    };

   

    // handel call module end
    return (
        <div >


            <div style={{ width: "500px", display: 'flex', justifyContent: 'center' }}>

                <Row>
                    <br /><br />
                    {stateCall === states.INCOMING ?

                        <div className="call">
                            <p style={{ color: 'white' }}>Incomming {num}</p>

                            <Button
                                style={{ color: 'white' }}
                                // </div>handleClick={() => handleCall()}
                                color="green">
                                Call Incomming
                            </Button>
                        </div>
                        :

                        stateCall === states.ON_CALL ?

                            <div className="call" style={{ width: '500px' }}>
                                {/* <p style={{ color: 'white' }}>on Call {num}</p> */}
                                {/* <br /> <br /> */}
                                <div style={{ textAlign: 'center' }}>
                                    <TimerCountDown ci_time={ci_time} />
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    {recording &&
                                        <div>

                                            <img src={call_rec} style={{ width: 200, height: 50 }} />
                                            <br /> <br /></div>
                                    }

                                    <Button
                                        color="danger"
                                        className="mr-1 mb-1"
                                        style={{ color: 'white' }}
                                        onClick={() => handleHangup()}
                                    >
                                        Call end
                                    </Button>
                                </div>
                            </div>

                            :
                            stateCall == states.Declined ? <div className="call">
                                <p style={{ color: 'white' }}>Call Declined </p>

                                <Button
                                    style={{ color: 'white' }}
                                    // </div>handleClick={() => handleCall()}
                                    color="green">
                                    Call Declined
                                </Button>
                            </div>


                                :

                                stateCall == states.callEnd ?
                                    <div className="call">
                                        <p style={{ color: 'white' }}>Your Call ended Successfully</p>
                                    </div>

                                    :
                                    <div className="call" style={{ width: '500px', }}>
                                        {/* <p style={{ color: 'white' }}>Calling on num {num}</p> */}
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                                            <div>
                                                <Form style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                                    <FormGroup switch>
                                                        <Switch {...label}
                                                            checked={recording}
                                                            onChange={handleChangeToggle}
                                                        />
                                                        <Label style={{ color: 'white' }} check> Record call </Label>
                                                    </FormGroup>
                                                </Form>
                                            </div>

                                            <Col
                                            //  lg="12" md="12"
                                            >

                                                <div className="d-flex justify-content-end">
                                                    <Button.Ripple
                                                        color="primary"
                                                        className="mr-1 mb-1"
                                                        onClick={() => handleClick()}
                                                    >
                                                        call
                                                        <ArrowRight size="14" />
                                                    </Button.Ripple>
                                                </div>
                                            </Col>
                                        </div>
                                    </div>
                    }

                    <br /><br />


                </Row>
            </div>



        </div>
    );
};

export default connect(null, { SEND_EMAIL })(HorizontalCallForm);
