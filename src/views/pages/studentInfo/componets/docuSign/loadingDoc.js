import { Typography, Dialog, DialogContent, Button } from '@material-ui/core';
import React, { useState } from 'react';

const LoadingData = () => {
  return (
    // <div className="d-flex justify-content-center align-items-center">
    //   <center>
    //     <img src="/images/loading-status-gif.webp" alt="Loading Please wait" />
    //     <h3>Loading Please wait ...</h3>
    //   </center>
    // </div>
    <div className='d-flex justify-content-center align-items-center'>
      <center>
        <img src='/images/signature-Image-removebg-preview.png'
          alt='signature '
          style={{ width: '70%', objectFit: 'contain' }}
        />
        <Button fullWidth variant='contained' className='rounded text-white' style={{ background: '#2191fd' }} >
          Create Document
        </Button>
        <Typography color='textSecondary'>Continue to document signature.. </Typography>
      </center>
    </div>
  );
};

export default LoadingData;
