import { Button } from '@mui/material';
import TextArea from 'antd/lib/input/TextArea';
import React from 'react'
import { Label } from 'reactstrap';

const Notes = () => {
    return (
        <div className='m-1'
            style={{
                width: '80%',
            }}>
            <h4>Notes</h4>
            <div>
                <Label className='label'>Schaduling notes</Label>
                <TextArea
                    showCount
                    maxLength={100}
                    style={{
                        height: 120,
                        marginBottom: 24,
                    }}
                    placeholder=""
                />
                <p>These notes will be available viewing the Schadule. only you and other management staff can see Schaduling notes</p>
            </div>
            <div>
                <Button className='primary'>Save</Button>
                <Button type="text" color='error'>Discard Changes</Button>
            </div>
        </div>
    )
}

export default Notes