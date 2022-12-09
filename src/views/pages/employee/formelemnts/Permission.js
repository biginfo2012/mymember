import React, { useEffect } from 'react'
import { Col, FormGroup, Label, Row } from 'reactstrap'
import { Button, Checkbox, FormControlLabel, Switch } from "@material-ui/core";
import { Input, Select } from 'antd';
import { GET_EMPLOYEE_ROLES_LIST } from '../../../../redux/actions/employee_subusers_roles';
import { connect } from 'react-redux';

const Permission = ({
  employeeRolesList,
  GET_EMPLOYEE_ROLES_LIST,
}) => {
  useEffect(() => {
    GET_EMPLOYEE_ROLES_LIST()
  }, [])

  return (
    <div className='w-100 m-2 mt-0'>
      <h4>Permission</h4>
      <br />
      <Row>
        <Col sm="12" md="3" lg="3">
          <Label className="label" htmlFor="phone_number">User Name</Label>
          <FormGroup>
            <Input
              placeholder='User Name'
              variant="outlined"
              style={{
                border: '1px solid #ced4da',
                background: "white",
                width: "100%"
              }} />
          </FormGroup>
        </Col>
        <Col sm="12" md="3" lg="3">
          <Label className="label" htmlFor="phone_number">Status</Label>
          <FormGroup>
            <Select
              style={{ width: "100%" }}
            >
              <Select.Option value={"Active"}>
                {'Active'}
              </Select.Option>
              <Select.Option value={"Active"}>
                {'Inactive'}
              </Select.Option>
              <Select.Option value={"Active"}>
                {'Terminate'}
              </Select.Option>
            </Select>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col sm="12" md="3" lg="3">
          <Label className="label" htmlFor="phone_number">Password</Label>
          <FormGroup>
            <Input
              placeholder='Password'
              variant="outlined"
              style={{
                border: '1px solid #ced4da',
                background: "white",
                width: "100%"
              }} />
          </FormGroup>
        </Col>
        <Col sm="12" md="3" lg="3">
          <Label className="label" htmlFor="phone_number">Re Enter Password</Label>
          <FormGroup>
            <Input
              placeholder='Password'
              variant="outlined"
              style={{
                border: '1px solid #ced4da',
                background: "white",
                width: "100%"
              }} />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col sm="12" md="3" lg="3">
          <Label className="label" htmlFor="phone_number">Employee Type</Label>
          <FormGroup>
            <Select
              style={{ width: "100%" }}
            >
              {employeeRolesList?.map((info, index) => {
                return (
                  <Select.Option value={info?._id} key={index + 1}>
                    {info?.rolename}
                  </Select.Option>
                );
              })}
            </Select>
          </FormGroup>
        </Col>
      </Row>
      <div>
        <FormControlLabel
          control={
            <Checkbox name="email" color='primary' />
          }
          label="Invite to Mymember via Email/SMS"
        />
      </div>
      <Button
        variant='contained'
        className='primary'
        style={{
          borderRadius: '6px'
        }}
      >Save</Button>
      <Button
        className='action'
      >Discard Changes</Button>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    employeeRolesList: state.employeeSubUser.employeeRolesList,
  };
};
export default connect(mapStateToProps, { GET_EMPLOYEE_ROLES_LIST })(Permission);