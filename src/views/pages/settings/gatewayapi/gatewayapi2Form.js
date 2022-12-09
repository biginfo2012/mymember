import React from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  FormGroup,
  Col,
  Input,
  Form,
  Button
} from "reactstrap"

// import Checkbox from "../../../components/@vuexy/checkbox/CheckboxesVuexy"

class HorizontalForm extends React.Component {
  render() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Text Api Details</CardTitle>
        </CardHeader>
        <CardBody>
          <Form>
            <FormGroup row>
              <Col xs="12" md="4">
                <span>Sid</span>
              </Col>
              <Col xs="12" md="8">
                <Input
                  type="text"
                  name="Sid"
                  id="Sid"
                  placeholder="Sid"
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col xs="12" md="4">
                <span>Message Service ID</span>
              </Col>
              <Col xs="12" md="8">
                <Input
                  type="text"
                  name="Service"
                  id="Service"
                  placeholder="Message Service ID
                  "
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col xs="12" md="4">
                <span>Token</span>
              </Col>
              <Col xs="12" md="8">
                <Input
                  type="text"
                  name="Token"
                  id="Token"
                  placeholder="Token"
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col xs="12" md="4">
                <span>Twiilo No</span>
              </Col>
              <Col xs="12" md="8">
                <Input
                  type="text"
                  name="Twiilo No"
                  id="Twiilo"
                  placeholder="Twiilo No
                  "
                />
              </Col>
            </FormGroup>



            <FormGroup row>
              <Col xs="12" md={{ size: 8, offset: 4 }} className="justify-content-end d-flex">
                <Button.Ripple
                  color="primary"
                  type="submit"
                  className="mb-1"
                  onClick={e => e.preventDefault()}
                >
                  Save
                </Button.Ripple>
              </Col>
            </FormGroup>
          </Form>
        </CardBody>
      </Card>
    )
  }
}
export default HorizontalForm
