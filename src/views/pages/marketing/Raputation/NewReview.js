import { Avatar, Button, Card, Divider, Grid, IconButton, InputBase, Paper, Rating } from "@mui/material";
import React from "react";
import person_2 from "../../../../assets/img/profile/pages/page-02.jpg"
import person_1 from "../../../../assets/img/profile/pages/page-01.jpg"
import AddReactionIcon from '@mui/icons-material/AddReaction';
import { Search } from "@material-ui/icons";
import { CustomInput } from "reactstrap";
import TripOriginRoundedIcon from '@mui/icons-material/TripOriginRounded';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';


function NewReviews() {
    return (
        <div>
            <div className="d-flex justify-content-between align-items-center w-100">
                <h3>New Reviews</h3>
                <div className="d-flex">
                    <Button
                        // className="mr-50"
                        style={{
                            color: "#6b6b6b",
                            borderRadius: "4px",
                            border: "1px solid #b8c2cc",
                        }}
                    // onClick={props?.handleClose}
                    >
                        Email Report
                    </Button>
                    <Button
                        // onClick={() => {
                        //     handleSubmit();
                        // }}
                        className="ml-1"
                        style={{
                            color: "#fff",
                            background: "#0184FF",
                            borderRadius: "4px",
                        }}
                    >
                        Send Review Invitation
                    </Button>
                </div>
            </div>
            <Divider />
            <Grid spacing={2} container>
                <Grid item sm={8} md={8} lg={8}>

                    <div>
                        <Card className="p-1 w-100 mb-1" >
                            <div className="d-flex justify-content-between align-items-center w-100">
                                <div className="d-flex align-items-center" >
                                    <Avatar variant="rounded" src={person_2} />
                                    <div className="ml-1">
                                        <h4 className="mb-0">Ajay</h4>
                                        <small className="mt-0">Left a review on <b>Google</b></small>
                                    </div>
                                </div>
                                <div>
                                    <Button
                                        // className="mr-50"
                                        style={{
                                            color: "#6b6b6b",
                                            height: 35,
                                            borderRadius: "4px",
                                            width: "80px",
                                            border: "1px solid #b8c2cc",
                                        }}
                                    // onClick={props?.handleClose}
                                    >
                                        Share
                                    </Button>
                                </div>
                            </div>
                            <div>
                                <Rating name="read-only" value={4} readOnly />
                            </div>
                            <div className="d-flex">
                                <p>I love the work you do. it is so inspiring to me.I looke forword to collaborate with you guys in future. I love the work you do. it is so inspiring to me.I looke forword to collaborate with you guys in future. I love the work you do. it is so inspiring to me.I looke forword to collaborate with you guys in future.</p>
                            </div>
                            <Divider />
                            <div className="d-flex">
                                <Avatar variant="rounded" src={person_1} />
                                <Paper
                                    className="ml-1 d-flex align-items-center w-100"
                                    style={{ backgroundColor: "#eaf4fe" }}
                                    component="form"
                                >
                                    <InputBase
                                        className="ml-1 w-100"
                                        placeholder="Reply to Ajay"
                                    // inputProps={{ 'aria-label': 'search google maps' }}
                                    />
                                    {/* <Divider style={{ height: 18 }} orientation="vertical" flexItem /> */}
                                    <IconButton aria-label="directions">
                                        <AddReactionIcon />
                                    </IconButton>
                                </Paper>
                                <Button
                                    // onClick={() => {
                                    //     handleSubmit();
                                    // }}
                                    className="ml-1"
                                    style={{
                                        color: "#fff",
                                        background: "#0184FF",
                                        borderRadius: "4px",
                                    }}
                                >
                                    Reply
                                </Button>
                            </div>
                        </Card>
                        <Card className="p-1 w-100 mb-1" >
                            <div className="d-flex justify-content-between align-items-center w-100">
                                <div className="d-flex align-items-center" >
                                    <Avatar variant="rounded" src={person_2} />
                                    <div className="ml-1">
                                        <h4 className="mb-0">Ajay</h4>
                                        <small className="mt-0">Left a review on <b>Google</b></small>
                                    </div>
                                </div>
                                <div>
                                    <Button
                                        // className="mr-50"
                                        style={{
                                            color: "#6b6b6b",
                                            height: 35,
                                            borderRadius: "4px",
                                            width: "80px",
                                            border: "1px solid #b8c2cc",
                                        }}
                                    // onClick={props?.handleClose}
                                    >
                                        Share
                                    </Button>
                                </div>
                            </div>
                            <div>
                                <Rating name="read-only" value={4} readOnly />
                            </div>
                            <div className="d-flex">
                                <p>I love the work you do. it is so inspiring to me.I looke forword to collaborate with you guys in future. I love the work you do. it is so inspiring to me.I looke forword to collaborate with you guys in future. I love the work you do. it is so inspiring to me.I looke forword to collaborate with you guys in future.</p>
                            </div>
                            <Divider />
                            <div className="d-flex">
                                <Avatar variant="rounded" src={person_1} />
                                <Paper
                                    className="ml-1 d-flex align-items-center w-100"
                                    style={{ backgroundColor: "#eaf4fe" }}
                                    component="form"
                                >
                                    <InputBase
                                        className="ml-1 w-100"
                                        placeholder="Reply to Ajay"
                                    // inputProps={{ 'aria-label': 'search google maps' }}
                                    />
                                    {/* <Divider style={{ height: 18 }} orientation="vertical" flexItem /> */}
                                    <IconButton aria-label="directions">
                                        <AddReactionIcon />
                                    </IconButton>
                                </Paper>
                                <Button
                                    // onClick={() => {
                                    //     handleSubmit();
                                    // }}
                                    className="ml-1"
                                    style={{
                                        color: "#fff",
                                        background: "#0184FF",
                                        borderRadius: "4px",
                                    }}
                                >
                                    Reply
                                </Button>
                            </div>
                        </Card>
                        <Card className="p-1 w-100 mb-1" >
                            <div className="d-flex justify-content-between align-items-center w-100">
                                <div className="d-flex align-items-center" >
                                    <Avatar variant="rounded" src={person_2} />
                                    <div className="ml-1">
                                        <h4 className="mb-0">Ajay</h4>
                                        <small className="mt-0">Left a review on <b>Google</b></small>
                                    </div>
                                </div>
                                <div>
                                    <Button
                                        // className="mr-50"
                                        style={{
                                            color: "#6b6b6b",
                                            height: 35,
                                            borderRadius: "4px",
                                            width: "80px",
                                            border: "1px solid #b8c2cc",
                                        }}
                                    // onClick={props?.handleClose}
                                    >
                                        Share
                                    </Button>
                                </div>
                            </div>
                            <div>
                                <Rating name="read-only" value={4} readOnly />
                            </div>
                            <div className="d-flex">
                                <p>I love the work you do. it is so inspiring to me.I looke forword to collaborate with you guys in future. I love the work you do. it is so inspiring to me.I looke forword to collaborate with you guys in future. I love the work you do. it is so inspiring to me.I looke forword to collaborate with you guys in future.</p>
                            </div>
                            <Divider />
                            <div className="d-flex">
                                <Avatar variant="rounded" src={person_1} />
                                <Paper
                                    className="ml-1 d-flex align-items-center w-100"
                                    style={{ backgroundColor: "#eaf4fe" }}
                                    component="form"
                                >
                                    <InputBase
                                        className="ml-1 w-100"
                                        placeholder="Reply to Ajay"
                                    // inputProps={{ 'aria-label': 'search google maps' }}
                                    />
                                    {/* <Divider style={{ height: 18 }} orientation="vertical" flexItem /> */}
                                    <IconButton aria-label="directions">
                                        <AddReactionIcon />
                                    </IconButton>
                                </Paper>
                                <Button
                                    // onClick={() => {
                                    //     handleSubmit();
                                    // }}
                                    className="ml-1"
                                    style={{
                                        color: "#fff",
                                        background: "#0184FF",
                                        borderRadius: "4px",
                                    }}
                                >
                                    Reply
                                </Button>
                            </div>
                        </Card>
                        <Card className="p-1 w-100 mb-1" >
                            <div className="d-flex justify-content-between align-items-center w-100">
                                <div className="d-flex align-items-center" >
                                    <Avatar variant="rounded" src={person_2} />
                                    <div className="ml-1">
                                        <h4 className="mb-0">Ajay</h4>
                                        <small className="mt-0">Left a review on <b>Google</b></small>
                                    </div>
                                </div>
                                <div>
                                    <Button
                                        // className="mr-50"
                                        style={{
                                            color: "#6b6b6b",
                                            height: 35,
                                            borderRadius: "4px",
                                            width: "80px",
                                            border: "1px solid #b8c2cc",
                                        }}
                                    // onClick={props?.handleClose}
                                    >
                                        Share
                                    </Button>
                                </div>
                            </div>
                            <div>
                                <Rating name="read-only" value={4} readOnly />
                            </div>
                            <div className="d-flex">
                                <p>I love the work you do. it is so inspiring to me.I looke forword to collaborate with you guys in future. I love the work you do. it is so inspiring to me.I looke forword to collaborate with you guys in future. I love the work you do. it is so inspiring to me.I looke forword to collaborate with you guys in future.</p>
                            </div>
                            <Divider />
                            <div className="d-flex">
                                <Avatar variant="rounded" src={person_1} />
                                <Paper
                                    className="ml-1 d-flex align-items-center w-100"
                                    style={{ backgroundColor: "#eaf4fe" }}
                                    component="form"
                                >
                                    <InputBase
                                        className="ml-1 w-100"
                                        placeholder="Reply to Ajay"
                                    // inputProps={{ 'aria-label': 'search google maps' }}
                                    />
                                    {/* <Divider style={{ height: 18 }} orientation="vertical" flexItem /> */}
                                    <IconButton aria-label="directions">
                                        <AddReactionIcon />
                                    </IconButton>
                                </Paper>
                                <Button
                                    // onClick={() => {
                                    //     handleSubmit();
                                    // }}
                                    className="ml-1"
                                    style={{
                                        color: "#fff",
                                        background: "#0184FF",
                                        borderRadius: "4px",
                                    }}
                                >
                                    Reply
                                </Button>
                            </div>
                        </Card>
                    </div>
                </Grid>
                <Grid item sm={4} md={4} lg={4}>
                    <Card>
                        <div className="m-1">
                            <h4>Filters</h4>
                        </div>
                        <Divider className="mt-0" />
                        <div className="m-2">
                            <label><b>Keyword Search</b></label>
                            <div style={{ border: "1px solid #b8c2cc", borderRadius: "6px" }} className="d-flex align-items-center pr-1">
                                <InputBase
                                    style={{ padding: "6px" }}
                                    variant="outlined"
                                    className="w-100"
                                    // onChange={handleChange}
                                    type="text"
                                    placeholder="search"
                                />
                                <Search size={18} />
                            </div>
                            <div className="mt-1">
                                <label><b>Location</b></label>
                                {/* <label>Status</label> */}
                                <CustomInput
                                    // onChange={handleStaus}
                                    // defaultValue={statusValue}
                                    type="select" name="status"
                                    className='' id="status">
                                    <option>All Location</option>
                                    <option value={'Past Due'}>Past Due</option>
                                    <option value={'Completed'}>Completed</option>
                                    <option value={'Pending'}>Pending</option>
                                    <option value={'Due'}>Due</option>
                                    <option value={'no filter'}>no filter</option>
                                </CustomInput>
                            </div>
                            <div className="mt-1">
                                <label><b>Date Range</b></label>
                                <CustomInput
                                    // onChange={handleStaus}
                                    // defaultValue={statusValue}
                                    type="select" name="status"
                                    className='' id="status">
                                    <option>All Dates</option>
                                    <option value={'Past Due'}>Past Due</option>
                                    <option value={'Completed'}>Completed</option>
                                    <option value={'Pending'}>Pending</option>
                                    <option value={'Due'}>Due</option>
                                    <option value={'no filter'}>no filter</option>
                                </CustomInput>
                            </div>
                            <div className="mt-1">
                                <label><b>Rating</b></label>
                                <CustomInput
                                    // onChange={handleStaus}
                                    // defaultValue={statusValue}
                                    type="select" name="status"
                                    className='' id="status">
                                    <option>All Rating</option>
                                    <option value={'Past Due'}>Past Due</option>
                                    <option value={'Completed'}>Completed</option>
                                    <option value={'Pending'}>Pending</option>
                                    <option value={'Due'}>Due</option>
                                    <option value={'no filter'}>no filter</option>
                                </CustomInput>
                            </div>
                            <div className="mt-1">
                                <label><b>Review Site</b></label>
                                <CustomInput
                                    // onChange={handleStaus}
                                    // defaultValue={statusValue}
                                    type="select" name="status"
                                    className='' id="status">
                                    <option>All Review Site</option>
                                    <option value={'Past Due'}>Past Due</option>
                                    <option value={'Completed'}>Completed</option>
                                    <option value={'Pending'}>Pending</option>
                                    <option value={'Due'}>Due</option>
                                    <option value={'no filter'}>no filter</option>
                                </CustomInput>
                            </div>
                            <div className="mt-2">
                                <p><b>Employee Tags</b></p>
                                <div className="d-flex">
                                    <TripOriginRoundedIcon style={{ color: "blue" }} />
                                    <p className="ml-1">All Reviews</p>
                                </div>
                                <div className="d-flex">
                                    <CircleOutlinedIcon style={{ color: "gray" }} />
                                    <p className="ml-1">Untagged</p>
                                </div>
                            </div>
                        </div>
                    </Card>
                </Grid>
            </Grid>
        </div>

    )
}
export default NewReviews