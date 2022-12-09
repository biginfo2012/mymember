
import React, { useState } from 'react'
import {
    XAxis,
    BarChart,
    YAxis,
    Bar,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Legend
} from 'recharts'
import { connect } from "react-redux";
import { Select } from 'antd';
import { CardBody, Card } from 'reactstrap';

const { Option } = Select

const Memberstatic = (props) => {

    const data = [
        {
            name: "Jan",
            new: 4000,
            lost: 2400,
            amt: 2400
        },
        {
            name: "Fab",
            new: 3000,
            lost: 1398,
            amt: 2210
        },
        {
            name: "Mar",
            new: 2000,
            lost: 9800,
            amt: 2290
        },
        {
            name: "Apr",
            new: 2780,
            lost: 3908,
            amt: 2000
        },
        {
            name: "May",
            new: 1890,
            lost: 4800,
            amt: 2181
        },
        {
            name: "Jun",
            new: 2390,
            lost: 3800,
            amt: 2500
        },
        {
            name: "Jul",
            new: 3490,
            lost: 4300,
            amt: 2100
        },
        {
            name: "Aug",
            new: 3490,
            lost: 4300,
            amt: 2100
        }, {
            name: "Sep",
            new: 3490,
            lost: 4300,
            amt: 2100
        }, {
            name: "Oct",
            new: 3490,
            lost: 4300,
            amt: 2100
        }, {
            name: "Nov",
            new: 3490,
            lost: 4300,
            amt: 2100
        }, {
            name: "Dec",
            new: 3490,
            lost: 4300,
            amt: 2100
        },
    ];
    return (
        <div>
            <Card>
                <CardBody>
                    <div className='d-flex justify-content-end'>
                        <Select
                            style={{ width: '200px' }}
                            defaultValue={"Active Member"}
                        >
                            <Option value="Active Member">Active Member</Option>
                            <Option value="Former Member">Former Member</Option>
                            <Option value="Leads">Leads</Option>
                            <Option value="Active Trial">Active Trial</Option>
                            <Option value="Former Trial">Former Trial</Option>
                        </Select>
                    </div>
                    <ResponsiveContainer
                        sswidth={'100%'} height={200}>
                        <BarChart
                            width={'100%'}
                            height={200}
                            data={data}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar
                                dataKey="lost"
                                fill="#eb4f44"
                                barSize={12} />
                            <Bar
                                dataKey="new"
                                fill="#0184ff"
                                barSize={12} />
                        </BarChart>
                    </ResponsiveContainer>
                </CardBody>
            </Card>
        </div >

    )
}
const mapStateToProps = (state) => {
    return {

    };
};
export default connect(mapStateToProps, {})(Memberstatic);


