import { Button, Checkbox, FormControlLabel } from '@mui/material'
import React from 'react'
import { Col, FormGroup, Input, Label, Row } from 'reactstrap'

const Personal = ({ changeHandler, payload }) => {
  return (
    <div className='w-100 m-2 mt-0'>
      <form className="w-100">
        <h4>Personal</h4>
        <Row>
          <Col sm="12" md="4" lg="4">
            <Label className="label" htmlFor="first_name">First name</Label>
            <FormGroup>
              <Input
                type="text"
                name="firstname"
                id="firstname"
                value={payload?.firstname}
                placeholder="Full name"
                onChange={changeHandler}
                required
              />
            </FormGroup>
          </Col>
          <Col sm="12" md="4" lg="4">
            <Label className="label" htmlFor="first_name">Lastname name</Label>
            <FormGroup>
              <Input
                type="text"
                name="firstname"
                id="firstname"
                value={payload?.firstname}
                placeholder="Full name"
                onChange={changeHandler}
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col sm="12" md="4" lg="4">
            <Label className="label" htmlFor="first_name">Email</Label>
            <FormGroup>
              <Input
                type="text"
                name="firstname"
                id="firstname"
                value={payload?.email_id}
                placeholder="Full name"
                onChange={changeHandler}
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col sm="12" md="4" lg="4">
            <Label className="label" htmlFor="phone_number">Mobile Phone</Label>
            <FormGroup>
              <Input
                type="number"
                name="phone_number"
                id="phone_number"
                placeholder="phone number..."
                value={payload?.phone_number}
                onChange={changeHandler}
                required
              />
            </FormGroup>
          </Col>
          <Col sm="12" md="4" lg="4">
            <Label className="label" htmlFor="phone_number">Home Phone</Label>
            <FormGroup>
              <Input
                type="number"
                name="phone_number"
                id="phone_number"
                placeholder="phone number..."
                value={payload?.phone_number}
                onChange={changeHandler}
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col sm="12" md="4" lg="4">
            <Label className="label" htmlFor="phone_number">Pronouns</Label>
            <FormGroup>
              <Input
                type="number"
                name="phone_number"
                id="phone_number"
                placeholder="phone number..."
                value={payload?.phone_number}
                onChange={changeHandler}
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col sm="12" md="4" lg="4">
            <Label className="label" htmlFor="phone_number">Birthday</Label>
            <FormGroup>
              <Input
                type="number"
                name="phone_number"
                id="phone_number"
                placeholder="phone number..."
                value={payload?.phone_number}
                onChange={changeHandler}
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col sm="12" md="4" lg="4">
            <Label className="label" htmlFor="phone_number">Address</Label>
            <FormGroup>
              <Input
                type="number"
                name="phone_number"
                id="phone_number"
                placeholder="phone number..."
                value={payload?.phone_number}
                onChange={changeHandler}
                required
              />
            </FormGroup>
          </Col>
          <Col sm="12" md="4" lg="4">
            <Label className="label" htmlFor="phone_number">Zip/postal code</Label>
            <FormGroup>
              <Input
                type="number"
                name="phone_number"
                id="phone_number"
                placeholder="phone number..."
                value={payload?.phone_number}
                onChange={changeHandler}
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col sm="12" md="4" lg="4">
            <Label className="label" htmlFor="phone_number">City</Label>
            <FormGroup>
              <Input
                type="number"
                name="phone_number"
                id="phone_number"
                placeholder="phone number..."
                value={payload?.phone_number}
                onChange={changeHandler}
                required
              />
            </FormGroup>
          </Col>
          <Col sm="12" md="4" lg="4">
            <Label className="label" htmlFor="phone_number">State / province</Label>
            <FormGroup>
              <Input
                type="number"
                name="phone_number"
                id="phone_number"
                placeholder="phone number..."
                value={payload?.phone_number}
                onChange={changeHandler}
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <h4>Emeraency Contact</h4>
        <Row>
          <Col sm="12" md="4" lg="4">
            <Label className="label" htmlFor="phone_number">Contact Name</Label>
            <FormGroup>
              <Input
                type="number"
                name="phone_number"
                id="phone_number"
                placeholder="phone number..."
                value={payload?.phone_number}
                onChange={changeHandler}
                required
              />
            </FormGroup>
          </Col>
          <Col sm="12" md="4" lg="4">
            <Label className="label" htmlFor="phone_number">Contact Number</Label>
            <FormGroup>
              <Input
                type="number"
                name="phone_number"
                id="phone_number"
                placeholder="phone number..."
                value={payload?.phone_number}
                onChange={changeHandler}
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <h4>Emeraency Contact</h4>
        <div>
          <FormGroup>
            <FormControlLabel control={<Checkbox defaultChecked />} label="Invite to 7shifts via Email/SMS" />
          </FormGroup>
          <p className='action'>Employes recite an ile to gel sores to Bangs ie pulisied schediies, Hine and avalaniily.</p>
        </div>
        <div>
          <div className=''>
            <Button className='primary' variant='contained'
              style={{
                borderRadius: '6px'
              }}>Save</Button>
            <Button className='action'>Discard Changes</Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Personal