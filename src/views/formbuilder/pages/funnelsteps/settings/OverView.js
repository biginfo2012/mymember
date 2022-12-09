import { Button } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { GET_SINGLE_FUNNLE, UPDATE_FUNNEL } from '../../../../../redux/actions/form-builder'
import Editsetting from './Editsetting'
import ProductsList from "./ProductsList"

const OverView = ({
    state,
    setState
}) => {
    const dispatch = useDispatch()
    const handlesubmit = () => {
        dispatch(UPDATE_FUNNEL(state, state?._id))
    }
    return (
        <div className='m-1'>
            <div className='d-flex justify-content-between'>
                <h4 style={{
                    color: '#4F4F4F'
                }}>
                    Edit Settings For This Form
                </h4>
                <div className='d-flex justify-content-end'>
                    <Button className='primary' onClick={handlesubmit}>
                        Save & update
                    </Button>
                </div>
            </div>
            <Editsetting state={state} setState={setState} />
            <ProductsList />
        </div>
    )
}

export default OverView