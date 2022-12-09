import React, {useEffect, useState} from 'react'
import { Select, Input, Button } from 'antd'
import { IconButton, Slider, Typography } from '@mui/material';
import FontFamily from '../../configuration/fontfamily';
import { X } from 'react-feather';

const { Option } = Select;

const Dropdownsettings = ({ editor }) => {
   const [fontsize, setfontsize] = useState(0)
   const [inputstyle, setinputstyle] = useState([])
   const [value, setvalue] = useState([
      {
         value: '',
         name: '',
      }
   ])
   const getSelectedHtmlElement = () => {
      return editor.getSelected().getChildAt(0);
   };

   const handlestyle2 = (e, name) => {
        const element = getSelectedHtmlElement();
        let attributes = getSelectedHtmlElement().getAttributes();
        attributes[name] = e;
        getSelectedHtmlElement().setAttributes(attributes);
        element.addStyle({ [name]: e })
   }
   const handlestyleaddattribute = (newVal, name) => {
      const element = getSelectedHtmlElement();
      let attributes = getSelectedHtmlElement().getAttributes();
      attributes[name] = newVal;

      if (name === "required") {
         if (newVal === "required") {
            element.addAttributes({ 'required': true })
         } else {
            element.addAttributes({ 'required': false })
         }
      } else {
         element.addAttributes({ [name]: newVal })
      }
      getSelectedHtmlElement().setAttributes(attributes);
   }
   const handleFontsize = (event, newVal) => {
      const element = getSelectedHtmlElement();
      let attributes = getSelectedHtmlElement().getAttributes();
      attributes.fontSize = event.target.value;
      getSelectedHtmlElement().setAttributes(attributes);
      element.addStyle({ 'font-size': event.target.value + 'px' })
      setfontsize(event.target.value)
   }
   const handleinputstyle = (e) => {
       let attributes = getSelectedHtmlElement().getAttributes();
       attributes.type = e;
       getSelectedHtmlElement().setAttributes(attributes);
      setinputstyle(e)
   }
   const handleaddsatribute = (e, name, i) => {
      const element = getSelectedHtmlElement();
      let attributes = getSelectedHtmlElement().getAttributes();
      attributes[name] = e.target.value;
      getSelectedHtmlElement().setAttributes(attributes);
      element.addAttributes({ [name]: e.target.value })
   }

   const handleaddsatribute2 = (e, name, i) => {
      const element = editor.getSelected()
      let data = [...value]
      data[i][name] = e.target.value
      setvalue(data)
      let component = getSelectedHtmlElement().getChildAt(i);
      if(name == 'value') {
        component.addAttributes({value: e.target.value});
      } else {
        component.set({content: e.target.value});
      }
   }
   const handleAdddata = () => {
      let data = [...value]
      let array = {
         value: '',
         name: '',
      }
      data.push(array)
      setvalue(data)
      getSelectedHtmlElement().append(createOption('', ''))
   }
   const handleremoveoption = (e, i) => {
      let data = [...value]
      console.log(data);
      setvalue(data)
      getSelectedHtmlElement().getChildAt(i).remove();
   }

    const createOption = (value, text) => ({
      tagName: 'option',
      attributes: {value: value},
      content: text,
      layerable: false,
      droppable: false,
      draggable: false,
      selectable: false,
      hoverable: false,
    });

    useEffect(() => {
      let attributes = getSelectedHtmlElement().getAttributes();
      if(!attributes) {
        attributes = {};
        getSelectedHtmlElement().setAttributes(attributes);
      }
      setfontsize(attributes.fontSize);
    })
   return (
      <div id="dropdwon">
         <div className='inputwarrper'>
            <div
               className='inputlablewarrper'>
               <Typography
                  className='mb-0'
               >Input Type</Typography>
            </div>
            <Select className="inputstyle"
                    defaultValue={getSelectedHtmlElement().getAttributes()["type"]}
               getPopupContainer={() => document.getElementById('dropdwon')}
               onChange={(e) => { handleinputstyle(e, "type") }}
            >
               <Option value="Not set">Not set</Option>
               <Option value="All Countries">All Countries</Option>
               <Option value="All United State">All United State</Option>
               <Option value="All Canadian Provinces">All Canadian Provinces</Option>
               <Option value="Us & Canada">Us & Canada</Option>
               <Option value="Custom Option">Custom Option</Option>
            </Select>
         </div>
         <div className='inputwarrper'>
            <div
               className='inputlablewarrper'>
               <Typography
                  className='mb-0'
               >Input Name</Typography>
            </div>
            <Input
               className='inputstyle'
               placeholder='Input Name'
               defaultValue={getSelectedHtmlElement().getAttributes()["name"]}
               onChange={(e) => { handleaddsatribute(e, "name") }}
            />
         </div>
         {inputstyle === "Custom Option" && <div className="bgsecondary d-flex align-items-center"
            style={{
               height: "40px",
            }}>
            <Typography className='p-1 mb-0 m-1 font-weight-bold'>
               Input Name is required to collect information,
               and it accepts letters and numbers only.
            </Typography>
         </div>}
         {
            inputstyle === "Custom Option" && <div className='m-1 p-1'
               style={{
                  border: '1px solid rgb(221, 221, 221)',
                  padding: '0px',
                  backgroundColor: ' #fff',
                  borderRadius: '3px',
                  margin: '10px 25px',
                  marginTop: '0',
               }}>
               {
                  value.map((item, i) => {
                     return (
                        <div key={i}>
                           <div className="d-flex justify-content-end w-100">
                              <IconButton onClick={(e) => {handleremoveoption(e, i)}} className="p-0">
                                 <X style={{
                                    fontWeight: '12px'
                                 }} />
                              </IconButton>
                           </div>
                           <div className='d-flex justify-content-between'>
                              <div>
                                 <Typography className='mb-0'
                                    style={{
                                       color: '#828282',
                                       display:'flex',
                                       justifyContent:'start'
                                    }}
                                 >Value:</Typography>
                                 <div>
                                    <Input
                                       style={{
                                          width: '100px'
                                       }}
                                       value={item.value}
                                       onChange={(e) => {
                                          handleaddsatribute2(e, "value", i)
                                       }}
                                    />
                                 </div>
                              </div>
                              <div>
                                 <Typography
                                   style={{
                                    color: '#828282',
                                    display:'flex',
                                    justifyContent:'start'
                                 }}
                                    className='mb-0'>Text:</Typography>
                                 <div>
                                    <Input
                                       style={{
                                          width: '200px'
                                       }}
                                       value={item.name}
                                       onChange={(e) => {
                                          handleaddsatribute2(e, "name", i)
                                       }}
                                    />
                                 </div>
                              </div>
                           </div>
                        </div>
                     )
                  })
               }
               <br />
               <Button onClick={handleAdddata}>+ Add New Option</Button>
            </div>
         }
         <div className='inputwarrper'>
            <div
               className='inputlablewarrper'>
               <Typography
                  className='mb-0'
               >Required</Typography>
            </div>
            <Select
              defaultValue={getSelectedHtmlElement().getAttributes()["required"]}
               className="inputstyle"
               getPopupContainer={() => document.getElementById('dropdwon')}
               onChange={(e) => { handlestyleaddattribute(e, "required") }}
            >
               <Option value={true}>Required</Option>
               <Option value={false}>Not Required</Option>
            </Select>
         </div>
         <div className='inputwarrper'>
            <div
               className='inputlablewarrper'>
               <Typography
                  className='mb-0'
               >Font Family</Typography>
            </div>
            <Select
               showSearch
               defaultValue={getSelectedHtmlElement().getAttributes()["font-family"]}
               className='inputstyle'
               placeholder="select font"
               onChange={(e) => { handlestyle2(e, "font-family") }}
               getPopupContainer={() => document.getElementById('dropdwon')}
               filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
            >
               {FontFamily.families.map((item, i) => {
                  return (
                     <Option value={item} key={i}>{item}</Option>
                  )
               })}
            </Select>
         </div>
         <div className='sliderinputwarrper'>
            <div
               className='inputlablewarrper'
               style={{
                  width: '210px',
                  color: '#828282'
               }}
            >
               <Typography
                  className='mb-0'
               >Font Size</Typography>
            </div>
            <Slider
               size="small"
               defaultValue={getSelectedHtmlElement().getAttributes().fontSize}
               valueLabelDisplay={fontsize}
               onChange={handleFontsize}
            />
            <div className='countinputwrapper'
            >
               <div className='countinput' style={{
                  border: '1px solid #C4C4C4'
               }}>
                  {fontsize}
               </div>
            </div>
         </div>
      </div >
   )
}

export default Dropdownsettings
