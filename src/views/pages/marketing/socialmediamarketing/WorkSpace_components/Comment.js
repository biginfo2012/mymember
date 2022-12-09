import React, { useEffect, useState } from 'react'
import { Avatar, Card, Grid } from '@mui/material'
import { connect } from 'react-redux'
import { FB_POST_COMMENT } from '../../../../../redux/actions/marketing/socialMediaConnect'
import moment from 'moment'
import { toast } from "react-toastify";

export const notifySuccess = (message) =>
    toast(<p style={{ fontSize: 16 }}>{message}</p>, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        newestOnTop: false,
        closeOnClick: true,
        rtl: false,
        pauseOnFocusLoss: true,
        draggable: true,
        pauseOnHover: true,
        type: "success"
    });


const Comment = (props) => {
    const { id, FB_POST_COMMENT } = props
    const getPageAccessToken = sessionStorage.getItem("getPageAccessToken")
    const [show, setShow] = useState(false);
    const [comments, setComments] = useState()
    const [postText, setPostText] = useState("");

    useEffect(() => {
        window.FB.api(
            `/${id}/comments`,
            'GET',
            { "access_token": getPageAccessToken },
            function (response) {
                setComments(response?.data)
            }
        );
    }, [id, getPageAccessToken])

    const onCommentPost = async (commentPost) => {
        if (commentPost) {
            await FB_POST_COMMENT(id, getPageAccessToken, postText)
            notifySuccess("Data posted successfully");
        }
    }
    const handleTextMessage = (e) => {
        setPostText(e.target.value)
    }


    return (
        <Grid item sm={4} md={4} lg={4}>
            <Card>
                {
                    comments?.map((res) => {
                        const pageTime = moment(res?.created_time).utc().format('MMM Do')
                        console.log(res)
                        return (
                            <div className="fbComments" >
                                <div className="d-flex">
                                    <Avatar style={{ width: "25px", height: "25px" }} />
                                    <h5 className="ml-1">{res?.from?.name} {pageTime}</h5>
                                </div>
                                <p>{res?.message}</p>
                            </div>

                        )
                    })
                }
                <div className="post p-1" >
                    <div className='d-flex' onClick={() => setShow(!show)}>
                        <Avatar style={{ width: "25px", height: "25px" }} />
                        <p className="ml-1">Comments</p>
                    </div>
                    {show ?
                        <div className='commentPost d-flex mb-1'>
                            <input
                                type="text"
                                value={postText}
                                onChange={handleTextMessage}
                                alt="" placeholder='enter the comments...'
                                className='comments' />
                            <button type="submit" onClick={onCommentPost}>Send</button>
                        </div>
                        : ""}
                </div>

            </Card>
        </Grid>
    )
}

const mapStateToProps = (state) => {
    return {
    }
}

export default connect(mapStateToProps, {
    FB_POST_COMMENT
})(Comment)