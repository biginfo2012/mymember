import { makeStyles } from '@material-ui/core';
import { Button, Card, FormGroup, MenuItem, Select, TablePagination } from '@mui/material'
import React from 'react'
import { PictureAsPdf } from '@mui/icons-material';
import { Circle, Mail } from '@mui/icons-material';
import { CardHeader } from 'reactstrap';

const data = [
    {
        "id": 1,
        "employee": "New Jersey",
        "form": "View New York IT-2014",
        "submitted": "september 27th 2021 at 4:48:00 PM",
        "status": "Received",
    },
    {
        "id": 2,
        "employee": "New Jersey",
        "form": "View New York IT-2014",
        "submitted": "september 27th 2021 at 4:48:00 PM",
        "status": "Received",
    },
    {
        "id": 3,
        "employee": "New Jersey",
        "form": "View New York IT-2014",
        "submitted": "september 27th 2021 at 4:48:00 PM",
        "status": "Received",
    },
    {
        "id": 4,
        "employee": "New Jersey",
        "form": "View New York IT-2014",
        "submitted": "september 27th 2021 at 4:48:00 PM",
        "status": "Received",
    },
    {
        "id": 5,
        "employee": "New Jersey",
        "form": "View New York IT-2014",
        "submitted": "september 27th 2021 at 4:48:00 PM",
        "status": "Received",
    },
    {
        "id": 6,
        "employee": "New Jersey",
        "form": "View New York IT-2014",
        "submitted": "september 27th 2021 at 4:48:00 PM",
        "status": "Received",
    },
]
const useStyles = makeStyles(() => ({
    cardStyle: {
        boxShadow: "0 5px 10px #e4e0e0",
        borderRadius: "8px",
    },
    avtStyle: {
        height: "30px",
        width: "30px",
    },
    inputStyle: {
        height: "3em",
        borderRadius: "0.4em",
        border: "1px solid #b8c2cc",
        "& div": {
            padding: "0px !important",
        },
    },
    row: {
        display: "grid",
        gridTemplateColumns: "10% 25% 25% 25% 15%",
    },
    rows: {
        display: "grid",
        gridTemplateColumns: "10% 25% 25% 25% 15%",
    },
}));

function EmployeeDocumentList() {
    const classes = useStyles();

    return (
        <div style={{ margin: "5px", border: "1px solid #E9E9E9" }}>
            <Card style={{ boxShadow: "none" }}>
                <div className="pl-1 pr-1 pt-0" style={{ background: "#f3f3f399" }}>
                    <div className={`p-1 pt-0 ${classes.row} border-bottom`}>
                        <div className="d-flex justify-content-start">
                        </div>
                        <div className="d-flex justify-content-center">
                            <b>Employee</b>
                        </div>
                        <div className="d-flex justify-content-center ml-2">
                            <b>Form</b>
                        </div>
                        <div className="d-flex justify-content-center ml-2">
                            <b>Submitted</b>
                        </div>
                        <div className="d-flex justify-content-center ml-2">
                            <b>Status</b>
                        </div>
                    </div>
                </div>
                {
                    data?.map((res) => {
                        return (
                            <div
                                style={{ borderBottom: "1px solid #dddddd" }}
                                className="p-1"
                            >
                                <div className={classes.rows}>
                                    <div className="d-flex">
                                        <input type="checkbox" />
                                        <Mail style={{fontSize: "30px", color: "#4EBCE8"}} className='ml-1' />
                                    </div>
                                    <div className="d-flex justify-content-center align-items-center">
                                        <PictureAsPdf  style={{fontSize: "20px", color: "#7b7474a8", margin: "5px"}}/>
                                       {res.employee}
                                    </div>
                                    <div className="d-flex justify-content-center align-items-center">
                                        {res.form}
                                    </div>
                                    <div className="">
                                        {res.submitted}
                                        {/* <Button style={{display: "flex", justifyContent: "center"}}>EDT</Button> */}
                                    </div>
                                    <div className="d-flex justify-content-center align-items-center">
                                        {res.status}
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                <TablePagination
                    component="div"
                    count={0}
                    labelRowsPerPage="Rows per page"
                    rowsPerPageOptions={[5, 10, 20, 50, 100, 150, 200]}
                />

            </Card>
        </div>
    )
}

export default EmployeeDocumentList;