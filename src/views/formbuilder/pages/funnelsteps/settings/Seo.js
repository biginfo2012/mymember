import {
    Grid,
    Typography,
    TextField,
    Select,
    MenuItem,
    Button,
    Card,
    Icon
} from '@mui/material'
import React from 'react'
import image from "../../../../../assets/img/image.png"

const Seo = () => {
    return (
        <div>
            <div className='d-flex justify-content-between m-1'>
                <h4>
                    Edit Settings For This Form
                </h4>
                <Button className='primary'>
                    Save & update
                </Button>
            </div>
            <Grid container spacing={2}>
                <Grid item sm={12} md={6} lg={6}>
                    <div>
                        <Typography className="mb-0 fw-bolder" color="textSecondary">
                            SEO META DATA
                        </Typography>
                        <TextField
                            fullWidth
                            style={{ borderRadius: "0.4em", border: "1px solid #b8c2cc" }}
                            variant={"outlined"}
                            size="small"
                            type="text"
                            name="customId"
                            placeholder="Click funnel landing page"

                        />
                    </div>
                </Grid>
                <Grid item sm={12} md={12} lg={12}>
                    <div>
                        <Typography className="mb-0 fw-bolder" color="textSecondary">
                            DESCRIPTION
                        </Typography>
                        <TextField
                            fullWidth
                            style={{ borderRadius: "0.4em", border: "1px solid #b8c2cc" }}
                            variant={"outlined"}
                            size="small"
                            type="textarea"
                            name="customId"
                            placeholder="Page Description"
                            maxRows={6}
                            multiline
                            rows={3}

                        />
                    </div>
                </Grid>
                <Grid item sm={12} md={4} lg={4}>
                    <div>
                        <Typography className="mb-0 fw-bolder" color="textSecondary">
                            KEYWORDS
                        </Typography>
                        <TextField
                            fullWidth
                            style={{ borderRadius: "0.4em", border: "1px solid #b8c2cc" }}
                            variant={"outlined"}
                            size="small"
                            type="text"
                            name="customId"
                            placeholder="Click funnel landing page"

                        />
                    </div>
                </Grid>
                <Grid item sm={12} md={4} lg={4}>
                    <div>
                        <Typography className="mb-0 fw-bolder" color="textSecondary">
                            AUTHOR
                        </Typography>
                        <TextField
                            fullWidth
                            style={{ borderRadius: "0.4em", border: "1px solid #b8c2cc" }}
                            variant={"outlined"}
                            size="small"
                            type="text"
                            name="customId"
                            placeholder="Click funnel landing page"

                        />
                    </div>
                </Grid>
                <Grid item sm={12} md={4} lg={4}>
                    <div>
                        <Typography className="mb-0 fw-bolder" color="textSecondary">
                            SOCIAL IMAGE
                        </Typography>
                        <div className='d-flex'>
                            <TextField
                                fullWidth
                                variant={"outlined"}
                                size="small"
                                type="text"
                                name="customId"
                                placeholder="Click funnel landing page"

                                style={{
                                    borderRadius: "0.4em",
                                    border: "1px solid #b8c2cc",
                                    borderTopRightRadius: '0',
                                    borderBottomRightRadius: '0'
                                }}
                            />
                            <Button
                                style={{
                                    background: "#ECECEC",
                                    borderTopLeftRadius: '0',
                                    borderBottomLeftRadius: '0'
                                }}>
                                <Icon style={{ height: '100%' }}>
                                    <img src={image}
                                    />
                                </Icon>
                            </Button>
                        </div>
                    </div>
                </Grid>
                <Grid item sm={12} md={12} lg={12}>
                    <div>
                        <Typography className="mb-0 fw-bolder" color="textSecondary">
                            Head Tracking Code
                        </Typography>
                        <TextField
                            fullWidth
                            style={{ borderRadius: "0.4em", border: "1px solid #b8c2cc" }}
                            variant={"outlined"}
                            size="small"
                            type="textarea"
                            name="customId"
                            placeholder=""
                            maxRows={6}
                            multiline
                            rows={3}
                        />
                    </div>
                </Grid>
                <Grid item sm={12} md={12} lg={12}>
                    <div>
                        <Typography className="mb-0 fw-bolder" color="textSecondary">
                            Body Tracking Code
                        </Typography>
                        <TextField
                            fullWidth
                            style={{ borderRadius: "0.4em", border: "1px solid #b8c2cc" }}
                            variant={"outlined"}
                            size="small"
                            type="textarea"
                            name="customId"
                            placeholder=""
                            maxRows={6}
                            multiline
                            rows={3}
                        />
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default Seo