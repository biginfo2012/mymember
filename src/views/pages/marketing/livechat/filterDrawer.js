import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { connect } from 'react-redux';
import {toggle_filter_drawer} from '../../../../redux/actions/marketing/livechat'
import { BreakfastDiningOutlined, Label } from '@mui/icons-material';
import { Autocomplete, FormControl, IconButton, InputLabel, ListSubheader, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { CloseRounded } from '@mui/icons-material'
import { dateRange, dateRangeList, priorityList, ticketStatusList } from './const';

function FilterDrawer(props) {
    const { isOpen, toggle_filter_drawer } = props;

    const [ticketStatus, setTicketStatus] = React.useState('');
    const [priority, setPriority] = React.useState('');
    const [requestDate, setRequestDate] = React.useState('');
    const [lastUpdateDate, setLastUpdateDate] = React.useState('');

    const handleTicketStatusChange = (event) => {
        console.log("selected text is", event.target.value);
        setTicketStatus(event.target.value);
    }

    const handleChange = (event, type) => {
        const newValue = event.target.value
        switch (type) {
            case "TICKET_STATUS":
                setTicketStatus(newValue);
                break;
            case "PRIORITY":
                setPriority(newValue);
                break;
            case "REQUEST_DATE":
                setRequestDate(newValue);
                break;
            case "LAST_UPDATE_DATE":
                setLastUpdateDate(newValue);
                break;
            default:
                break;
        }
    };

    const list = () => (
        <Box
            sx={{ width: 400, paddingLeft: '20px' }}
            role="presentation"
        // onClick={(e) => props.toggle_filter_drawer(false)}
        // onKeyDown={(e) => props.toggle_filter_drawer(false)}
        >
            {/* <List
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader" sx={{fontSize: '18px', display:'flex', justifyContent: 'space-between'}}>
                      Filter
                      <IconButton>
                          <CloseRounded/>
                      </IconButton>
                    </ListSubheader>
                  }
            >
                <Divider />
                <ListItem disablePadding>
                    <ListItemText primary="Requester" />

                </ListItem>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List> */}

            <Stack spacing={2} sx={{ width: 300 }}>
                <Typography sx={{ pt: 3 }}>Filter</Typography>
                <Divider />
                <Autocomplete
                    id="free-solo-demo"
                    renderInput={(params) => {
                        return (
                            <div>
                                <Typography sx={{ p: 1 }}>Label</Typography>
                                <TextField {...params} />
                            </div>)
                    }}
                    options={['dfd', 'dfdfd']}
                />
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Ticket Status</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={ticketStatus}
                        label="Ticket Status"
                        onChange={(e) => handleChange(e, "TICKET_STATUS")}
                    >
                        {
                            ticketStatusList.map((item, index) =>
                                <MenuItem value={index}>{item}</MenuItem>)
                        }
                    </Select>
                </FormControl>
                <Autocomplete
                    id="free-solo-3-demo"
                    disableClearable
                    options={['111', '222']}
                    renderInput={(params) => (
                        <div>
                            <Typography sx={{ p: 1 }}>Requester</Typography>
                            <TextField {...params} />
                        </div>
                    )}
                />
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Request Date</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={requestDate}
                        label="Request Date"
                        onChange={(e) => handleChange(e, "REQUEST_DATE")}
                    >
                        {
                            dateRangeList.map((item, index) =>
                                <MenuItem value={index}>{item}</MenuItem>)
                        }
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Priority</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={priority}
                        label="Priority"
                        onChange={(e) => handleChange(e, "PRIORITY")}
                    >
                        {
                            priorityList.map((item, index) =>
                                <MenuItem value={index}>{item}</MenuItem>)
                        }
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Last Update</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={ticketStatus}
                        label="Last Update "
                        onChange={(e) => handleChange(e, "LAST_UPDATE_DATE")}
                    >
                        {
                            dateRangeList.map((item, index) =>
                                <MenuItem value={index}>{item}</MenuItem>)
                        }
                    </Select>
                </FormControl>
                <Divider />
                <Stack spacing={2} direction="row" sx={{justifyContent: 'flex-end'}}>
                    <Button variant="text" onClick={(e) => toggle_filter_drawer()}>Cancel</Button>
                    <Button variant="contained" onClick={(e) => toggle_filter_drawer()}>Apply</Button>
                </Stack>
            </Stack>
        </Box>
    );

    return (
        <div>
            <Drawer
                anchor={'right'}
                open={isOpen}
                onClose={(e) => props.toggle_filter_drawer(false)}
            >
                {list()}
            </Drawer>
        </div>

    );
}

const mapStateToProps = (state) => {
    return {
        isOpen: state.livechat.isOpen
    };
};

export default connect(mapStateToProps, { toggle_filter_drawer })(FilterDrawer)

// export default FilterDrawer