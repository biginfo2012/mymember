import {
    Grid,
    Typography,
    Switch
} from '@mui/material'
import React, {useEffect, useState} from 'react'
import QrCode from '../../components/QrCode';
import { Input, Select } from 'antd';
import Downloadhtml from '../../components/Downloadhtml';
import EmbedCode from "../../components/EmbedCode";

const { Option } = Select

const Editsetting = ({ state, setState }) => {
  const [form, setForm] = useState()
    useEffect(() => {
      state?.forms?.map(formDetail => {
        if(formDetail._id == state.formId) {
          setForm(formDetail);
        }
      })
    })
    return (
        <div id="funnelinformation">
            <Grid container spacing={2}>
                <Grid item sm={12} md={4} lg={4}>
                    <Typography className="mb-0 fw-bolder" color="textSecondary">
                        Form Name
                    </Typography>
                    <Input
                        style={{ borderRadius: "0.4em", border: "1px solid #b8c2cc", width: "100%" }}
                        type="text"
                        name="funnelName"
                        placeholder="Funnel Name"
                        onChange={(e) => {
                            setState({
                                ...state, funnelName: e.target.value
                            })
                        }}
                        defaultValue={state?.funnelName}
                    />
                </Grid>
                <Grid item sm={12} md={5} lg={5}>
                    <div className='d-flex justify-content-between w-100'>
                        <div className='w-100'>
                            <Typography className="mb-0 fw-bolder" color="textSecondary">
                                Member Type
                            </Typography>
                            <Select
                                getPopupContainer={() => document.getElementById('funnelinformation')}
                                style={{ borderRadius: "0.4em", border: "1px solid #b8c2cc", width: "100%" }}
                                placeholder="Member Type"

                                onChange={(value) => {
                                    setState({
                                        ...state, memberType: value
                                    })
                                }}
                                name="memberType"
                                defaultValue={state?.memberType}
                            >
                                <Option value="Active Student">Active Member</Option>
                                <Option value="Active Trial">Active Trial</Option>
                                <Option value="Leads">Leads</Option>
                                <Option value="Former Student">Former Member</Option>
                                <Option value="Former Trial">Former Trial</Option>
                            </Select>
                        </div>
                        <div className='w-100'>
                            <Typography className="mb-0 fw-bolder" color="textSecondary">
                                Automate Entry
                            </Typography>
                            <Switch
                                onChange={() => {
                                    setState({
                                        ...state, 'isAutomation': !state.isAutomation
                                    })
                                }}
                                checked={state?.isAutomation} />
                        </div>
                    </div>
                </Grid>
            </Grid>
            <br />
            <div className='m-1'>
                <Grid container spacing={2}>
                    <Grid item sm={12} lg={4} md={4}>
                       <EmbedCode form={form}/>
                    </Grid>
                    <Grid item sm={12} lg={4} md={4}>
                        <Downloadhtml form={form}/>
                    </Grid>
                    <Grid item sm={12} md={4} lg={4}>
                        <QrCode form={form}/>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default Editsetting
