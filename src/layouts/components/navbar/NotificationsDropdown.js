/* eslint-disable no-unused-expressions */

import React, { Fragment, useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import { SEEN_NOTIFICATION, REMOVE_NOTIFICATION } from "../../../redux/actions/marketing/V2TextChat";
import { Bell, ChevronDown } from 'react-feather'
import {  Badge, Row, Col } from 'reactstrap'
import moment from "moment";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { Chip, IconButton } from "@material-ui/core";
import { Box, Card, Divider, Menu, Tooltip } from "@mui/material";
import Collapsible from "react-collapsible";
import { GET_USER_INFORMATION } from "../../../redux/actions/auth/loginActions"
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';


const NotificationDropdown = (props) => {
  const { getNotificationData, SEEN_NOTIFICATION, REMOVE_NOTIFICATION, GET_USER_INFORMATION, userinformation } = props
  const [anchorEl, setAnchorEl] = useState(null);
  const [clearAllButton, setClearAllButton] = useState(null);
  const [payload, setPayload] = useState({
    "chatId": [],
    "taskId": [],
    "eventId": [],
    "birthdayId": [],
    "renewalId": [],
    "missucallId": []
  })

  useEffect(() => {
    GET_USER_INFORMATION()
  }, [GET_USER_INFORMATION])
  // console.log(getNotificationData)
  const open = Boolean(anchorEl);
  let currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - 1);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSeenNotification = async (NotificationType) => {

    if (NotificationType === "Chat") {
      setClearAllButton("Chat")
      getNotificationData?.chat.forEach((item, i) => {
        if (!item?.isSeen) {
          payload?.chatId.push(item?._id)
        }
      })
    } else if (NotificationType === "Task") {
      setClearAllButton("Task")
      getNotificationData?.tasks?.forEach((item, i) => {
        if (!item?.isSeen) {
          payload?.taskId.push(item?._id)
        }
      })
    } else if (NotificationType === "Event") {
      setClearAllButton("Event")
      getNotificationData?.event?.forEach((item, i) => {
        if (!item?.isSeen) {
          payload?.eventId.push(item?._id)
        }
      })
    } else if (NotificationType === "ThisWeekBirthday") {
      setClearAllButton("ThisWeekBirthday")
      getNotificationData?.thisWeekBirthday?.forEach((item, i) => {
        if (!item?.isSeen) {
          payload?.birthdayId.push(item?._id)
        }
      })
    } else if (NotificationType === "ThisMonthBirthday") {
      setClearAllButton("ThisMonthBirthday")
      getNotificationData?.thisMonthBirthday?.forEach((item, i) => {
        if (!item?.isSeen) {
          payload?.birthdayId.push(item?._id)
        }
      })
    } else if (NotificationType === "LastMonthBirthday") {
      setClearAllButton("LastMonthBirthday")
      getNotificationData?.lastMonthBirthday?.forEach((item, i) => {
        if (!item?.isSeen) {
          payload?.birthdayId.push(item?._id)
        }
      })
    } else if (NotificationType === "nextSixtyDaysBirthday") {
      setClearAllButton("nextSixtyDaysBirthday")
      getNotificationData?.nextSixtyDaysBirthda?.forEach((item, i) => {
        if (!item?.isSeen) {
          payload?.birthdayId.push(item?._id)
        }
      })
    } else if (NotificationType === "nextNintyDaysBirthday") {
      setClearAllButton("nextNintyDaysBirthday")
      getNotificationData?.nextNintyDaysBirthday?.forEach((item, i) => {
        if (!item?.isSeen) {
          payload?.birthdayId.push(item?._id)
        }
      })
    } else if (NotificationType === "expiredNotification") {
      setClearAllButton("expiredNotification")
      getNotificationData?.ExpireNotificationSettingRenewal?.forEach((item, i) => {
        if (!item?.isSeen) {
          payload?.renewalId.push(item?.studentInfo)
        }
      })
    } else if (NotificationType === "thirtyDaysExpired") {
      setClearAllButton("thirtyDaysExpired")
      getNotificationData?.thirtyDaysExpireNotificationSettingRenewal?.forEach((item, i) => {
        if (!item?.isSeen) {
          payload?.renewalId.push(item?.studentInfo)
        }
      })
    } else if (NotificationType === "sixtyDaysExpired") {
      setClearAllButton("sixtyDaysExpired")
      getNotificationData?.sixtyDaysExpireNotificationSettingRenewal?.forEach((item, i) => {
        if (!item?.isSeen) {
          payload?.renewalId.push(item?.studentInfo)
        }
      })
    } else if (NotificationType === "nintyDaysExpired") {
      setClearAllButton("nintyDaysExpired")
      getNotificationData?.nintyDaysExpireNotificationSettingRenewal?.forEach((item, i) => {
        if (!item?.isSeen) {
          payload?.renewalId.push(item?.studentInfo)
        }
      })
    } else if (NotificationType === "sevenToFourteenNotification") {
      setClearAllButton("sevenToFourteenNotification")
      getNotificationData?.sevenToFourteenNotification?.forEach((item, i) => {
        if (!item?.isSeen) {
          payload?.missucallId.push(item?._id)
        }
      })
    } else if (NotificationType === "fourteenToThirtyNotification") {
      setClearAllButton("fourteenToThirtyNotification")
      getNotificationData?.fourteenToThirtyNotification?.forEach((item, i) => {
        if (!item?.isSeen) {
          payload?.missucallId.push(item?._id)
        }
      })
    } else if (NotificationType === "thirtyToSixtyNotification") {
      setClearAllButton("thirtyToSixtyNotification")
      getNotificationData?.thirtyToSixtyNotification?.forEach((item, i) => {
        if (!item?.isSeen) {
          payload?.missucallId.push(item?._id)
        }
      })
    } else if (NotificationType === "sixtyPlusNotification") {
      setClearAllButton("sixtyPlusNotification")
      getNotificationData?.sixtyPlusNotification?.forEach((item, i) => {
        if (!item?.isSeen) {
          payload?.missucallId.push(item?._id)
        }
      })
    }
    let res = await SEEN_NOTIFICATION(payload)
    if (res) {
      setPayload({
        "chatId": [],
        "taskId": [],
        "eventId": [],
        "birthdayId": [],
        "renewalId": [],
        "missucallId": []
      })
    }
  };

  const handleClearAllNotification = async (NotificationType) => {
    if (NotificationType === "Chat") {
      setClearAllButton("Chat")
      getNotificationData?.chat?.forEach((item, i) => {
        payload?.chatId.push(item?._id)
      })
    } else if (NotificationType === "Task") {
      setClearAllButton("Task")
      getNotificationData?.tasks?.forEach((item, i) => {
        payload?.taskId.push(item?._id)
      })
    } else if (NotificationType === "Event") {
      setClearAllButton("Event")
      getNotificationData?.event?.forEach((item, i) => {
        payload?.eventId.push(item?._id)
      })
    } else if (NotificationType === "ThisWeekBirthday") {
      setClearAllButton("ThisWeekBirthday")
      getNotificationData?.thisWeekBirthday?.forEach((item, i) => {
        payload?.birthdayId.push(item?._id)
      })
    } else if (NotificationType === "ThisMonthBirthday") {
      setClearAllButton("ThisMonthBirthday")
      getNotificationData?.thisMonthBirthday?.forEach((item, i) => {
        payload?.birthdayId.push(item?._id)
      })
    } else if (NotificationType === "LastMonthBirthday") {
      setClearAllButton("LastMonthBirthday")
      getNotificationData?.lastMonthBirthday?.forEach((item, i) => {
        payload?.birthdayId.push(item?._id)
      })
    } else if (NotificationType === "nextSixtyDaysBirthday") {
      setClearAllButton("nextSixtyDaysBirthday")
      getNotificationData?.nextSixtyDaysBirthda?.forEach((item, i) => {
        payload?.birthdayId.push(item?._id)
      })
    } else if (NotificationType === "nextNintyDaysBirthday") {
      setClearAllButton("nextNintyDaysBirthday")
      getNotificationData?.nextNintyDaysBirthday?.forEach((item, i) => {
        payload?.birthdayId.push(item?._id)
      })
    } else if (NotificationType === "expiredNotification") {
      setClearAllButton("expiredNotification")
      getNotificationData?.ExpireNotificationSettingRenewal?.forEach((item, i) => {
        payload?.renewalId.push(item?.studentInfo)
      })
    } else if (NotificationType === "thirtyDaysExpired") {
      setClearAllButton("thirtyDaysExpired")
      getNotificationData?.thirtyDaysExpireNotificationSettingRenewal?.forEach((item, i) => {
        payload?.renewalId.push(item?.studentInfo)
      })
    } else if (NotificationType === "sixtyDaysExpired") {
      setClearAllButton("sixtyDaysExpired")
      getNotificationData?.sixtyDaysExpireNotificationSettingRenewal?.forEach((item, i) => {
        payload?.renewalId.push(item?.studentInfo)
      })
    } else if (NotificationType === "nintyDaysExpired") {
      setClearAllButton("nintyDaysExpired")
      getNotificationData?.nintyDaysExpireNotificationSettingRenewal?.forEach((item, i) => {
        payload?.renewalId.push(item?.studentInfo)
      })
    } else if (NotificationType === "sevenToFourteenNotification") {
      setClearAllButton("sevenToFourteenNotification")
      getNotificationData?.sevenToFourteenNotification?.forEach((item, i) => {
        payload?.missucallId.push(item?._id)
      })
    } else if (NotificationType === "fourteenToThirtyNotification") {
      setClearAllButton("fourteenToThirtyNotification")
      getNotificationData?.fourteenToThirtyNotification?.forEach((item, i) => {
        payload?.missucallId.push(item?._id)
      })
    } else if (NotificationType === "thirtyToSixtyNotification") {
      setClearAllButton("thirtyToSixtyNotification")
      getNotificationData?.thirtyToSixtyNotification?.forEach((item, i) => {
        payload?.missucallId.push(item?._id)
      })
    } else if (NotificationType === "sixtyPlusNotification") {
      setClearAllButton("sixtyPlusNotification")
      getNotificationData?.sixtyPlusNotification?.forEach((item, i) => {
        payload?.missucallId.push(item?._id)
      })
    }
    let res = await REMOVE_NOTIFICATION(payload)
    if (res) {
      setPayload({
        "chatId": [],
        "taskId": [],
        "eventId": [],
        "birthdayId": [],
        "renewalId": [],
        "missucallId": []
      })
    }
  };

  const handleDeleteSingleNotification = async (NotificationType, Id) => {
    if (NotificationType === "Chat") {
      payload?.chatId.push(Id)
    } else if (NotificationType === "Task") {
      payload?.taskId.push(Id)
    } else if (NotificationType === "Event") {
      payload?.eventId.push(Id)
    } else if (NotificationType === "Birthday") {
      payload?.birthdayId.push(Id)
    } else if (NotificationType === "expired") {
      payload?.renewalId.push(Id)
    } else if (NotificationType === "MissYouCall") {
      payload?.missucallId.push(Id)
    }
    let res = await REMOVE_NOTIFICATION(payload)
    if (res) {
      setPayload({
        "chatId": [],
        "taskId": [],
        "eventId": [],
        "birthdayId": [],
        "renewalId": [],
        "missucallId": []
      })
    }
  }


  const renderNotificationItems = () => {
    return (
      <div className="pr-1">
        {userinformation?.chat_setting ? (
          <Collapsible
            onOpen={() => handleSeenNotification("Chat")}
            onClose={() => setClearAllButton(null)}
            className="mb-1"
            trigger={
              <Card style={{ backgroundColor: "#c7f5bb", color: "#5aa347" }}>
                <div className=" d-flex justify-content-between p-1">
                  <span><b>New Messages</b></span>
                  <div className=" d-flex">
                    <Badge pill style={{ backgroundColor: "#5aa347" }} className=''>
                      {getNotificationData?.chatCount}
                    </Badge>
                    {clearAllButton === "Chat" ?
                      <div className="ml-2">
                        <Chip
                          style={{ backgroundColor: "#5aa347", color: "#fff" }}
                          onClick={() => handleClearAllNotification("Chat")}
                          className="d-flex align-items-center"
                          label="Clear All"
                          icon={<DeleteOutlinedIcon size="small" style={{ color: "#fff" }} />}
                          size="small"
                        />
                      </div>
                      : ""
                    }
                    <div className="ml-1">
                      <ChevronDown size={20} className="chevron" />
                    </div>
                  </div>
                </div>
              </Card>
            }
          >
            <div
              className="mb-1"
              style={{
                overflowY: "scroll",
                overflowX: "hidden",
                maxHeight: "50vh",
                minHeight: '10%',
              }}>
              {getNotificationData === undefined ? "" :
                getNotificationData?.chat?.map((item, index) => {
                  const date = new Date(item.time)
                  return (
                    <Fragment key={index}>
                      <Row
                        className="d-flex align-items-center my-1 mr-1" /*backgroundColor: "#def3da"*/
                      >
                        <Col sm={10} lg={10} md={10} >
                          <Link to={`/company/marketing/v2text/chat/all`} className="d-flex align-items-center">
                            <Avatar className="mx-1"
                              src={item?.to[0]?.memberprofileImage}
                            />
                            <div className="d-flex justify-content-between">
                              <div>
                                <p className="mb-0" style={{ color: "#4e4e4e" }}>New message received from </p>
                                <p className="mb-0" style={{ color: "#4e4e4e" }}><b>{item?.to[0]?.firstName} {item?.to[0]?.lastName}</b></p>
                                <small
                                  className='notification-text mt-0'
                                  style={{
                                    color: "#4e4e4e",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    width: "11rem",
                                  }}
                                >{item.textContent}
                                </small>
                              </div>
                              <div className="ml-2">
                                <p className="mb-0" style={{ color: "#4e4e4e" }}>{moment(date).format("D MMMM")}</p>
                                <small className='notification-text mt-0' style={{ color: "#4e4e4e" }}>{moment(date).format("HH:MM A")}</small>
                              </div>
                            </div>
                          </Link>
                        </Col>
                        <Col sm={2} lg={2} md={2}>
                          <div className="d-flex align-items-center ">
                            <DeleteOutlinedIcon
                              className="mr-1"
                              onClick={() => handleDeleteSingleNotification("Chat", item?._id)}
                              size="small"
                              style={{ color: "#808080", cursor:"pointer" }}
                            />
                            {item?.isSeen ? (
                              <DoneAllOutlinedIcon style={{ color: "#62b523" }} size="small" />
                            ) : (
                              <DoneAllOutlinedIcon style={{ color: "#808080" }} size="small" />
                            )}
                          </div>
                        </Col>
                      </Row>
                      <Divider />
                    </Fragment>
                  )
                })
              }
            </div>
          </Collapsible >
        ) : ("")}
        {userinformation?.task_setting ?
          <div className="mb-1">
            <Collapsible
              onOpen={() => handleSeenNotification("Task")}
              onClose={() => setClearAllButton(null)}
              className="mb-1"
              trigger={
                <>
                  <Card style={{ backgroundColor: "#f8f4c4", color: "#e9ae34" }}>
                    <div className=" d-flex justify-content-between p-1">
                      <span><b>Tasks For Today</b></span>
                      <div className=" d-flex">
                        <Badge pill style={{ backgroundColor: "#e9ae34" }} className=''>
                          {getNotificationData?.todayTaskCount}
                        </Badge>
                        {clearAllButton === "Task" ?
                          <div className="ml-2">
                            <Chip
                              style={{ backgroundColor: "#e9ae34", color: "#fff" }}
                              onClick={() => handleClearAllNotification("Task")}
                              className="d-flex align-items-center "
                              label="Clear All"
                              icon={<DeleteOutlinedIcon style={{ color: "#fff" }} />}
                              size="small"
                            />
                          </div>
                          : ""
                        }
                        <div className="ml-1">
                          <ChevronDown size={20} className="chevron" />
                        </div>
                      </div>
                    </div>
                  </Card>
                </>
              }
            >
              <div
                style={{
                  overflowY: "scroll",
                  overflowX: "hidden",
                  maxHeight: "50vh",
                  minHeight: '10%',
                }}>
                {getNotificationData?.tasks === undefined ? "" :
                  getNotificationData?.tasks?.map((item, index) => {
                    return (
                      <Fragment key={index}>
                        <Row
                          className="d-flex align-items-center py-1"
                        >
                          <Col sm={10} lg={10} md={10} >
                            <Link to={`/app/task-and-goals/task/all/taskonly`} className="d-flex align-items-center">
                              <Avatar className='mx-2'
                                src={item?.memberprofileImage}
                              />
                              <p className="mb-0" style={{ color: "#4e4e4e" }}>Today's Task is <b>{item?.name}</b></p>
                            </Link>
                          </Col>
                          <Col sm={2} lg={2} md={2}>
                            <div className="d-flex align-items-center">
                              <DeleteOutlinedIcon
                                className="mr-1"
                                onClick={() => handleDeleteSingleNotification("Task", item?._id)}
                                size="small"
                                style={{ color: "#808080", cursor:"pointer" }}
                              />
                              {item?.isSeen ? (
                                <DoneAllOutlinedIcon style={{ color: "#62b523" }} size="small" />
                              ) : (
                                <DoneAllOutlinedIcon style={{ color: "#808080" }} size="small" />
                              )}
                            </div>
                          </Col>
                        </Row>
                        <Divider />
                      </Fragment>
                    )
                  })
                }
              </div>
            </Collapsible>
          </div>
          : ""}
        {userinformation?.event_notification_setting ?
          <div className="mb-1">
            <Collapsible
              onOpen={() => handleSeenNotification("Event")}
              onClose={() => setClearAllButton(null)}
              className="mb-1"
              trigger={
                <>
                  <Card style={{ backgroundColor: "#edd5e9", color: "#7c1b6c" }}>
                    <div className=" d-flex justify-content-between p-1">
                      <span><b>Today's Events</b></span>
                      <div className=" d-flex">
                        <Badge pill style={{ backgroundColor: "#7c1b6c" }} className=''>
                          {getNotificationData?.todayEventCount}
                        </Badge>
                        {clearAllButton === "Event" ?
                          <div className="ml-2">
                            <Chip
                              style={{ backgroundColor: "#7c1b6c", color: "#fff" }}
                              onClick={() => handleClearAllNotification("Event")}
                              className="d-flex align-items-center "
                              label="Clear All"
                              icon={<DeleteOutlinedIcon style={{ color: "#fff" }} />}
                              size="small"
                            />
                          </div>
                          : ""
                        }
                        <div className="ml-1">
                          <ChevronDown size={20} className="chevron" />
                        </div>
                      </div>
                    </div>
                  </Card>
                </>
              }
            >
              <div
                style={{
                  overflowY: "scroll",
                  overflowX: "hidden",
                  maxHeight: "50vh",
                  minHeight: '10%',
                }}>
                {getNotificationData?.event === undefined ? "" :
                  getNotificationData?.event?.map((item, index) => {
                    return (
                      <Fragment key={index}>
                        <Row
                          className="d-flex align-items-center my-1"
                        >
                          <Col sm={10} lg={10} md={10} >
                            <Link to={`/app/school/test/eligiblev2`} className="d-flex align-items-center">
                              <Avatar className='mx-2'
                                src={item?.memberprofileImage}
                              />
                              <div className="d-flex justify-content-between align-items-center">
                                <div>
                                  <p className="mb-0" style={{ color: "#4e4e4e" }}>Today's Event is <b>{item?.title}</b></p>
                                  <small>{item?.notes}</small>
                                </div>
                                <div className="ml-2">
                                  <p style={{ color: "#4e4e4e" }}>{moment(item?.start).format("MM/DD/YYYY")}</p>
                                </div>
                              </div>
                            </Link>
                          </Col>
                          <Col sm={2} lg={2} md={2}>
                            <div className="d-flex align-items-center">
                              <DeleteOutlinedIcon
                                className="mr-1"
                                onClick={() => handleDeleteSingleNotification("Event", item?._id)}
                                size="small"
                                style={{ color: "#808080", cursor:"pointer" }}
                              />
                              {item?.isSeen ? (
                                <DoneAllOutlinedIcon style={{ color: "#62b523" }} size="small" />
                              ) : (
                                <DoneAllOutlinedIcon style={{ color: "#808080" }} size="small" />
                              )}
                            </div>
                          </Col>
                        </Row>
                        <Divider />
                      </Fragment>
                    )
                  })
                }
              </div>
            </Collapsible>
          </div>
          : ""}
        {userinformation?.thisWeek_birthday_setting ?
          <div className="mb-1">
            <Collapsible
              onOpen={() => handleSeenNotification("ThisWeekBirthday")}
              onClose={() => setClearAllButton(null)}
              className="mb-1"
              trigger={
                <>
                  <Card style={{ backgroundColor: "#f9e2e4", color: "#e85355" }}>
                    <div className=" d-flex justify-content-between p-1">
                      <span><b>This Week Birthday Notification</b></span>
                      <div className=" d-flex">
                        <Badge pill style={{ backgroundColor: "#e85355" }} className=''>
                          {getNotificationData?.thisWeekBirthdayCount}
                        </Badge>
                        {clearAllButton === "ThisWeekBirthday" ?
                          <div className="ml-2">
                            <Chip
                              style={{ backgroundColor: "#e85355", color: "#fff" }}
                              onClick={() => handleClearAllNotification("ThisWeekBirthday")}
                              className="d-flex align-items-center "
                              label="Clear All"
                              icon={<DeleteOutlinedIcon style={{ color: "#fff" }} />}
                              size="small"
                            />
                          </div>
                          : ""
                        }
                        <div className="ml-1">
                          <ChevronDown size={20} className="chevron" />
                        </div>
                      </div>
                    </div>
                  </Card>
                </>
              }
            >
              <div
                style={{
                  overflowY: "scroll",
                  overflowX: "hidden",
                  maxHeight: "50vh",
                  minHeight: '10%',
                }}>
                {getNotificationData?.thisWeekBirthday === undefined ? "" :
                  getNotificationData?.thisWeekBirthday?.map((item, index) => {
                    return (
                      <Fragment key={index}>
                        <Row
                          className="d-flex align-items-center my-1 mr-1"
                        >
                          <Col sm={10} lg={10} md={10}>
                            <Link to={`/app/birthday`} className="d-flex align-items-center">
                              <Avatar className='mx-2'
                                src={item?.memberprofileImage}
                              />
                              <div>
                                <p className="mb-0" style={{ color: "#4e4e4e" }}><b>{item?.firstName} {item?.lastName}</b> has Birthday on <b>{moment(item?.dob).format("D MMMM")}</b>🎂🥳</p>
                              </div>
                            </Link>
                          </Col>
                          <Col sm={2} lg={2} md={2}>
                            <div className="d-flex align-items-center">
                              <DeleteOutlinedIcon
                                className="mr-1"
                                onClick={() => handleDeleteSingleNotification("Birthday", item?._id)}
                                size="small"
                                style={{ color: "#808080", cursor:"pointer" }}
                              />
                              {item?.isSeen ? (
                                <DoneAllOutlinedIcon style={{ color: "#62b523" }} size="small" />
                              ) : (
                                <DoneAllOutlinedIcon style={{ color: "#808080" }} size="small" />
                              )}
                            </div>
                          </Col>
                        </Row>
                        <Divider />
                      </Fragment>
                    )
                  })
                }
              </div>
            </Collapsible>
          </div >
          : ""}
        {userinformation?.thisMonth_birthday_setting ?
          <div className="mb-1">
            <Collapsible
              onOpen={() => handleSeenNotification("ThisMonthBirthday")}
              onClose={() => setClearAllButton(null)}
              className="mb-1"
              trigger={
                <>
                  <Card style={{ backgroundColor: "#cde2f5", color: "#2796f3" }}>
                    <div className=" d-flex justify-content-between p-1">
                      <span><b>This Month Birthday Notifications</b></span>
                      <div className=" d-flex">
                        <Badge pill style={{ backgroundColor: "#2796f3" }} className=''>
                          {getNotificationData?.thisMonthBirthdayCount}
                        </Badge>
                        {clearAllButton === "ThisMonthBirthday" ?
                          <div className="ml-2">
                            <Chip
                              style={{ backgroundColor: "#2796f3", color: "#fff" }}
                              onClick={() => handleClearAllNotification("ThisMonthBirthday")}
                              className="d-flex align-items-center "
                              label="Clear All"
                              icon={<DeleteOutlinedIcon style={{ color: "#fff" }} />}
                              size="small"
                            />
                          </div>
                          : ""
                        }
                        <div className="ml-1">
                          <ChevronDown size={20} className="chevron" />
                        </div>
                      </div>
                    </div>
                  </Card>
                </>
              }
            >
              <div
                style={{
                  overflowY: "scroll",
                  overflowX: "hidden",
                  maxHeight: "50vh",
                  minHeight: '10%',
                }}>
                {getNotificationData?.thisMonthBirthday === undefined ? "" :
                  getNotificationData?.thisMonthBirthday?.map((item, index) => {
                    return (
                      <Fragment key={item?._id}>
                        <Row
                          className="d-flex align-items-center my-1 mr-1"
                        >
                          <Col sm={10} lg={10} md={10}>
                            <Link to={`/app/birthday`} className="d-flex align-items-center">
                              <Avatar className='mx-2'
                                src={item?.memberprofileImage}
                              />
                              <div>
                                <p className="mb-0" style={{ color: "#4e4e4e" }}><b>{item?.firstName} {item?.lastName} </b>have Birthday on <b>{moment(item?.dob).format("D MMMM")}</b></p>
                              </div>
                            </Link>
                          </Col>
                          <Col sm={2} lg={2} md={2}>
                            <div className="d-flex align-items-center">
                              <DeleteOutlinedIcon
                                className="mr-1"
                                onClick={() => handleDeleteSingleNotification("Birthday", item?._id)}
                                size="small"
                                style={{ color: "#808080", cursor:"pointer" }}
                              />
                              {item?.isSeen ? (
                                <DoneAllOutlinedIcon style={{ color: "#62b523" }} size="small" />
                              ) : (
                                <DoneAllOutlinedIcon style={{ color: "#808080" }} size="small" />
                              )}
                            </div>
                          </Col>
                        </Row>
                        <Divider />
                      </Fragment>
                    )
                  })
                }
              </div>
            </Collapsible>
          </div >
          : ""}
        {userinformation?.lastMonth_birthday_setting ?
          <div className="mb-1">
            <Collapsible
              onOpen={() => handleSeenNotification("LastMonthBirthday")}
              onClose={() => setClearAllButton(null)}
              className="mb-1"
              trigger={
                <>
                  <Card style={{ backgroundColor: "#f1dfff", color: '#d57dff' }}>
                    <div className=" d-flex justify-content-between p-1">
                      <span><b>Last Month Birthday Notifications</b></span>
                      <div className=" d-flex">
                        <Badge pill style={{ backgroundColor: '#d57dff' }} className=''>
                          {getNotificationData?.lastMonthBirthdayCount}
                        </Badge>
                        {clearAllButton === "LastMonthBirthday" ?
                          <div className="ml-2">
                            <Chip
                              style={{ backgroundColor: "#d57dff", color: "#fff" }}
                              onClick={() => handleClearAllNotification("LastMonthBirthday")}
                              className="d-flex align-items-center "
                              label="Clear All"
                              icon={<DeleteOutlinedIcon style={{ color: "#fff" }} />}
                              size="small"
                            />
                          </div>
                          : ""
                        }
                        <div className="ml-1">
                          <ChevronDown size={20} className="chevron" />
                        </div>
                      </div>
                    </div>
                  </Card>
                </>
              }
            >
              <div
                style={{
                  overflowY: "scroll",
                  overflowX: "hidden",
                  maxHeight: "50vh",
                  minHeight: '10%',
                }}>
                {getNotificationData?.lastMonthBirthday === undefined ? "" :
                  getNotificationData?.lastMonthBirthday?.map((item, index) => {
                    return (
                      <Fragment key={item?._id}>
                        <Row
                          className="d-flex align-items-center my-1 mr-1"
                        >
                          <Col sm={10} lg={10} md={10}>
                            <Link to={`/app/birthday`} className="d-flex align-items-center">
                              <Avatar className='mx-2'
                                src={item?.memberprofileImage}
                              />
                              <div>
                                <p className="mb-0" style={{ color: "#4e4e4e" }}><b>{item?.firstName} {item?.lastName} </b>had Birthday on <b>{moment(item?.dob).format("D MMMM")}</b></p>
                              </div>
                            </Link>
                          </Col>
                          <Col sm={2} lg={2} md={2}>
                            <div className="d-flex align-items-center">
                              <DeleteOutlinedIcon
                                className="mr-1"
                                onClick={() => handleDeleteSingleNotification("Birthday", item?._id)}
                                size="small"
                                style={{ color: "#808080", cursor:"pointer" }}
                              />
                              {item?.isSeen ? (
                                <DoneAllOutlinedIcon style={{ color: "#62b523" }} size="small" />
                              ) : (
                                <DoneAllOutlinedIcon style={{ color: "#808080" }} size="small" />
                              )}
                            </div>
                          </Col>
                        </Row>
                        <Divider />
                      </Fragment>
                    )
                  })
                }
              </div>
            </Collapsible>
          </div >
          : ""}
        {userinformation?.nextSixtyDays_birthday_setting ?
          <div className="mb-1">
            <Collapsible
              onOpen={() => handleSeenNotification("nextSixtyDaysBirthday")}
              onClose={() => setClearAllButton(null)}
              className="mb-1"
              trigger={
                <>
                  <Card style={{ backgroundColor: "#fcead2", color: "#ee872f" }}>
                    <div className=" d-flex justify-content-between p-1">
                      <span><b>Next 60 Days Birthday Notifications</b></span>
                      <div className=" d-flex">
                        <Badge pill style={{ backgroundColor: "#ee872f" }} className=''>
                          {getNotificationData?.nextSixtyDaysBirthdayCount}
                        </Badge>
                        {clearAllButton === "nextSixtyDaysBirthday" ?
                          <div className="ml-2">
                            <Chip
                              style={{ backgroundColor: "#ee872f", color: "#fff" }}
                              onClick={() => handleClearAllNotification("nextSixtyDaysBirthday")}
                              className="d-flex align-items-center "
                              label="Clear All"
                              icon={<DeleteOutlinedIcon style={{ color: "#fff" }} />}
                              size="small"
                            />
                          </div>
                          : ""
                        }
                        <div className="ml-1">
                          <ChevronDown size={20} className="chevron" />
                        </div>
                      </div>
                    </div>
                  </Card>
                </>
              }
            >
              <div
                style={{
                  overflowY: "scroll",
                  overflowX: "hidden",
                  maxHeight: "50vh",
                  minHeight: '10%',
                }}>
                {getNotificationData?.nextSixtyDaysBirthda === undefined ? "" :
                  getNotificationData?.nextSixtyDaysBirthda?.map((item, index) => {
                    return (
                      <Fragment key={item?._id}>
                        <Row
                          className="d-flex align-items-center my-1 mr-1"
                        >
                          <Col sm={10} lg={10} md={10}>
                            <Link to={`/app/birthday`} className="d-flex align-items-center">
                              <Avatar className='mx-2'
                                src={item?.memberprofileImage}
                              />
                              <div>
                                <p className="mb-0" style={{ color: "#4e4e4e" }}><b>{item?.firstName} {item?.lastName} </b>have Birthday on <b>{moment(item?.dob).format("D MMMM")}</b></p>
                              </div>
                            </Link>
                          </Col>
                          <Col sm={2} lg={2} md={2}>
                            <div className="d-flex align-items-center">
                              <DeleteOutlinedIcon
                                className="mr-1"
                                onClick={() => handleDeleteSingleNotification("Birthday", item?._id)}
                                size="small"
                                style={{ color: "#808080", cursor:"pointer" }}
                              />
                              {item?.isSeen ? (
                                <DoneAllOutlinedIcon style={{ color: "#62b523" }} size="small" />
                              ) : (
                                <DoneAllOutlinedIcon style={{ color: "#808080" }} size="small" />
                              )}
                            </div>
                          </Col>
                        </Row>
                        <Divider />
                      </Fragment>
                    )
                  })
                }
              </div>
            </Collapsible>
          </div >
          : ""}
        {userinformation?.nextNintyDays_birthday_setting ?
          <div className="mb-1">
            <Collapsible
              onOpen={() => handleSeenNotification("nextNintyDaysBirthday")}
              onClose={() => setClearAllButton(null)}
              className="mb-1"
              trigger={
                <>
                  <Card style={{ backgroundColor: "#cbcfe3", color: "#344dcd" }}>
                    <div className=" d-flex justify-content-between p-1">
                      <span><b>Next 90 Days Birthday Notifications</b></span>
                      <div className=" d-flex">
                        <Badge pill style={{ backgroundColor: "#344dcd" }} className=''>
                          {getNotificationData?.nextNintyDaysBirthdayCount}
                        </Badge>
                        {clearAllButton === "nextNintyDaysBirthday" ?
                          <div className="ml-2">
                            <Chip
                              style={{ backgroundColor: "#344dcd", color: "#fff" }}
                              onClick={() => handleClearAllNotification("nextNintyDaysBirthday")}
                              className="d-flex align-items-center "
                              label="Clear All"
                              icon={<DeleteOutlinedIcon style={{ color: "#fff" }} />}
                              size="small"
                            />
                          </div>
                          : ""
                        }
                        <div className="ml-1">
                          <ChevronDown size={20} className="chevron" />
                        </div>
                      </div>
                    </div>
                  </Card>
                </>
              }
            >
              <div
                style={{
                  overflowY: "scroll",
                  overflowX: "hidden",
                  maxHeight: "50vh",
                  minHeight: '10%',
                }}>
                {getNotificationData?.nextNintyDaysBirthday === undefined ? "" :
                  getNotificationData?.nextNintyDaysBirthday?.map((item, index) => {
                    return (
                      <Fragment key={item?._id}>
                        <Row
                          className="d-flex align-items-center my-1 mr-1"
                        >
                          <Col sm={10} lg={10} md={10}>
                            <Link to={`/app/birthday`} className="d-flex align-items-center">
                              <Avatar className='mx-2'
                                src={item?.memberprofileImage}
                              />
                              <div>
                                <p className="mb-0" style={{ color: "#4e4e4e" }}><b>{item?.firstName} {item?.lastName} </b>have Birthday on <b>{moment(item?.dob).format("D MMMM")}</b></p>
                              </div>
                            </Link>
                          </Col>
                          <Col sm={2} lg={2} md={2}>
                            <div className="d-flex align-items-center">
                              <DeleteOutlinedIcon
                                className="mr-1"
                                onClick={() => handleDeleteSingleNotification("Birthday", item?._id)}
                                size="small"
                                style={{ color: "#808080", cursor:"pointer" }}
                              />
                              {item?.isSeen ? (
                                <DoneAllOutlinedIcon style={{ color: "#62b523" }} size="small" />
                              ) : (
                                <DoneAllOutlinedIcon style={{ color: "#808080" }} size="small" />
                              )}
                            </div>
                          </Col>
                        </Row>
                        <Divider />
                      </Fragment>
                    )
                  })
                }
              </div>
            </Collapsible>
          </div >
          : ""}
        {userinformation?.expire_notification_setting ?
          <div className="mb-1">
            <Collapsible
              onOpen={() => handleSeenNotification("expiredNotification")}
              onClose={() => setClearAllButton(null)}
              className="mb-1"
              trigger={
                <>
                  <Card style={{ backgroundColor: "#d7b7ac", color: "#662009" }}>
                    <div className=" d-flex justify-content-between p-1">
                      <span><b>Expired Notifications</b></span>
                      <div className=" d-flex">
                        <Badge pill style={{ backgroundColor: "#662009" }} className=''>
                          {getNotificationData?.ExpireNotificationSettingRenewalCount}
                        </Badge>
                        {clearAllButton === "expiredNotification" ?
                          <div className="ml-2">
                            <Chip
                              style={{ backgroundColor: "#662009", color: "#fff" }}
                              onClick={() => handleClearAllNotification("expiredNotification")}
                              className="d-flex align-items-center "
                              label="Clear All"
                              icon={<DeleteOutlinedIcon style={{ color: "#fff" }} />}
                              size="small"
                            />
                          </div>
                          : ""
                        }
                        <div className="ml-1">
                          <ChevronDown size={20} className="chevron" />
                        </div>
                      </div>
                    </div>
                  </Card>
                </>
              }
            >
              <div
                style={{
                  overflowY: "scroll",
                  overflowX: "hidden",
                  maxHeight: "50vh",
                  minHeight: '10%',
                }}>
                {getNotificationData?.ExpireNotificationSettingRenewal === undefined ? "" :
                  getNotificationData?.ExpireNotificationSettingRenewal?.map((item, index) => {
                    return (
                      <Fragment key={item?.studentInfo}>
                        <Row
                          className="d-flex align-items-center my-1 mr-1"
                        >
                          <Col sm={10} lg={10} md={10}>
                            <Link to={`/app/renewals`} className="d-flex align-items-center">
                              <Avatar className='mx-2'
                              // src={item?.memberprofileImage}
                              />
                              <div>
                                <p className="mb-0" style={{ color: "#4e4e4e" }}><b>{item?.memberInfo?.firstName} {item?.memberInfo?.lastName}'s</b> {item?.membership_name} Membership expiring on <b>{moment(item?.expiry_date).format("D MMMM YYYY")}</b></p>
                              </div>
                            </Link>
                          </Col>
                          <Col sm={2} lg={2} md={2}>
                            <div className="d-flex align-items-center">
                              <DeleteOutlinedIcon
                                className="mr-1"
                                onClick={() => handleDeleteSingleNotification("expired", item?.studentInfo)}
                                size="small"
                                style={{ color: "#808080", cursor:"pointer" }}
                              />
                              {item?.isSeen ? (
                                <DoneAllOutlinedIcon style={{ color: "#62b523" }} size="small" />
                              ) : (
                                <DoneAllOutlinedIcon style={{ color: "#808080" }} size="small" />
                              )}
                            </div>
                          </Col>
                        </Row>
                        <Divider />
                      </Fragment>
                    )
                  })
                }
              </div>
            </Collapsible>
          </div >
          : ""}
        {userinformation?.thirtydays_expire_notification_setting_renewal ?
          <div className="mb-1">
            <Collapsible
              onOpen={() => handleSeenNotification("thirtyDaysExpired")}
              onClose={() => setClearAllButton(null)}
              className="mb-1"
              trigger={
                <>
                  <Card style={{ backgroundColor: "#8fbba3", color: "#175432" }}>
                    <div className=" d-flex justify-content-between p-1">
                      <span><b>Next 30 Days Expired Notifications</b></span>
                      <div className=" d-flex">
                        <Badge pill style={{ backgroundColor: "#175432" }} className=''>
                          {getNotificationData?.thirtyDaysExpireNotificationSettingRenewalCount}
                        </Badge>
                        {clearAllButton === "thirtyDaysExpired" ?
                          <div className="ml-2">
                            <Chip
                              style={{ backgroundColor: "#175432", color: "#fff" }}
                              onClick={() => handleClearAllNotification("thirtyDaysExpired")}
                              className="d-flex align-items-center "
                              label="Clear All"
                              icon={<DeleteOutlinedIcon style={{ color: "#fff" }} />}
                              size="small"
                            />
                          </div>
                          : ""
                        }
                        <div className="ml-1">
                          <ChevronDown size={20} className="chevron" />
                        </div>
                      </div>
                    </div>
                  </Card>
                </>
              }
            >
              <div
                style={{
                  overflowY: "scroll",
                  overflowX: "hidden",
                  maxHeight: "50vh",
                  minHeight: '10%',
                }}>
                {getNotificationData?.thirtyDaysExpireNotificationSettingRenewal === undefined ? "" :
                  getNotificationData?.thirtyDaysExpireNotificationSettingRenewal?.map((item, index) => {
                    return (
                      <Fragment key={item?.studentInfo}>
                        <Row
                          className="d-flex align-items-center my-1 mr-1"
                        >
                          <Col sm={10} lg={10} md={10}>
                            <Link to={`/app/renewals`} className="d-flex align-items-center">
                              <Avatar className='mx-2'
                              // src={item?.memberInfo}
                              />
                              <div>
                                <p className="mb-0" style={{ color: "#4e4e4e" }}><b>{item?.memberInfo?.firstName} {item?.memberInfo?.lastName}'s</b> {item?.membership_name} Membership expiring on <b>{moment(item?.expiry_date).format("D MMMM YYYY")}</b></p>
                              </div>
                            </Link>
                          </Col>
                          <Col sm={2} lg={2} md={2}>
                            <div className="d-flex align-items-center">
                              <DeleteOutlinedIcon
                                className="mr-1"
                                onClick={() => handleDeleteSingleNotification("expired", item?.studentInfo)}
                                size="small"
                                style={{ color: "#808080", cursor:"pointer" }}
                              />
                              {item?.memberInfo?.isSeen ? (
                                <DoneAllOutlinedIcon style={{ color: "#62b523" }} size="small" />
                              ) : (
                                <DoneAllOutlinedIcon style={{ color: "#808080" }} size="small" />
                              )}
                            </div>
                          </Col>
                        </Row>
                        <Divider />
                      </Fragment>
                    )
                  })
                }
              </div>
            </Collapsible>
          </div >
          : ""}
        {userinformation?.sixtydays_expire_notification_setting_renewal ?
          <div className="mb-1">
            <Collapsible
              onOpen={() => handleSeenNotification("sixtyDaysExpired")}
              onClose={() => setClearAllButton(null)}
              className="mb-1"
              trigger={
                <>
                  <Card style={{ backgroundColor: "#d3c378", color: "#917907" }}>
                    <div className=" d-flex justify-content-between p-1">
                      <span><b>Next 60 Days Expired Notifications</b></span>
                      <div className=" d-flex">
                        <Badge pill style={{ backgroundColor: "#917907" }} className=''>
                          {getNotificationData?.sixtyDaysExpireNotificationSettingRenewalCount}
                        </Badge>
                        {clearAllButton === "sixtyDaysExpired" ?
                          <div className="ml-2">
                            <Chip
                              style={{ backgroundColor: "#917907", color: "#fff" }}
                              onClick={() => handleClearAllNotification("sixtyDaysExpired")}
                              className="d-flex align-items-center "
                              label="Clear All"
                              icon={<DeleteOutlinedIcon style={{ color: "#fff" }} />}
                              size="small"
                            />
                          </div>
                          : ""
                        }
                        <div className="ml-1">
                          <ChevronDown size={20} className="chevron" />
                        </div>
                      </div>
                    </div>
                  </Card>
                </>
              }
            >
              <div
                style={{
                  overflowY: "scroll",
                  overflowX: "hidden",
                  maxHeight: "50vh",
                  minHeight: '10%',
                }}>
                {getNotificationData?.sixtyDaysExpireNotificationSettingRenewal === undefined ? "" :
                  getNotificationData?.sixtyDaysExpireNotificationSettingRenewal?.map((item, index) => {
                    return (
                      <Fragment key={item?.studentInfo}>
                        <Row
                          className="d-flex align-items-center py-1"
                          style={{ borderBottom: "1px solid #ededed" }}
                        >
                          <Col sm={10} lg={10} md={10}>
                            <Link to={`/app/renewals`} className="d-flex align-items-center">
                              <Avatar className='mx-2'
                              // src={item?.memberprofileImage}
                              />
                              <div>
                                <p className="mb-0" style={{ color: "#4e4e4e" }}><b>{item?.memberInfo?.firstName} {item?.memberInfo?.lastName}'s</b> {item?.membership_name} Membership expiring on <b>{moment(item?.expiry_date).format("D MMMM YYYY")}</b></p>
                              </div>
                            </Link>
                          </Col>
                          <Col sm={2} lg={2} md={2}>
                            <div className="d-flex">
                              <IconButton onClick={() => handleDeleteSingleNotification("expired", item?.studentInfo)}>
                                <DeleteOutlinedIcon
                                  size="small"
                                  style={{ color: "#808080", cursor:"pointer" }}
                                />
                              </IconButton>
                              {item?.memberInfo?.isSeen ? (
                                <DoneAllOutlinedIcon style={{ color: "#62b523" }} size="small" />
                              ) : (
                                <DoneAllOutlinedIcon style={{ color: "#808080" }} size="small" />
                              )}
                            </div>
                          </Col>
                        </Row>
                      </Fragment>
                    )
                  })
                }
              </div>
            </Collapsible>
          </div >
          : ""}
        {userinformation?.nintydays_expire_notification_setting_renewal ?
          <div className="mb-1">
            <Collapsible
              onOpen={() => handleSeenNotification("nintyDaysExpired")}
              onClose={() => setClearAllButton(null)}
              className="mb-1"
              trigger={
                <>
                  <Card style={{ backgroundColor: "#a8ced3", color: "#17535a" }}>
                    <div className=" d-flex justify-content-between p-1">
                      <span><b>Next 90 Days Expired Notifications</b></span>
                      <div className=" d-flex">
                        <Badge pill style={{ backgroundColor: "#17535a" }} className=''>
                          {getNotificationData?.nintyDaysExpireNotificationSettingRenewalCount}
                        </Badge>
                        {clearAllButton === "nintyDaysExpired" ?
                          <div className="ml-2">
                            <Chip
                              style={{ backgroundColor: "#17535a", color: "#fff" }}
                              onClick={() => handleClearAllNotification("nintyDaysExpired")}
                              className="d-flex align-items-center "
                              label="Clear All"
                              icon={<DeleteOutlinedIcon style={{ color: "#fff" }} />}
                              size="small"
                            />
                          </div>
                          : ""
                        }
                        <div className="ml-1">
                          <ChevronDown size={20} className="chevron" />
                        </div>
                      </div>
                    </div>
                  </Card>
                </>
              }
            >
              <div
                style={{
                  overflowY: "scroll",
                  overflowX: "hidden",
                  maxHeight: "50vh",
                  minHeight: '10%',
                }}>
                {getNotificationData?.nintyDaysExpireNotificationSettingRenewal === undefined ? "" :
                  getNotificationData?.nintyDaysExpireNotificationSettingRenewal?.map((item, index) => {
                    return (
                      <Fragment key={item?.studentInfo}>
                        <Row
                          className="d-flex align-items-center my-1 mr-1"
                        >
                          <Col sm={10} lg={10} md={10}>
                            <Link to={`/app/renewals`} className="d-flex align-items-center">
                              <Avatar className='mx-2'
                                src={item?.memberprofileImage}
                              />
                              <div>
                                <p className="mb-0" style={{ color: "#4e4e4e" }}><b>{item?.memberInfo?.firstName} {item?.memberInfo?.lastName}'s</b> {item?.membership_name} Membership expiring on <b>{moment(item?.expiry_date).format("D MMMM YYYY")}</b></p>
                              </div>
                            </Link>
                          </Col>
                          <Col sm={2} lg={2} md={2}>
                            <div className="d-flex">
                              <DeleteOutlinedIcon
                                className="mr-1"
                                onClick={() => handleDeleteSingleNotification("expired", item?.studentInfo)}
                                size="small"
                                style={{ color: "#808080", cursor:"pointer" }}
                              />
                              {item?.isSeen ? (
                                <DoneAllOutlinedIcon style={{ color: "#62b523" }} size="small" />
                              ) : (
                                <DoneAllOutlinedIcon style={{ color: "#808080" }} size="small" />
                              )}
                            </div>
                          </Col>
                        </Row>
                        <Divider />
                      </Fragment>
                    )
                  })
                }
              </div>
            </Collapsible>
          </div >
          : ""}
        {userinformation?.fourteen_missucall_notification_setting ?
          <div className="mb-1">
            <Collapsible
              onOpen={() => handleSeenNotification("sevenToFourteenNotification")}
              onClose={() => setClearAllButton(null)}
              className="mb-1"
              trigger={
                <>
                  <Card style={{ backgroundColor: "#f6d2d0", color: "#e74432" }}>
                    <div className=" d-flex justify-content-between p-1">
                      <span><b>7 to 14 Days Notification</b></span>
                      <div className=" d-flex">
                        <Badge pill style={{ backgroundColor: "#e74432" }} className=''>
                          {getNotificationData?.sevenToFourteenMissucallCount}
                        </Badge>
                        {clearAllButton === "sevenToFourteenNotification" ?
                          <div className="ml-2">
                            <Chip
                              style={{ backgroundColor: "#e74432", color: "#fff" }}
                              onClick={() => handleClearAllNotification("sevenToFourteenNotification")}
                              className="d-flex align-items-center "
                              label="Clear All"
                              icon={<DeleteOutlinedIcon style={{ color: "#fff" }} />}
                              size="small"
                            />
                          </div>
                          : ""
                        }
                        <div className="ml-1">
                          <ChevronDown size={20} className="chevron" />
                        </div>
                      </div>
                    </div>
                  </Card>
                </>
              }
            >
              <div
                style={{
                  overflowY: "scroll",
                  overflowX: "hidden",
                  maxHeight: "50vh",
                  minHeight: '10%',
                }}>
                {getNotificationData?.sevenToFourteenNotification === undefined ? "" :
                  getNotificationData?.sevenToFourteenNotification?.map((item, index) => {
                    return (
                      <Fragment key={item?._id}>
                        <Row
                          className="d-flex align-items-center my-1 mr-1"
                        >
                          <Col sm={10} lg={10} md={10}>
                            <Link to={`/app/renewals`} className="d-flex align-items-center">
                              <Avatar className='mx-2'
                              // src={item?.memberprofileImage}
                              />
                              <div>
                                <p className="mb-0" style={{ color: "#4e4e4e" }}><b>{item?.firstName} {item?.lastName}</b> have missed <b>{item?.missclass_count}</b> classes since <b>{moment(item?.last_attended_date).format("D MMMM YYYY")}.</b></p>
                              </div>
                            </Link>
                          </Col>
                          <Col sm={2} lg={2} md={2}>
                            <div className="d-flex">
                              <DeleteOutlinedIcon
                                className="mr-1"
                                onClick={() => handleDeleteSingleNotification("MissYouCall", item?._id)}
                                size="small"
                                style={{ color: "#808080", cursor:"pointer" }}
                              />
                              {item?.isSeen ? (
                                <DoneAllOutlinedIcon style={{ color: "#62b523" }} size="small" />
                              ) : (
                                <DoneAllOutlinedIcon style={{ color: "#808080" }} size="small" />
                              )}
                            </div>
                          </Col>
                        </Row>
                        <Divider />
                      </Fragment>
                    )
                  })
                }
              </div>
            </Collapsible>
          </div >
          : ""}
        {userinformation?.thirty_missucall_notification_setting ?
          <div className="mb-1">
            <Collapsible
              onOpen={() => handleSeenNotification("fourteenToThirtyNotification")}
              onClose={() => setClearAllButton(null)}
              className="mb-1"
              trigger={
                <>
                  <Card style={{ backgroundColor: "#f6dcf2", color: "#d55fb0" }}>
                    <div className=" d-flex justify-content-between p-1">
                      <span><b>15 to 30 Days Notification</b></span>
                      <div className=" d-flex">
                        <Badge pill style={{ backgroundColor: "#d55fb0" }} className=''>
                          {getNotificationData?.fourteenToThirtyMissucallCount}
                        </Badge>
                        {clearAllButton === "fourteenToThirtyNotification" ?
                          <div className="ml-2">
                            <Chip
                              style={{ backgroundColor: "#d55fb0", color: "#fff" }}
                              onClick={() => handleClearAllNotification("fourteenToThirtyNotification")}
                              className="d-flex align-items-center "
                              label="Clear All"
                              icon={<DeleteOutlinedIcon style={{ color: "#fff" }} />}
                              size="small"
                            />
                          </div>
                          : ""
                        }
                        <div className="ml-1">
                          <ChevronDown size={20} className="chevron" />
                        </div>
                      </div>
                    </div>
                  </Card>
                </>
              }
            >
              <div
                style={{
                  overflowY: "scroll",
                  overflowX: "hidden",
                  maxHeight: "50vh",
                  minHeight: '10%',
                }}>
                {getNotificationData?.fourteenToThirtyNotification === undefined ? "" :
                  getNotificationData?.fourteenToThirtyNotification?.map((item, index) => {
                    return (
                      <Fragment key={item?._id}>
                        <Row
                          className="d-flex align-items-center my-1 mr-1"
                        >
                          <Col sm={10} lg={10} md={10}>
                            <Link to={`/app/renewals`} className="d-flex align-items-center">
                              <Avatar className='mx-2'
                              // src={item?.memberprofileImage}
                              />
                              <div>
                                <p className="mb-0" style={{ color: "#4e4e4e" }}><b>{item?.firstName} {item?.lastName}</b> have missed <b>{item?.missclass_count}</b> classes since <b>{moment(item?.last_attended_date).format("D MMMM YYYY")}.</b></p>
                              </div>
                            </Link>
                          </Col>
                          <Col sm={2} lg={2} md={2}>
                            <div className="d-flex">
                              <DeleteOutlinedIcon
                                className="mr-1"
                                onClick={() => handleDeleteSingleNotification("MissYouCall", item?._id)}
                                size="small"
                                style={{ color: "#808080", cursor:"pointer" }}
                              />
                              {item?.isSeen ? (
                                <DoneAllOutlinedIcon style={{ color: "#62b523" }} size="small" />
                              ) : (
                                <DoneAllOutlinedIcon style={{ color: "#808080" }} size="small" />
                              )}
                            </div>
                          </Col>
                        </Row>
                        <Divider />
                      </Fragment>
                    )
                  })
                }
              </div>
            </Collapsible>
          </div >
          : ""}
        {userinformation?.sixty_missucall_notification_setting ?
          <div className="mb-1">
            <Collapsible
              onOpen={() => handleSeenNotification("thirtyToSixtyNotification")}
              onClose={() => setClearAllButton(null)}
              className="mb-1"
              trigger={
                <>
                  <Card style={{ backgroundColor: "#d8e4f7", color: "#0483fd" }}>
                    <div className=" d-flex justify-content-between p-1">
                      <span><b>31 to 60 Days Notification</b></span>
                      <div className=" d-flex">
                        <Badge pill style={{ backgroundColor: "#0483fd" }} className=''>
                          {getNotificationData?.thirtyToSixtyMissucallCount}
                        </Badge>
                        {clearAllButton === "thirtyToSixtyNotification" ?
                          <div className="ml-2">
                            <Chip
                              style={{ backgroundColor: "#0483fd", color: "#fff" }}
                              onClick={() => handleClearAllNotification("thirtyToSixtyNotification")}
                              className="d-flex align-items-center "
                              label="Clear All"
                              icon={<DeleteOutlinedIcon style={{ color: "#fff" }} />}
                              size="small"
                            />
                          </div>
                          : ""
                        }
                        <div className="ml-1">
                          <ChevronDown size={20} className="chevron" />
                        </div>
                      </div>
                    </div>
                  </Card>
                </>
              }
            >
              <div
                style={{
                  overflowY: "scroll",
                  overflowX: "hidden",
                  maxHeight: "50vh",
                  minHeight: '10%',
                }}>
                {getNotificationData?.thirtyToSixtyNotification === undefined ? "" :
                  getNotificationData?.thirtyToSixtyNotification?.map((item, index) => {
                    return (
                      <Fragment key={item?._id}>
                        <Row
                          className="d-flex align-items-center my-1 mr-1"
                        >
                          <Col sm={10} lg={10} md={10}>
                            <Link to={`/app/renewals`} className="d-flex align-items-center">
                              <Avatar className='mx-2'
                              // src={item?.memberprofileImage}
                              />
                              <div>
                                <p className="mb-0" style={{ color: "#4e4e4e" }}><b>{item?.firstName} {item?.lastName}</b> have missed <b>{item?.missclass_count}</b> classes since <b>{moment(item?.last_attended_date).format("D MMMM YYYY")}.</b></p>
                              </div>
                            </Link>
                          </Col>
                          <Col sm={2} lg={2} md={2}>
                            <div className="d-flex">
                              <DeleteOutlinedIcon
                                className="mr-1"
                                onClick={() => handleDeleteSingleNotification("MissYouCall", item?._id)}
                                size="small"
                                style={{ color: "#808080", cursor:"pointer" }}
                              />
                              {item?.isSeen ? (
                                <DoneAllOutlinedIcon style={{ color: "#62b523" }} size="small" />
                              ) : (
                                <DoneAllOutlinedIcon style={{ color: "#808080" }} size="small" />
                              )}
                            </div>
                          </Col>
                        </Row>
                        <Divider />
                      </Fragment>
                    )
                  })
                }
              </div>
            </Collapsible>
          </div >
          : ""}
        {userinformation?.sixtyPlus_missucall_notification_setting ?
          <div className="mb-1">
            <Collapsible
              onOpen={() => handleSeenNotification("sixtyPlusNotification")}
              onClose={() => setClearAllButton(null)}
              className="mb-1"
              trigger={
                <>
                  <Card style={{ backgroundColor: "#c6f1be", color: "#5db94c" }}>
                    <div className=" d-flex justify-content-between p-1">
                      <span><b>61+ Days Notification</b></span>
                      <div className=" d-flex">
                        <Badge pill style={{ backgroundColor: "#5db94c" }} className=''>
                          {getNotificationData?.sixtyPlusMissucallCount}
                        </Badge>
                        {clearAllButton === "sixtyPlusNotification" ?
                          <div className="ml-2">
                            <Chip
                              style={{ backgroundColor: "#5db94c", color: "#fff" }}
                              onClick={() => handleClearAllNotification("sixtyPlusNotification")}
                              className="d-flex align-items-center "
                              label="Clear All"
                              icon={<DeleteOutlinedIcon style={{ color: "#fff" }} />}
                              size="small"
                            />
                          </div>
                          : ""
                        }
                        <div className="ml-1">
                          <ChevronDown size={20} className="chevron" />
                        </div>
                      </div>
                    </div>
                  </Card>
                </>
              }
            >
              <div
                style={{
                  overflowY: "scroll",
                  overflowX: "hidden",
                  maxHeight: "50vh",
                  minHeight: '10%',
                }}>
                {getNotificationData?.sixtyPlusNotification === undefined ? "" :
                  getNotificationData?.sixtyPlusNotification?.map((item, index) => {
                    return (
                      <Fragment key={item?._id}>
                        <Row
                          className="d-flex align-items-center my-1 mr-1"
                        >
                          <Col sm={10} lg={10} md={10}>
                            <Link to={`/app/renewals`} className="d-flex align-items-center">
                              <Avatar className='mx-2'
                              // src={item?.memberprofileImage}
                              />
                              <div>
                                <p className="mb-0" style={{ color: "#4e4e4e" }}><b>{item?.firstName} {item?.lastName}</b> have missed <b>{item?.missclass_count}</b> classes since <b>{moment(item?.last_attended_date).format("D MMMM YYYY")}.</b></p>
                              </div>
                            </Link>
                          </Col>
                          <Col sm={2} lg={2} md={2}>
                            <div className="d-flex">
                              <DeleteOutlinedIcon
                                className="mr-1"
                                onClick={() => handleDeleteSingleNotification("MissYouCall", item?._id)}
                                size="small"
                                style={{ color: "#808080", cursor:"pointer" }}
                              />
                              {item?.isSeen ? (
                                <DoneAllOutlinedIcon style={{ color: "#62b523" }} size="small" />
                              ) : (
                                <DoneAllOutlinedIcon style={{ color: "#808080" }} size="small" />
                              )}
                            </div>
                          </Col>
                        </Row>
                        <Divider />
                      </Fragment>
                    )
                  })
                }
              </div>
            </Collapsible>
          </div >
          : ""}
      </div >
    )
  }

  return (
    <Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Notification">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Bell color="#737373" size={21} />
            {getNotificationData?.count !== 0 ?
              <Badge pill color='danger' className='badge-up'>
                {getNotificationData?.count}
              </Badge>
              : ""
            }
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        className="dropdown-menu-media"
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        // onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            minWidth: "500px",
            maxWidth: "500px",
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <div className="d-flex justify-content-between px-2 pt-1 w-100">
          <h4 className='notification-title mb-0 me-auto'>Notifications</h4>
          <Link to={`/company/settings`}><SettingsOutlinedIcon style={{ color: "#808080" }} /></Link>
        </div>
        <Divider />
        <div
          style={{
            overflowY: "scroll",
            overflowX: "hidden",
            maxHeight: "60vh",
            minHeight: '10%',
          }}
          className="ml-1"
        >
          {renderNotificationItems()}
        </div>
        {/* <Divider />
        <div className="px-1">
          <Button color='primary' block className="mt-1 ">
            Read all notifications
          </Button>
        </div> */}
      </Menu>
    </Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    userinformation: state.userinfo.userinformation,
  };
};

export default connect(mapStateToProps,
  {
    GET_USER_INFORMATION,
    SEEN_NOTIFICATION,
    REMOVE_NOTIFICATION,
  })(NotificationDropdown);