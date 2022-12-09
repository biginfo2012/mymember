import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { Card, Checkbox, FormControlLabel, FormGroup, Grid } from '@mui/material';
import plus from "../../../../src/assets/img/plus.png"
import BridgeFunnel from "../../../../src/assets/img/BridgeFunnel.png"
import { useEffect } from "react";


const SelectFunnel = (props) => {
  const [activeTemplate, setActiveTemplate] = React.useState(0);
  const [templateList, setTemplateList] = React.useState([]);
  const [selectedIndustryList, setSelectedIndustryList] = React.useState([]);
  const [selectedFunnelList, setSelectedFunnelList] = React.useState([]);
  const {
    state,
    setState,
    templateCategoryList,
    templates,
    action
  } = props
  const changeTemplate = (key) => {
    setActiveTemplate(key);
    setState({
      ...state, templateId: key
    })
    props.changeTemplate(key);
  }

  const colorList = [
    "#2191FD",
    "#FF7676",
    "#F78828",
    "#FD2149",
    "#0BC8BC",
    "#FD2149",
  ];



  const getRandomBG = () => {
    return colorList[Math.floor(Math.random() * colorList.length)];
  };

  const data = [
    { name: "Author/ Speaker/ Coach/ Consultant", key: 1 },
    { name: "Professional Services", key: 2 },
    { name: "Retail", key: 3 },
    { name: "Ecommerce", key: 4 },
    { name: "B2B", key: 5 },
    { name: "Network Marketing", key: 6 },
    { name: "Other", key: 7 },
  ]
  const data2 = [
    { name: "Basic", key: 1 },
    { name: "With Upsell", key: 2 },
    { name: "With Booking", key: 3 },
    { name: "Other", key: 4 }
  ]

  const drawerWidth = 300;

  const getTemplateList = (industryList, funnelList) => {
    if(industryList.length == 0) {
      setTemplateList(templates?.data);
      return ;
    }
    let templateList = [];
    let data = templates?.data;
    for(var i = 0; i < data?.length; i ++) {
      data[i].color = getRandomBG();
      let categoryId = data[i].categoryId;
      let filter = industryList.filter(item => item == categoryId);
      if(filter.length > 0) {

        templateList.push(data[i]);
      }
    }

    setTemplateList(templateList);
  }

  const selectIndustry = (id) => {
    let list = [...selectedIndustryList];
    let index = list.indexOf(id);
    if (index == -1) {
      list.push(id);
    } else {
      list.splice(index, 1);
    }

    setSelectedIndustryList(list);
  }

  const selectFunnel = (id) => {
    let list = [...selectedFunnelList];
    let index = list.indexOf(id);
    if (index == -1) {
      list.push(id);
    } else {
      list.splice(index, 1);
    }
    setSelectedFunnelList(list);
  }

  useEffect(() => {
    if(templates) {
      setTemplateList(templates.data);
    }

  }, [templates])

  useEffect(() => {
    //console.log("Change selected list");
    getTemplateList(selectedIndustryList, selectedFunnelList)
  }, [selectedIndustryList, selectedFunnelList]);
  return (
    <div className="mt-1">
      <div className='d-flex'>
        <div
          style={{
            width: drawerWidth
          }}
          className='shadow mb-5 bg-white rounded'
        >
          <div className='back'>
            <List>
              <ListItem className='p-0 ml-2 '>
                <ListItemText>
                  <Typography className='mb-0 font-weight-bold'>{state.funnelType}</Typography>
                </ListItemText>
              </ListItem>
              {templateCategoryList?.filter(item => item?.typeId === state.funnelTypeId)?.map((item, i) => {
                return (
                  <ListItem className='p-0 ml-1' key={i}>
                    <ListItemButton className='p-0 ml-1'>
                      <FormGroup onClick={() => selectIndustry(item._id)}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="checkedB"
                              color="primary"
                            />
                          }
                          label={item?.name}
                        />
                      </FormGroup>
                    </ListItemButton>
                  </ListItem>
                )
              })
              }

            </List>
          </div>
        </div>
        <div
          className='w-100 ml-1'
        >
          <Card style={{
            background: '#0184FF',
            height: '50px',
            padding: '1em',
            color: '#ffff',
            display: 'flex',
            fontWeight: 'bold'
          }}>
            Optin Templates
          </Card>
          <Grid container spacing={2} className="py-1">
            <Grid item sm={12} md={3} lg={3}>
              <Card className={`templates_card d-flex align-items-center justify-content-center flex-column ${activeTemplate === 0
                ? "active"
                : ""
                }`}
                onClick={() => changeTemplate(0, "Create new")} style={{minHeight: '220px'}}>

                <div className='w-100 d-flex justify-content-center'>
                  <img style={{
                    height: '40px'
                  }}
                    alt="forms"
                    src={plus} />


                </div>
                <span className='create_title'>Create new</span>

              </Card>
            </Grid>
            {templateList?.map((item, index) => (
              <Grid item sm={12} md={3} lg={3} key={index} >
                <Card className={`templates_card ${activeTemplate === item._id
                  ? "active"
                  : ""
                  }`} onClick={() => changeTemplate(item._id)}
                >
                  <div
                    className='template_img'
                    style={{
                      background: item.color,
                    }}
                  >
                    <img style={{
                      height: '80px',
                    }}
                      alt="forms"
                      src={item.thumbnail} />

                  </div>
                  <span className='title'>{item.name}</span>
                  <div className='truncate-ellipsis'>
                    <Typography paragraph className='text-monospace' >
                      {item.description}
                    </Typography>
                  </div>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
      <div className='d-flex justify-content-end'>
        {action}
      </div>
    </div >
  )
}

export default SelectFunnel;
