import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Avatar from '@material-ui/core/Avatar';
import { Chip, FormGroup } from "@material-ui/core";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import moment from "moment";
import EditSubUser from "./Editemplyee";
import EditDelete from "./EditDelete";
import ConfirmationModal from "../../../components/gloabal/confirmation";
import {
  DELETE_SUB_USER,
  GET_EMPLOYEE_ROLES_LIST,
  GET_SUB_USERS_LIST,
  GET_ROLE_LIST_USERS_INFO,
  STORE_ROLE_ID
} from "../../../redux/actions/employee_subusers_roles";
import { Col, Row } from "reactstrap";
import { Select } from "antd";
// import VerificationForm from "../marketing/email/emailVerify/verifyModall";
// import RolesList from "./rolesList";
import CircularProgress from '@mui/material/CircularProgress';
import { Box, Typography, Button } from "@mui/material";
import { Link, useHistory } from "react-router-dom";

const CircularProgressWithLabel = (props) => {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} style={{ color: "#e04c16" }} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {`${Math.round(props.value)}`}
        </Typography>
      </Box>
    </Box>
  );
}

const useStyles = makeStyles({
  unverify: {
    color: "#7367f0",
    background: "#7367f029",
    fontWeight: "bold",
    borderRadius: "8px",
  },
  verify: {
    color: "#127712",
    background: "#1277122e",
    fontWeight: "bold",
    borderRadius: "8px",
  },
});

const Myemplyee = (props) => {
  const {
    role_id,
    employeeRolesList,
    GET_SUB_USERS_LIST,
    STORE_ROLE_ID,
    employeeSubUsersList
  } = props;
  const classes = useStyles();
  const [SweetAlertOpen, setSweetAlertOpen] = useState(false);
  const [subUser, setSubUserInfo] = useState(null);
  const history = useHistory()

  const confirmDelete = () => {
    setSweetAlertOpen(false);
    let { user_id } = subUser;
    props.DELETE_SUB_USER(user_id, role_id);
  };

  const handledelete = (deleteInfo) => {
    setSubUserInfo({ user_id: deleteInfo });
    setSweetAlertOpen(true);
  };

  const GetRoleName = (roleId) => {
    let result = employeeRolesList.filter((v) => v._id === roleId);
    return result[0]?.rolename;
  };
  const selectRoleHandler = (value) => {
    GET_SUB_USERS_LIST(value);
    STORE_ROLE_ID(value);
  };
  useEffect(() => {
    if (employeeRolesList.length) {
      if (role_id === null) {
        const { _id } = employeeRolesList[0];
        GET_SUB_USERS_LIST(_id);
        STORE_ROLE_ID(_id);
      }
    }
  }, [employeeRolesList]);

  useEffect(() => {
    props.GET_EMPLOYEE_ROLES_LIST();
    props.GET_ROLE_LIST_USERS_INFO();
  }, []);

  return (
    <div className="w-100">
      <Row className="mb-1">
        <Col sm="12" md="12" lg="12">
          <div className="d-flex justify-content-between">
            <FormGroup>
              <Select
                onChange={selectRoleHandler}
                style={{ width: "200px" }}
              >
                {employeeRolesList.map((info, index) => {
                  return (
                    <Select.Option value={info._id} key={index + 1}>
                      {info.rolename}
                    </Select.Option>
                  );
                })}
              </Select>
            </FormGroup>
            <div>
              <Button
                className="primary"
                onClick={() => {
                  history.push("/app/my-employee/add")
                }}>Add Employee</Button>
            </div>
          </div>
        </Col>
      </Row>
      <TableContainer>
        <Table size="small"
          aria-label="a dense table"
          style={{
            borderSpacing: '0 1em',
            borderCollapse: 'separate'
          }}>
          <TableHead >
            <TableRow>
              <TableCell>
                <span>
                  <b>Full Name</b>
                </span>
              </TableCell>
              <TableCell>
                <span>
                  <b>Start Date</b>
                </span>
              </TableCell>
              <TableCell>
                <span>
                  <b>Username</b>
                </span>
              </TableCell>
              <TableCell>
                <span>
                  <b>Email</b>
                </span>
              </TableCell>
              <TableCell>
                <span>
                  <b>Password</b>
                </span>
              </TableCell>
              <TableCell>
                <span>
                  <b>phone number</b>
                </span>
              </TableCell>
              <TableCell>
                <span>
                  <b>Role</b>
                </span>
              </TableCell>
              <TableCell>
                <b>Onboard</b>
              </TableCell>
              <TableCell>
                <span>
                  <b>Status</b>
                </span>
              </TableCell>
              <TableCell>
                <span>
                  <b>Action</b>
                </span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employeeSubUsersList?.map((item, i) => {
              return (
                <TableRow key={i} className='shadow-sm p-3 mb-5 bg-white rounded'>
                  <TableCell component="th" scope="row">
                    <div className="d-flex ">
                      <Avatar alt={item?.username} src={item?.profile_img} />
                      <Link to={{ pathname: `/app/my-employee/edit/${item?._id}`, state: { ...item } }} className="d-flex align-items-center">
                        <Typography className="mb-0 d-flex align-items-center ml-1">{`${item?.firstname} ${item?.lastname}`} </Typography>
                      </Link>
                    </div>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {moment(item?.createdAt).format("MM-DD-YYYY")}
                  </TableCell>
                  <TableCell>{item?.username}</TableCell>
                  <TableCell>{item?.email}</TableCell>
                  <TableCell>
                    <span>{item?.password}</span>
                  </TableCell>
                  <TableCell>{item?.phone}</TableCell>
                  <TableCell>{GetRoleName(item?.role)}</TableCell>
                  <TableCell>
                    <CircularProgressWithLabel value={60} />
                  </TableCell>
                  <TableCell>
                    <Chip
                      size="small"
                      label={item?.status}
                      className={
                        item?.status === "Active"
                          ? classes.verify
                          : classes.unverify
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <div className="ml-1">
                      <EditDelete
                        editfolder={<EditSubUser editVales={item} />}
                        item={item}
                        OpenAlert={handledelete}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <ConfirmationModal
        primaryColor="#0483fd"
        secondaryColor="#fff"
        imagePath="/images/delete.png"
        open={SweetAlertOpen}
        title="Delete file ?"
        onCancel={() => {
          setSweetAlertOpen(false);
        }}
        onConfirm={() => {
          confirmDelete();
        }}
        onCancelButtonTitle={"Cancel"}
        contiunuebuttonTitle={"Delete"}
        description=" Are you sure you want to delete?"
      />

    </div >
  );
};

const mapStateToProps = (state) => {
  return {
    employeeRolesList: state.employeeSubUser.employeeRolesList,
    employeeSubUsersList: state.employeeSubUser.employeeSubUsersList,
    role_id: state.employeeSubUser.role_id,
  };
};

export default connect(mapStateToProps, {
  DELETE_SUB_USER,
  GET_SUB_USERS_LIST,
  STORE_ROLE_ID,
  GET_EMPLOYEE_ROLES_LIST,
  GET_ROLE_LIST_USERS_INFO
})(Myemplyee);


