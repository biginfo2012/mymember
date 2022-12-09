import React, { useEffect } from "react";
import { Card, Divider, Grid, Switch } from "@mui/material";
import Collapsible from "react-collapsible";
import { ChevronDown } from "react-feather";
import { GET_USER_INFORMATION } from "../../../../redux/actions/auth/loginActions";
import { NOTIFICATION_ON_OFF } from "../../../../redux/actions/marketing/V2TextChat";
import { connect } from "react-redux";



const NotificationSetting = (props) => {
    const { GET_USER_INFORMATION, NOTIFICATION_ON_OFF, userinformation } = props
    console.log(userinformation)
    useEffect(() => {
        GET_USER_INFORMATION()
    }, [GET_USER_INFORMATION])
    const handleChange = async (settingType) => {
        if (settingType === "Chat") {
            await NOTIFICATION_ON_OFF({ chatSetting: !userinformation?.chat_setting })
        } else if (settingType === "thisWeek") {
            await NOTIFICATION_ON_OFF({ thisWeekBirthdaySetting: !userinformation?.thisWeek_birthday_setting })
        } else if (settingType === "thisMonth") {
            await NOTIFICATION_ON_OFF({ thisMonthBirthdaySetting: !userinformation?.thisMonth_birthday_setting })
        } else if (settingType === "lastMonth") {
            await NOTIFICATION_ON_OFF({ lastMonthBirthdaySetting: !userinformation?.lastMonth_birthday_setting })
        } else if (settingType === "nextSixtyDays") {
            await NOTIFICATION_ON_OFF({ sixtyDaysBirthdaySetting: !userinformation?.nextSixtyDays_birthday_setting })
        } else if (settingType === "nextNintyDays") {
            await NOTIFICATION_ON_OFF({ nintyDaysBirthdaySetting: !userinformation?.nextNintyDays_birthday_setting })
        } else if (settingType === "Event") {
            await NOTIFICATION_ON_OFF({ eventNotificationSetting: !userinformation?.event_notification_setting })
        } else if (settingType === "Task") {
            await NOTIFICATION_ON_OFF({ taskSetting: !userinformation?.task_setting })
        } else if (settingType === "expiredNotification") {
            await NOTIFICATION_ON_OFF({ expireNotificationSetting: !userinformation?.expire_notification_setting })
        } else if (settingType === "thirtyDaysExpiredNotification") {
            await NOTIFICATION_ON_OFF({ thirtyDaysExpireNotificationSetting: !userinformation?.thirtydays_expire_notification_setting_renewal })
        } else if (settingType === "sixtyDaysExpiredNotification") {
            await NOTIFICATION_ON_OFF({ sixtyDaysExpireNotificationSetting: !userinformation?.sixtydays_expire_notification_setting_renewal })
        } else if (settingType === "nintyDaysExpiredNotification") {
            await NOTIFICATION_ON_OFF({ nintyDaysExpire_notification_setting: !userinformation?.nintydays_expire_notification_setting_renewal })
        } else if (settingType === "sevenToFourteenSetting") {
            await NOTIFICATION_ON_OFF({ sevenToFourteenSetting: !userinformation?.fourteen_missucall_notification_setting })
        } else if (settingType === "fifteenToThirtySetting") {
            await NOTIFICATION_ON_OFF({ fifteenToThirtySetting: !userinformation?.thirty_missucall_notification_setting })
        } else if (settingType === "thirtyoneToSixtySetting") {
            await NOTIFICATION_ON_OFF({ thirtyoneToSixtySetting: !userinformation?.sixty_missucall_notification_setting })
        } else if (settingType === "sixtyonePlusSetting") {
            await NOTIFICATION_ON_OFF({ sixtyonePlusSetting: !userinformation?.sixtyPlus_missucall_notification_setting })
        }


    }

    return (
        <div className="">
            <h3 className="ml-3 mb-4"><b>Notifaysication Setting</b></h3>
            <div className="mx-4 ">
                {/* <Divider className="mt-0" /> */}
                <div>
                    <Collapsible
                        // onOpen={() => handleSeenNotification("Chat")}
                        // onClose={() => setclearAllButton(false)}
                        className=""
                        trigger={
                            <>
                                <div className="d-flex justify-content-between my-2">
                                    <h5 className="mb-0">System Notification</h5>
                                    <ChevronDown size={20} className="chevron" />
                                </div>
                                <Divider />
                            </>
                        }
                    >
                        <div className="">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h5 className="mb-0">24 Hour Email Report</h5>
                                    {/* <small>Block Birthday This Week Notification</small> */}
                                </div>
                                <Switch
                                    style={{ color: "#0184FF" }}
                                    // checked={state.isproof}
                                    // onChange={handleChange}
                                    name="isproof"
                                    inputProps={{ "aria-label": "primary checkbox" }}
                                />
                            </div>
                        </div>
                        <Divider />
                        <div className="">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h5 className="mb-0">24 hour Text Report</h5>
                                    {/* <small>Block Birthday This Month Notification</small> */}
                                </div>
                                <Switch
                                    style={{ color: "#0184FF" }}
                                    // checked={state.isproof}
                                    // onChange={handleChange}
                                    name="isproof"
                                    inputProps={{ "aria-label": "primary checkbox" }}
                                />
                            </div>
                        </div>
                        <Divider />
                    </Collapsible>
                </div>
                <div className=" mb-1">
                    <div className="">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h5 className="mb-0">Chat Notification</h5>
                                <small>Notification from incoming Chats from online.</small>
                            </div>
                            <Switch
                                style={{ color: "#0184FF" }}
                                checked={!!userinformation?.chat_setting}
                                onChange={() => handleChange("Chat")}
                                name="Chat"
                                inputProps={{ "aria-label": "primary checkbox" }}
                            />
                        </div>
                    </div>
                    <Divider />
                    {/* <div className="mt-1">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h5 className="mb-0">Text Notification</h5>
                                <small>Notification from incoming Text Messages.</small>
                            </div>
                            <Switch
                                style={{ color: "#0184FF" }}
                                // checked={!!userinformation?.chat_setting}
                                // onChange={() => handleChange("Text")}
                                name="Text"
                                inputProps={{ "aria-label": "primary checkbox" }}
                            />
                        </div>
                    </div>
                    <Divider /> */}
                    <div className="mt-1">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h5 className="mb-0">Task Notification</h5>
                                <small>Notification from upcoming Tasks Today.</small>
                            </div>
                            <Switch
                                style={{ color: "#0184FF" }}
                                checked={!!userinformation?.task_setting}
                                onChange={() => handleChange("Task")}
                                name="Task"
                                inputProps={{ "aria-label": "primary checkbox" }}
                            />
                        </div>
                    </div>
                    <Divider />
                    <div className="mt-1">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h5 className="mb-0">Event Notification</h5>
                                <small>Notification from upcoming Evants Today.</small>
                            </div>
                            <Switch
                                style={{ color: "#0184FF" }}
                                checked={!!userinformation?.event_notification_setting}
                                onChange={() => handleChange("Event")}
                                name="Event"
                                inputProps={{ "aria-label": "primary checkbox" }}
                            />
                        </div>
                    </div>
                    <Divider />
                </div>
                <div className="mb-0">
                    <Collapsible
                        // onOpen={() => handleSeenNotification("Chat")}
                        // onClose={() => setclearAllButton(false)}
                        className=""
                        trigger={
                            <>
                                <div className="d-flex justify-content-between my-2">
                                    <h5 className="mb-0">Miss You Call Notification</h5>
                                    <ChevronDown size={20} className="chevron" />
                                </div>
                                <Divider className="mb-0" />
                            </>
                        }
                    >
                        <div className="mt-1 px-1">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h5 className="mb-0">7 to 14 Days Notification</h5>
                                    <small>Block Miss You Call 7 to 14 Days Notification</small>
                                </div>
                                <Switch
                                    style={{ color: "#0184FF" }}
                                    checked={!!userinformation?.fourteen_missucall_notification_setting}
                                    onChange={() => handleChange("sevenToFourteenSetting")}
                                    name="sevenToFourteenSetting"
                                    inputProps={{ "aria-label": "primary checkbox" }}
                                />
                            </div>
                        </div>
                        <Divider />
                        <div className="px-1">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h5 className="mb-0">15 to 30 Days Notification</h5>
                                    <small>Block Miss You Call 15 to 30 Days Notification</small>
                                </div>
                                <Switch
                                    style={{ color: "#0184FF" }}
                                    checked={!!userinformation?.thirty_missucall_notification_setting}
                                    onChange={() => handleChange("fifteenToThirtySetting")}
                                    name="fifteenToThirtySetting"
                                    inputProps={{ "aria-label": "primary checkbox" }}
                                />
                            </div>
                        </div>
                        <Divider />
                        <div className="px-1">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h5 className="mb-0">31 to 60 Days Notification</h5>
                                    <small>Block Miss You Call 31 to 60 Days Notification</small>
                                </div>
                                <Switch
                                    style={{ color: "#0184FF" }}
                                    checked={!!userinformation?.sixty_missucall_notification_setting}
                                    onChange={() => handleChange("thirtyoneToSixtySetting")}
                                    name="thirtyoneToSixtySetting"
                                    inputProps={{ "aria-label": "primary checkbox" }}
                                />
                            </div>
                        </div>
                        <Divider />
                        <div className="px-1">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h5 className="mb-0">61+ Days Notification</h5>
                                    <small>Block Miss You Call 61+ Days Notification</small>
                                </div>
                                <Switch
                                    style={{ color: "#0184FF" }}
                                    checked={!!userinformation?.sixtyPlus_missucall_notification_setting}
                                    onChange={() => handleChange("sixtyonePlusSetting")}
                                    name="sixtyonePlusSetting"
                                    inputProps={{ "aria-label": "primary checkbox" }}
                                />
                            </div>
                        </div>
                        <Divider />
                    </Collapsible>
                </div>

                <div className="mb-0">
                    <Collapsible
                        // onOpen={() => handleSeenNotification("Chat")}
                        // onClose={() => setclearAllButton(false)}
                        className=""
                        trigger={
                            <>
                                <div className="d-flex justify-content-between my-2">
                                    <h5 className="mb-0">Birthday Notification</h5>
                                    <ChevronDown size={20} className="chevron" />
                                </div>
                                <Divider className="mb-0" />
                            </>
                        }
                    >
                        <div className="mt-1 px-1">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h5 className="mb-0">This Week Notification</h5>
                                    <small>Block Birthday This Week Notification</small>
                                </div>
                                <Switch
                                    style={{ color: "#0184FF" }}
                                    checked={!!userinformation?.thisWeek_birthday_setting}
                                    onChange={() => handleChange("thisWeek")}
                                    name="thisMonth"
                                    inputProps={{ "aria-label": "primary checkbox" }}
                                />
                            </div>
                        </div>
                        <Divider />
                        <div className="px-1">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h5 className="mb-0">This Month Notification</h5>
                                    <small>Block Birthday This Month Notification</small>
                                </div>
                                <Switch
                                    style={{ color: "#0184FF" }}
                                    checked={!!userinformation?.thisMonth_birthday_setting}
                                    onChange={() => handleChange("thisMonth")}
                                    name="thisMonth"
                                    inputProps={{ "aria-label": "primary checkbox" }}
                                />
                            </div>
                        </div>
                        <Divider />
                        <div className="px-1">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h5 className="mb-0">Last Month Notification</h5>
                                    <small>Block Birthday Last Month Notification</small>
                                </div>
                                <Switch
                                    style={{ color: "#0184FF" }}
                                    checked={!!userinformation?.lastMonth_birthday_setting}
                                    onChange={() => handleChange("lastMonth")}
                                    name="lastMonth"
                                    inputProps={{ "aria-label": "primary checkbox" }}
                                />
                            </div>
                        </div>
                        <Divider />
                        <div className="px-1">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h5 className="mb-0">In 60 Days Notification</h5>
                                    <small>Block Birthday In 60 Days Notification</small>
                                </div>
                                <Switch
                                    style={{ color: "#0184FF" }}
                                    checked={!!userinformation?.nextSixtyDays_birthday_setting}
                                    onChange={() => handleChange("nextSixtyDays")}
                                    name="nextSixtyDays"
                                    inputProps={{ "aria-label": "primary checkbox" }}
                                />
                            </div>
                        </div>
                        <Divider />
                        <div className="px-1">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h5 className="mb-0">In 90 Days Notification</h5>
                                    <small>Block Birthday In 90 Days Notification</small>
                                </div>
                                <Switch
                                    style={{ color: "#0184FF" }}
                                    checked={!!userinformation?.nextNintyDays_birthday_setting}
                                    onChange={() => handleChange("nextNintyDays")}
                                    name="nextNintyDays"
                                    inputProps={{ "aria-label": "primary checkbox" }}
                                />
                            </div>
                        </div>
                        <Divider />
                    </Collapsible>
                </div>
                <div className="mt-0">
                    <Collapsible
                        // onOpen={() => handleSeenNotification("Chat")}
                        // onClose={() => setclearAllButton(false)}
                        className=""
                        trigger={
                            <>
                                <div className="d-flex justify-content-between my-2">
                                    <h5 className="mb-0">Renewal Notification</h5>
                                    <ChevronDown size={20} className="chevron" />
                                </div>
                                <Divider />
                            </>
                        }
                    >
                        <div className="mt-1 px-1">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h5 className="mb-0">Expired Notification</h5>
                                    <small>Block Renewal Expired Notification</small>
                                </div>
                                <Switch
                                    style={{ color: "#0184FF" }}
                                    checked={!!userinformation?.expire_notification_setting}
                                    onChange={() => handleChange("expiredNotification")}
                                    name="expiredNotification"
                                    inputProps={{ "aria-label": "primary checkbox" }}
                                />
                            </div>
                        </div>
                        <Divider />
                        <div className="px-1">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h5 className="mb-0">In 30 Days Notification</h5>
                                    <small>Block Renewal In 30 Days Notification</small>
                                </div>
                                <Switch
                                    style={{ color: "#0184FF" }}
                                    checked={!!userinformation?.thirtydays_expire_notification_setting_renewal}
                                    onChange={() => handleChange("thirtyDaysExpiredNotification")}
                                    name="thirtyDaysExpiredNotification"
                                    inputProps={{ "aria-label": "primary checkbox" }}
                                />
                            </div>
                        </div>
                        <Divider />
                        <div className="px-1">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h5 className="mb-0">In 60 Days Days Notification</h5>
                                    <small>Block Renewal In 60 Days Days Notification</small>
                                </div>
                                <Switch
                                    style={{ color: "#0184FF" }}
                                    checked={!!userinformation?.sixtydays_expire_notification_setting_renewal}
                                    onChange={() => handleChange("sixtyDaysExpiredNotification")}
                                    name="sixtyDaysExpiredNotification"
                                    inputProps={{ "aria-label": "primary checkbox" }}
                                />
                            </div>
                        </div>
                        <Divider />
                        <div className="px-1">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h5 className="mb-0">In 90 Days Notification</h5>
                                    <small>Block Renewal In 90 Days Notification</small>
                                </div>
                                <Switch
                                    style={{ color: "#0184FF" }}
                                    checked={!!userinformation?.nintydays_expire_notification_setting_renewal}
                                    onChange={() => handleChange("nintyDaysExpiredNotification")}
                                    name="nintyDaysExpiredNotification"
                                    inputProps={{ "aria-label": "primary checkbox" }}
                                />
                            </div>
                        </div>
                        <Divider />
                        {/* <div className="px-1">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h5 className="mb-0">Frozen Notification</h5>
                                    <small>Block Renewal Frozen Notification</small>
                                </div>
                                <Switch
                                    style={{ color: "#0184FF" }}
                                    checked={!!userinformation?.frozenNotificationSetting}
                                    onChange={() => handleChange("frozenNotification")}
                                    name="frozenNotification"
                                    inputProps={{ "aria-label": "primary checkbox" }}
                                />
                            </div>
                        </div>
                        <Divider /> */}
                    </Collapsible>
                </div>

            </div>
        </div >
    )
}
const mapStateToProps = (state) => {
    return {
        userinformation: state.userinfo.userinformation,
    };
};

export default connect(mapStateToProps, { GET_USER_INFORMATION, NOTIFICATION_ON_OFF })(NotificationSetting);

