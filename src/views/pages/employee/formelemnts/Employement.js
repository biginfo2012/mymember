import { Button } from '@mui/material';
import { Input } from 'antd'
import React from 'react'
import { Col, FormGroup, Row } from 'reactstrap'
import { Label } from 'reactstrap';

const Employement = () => {
    return (
        <div className='m-1'
            style={{
                width: '80%',
            }}>
            <h4>Employment</h4>
            <Row>
                <Col sm="12" md="6" lg="6">
                    <Label className='label'  >Punch ID</Label>
                    <FormGroup>
                        <Input
                            type="text"
                            name="firstname"
                            id="firstname"
                            placeholder="Full name"
                            required
                        />
                    </FormGroup>
                    <p>The Number that this.employee can Punch in with.</p>
                </Col>
                <Col sm="12" md="6" lg="6">
                    <Label className='label' >Employee ID</Label>
                    <FormGroup>
                        <Input
                            type="text"
                            name="firstname"
                            id="firstname"
                            placeholder="Full name"
                            required
                        />
                    </FormGroup>
                    <p>Either an internal employee ID or an ID assigned by your payroll provider that used in payroll export</p>
                </Col>
                <Col sm="12" md="6" lg="6">
                    <Label className='label' >Max Weekly Hours</Label>
                    <FormGroup>
                        <Input
                            type="text"
                            name="firstname"
                            id="firstname"
                            placeholder="Full name"
                            required
                        />
                    </FormGroup>
                    <p>This is not used for overtime. <span className='primarycolor'>looking for overtime rules?</span></p>
                </Col>
                <Col sm="12" md="6" lg="6">
                    <Label className='label' >Hire Date</Label>
                    <FormGroup>
                        <Input
                            type="date"
                            name="firstname"
                            id="firstname"
                            placeholder="Full name"
                            required
                        />
                    </FormGroup>
                </Col>
            </Row>
            <Button color='error'>Deactivate Employee</Button>
            <div>
                <Button className='primary'>Save</Button>
                <Button className='action'>Discard Changes</Button>
            </div>
        </div>
    )
}

export default Employement