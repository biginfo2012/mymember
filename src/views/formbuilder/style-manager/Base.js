import { TabList } from '@mui/lab'
import { Box, Tab } from '@mui/material'
import React, {useEffect, useState} from 'react'
import TabPanel from '@mui/lab/TabPanel';
import SettingsIcon from "@mui/icons-material/Settings";
import SettingIcon from "../../../assets/img/SettingIcon.png"
import SettingIcon1 from "../../../assets/img/SettingIcon1.png"
import SettingTab from './SettingTab';
import AdvanceTab from './AdvanceTab';
import Icon from "@ant-design/icons";
import TabContext from '@mui/lab/TabContext';
// import SubmitSettings from "../elements/submit/submit-settings.js";

const Base = (props) => {
    const {
      editor,
      studentList,
      membershipList,
      productFolderList,
      onChangeEvent
    } = props
    const [Val, setVal] = useState("1")
    const handleCh = (event, newVal) => {
        setVal(newVal);
    };
    useEffect(() => {

    });
    return (
        <div>
            <Box>
                <TabContext value={Val}  >
                    <TabList
                        onChange={handleCh}
                        style={{ background: '#F1F1F1' }}                    >
                        <Tab icon={<SettingsIcon />}
                            iconPosition="start" label="Settings"
                            value="1"
                            style={{
                                color: Val === "1" ? '#0184FF' : "#828282",
                                fontWeight: 'bold',
                                fontSize: '14px'
                            }} />
                        <Tab
                            style={{
                                fontWeight: 'bold',
                                fontSize: '14px'
                            }}
                            icon={
                                <Icon
                                    component={() =>
                                        <img
                                            src={Val === "2" ? SettingIcon1 : SettingIcon} />} />
                            }
                            iconPosition="start"
                            label="Advanced"
                            value="2"
                        />
                    </TabList>
                    <TabPanel value="1" className='p-0'>
                        <SettingTab editor={editor} studentList={studentList} membershipList={membershipList} productFolderList={productFolderList} onChangeEvent={onChangeEvent}/>
                    </TabPanel>
                    <TabPanel value="2" className='p-0'>
                        <AdvanceTab editor={editor} studentList={studentList} membershipList={membershipList} onChangeEvent={onChangeEvent}/>
                    </TabPanel>
                </TabContext>
            </Box>
        </div >
    )
}

export default Base
