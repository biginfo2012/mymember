import { Button, Checkbox, FormControlLabel } from "@mui/material";
import React, { useState } from "react";
import { Col, FormGroup, Input, Label, Row } from "reactstrap";

const Personal = ({ payload, handleChange, handleSubmit }) => {

  return (
    <div className="w-100 m-2 mt-0">
      <form className="w-100">
        <h4>Personal</h4>
        <Row>
          <Col sm="12" md="4" lg="4">
            <Label className="label" htmlFor="first_name">
              First Name
            </Label>
            <FormGroup>
              <Input
                type="text"
                name="firstname"
                id="firstname"
                value={payload?.firstname}
                onChange={handleChange}
                placeholder="Full name"
                required
              />
            </FormGroup>
          </Col>
          <Col sm="12" md="4" lg="4">
            <Label className="label" htmlFor="lastname">
              Last Name
            </Label>
            <FormGroup>
              <Input
                type="text"
                name="lastname"
                id="lastname"
                value={payload?.lastname}
                onChange={handleChange}
                placeholder="Full name"
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col sm="12" md="4" lg="4">
            <Label className="label" htmlFor="email">
              Email
            </Label>
            <FormGroup>
              <Input
                type="text"
                name="email"
                id="email"
                value={payload?.email}
                onChange={handleChange}
                placeholder="Email"
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col sm="12" md="4" lg="4">
            <Label className="label" htmlFor="mobileNo">
              Mobile Phone
            </Label>
            <FormGroup>
              <Input
                type="number"
                name="mobileNo"
                id="mobileNo"
                placeholder="phone number..."
                value={payload?.mobileNo}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </Col>
          <Col sm="12" md="4" lg="4">
            <Label className="label" htmlFor="homeNo">
              Home Phone
            </Label>
            <FormGroup>
              <Input
                type="number"
                name="homeNo"
                id="homeNo"
                placeholder="phone number..."
                value={payload?.homeNo}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col sm="12" md="4" lg="4">
            <Label className="label" htmlFor="pronouns">
              Pronouns
            </Label>
            <FormGroup>
              <Input
                type="text"
                name="pronouns"
                id="pronouns"
                placeholder="pronouns"
                value={payload?.pronouns}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col sm="12" md="4" lg="4">
            <Label className="label" htmlFor="birthday">
              Birthday
            </Label>
            <FormGroup>
              <Input
                type="date"
                name="birthday"
                id="birthday"
                placeholder="DOB"
                value={payload?.birthday}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col sm="12" md="4" lg="4">
            <Label className="label" htmlFor="Address">
              Address
            </Label>
            <FormGroup>
              <Input
                type="text"
                name="Address"
                id="Address"
                placeholder="Address"
                value={payload?.Address}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </Col>
          <Col sm="12" md="4" lg="4">
            <Label className="label" htmlFor="zipCode">
              Zip/postal code
            </Label>
            <FormGroup>
              <Input
                type="number"
                name="zipCode"
                id="zipCode"
                placeholder="Zip Code"
                value={payload?.zipCode}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col sm="12" md="4" lg="4">
            <Label className="label" htmlFor="city">
              City
            </Label>
            <FormGroup>
              <Input
                type="text"
                name="city"
                id="city"
                placeholder="city"
                value={payload?.city}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </Col>
          <Col sm="12" md="4" lg="4">
            <Label className="label" htmlFor="state">
              State / province
            </Label>
            <FormGroup>
              <Input
                type="text"
                name="state"
                id="state"
                placeholder="state"
                value={payload?.state}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <h4>Emeraency Contact</h4>
        <Row>
          <Col sm="12" md="4" lg="4">
            <Label className="label" htmlFor="contactName">
              Contact Name
            </Label>
            <FormGroup>
              <Input
                type="text"
                name="contactName"
                id="contactName"
                placeholder="Contact Name"
                value={payload?.contactName}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </Col>
          <Col sm="12" md="4" lg="4">
            <Label className="label" htmlFor="contactNo">
              Contact Number
            </Label>
            <FormGroup>
              <Input
                type="number"
                name="contactNo"
                id="contactNo"
                placeholder="Contact Number"
                value={payload?.contactNo}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <h4>Emeraency Contact</h4>
        <div>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Invite to 7shifts via Email/SMS"
            />
          </FormGroup>
          <p className="action">
            Employes recite an ile to gel sores to Bangs ie pulisied schediies,
            Hine and avalaniily.
          </p>
        </div>
        <div>
          <div className="">
            <Button
              className="primary"
              variant="contained"
              style={{
                borderRadius: "6px",
              }}
              onClick={handleSubmit}
            >
              Save
            </Button>
            <Button className="action">Discard Changes</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Personal;
