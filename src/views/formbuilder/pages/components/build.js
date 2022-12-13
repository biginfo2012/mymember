import React, { useState, useEffect } from 'react';
import { Row, Col } from "reactstrap";
import '../../../../App.css'
import '../../../../assets/scss/grapes.scss'
import 'grapesjs/dist/css/grapes.min.css';
import grapesjs from 'grapesjs';

import 'grapesjs-preset-webpage/dist/grapesjs-preset-webpage.min.css';
import 'grapesjs-preset-webpage/dist/grapesjs-preset-webpage.min.js';
import "../../styles/main.scss"

import headingType from "../../elements/heading/heading";
import fullNameType from "../../elements/fullname/fullname.js";
import emailType from "../../elements/email/email.js";
import phoneType from "../../elements/phone/phone.js";
import datePickerType from "../../elements/datepicker/datepicker.js";
import shortTextType from "../../elements/input/shortTextType.js";
import Textarea from "../../elements/textaera/Textarea.js";
import paragraphType from "../../elements/paragraph/paragraph.js";
import dropDownType from "../../elements/dropdown/dropdown.js";
import singleChoiceType from "../../elements/singlechoice/singlechoice.js";
import multipleChoiceType from "../../elements/checkbox/multiplechoice.js";
import numberType from "../../elements/number/number.js";
import captchaType from "../../elements/captcha/captcha.js";
import spinnerType from "../../elements/spinner/spinner.js";
import submitType from "../../elements/button/submit.js";
import signatureType from "../../elements/signature/signature";
import productList from "../../elements/product-list/product-list";
import bulletType from "../../elements/bullets/bullets";
//SURVEY ELEMENTS
import inputTableType from "../../elements/input/shortTextType.js";
import starRatingType from "../../elements/star-rating/star-rating.js";

//Page Elements
import dividerType from "../../elements/divider/divider.js";
import sectionCollapseType from "../../elements/section-collapse/section-collapse.js";
// import pageBreakType from "../../elements/page-break/page-break.js"

//Payment Element
import stripeType from "../../elements/stripe/stripe.js";

//Section
import sectionWide from "../../elements/section-collapse/section-wide.js";
import sectionFullWidth from "../../elements/section-collapse/section-full-width.js";
import sectionMedium from "../../elements/section-collapse/section-medium.js";
import sectionSmall from "../../elements/section-collapse/section-small.js";

//Column
import sectionColumn1 from "../../elements/column/column-1";
import sectionColumn2 from "../../elements/column/column-2";
import sectionColumn3 from "../../elements/column/column-3";
import sectionColumn4 from "../../elements/column/column-4";
import sectionColumn5 from "../../elements/column/column-5";
import sectionColumn6 from "../../elements/column/column-6";
import sectionColumnLeft from "../../elements/column/column-left";
import sectionColumnRight from "../../elements/column/column-right";


//Membership
import memberProduct from "../../elements/membership/product";
import memberShip from "../../elements/membership/membership";

//Merge
import MergeElement from "../../elements/membership/merge"
import FillableElement from "../../elements/membership/fillable"

//
import blocksJson from "../../configuration/blocks.js";
import Base from "../../style-manager/Base"
import {
  Box,
  Grid,
  Drawer,
  Stack,
  Tab,
  Fab,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  ClickAwayListener, Button, Typography
} from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {
  Handyman,
  Add, Close,
  ArrowBackIos,
} from '@mui/icons-material';
import "../home-module.scss"
import { makeStyles } from '@material-ui/core/styles';
import row1 from "../../../../assets/img/pages/form/row_1.png";
import row2 from "../../../../assets/img/pages/form/row_2.png";
import row3 from "../../../../assets/img/pages/form/row_3.png";
import row4 from "../../../../assets/img/pages/form/row_4.png";

import column1 from "../../../../assets/img/pages/form/column_1.png";
import column2 from "../../../../assets/img/pages/form/column_2.png";
import column3 from "../../../../assets/img/pages/form/column_3.png";
import column4 from "../../../../assets/img/pages/form/column_4.png";
import column5 from "../../../../assets/img/pages/form/column_5.png";
import column6 from "../../../../assets/img/pages/form/column_6.png";
import columnLeft from "../../../../assets/img/pages/form/column_left.png";
import columnRight from "../../../../assets/img/pages/form/column_right.png";

//text
import headline from "../../../../assets/img/pages/form/headline.png";
import subHeadline from "../../../../assets/img/pages/form/subheadline.png";
import bullets from "../../../../assets/img/pages/form/bullets.png";

//media
import image from "../../../../assets/img/pages/form/image.png";
import video from "../../../../assets/img/pages/form/video.png";

//form image
import input from "../../../../assets/img/pages/form/input.png";
import dropDown from "../../../../assets/img/pages/form/drop_down.png";
import textArea from "../../../../assets/img/pages/form/text_area.png";
import checkbox from "../../../../assets/img/pages/form/checlbox.png";
import sms from "../../../../assets/img/pages/form/sms.png";
import survey from "../../../../assets/img/pages/form/survey.png";
import billing from "../../../../assets/img/pages/form/billing.png";
import signature from "../../../../assets/img/pages/form/signature.png";
import button from "../../../../assets/img/pages/form/button.png";

//misc image
import product from "../../../../assets/img/pages/form/product.png";
import countDown from "../../../../assets/img/pages/form/count_down.png";
import Countdown from '../../elements/countdwon/countdwon';
import scaleRatingType from "../../elements/scale-rating/scale-rating";
import Imageupload from '../../elements/Image/Imageupload';
import Video from '../../elements/video/video';
import "./style.css"

//material icons
import EmailIcon from "@mui/icons-material/Email";
import DynamicFormIcon from "@mui/icons-material/DynamicForm";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import LanguageIcon from "@mui/icons-material/Language";
import CheckIcon from "@mui/icons-material/Check";
import {Input, Select} from "antd";

const Option = { Select }
const useStyles = makeStyles((theme) => ({
  icon: {
    minWidth: '30px !importent',
  },
  paper: {
    "& .MuiPaper-root": {
      background: "#4a5361 !importent"
    }
  }
}));
const Build = (props) => {
  const {
    editor,
    setEditor,
    form,
    studentList,
    membershipList,
    productFolderList
  } = props
  const classes = useStyles()
  const [blocks, setBlocks] = useState([])
  const [selectAction, setSelectAction] = useState(0)
  const [buttonOpenURL, setButtonOpenURL] = useState(undefined)
  const [buttonOpenWay, setButtonOpenWay] = useState(undefined)

  const handleBlocks = (props) => {
    setBlocks(props.blocks)
    window.dragStart = props.dragStart
    window.dragStop = props.dragStop
  }


  const onDragStart = (block) => {
    window.dragStart(block);
  }

  const onDragStop = () => {
    window.dragStop();
    setOpenFormSettings(false)
    setOpenFormProperties(false)

  }

  const onSettingChangeEvent = (type) => {
    if(type == 'button_action') {
      let attributes = editor.getSelected().getChildAt(0).getAttributes();
      let selected = attributes.selectedOption;
      let openURL = attributes.openURL;
      let openWay = attributes.openWay;
      setButtonOpenURL(openURL);
      setButtonOpenWay(openWay);
      setSelectAction(selected);
      toggleButtonAction({}, true);
    }
  }

  const formBuilder = editor => {
    editor.DomComponents.addType('heading', headingType)
    editor.DomComponents.addType('full-name', fullNameType)
    editor.DomComponents.addType('email', emailType)
    editor.DomComponents.addType('phone', phoneType)
    editor.DomComponents.addType('date-picker', datePickerType)
    //Basic elements
    editor.DomComponents.addType('short-text', shortTextType)
    editor.DomComponents.addType('long-text', Textarea)
    editor.DomComponents.addType('paragraph', paragraphType)
    editor.DomComponents.addType('select', dropDownType)
    editor.DomComponents.addType('single-choice', singleChoiceType)
    editor.DomComponents.addType('checkbox', multipleChoiceType)
    editor.DomComponents.addType('number', numberType)
    //skip-image-type: use default
    editor.DomComponents.addType('video', Video)
    editor.DomComponents.addType('image', Imageupload)
    editor.DomComponents.addType('count-dwon', Countdown)
    editor.DomComponents.addType('captcha', captchaType)
    editor.DomComponents.addType('spinner', spinnerType)
    editor.DomComponents.addType('submit', submitType)
    editor.DomComponents.addType('signature', signatureType)
    editor.DomComponents.addType('product-list', productList)
    editor.DomComponents.addType('scale-rating', scaleRatingType)


    //Survey elements
    editor.DomComponents.addType('bullet', bulletType);
    editor.DomComponents.addType('star-rating', starRatingType)

    //Page Elements
    editor.DomComponents.addType('divider', dividerType)
    editor.DomComponents.addType('section-collapse', sectionCollapseType)
    // editor.DomComponents.addType('page-break', pageBreakType)

    //Payments
    editor.DomComponents.addType('stripe', stripeType)


    //Sections
    editor.DomComponents.addType('section-wide', sectionWide)
    editor.DomComponents.addType('section-full-width', sectionFullWidth)
    editor.DomComponents.addType('section-medium', sectionMedium)
    editor.DomComponents.addType('section-small', sectionSmall)

    //Columns
    editor.DomComponents.addType('column-1', sectionColumn1)
    editor.DomComponents.addType('column-2', sectionColumn2)
    editor.DomComponents.addType('column-3', sectionColumn3)
    editor.DomComponents.addType('column-4', sectionColumn4)
    editor.DomComponents.addType('column-5', sectionColumn5)
    editor.DomComponents.addType('column-6', sectionColumn6)
    editor.DomComponents.addType('column-left', sectionColumnLeft)
    editor.DomComponents.addType('column-right', sectionColumnRight)

    //Membership
    editor.DomComponents.addType('product', memberProduct)
    editor.DomComponents.addType('membership', memberShip)
    //Merge block
    editor.DomComponents.addType('merge_first_name', new MergeElement('First Name', 'first_name', 'text').getElement());
    editor.DomComponents.addType('merge_last_name', new MergeElement('Last Name', 'last_name', 'text').getElement());
    editor.DomComponents.addType('merge_address', new MergeElement('Address', 'address', 'text').getElement());
    editor.DomComponents.addType('merge_city', new MergeElement('City', 'city', 'text').getElement())
    editor.DomComponents.addType('merge_state', new MergeElement('State', 'state', 'text').getElement());
    editor.DomComponents.addType('merge_zip', new MergeElement('Zip', 'zip', 'number').getElement())
    editor.DomComponents.addType('merge_phone', new MergeElement('Phone', 'phone', 'tel').getElement());
    editor.DomComponents.addType('merge_email', new MergeElement('Email', 'email', 'email').getElement())
    //Membership block
    editor.DomComponents.addType('membership_start_date', new MergeElement('Start Date', 'start_date', 'date').getElement())
    editor.DomComponents.addType('membership_end_date', new MergeElement('End Date', 'end_date', 'date').getElement())
    editor.DomComponents.addType('membership_type', new MergeElement('Type', 'type', 'select').getElement())
    editor.DomComponents.addType('membership_due', new MergeElement('Due', 'due', 'select').getElement())
    editor.DomComponents.addType('membership_total', new MergeElement('Total', 'total', 'number').getElement())
    editor.DomComponents.addType('membership_down_pay', new MergeElement('Down Pay', 'down_pay', 'number').getElement())
    editor.DomComponents.addType('membership_reg_fee', new MergeElement('Reg.Fee', 'reg_fee', 'number').getElement())
    //Fillable Field
    editor.DomComponents.addType('fill_waiver', new FillableElement('Waiver', 'waiver', 'text').getElement())
    editor.DomComponents.addType('fill_text_field', new FillableElement('Text Field', 'text_field', 'text').getElement())
    editor.DomComponents.addType('fill_signature', new FillableElement('Signature', 'signature', 'text').getElement())
    editor.DomComponents.addType('fill_date', new FillableElement('Date', 'date', 'date').getElement())
    let fullText = 'Lorem ipsum dolor sit {firstname}, consectetur adipiscing elit. Suspendisse cursus, turpis sit amet cursus pulvinar, tellus est efficitur diam, ut varius turpis leo sed odio. Nullam tristique, justo laoreet egestas elementum, ipsum sapien vulputate metus, nec ultrices ante lectus efficitur tellus. Maecenas tincidunt orci sed est malesuada euismod. Nunc ultricies consectetur massa nec semper. Phasellus feugiat id nisl in vulputate. Pellentesque id malesuada tellus. Maecenas et tellus sagittis lectus pharetra sagittis. Curabitur vitae condimentum quam. Cras efficitur libero eget facilisis scelerisque. Fusce tempor ipsum sit amet eros volutpat interdum et sit amet erat. Aliquam erat volutpat. Vivamus convallis nibh finibus sollicitudin rutrum. Nulla sapien purus, iaculis ut varius et, varius ut nibh. Sed convallis ipsum ligula, sit amet gravida arcu accumsan id.\n' +
      '\n' +
      'Nullam suscipit sem tellus, auctor porttitor tortor molestie sit amet. Integer mattis sit amet magna vel bibendum. Nunc ac dolor vitae ex fermentum consequat. Nam interdum a odio a interdum. Cras commodo, diam feugiat auctor varius, ipsum felis aliquet mi, id porta purus orci sed nisi. Sed id turpis sapien. In pulvinar lorem sed urna blandit fermentum. Duis mattis consectetur accumsan. Vivamus consequat bibendum maximus. Duis vel venenatis ligula, at euismod metus. Maecenas semper, nisi non fringilla ullamcorper, neque diam molestie dui, quis finibus quam sapien id lacus. Aenean sapien sem, pretium id dignissim eu, ullamcorper eu est. Suspendisse eget libero nec est porta sollicitudin vel et arcu.'
    editor.DomComponents.addType('fill_text_box', new FillableElement(fullText, 'text_box', 'text').getElement())

  };

  function getCaretCoordinates(element, content, position) {
    var properties = [
      'direction',  // RTL support
      'boxSizing',
      'width',  // on Chrome and IE, exclude the scrollbar, so the mirror div wraps exactly as the textarea does
      'height',
      'overflowX',
      'overflowY',  // copy the scrollbar for IE

      'borderTopWidth',
      'borderRightWidth',
      'borderBottomWidth',
      'borderLeftWidth',
      'borderStyle',

      'paddingTop',
      'paddingRight',
      'paddingBottom',
      'paddingLeft',

      // https://developer.mozilla.org/en-US/docs/Web/CSS/font
      'fontStyle',
      'fontVariant',
      'fontWeight',
      'fontStretch',
      'fontSize',
      'fontSizeAdjust',
      'lineHeight',
      'fontFamily',

      'textAlign',
      'textTransform',
      'textIndent',
      'textDecoration',  // might not make a difference, but better be safe

      'letterSpacing',
      'wordSpacing',

      'tabSize',
      'MozTabSize'

    ];
    let id = 'input-textarea-caret-position-mirror-div';
    var div = document.getElementById(id);
    var computed = window.getComputedStyle? getComputedStyle(element) : element.currentStyle;  // currentStyle for IE < 9
    if(!div) {
      // mirrored div
      div = document.createElement('div');
      div.id = id;
      document.body.appendChild(div);

      var style = div.style;


      // default textarea styles
      style.whiteSpace = 'pre-wrap';
      if (element.nodeName !== 'INPUT')
        style.wordWrap = 'break-word';  // only for textarea-s

      // position off-screen
      style.position = 'absolute';  // required to return coordinates properly

      style.visibility = 'hidden';  // not 'display: none' because we want rendering

      // transfer the element's properties to the div
      properties.forEach(function (prop) {
        style[prop] = computed[prop];
      });

      style.overflow = 'hidden';
    }



      div.textContent = content.substring(0, position);
      // the second special handling for input type="text" vs textarea: spaces need to be replaced with non-breaking spaces - http://stackoverflow.com/a/13402035/1269037
      if (element.nodeName === 'INPUT')
        div.textContent = div.textContent.replace(/\s/g, '\u00a0');

      var span = document.createElement('span');
      // Wrapping must be replicated *exactly*, including when a long word gets
      // onto the next line, with whitespace at the end of the line before (#7).
      // The  *only* reliable way to do that is to copy the *entire* rest of the
      // textarea's content into the <span> created at the caret position.
      // for inputs, just '.' would be enough, but why bother?
      span.textContent = content.substring(position) || '.';  // || because a completely empty faux span doesn't render at all
      div.appendChild(span);

      var coordinates = {
        top: span.offsetTop + parseInt(computed['borderTopWidth']),
        left: span.offsetLeft + parseInt(computed['borderLeftWidth'])
      };
      div.removeChild(span);


      return coordinates;
  }

  function getPosition(x, y, element, content) {
    var st = 0;
    var en = content.length;
    while(en - st > 1) {
      let mid = Math.floor((en + st) / 2);
      let coordinate = getCaretCoordinates(element, content, mid);
      if(coordinate.top > (y + 10) || (coordinate.top > y - 10 && coordinate.left > x)) {
        en = mid;
      } else {
        st = mid;
      }
    }
    return st;

  }

  useEffect(() => {

    const editor = grapesjs.init({
      container: '#editor',

      panels: { defaults: [] },
      canvas: {
        styles: [
          'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css',
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap',
          'https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.19.1/css/mdb.min.css',
          'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css',
          'https://unpkg.com/dropzone@5/dist/min/dropzone.min.css',
          '/css/grapes-form.css'
        ],
        scripts: [
          'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js',
          'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js',
          'https://cdnjs.cloudflare.com/ajax/libs/popper.js/2.11.5/umd/popper.min.js',
          //'https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.19.1/js/mdb.min.js',
          'https://unpkg.com/dropzone@5/dist/min/dropzone.min.js',
          'https://cdn.jsdelivr.net/npm/signature_pad@4.0.0/dist/signature_pad.umd.min.js',
          'https://cdn.ckeditor.com/4.19.0/standard/ckeditor.js',
          'https://js.stripe.com/v3/'
        ]
      },
      commands: {
        defaults: [{

        }]
      },
      blockManager: {
        custom: true,
        blocks: blocksJson
      },
      plugins: [
        formBuilder
        // gjsPresetWebpage
      ],
      storageManager: {
      }

    })

    setEditor(editor);

    if (form && form.formData) {
      let formData = JSON.parse(form.formData)
      if (formData['gjs-components'].replace(/^"|"$/g, "").length > 0) {
        let component = JSON.parse(formData['gjs-components'].replace(/^"|"$/g, ""));
        if(component.length == 0) {
          editor.setComponents({
            type: 'section-full-width',
          });
        } else {
          editor.setComponents(component);
        }

      }

      if (formData['gjs-styles'].replace(/^"|"$/g, "").length > 0) {
        editor.setStyle(JSON.parse(formData['gjs-styles'].replace(/^"|"$/g, "")))
      }
    } else {
      editor.setComponents({
        type: 'section-full-width',
      });
    }


    editor.runCommand('visibility');

    editor.Panels.addPanel({
      id: 'panel-top',
      el: '.panel__top'
    })

    editor.Panels.addPanel({
      id: 'basic-actions',
      el: '.panel__basic-actions',
      buttons: [

      ]
    });

    editor.Commands.add('set-device-desktop', {
      run(editor) {
        editor.setDevice('Desktop')
      },
      stop() { }
    })

    editor.Commands.add('set-device-tablet', {
      run(editor) {
        editor.setDevice('Tablet')
      },
      stop() { }
    })

    editor.Commands.add('set-device-mobile', {
      run(editor) {
        editor.setDevice('Mobile portrait')
      },
      stop() { }
    })



    editor.Commands.add('add-column', {
      run(editor) {
        alert("Call Add Column");
      },
      stop() { }
    })

    editor.Commands.add('add-element', {
      run(editor) {
        alert("Call Add Element");
      },
      stop() { }
    })

    editor.Commands.add('preview', {
      run(editor) {

      },
      stop() { }
    })


    editor.onReady(() => {
      let attributes = editor.getWrapper().attributes;
      attributes.name = 'Form';
      editor.getWrapper().setAttributes(attributes);
      const el = editor.getWrapper().view.el;

      el.addEventListener("click", (e) => {
        if (!editor.getSelected()) {
          toggleFormSettings({}, false);
          toggleFormProperties({}, false);
        } else if (editor.getSelected().attributes.name == 'Form') {
          toggleFormProperties({}, true);
        }
      })
    });


    editor.on('block:custom', handleBlocks)

    editor.on('change:changesCount', e => {

    });
    var dragCategory = '';
    var dropContent = '';
    var dragLastX = 0;
    var dragLastY = 0;
    var dragName = '';
    var dragPosition = 0;
    editor.on('block:drag:start', function(model) {
      dragCategory = model.attributes.category;
      dragName = model.attributes.label;
    });

    const mergeSpanStr = '<span style="color: green; font-size: ' + "32px" + '"> I </span>';
    editor.on('canvas:dragend', function(model) {
      if(model.target.classList.contains('fillable') && dragCategory == 'Merge Block') {
        let id = model.target.id;
        let rect = model.target.getBoundingClientRect();
        let element = editor.DomComponents.getWrapper().find('#' + id)[0];
        let content = model.target.innerHTML;
        dragLastX = model.pageX - rect.x;
        dragLastY = model.pageY - rect.y;
        dragPosition = getPosition(dragLastX, dragLastY, model.target, content);
        content = content.replace(mergeSpanStr, '');
        let newContent = content.slice(0, dragPosition)
          + ` {${dragName}} `
          + content.slice(dragPosition);
        model.target.innerHTML = newContent;
        element.components(newContent);
        document.body.removeChild(document.getElementById('input-textarea-caret-position-mirror-div'));
        //element.set({content: newContent})
      }
    });



    editor.on('canvas:dragover', function(model) {
      if(model.target.classList.contains('fillable') && dragCategory == 'Merge Block') {
        let rect = model.target.getBoundingClientRect();
        let content = model.target.innerHTML;
        let x = model.pageX - rect.x;
        let y = model.pageY - rect.y;

        content = content.replace(mergeSpanStr, '');
        dragPosition = getPosition(x, y, model.target, content);
        let newContent = content.slice(0, dragPosition)
          + mergeSpanStr
          + content.slice(dragPosition);
        model.target.innerHTML = newContent;
        //element.set({content: newContent})
      }
    });

    editor.on('component:hovered', model => {
      if (model && model.getEl()) {
        if (!editor.getSelected()) {
          editor.select(model);
        } else if (editor.getSelected().getId() !== model.getId()) {
          editor.select(model);
        }
      }
    });


    const settingId = 'setting';
    const htmlLabel = `<svg style="color: white" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear" viewBox="0 0 16 16"> <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" fill="white"></path> <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" fill="white"></path> </svg> `;
    const that = this;
    editor.on('component:selected', () => {
      const selectedComponent = editor.getSelected();
      const defaultToolbar = selectedComponent.get('toolbar');

      const container = editor.getContainer();
      const componentType = selectedComponent.attributes.type;
      let category = 'Form';
      blocksJson.forEach(block => {
        if (block.id == componentType) {
          category = block.category;
        }
      });
      if(category == 'Member') {
        category = 'Form';
      }
      container.className = "gjs-editor-cont " + category + " " + category + "-selected";

      // check if this command already exists on this component toolbar
      const commandExists = defaultToolbar.some(item => item.id === settingId);

      // if it doesn't already exist, add it
      if (!commandExists) {
        selectedComponent.set({
          toolbar: [...defaultToolbar, {
            id: settingId,
            command: function () {
              setOpenFormProperties(true);
            },
            label: htmlLabel
          }]
        });
      }


    });
    editor.on('component:add', model => {
      if (!model.parent() || !model.parent().view) {
        return;
      }
      const element = model.parent().view.el;
      if (element && element.classList) {
        if (element.classList.contains('section-row-child')) {
          if (element.children.length > 1) {
            element.classList.add('non-empty');
          }
        }

        if (element.classList.contains('section-column-child')) {
          if (element.children.length > 1) {
            element.classList.add('non-empty');
          }
        }

        //element.classList.remove("non-empty");
      }

    })
    editor.on('component:remove', model => {
      // if (!model.parent()) {
      //   return;
      // }
      // const element = model.parent().view.el;
      // if (element && element.classList) {
      //   if (element.classList.contains('section-row-child')) {
      //     if (element.children.length <= 2) {
      //       element.classList.remove('non-empty');
      //     }
      //   }
      //   if (element.classList.contains('section-column-child')) {
      //     if (element.children.length <= 2) {
      //       element.classList.remove('non-empty');

      //     }
      //   }
      // }
    })
    editor.on(`component:mount`, model => {

      const element = model.view.el;
      if (element && typeof element.getElementsByClassName === 'function') {
        const children = element.children;
        for (const child of children) {
          if (child.classList.contains('add-new-column')) {
            child.addEventListener("click", (e) => {
              openAddColumn();
            })
          } else if (child.classList.contains('add-new-element')) {
            child.addEventListener("click", (e) => {
              openAddElement()
            })
          } else if (child.classList.contains('add-more-element')) {
            child.addEventListener("click", (e) => {
              openAddElement()
            })
          } else {
            var clickCount = 0;
            child.addEventListener("click", (e) => {
              if (e.target !== e.currentTarget) return;
              // toggleFormProperties({}, false)
              toggleFormSettings({}, false)
              toggleButtonAction({}, false)
              clickCount ++;
              let inputTagList = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'INPUT', 'TEXTAREA', 'SPAN'];
              if(!inputTagList.includes(e.target.nodeName)) {
                setOpenFormProperties(true);
              }
              // if (clickCount == 1) {
              //   setTimeout(function(){
              //     if(clickCount == 1) {
              //       setOpenFormProperties(true);
              //     }
              //     clickCount = 0;
              //   },  300);
              // }


              //
            })

          }

        }


      }

      if (element && element.classList) {
        if (element.classList.contains('section-row-child')) {
          if (element.children.length > 1) {
            element.classList.add('non-empty');
          }
        }
        let children = element.children;
        if (children) {
          for (const child of children) {
            if (child.classList.contains('section-column-child')) {
              if (child.children.length > 1) {
                child.classList.add('non-empty');
              }
            }
          }
        }
      }
    });



    editor.on('storage:load', (obj) => {
      //editor.render()
    })

    return () => {
      editor.off('block:custom', handleBlocks)
    };

  }, [form])

  const [openFormSettings, setOpenFormSettings] = useState(false);
  const [openFormProperties, setOpenFormProperties] = useState(false);
  const [openButtonAction, setOpenButtonAction] = useState(false);
  const toggleFormSettings = (event, value) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpenFormSettings(value);
  }

  const toggleFormProperties = (event, value) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpenFormProperties(value);
  }

  const toggleButtonAction = (event, value) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    toggleFormProperties({}, false);
    setOpenButtonAction(value);
  }

  const setButtonAction = (value) => {
    setSelectAction(value);
    let attributes = editor.getSelected().getChildAt(0).getAttributes();
    attributes.selectedOption = value;
    if(value == 2) {
      attributes.openWay = "same";
      setButtonOpenWay("same");
    }
    editor.getSelected().getChildAt(0).setAttributes(attributes);
  }

  const handleButtonOpenWayChange = (value) => {
    let attributes = editor.getSelected().getChildAt(0).getAttributes();
    attributes.openWay = value;
    editor.getSelected().getChildAt(0).setAttributes(attributes);
    setButtonOpenWay(value)
  }

  const handleButtonOpenURLChange = (e) => {
    let attributes = editor.getSelected().getChildAt(0).getAttributes();
    attributes.openURL = e.target.value;
    editor.getSelected().getChildAt(0).setAttributes(attributes);
    setButtonOpenURL(e.target.value)
  }

  const openAddColumn = () => {
    setOpenFormSettings(true);
    setVal("1");

  }

  const openAddElement = () => {
    setOpenFormSettings(true);
    setVal("2");
  }
  const [val, setVal] = useState("1");
  const handleCh = (event, newVal) => {
    setVal(newVal);
  };

  const arrayOfImages = {
    "section-wide": row1,
    "section-full-width": row2,
    "section-medium": row3,
    "section-small": row4,
    "column-1": column1,
    "column-2": column2,
    "column-3": column3,
    "column-4": column4,
    "column-5": column5,
    "column-6": column6,
    "column-left": columnLeft,
    "column-right": columnRight,
    "headline": headline,
    "sub-headline": subHeadline,
    "bullets": bullets,
    "image": image,
    "video": video,
    "input": input,
    "select": dropDown,
    "text-area": textArea,
    "checkbox": checkbox,
    "sms": sms,
    "survey": survey,
    "billing": billing,
    "signature": signature,
    "button": button,
    "count-down": countDown,
    "product-list": product
  }

  return (
    <>
      <Grid container>
        <Grid item md={1} />
        <Grid item md={10}>
          <div class="panel__top">
            <div class="panel__basic-actions"></div>
            <div class="panel__devices"></div>
            <div class="panel__switcher"></div>
          </div>
        </Grid>
        <Grid item md={1} />
      </Grid>
      <Grid container style={{ marginLeft: '0px' }} className="home-box">
        <Grid item md={1} className="home-1">
          {openFormSettings ? null : <Fab variant="extended"
            style={{
              position: 'fixed', top: '250px',
              left: '280px', borderRadius: '10px',
              width: "120px"
            }} onClick={(ev) => toggleFormSettings(ev, true)}>
            <Add />
            Builder
          </Fab>}
          <Drawer
            anchor={"left"}
            open={openFormSettings}
            onClose={(ev) => toggleFormSettings(ev, false)}
            variant="persistent"
            classes={{ paper: classes.paper }}
          >
            <ClickAwayListener mouseEvent="onMouseDown" touchEvent="onTouchStart" onClickAway={(ev) => {
              if (ev.target.id != 'form-element') {
                toggleFormSettings({}, false)
              }
            }}>
              <Box
                sx={{
                  width: 260,
                  background: "#fff",
                  height: "100%"

                }}
              >

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    p: 1,
                    bgcolor: '#0184ff'
                  }}>
                  <Box sx={{ flexGrow: 2, textAlign: 'left', color: "#fff", margin: 0 }} id="form_element">Form Element</Box>
                  <Box>
                    <Close
                      onClick={(ev) => {
                        toggleFormSettings(ev, false)
                        setOpenFormProperties(false)
                      }
                      }
                      sx={{ color: '#fff' }} />
                  </Box>
                </Box>

                <TabContext value={val}
                >
                  <Box sx={{
                    borderBottom: 1, borderColor: 'divider',
                    background: "#F1F1F1",
                  }}>
                    <TabList onChange={handleCh} aria-label="side-menu-tabs" >
                      <Tab label="Layout" value="1" sx={{ color: '#AAAAAA' }} />
                      <Tab label="Element" value="2" sx={{ color: '#AAAAAA' }} />
                      <Tab label="MYM" value="3" sx={{ color: '#AAAAAA' }} />
                    </TabList>
                  </Box>
                  <TabPanel value="1" style={{
                    padding: 0
                  }}>
                    <ListItem
                      className='p-0 border-bottom-dark list-title'
                    >
                      <ListItemText
                        style={{
                          color: "#0184FF",
                        }}
                        className='d-flex justify-content-center'>
                        Section
                      </ListItemText>
                    </ListItem>
                    {blocks.map((block, index) => (
                      block.attributes.category === "Row" ?
                        (<ListItem
                          className='p-0 border-bottom-dark form-submenu'
                          style={{
                            marginBottom: '1px',
                          }} key={block.getId()} onDragStart={() => onDragStart(block)} onDragEnd={() => onDragStop()} draggable>
                          <ListItemIcon
                            style={{
                              minWidth: '30px',
                              color: "#0184FF"
                            }}
                            className={classes.icon}

                          >
                            <div>
                              <img src={arrayOfImages[block.getId()]} />
                            </div>
                          </ListItemIcon>
                          <ListItemText
                            style={{
                              color: "#0184FF"
                            }}>
                            {block.getLabel()}
                          </ListItemText>
                        </ListItem>)
                        :
                        null
                    )
                    )}
                    <ListItem
                      className='p-0 border-bottom-dark list-title'
                    >
                      <ListItemText
                        style={{
                          color: "#0184FF",
                        }}
                        className='d-flex justify-content-center'>
                        Row
                      </ListItemText>
                    </ListItem>
                    {blocks.map((block, index) => (
                      block.attributes.category === "Column" ?
                        (<ListItem
                          className='p-0 border-bottom-dark form-submenu'
                          style={{
                            marginBottom: '1px',
                          }} key={block.getId()}
                          onDragStart={() => onDragStart(block)} onDragEnd={() => onDragStop()} draggable>
                          <ListItemIcon
                            style={{
                              minWidth: '30px',
                              color: "#0184FF"
                            }}
                            className={classes.icon}

                          >
                            <div>
                              <img src={arrayOfImages[block.getId()]} />
                            </div>
                          </ListItemIcon>
                          <ListItemText
                            style={{
                              color: "#0184FF"
                            }}>
                            {block.getLabel()}
                          </ListItemText>
                        </ListItem>)
                        :
                        null
                    )
                    )}
                  </TabPanel>
                  <TabPanel value="2"
                    style={{
                      padding: "0em"
                    }}
                  >
                    <ListItem
                      className='p-0 border-bottom-dark list-title'

                    >
                      <ListItemText
                        style={{
                          color: "#0184FF",
                        }}
                        className='d-flex justify-content-center'>
                        TEXT
                      </ListItemText>
                    </ListItem>
                    {blocks.map((block, index) => (
                      block.attributes.category === "Text" ?
                        (<ListItem
                          className='p-0 border-bottom-dark form-submenu'
                          style={{
                            marginBottom: '1px',
                          }}
                          key={block.getId()} onDragStart={() => onDragStart(block)}
                          onDragEnd={() => onDragStop()} draggable>
                          <ListItemIcon
                            style={{
                              minWidth: '30px',
                              color: "#0184FF"
                            }}
                            className={classes.icon}

                          >
                            <div>
                              <img src={arrayOfImages[block.getId()]} />
                            </div>
                          </ListItemIcon>
                          <ListItemText
                            style={{
                              color: "#0184FF"
                            }}>
                            {block.getLabel()}
                          </ListItemText>
                        </ListItem>) : null
                    )
                    )}
                    <ListItem
                      className='p-0 border-bottom-dark list-title'

                    >
                      <ListItemText
                        style={{
                          color: "#0184FF",
                        }}
                        className='d-flex justify-content-center'>
                        Media
                      </ListItemText>
                    </ListItem>
                    {blocks.map((block, index) => (
                      block.attributes.category === "Media" ?
                        (<ListItem
                          className='p-0 border-bottom-dark form-submenu'
                          style={{
                            marginBottom: '1px',
                          }}
                          key={block.getId()} onDragStart={() => onDragStart(block)}
                          onDragEnd={() => onDragStop()} draggable>
                          <ListItemIcon
                            style={{
                              minWidth: '30px',
                              color: "#0184FF"
                            }}
                            className={classes.icon}

                          >
                            <div>
                              <img src={arrayOfImages[block.getId()]} />
                            </div>
                          </ListItemIcon>
                          <ListItemText
                            style={{
                              color: "#0184FF"
                            }}>
                            {block.getLabel()}
                          </ListItemText>
                        </ListItem>) : null
                    )
                    )}
                    <ListItem
                      className='p-0 border-bottom-dark list-title'

                    >
                      <ListItemText
                        style={{
                          color: "#0184FF",

                        }}
                        className='d-flex justify-content-center'>
                        FORM
                      </ListItemText>
                    </ListItem>
                    {blocks.map((block, index) => (
                      block.attributes.category === "Form" ?
                        (<ListItem
                          className='p-0 border-bottom-dark form-submenu'
                          style={{
                            marginBottom: '1px',
                          }} key={block.getId()} onDragStart={() => onDragStart(block)} onDragEnd={() => onDragStop()} draggable>
                          <ListItemIcon
                            style={{
                              minWidth: '30px',
                              color: "#0184FF"
                            }}
                            className={classes.icon}

                          >
                            <div>
                              <img src={arrayOfImages[block.getId()]} />
                            </div>
                          </ListItemIcon>
                          <ListItemText
                            style={{
                              color: "#0184FF"
                            }}>
                            {block.getLabel()}
                          </ListItemText>
                        </ListItem>) : null

                    )
                    )}
                    <ListItem
                      className='p-0 border-bottom-dark list-title'

                    >
                      <ListItemText
                        style={{
                          color: "#0184FF",
                        }}
                        className='d-flex justify-content-center'>
                        MISC
                      </ListItemText>
                    </ListItem>
                    {blocks.map((block, index) => (
                      block.attributes.category === "Misc" ?
                        (<ListItem
                          className='p-0 border-bottom-dark form-submenu'
                          style={{
                            marginBottom: '1px',
                          }} key={block.getId()} onDragStart={() => onDragStart(block)} onDragEnd={() => onDragStop()} draggable>
                          <ListItemIcon
                            style={{
                              minWidth: '30px',
                              color: "#0184FF"
                            }}
                            className={classes.icon}

                          >
                            <div>
                              <img src={arrayOfImages[block.getId()]} />
                            </div>
                          </ListItemIcon>
                          <ListItemText
                            style={{
                              color: "#0184FF"
                            }}>
                            {block.getLabel()}
                          </ListItemText>
                        </ListItem>)
                        :
                        null
                    )
                    )}
                  </TabPanel>
                  <TabPanel value="3" style={{
                    padding: "0em"
                  }}>
                    <ListItem
                      className='p-0 border-bottom-dark list-title'

                    >
                      <ListItemText
                        style={{
                          color: "#0184FF",
                        }}
                        className='d-flex justify-content-center'>
                        My Member
                      </ListItemText>
                    </ListItem>
                    {blocks.map((block, index) => (
                      block.attributes.category === "Member" ?
                        (<ListItem
                          className='p-0 border-bottom-dark form-submenu'
                          style={{
                            marginLeft: '4px',
                            marginBottom: '1px',
                          }} key={block.getId()} onDragStart={() => onDragStart(block)} onDragEnd={() => onDragStop()} draggable>
                          <ListItemText
                            style={{
                              color: "#0184FF"
                            }}>
                            {block.getLabel()}
                          </ListItemText>
                        </ListItem>)
                        :
                        null
                    )
                    )}

                    <ListItem
                      className='p-0 border-bottom-dark list-title'

                    >
                      <ListItemText
                        style={{
                          color: "#0184FF",
                        }}
                        className='d-flex justify-content-center'>
                        Merge Blocks
                      </ListItemText>
                    </ListItem>
                    <Row className="p-1">
                      {blocks.map((block, index) => (
                        block.attributes.category === "Merge Block" ?
                          (<Col
                            sm={12} md={6} className="px-1"
                            key={block.getId()} >
                            <div style={{
                              color: "#0184FF",
                              background: 'rgba(118, 118, 118, 0.08)',
                              height: '36px',
                              textAlign: 'center',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              marginTop: '4px'
                            }}
                              onDragStart={() => onDragStart(block)} onDragEnd={() => onDragStop()} draggable
                            >
                              {block.getLabel()}
                            </div>


                          </Col>)
                          :
                          null
                      )
                      )}
                    </Row>

                    <ListItem
                      className='p-0 border-bottom-dark list-title'

                    >
                      <ListItemText
                        style={{
                          color: "#0184FF",
                        }}
                        className='d-flex justify-content-center'>
                        Membership Blocks
                      </ListItemText>
                    </ListItem>
                    <Row className="p-1">
                      {blocks.map((block, index) => (
                        block.attributes.category === "Membership Block" ?
                          (<Col
                            sm={12} md={6} className="px-1"
                            key={block.getId()} >
                            <div style={{
                              color: "#0184FF",
                              background: 'rgba(118, 118, 118, 0.08)',
                              height: '36px',
                              textAlign: 'center',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              marginTop: '4px'
                            }}
                              onDragStart={() => onDragStart(block)} onDragEnd={() => onDragStop()} draggable
                            >
                              {block.getLabel()}
                            </div>


                          </Col>)
                          :
                          null
                      )
                      )}
                    </Row>
                    <ListItem
                      className='p-0 border-bottom-dark list-title'

                    >
                      <ListItemText
                        style={{
                          color: "#0184FF",
                        }}
                        className='d-flex justify-content-center'>
                        Fillable Field
                      </ListItemText>
                    </ListItem>
                    <Row className="p-1">
                      {blocks.map((block, index) => (
                        block.attributes.category === "Fillable Field" ?
                          (<Col
                            sm={12} md={6} className="px-1"
                            key={block.getId()} >
                            <div style={{
                              color: "#0184FF",
                              background: 'rgba(118, 118, 118, 0.08)',
                              height: '36px',
                              textAlign: 'center',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              marginTop: '4px'
                            }}
                              onDragStart={() => onDragStart(block)} onDragEnd={() => onDragStop()} draggable
                            >
                              {block.getLabel()}
                            </div>


                          </Col>)
                          :
                          null
                      )
                      )}
                    </Row>

                  </TabPanel>
                </TabContext>
              </Box>
            </ClickAwayListener>
          </Drawer>
        </Grid>
        <Grid item md={10} className="home-1" style={{ position: 'relative' }}>
          <div id="editor">
          </div>
          <div style={{ position: 'absolute', width: '100%', height: '100%', display: openFormProperties ? 'block' : 'none', top: 0, left: 0, zIndex: 2 }} onClick={() => {
            toggleFormProperties({}, false);
          }}>

          </div>
        </Grid>
        <Grid item md={1} className="home-1">
          <Fab variant="extended" color="primary"
            style={{
              marginLeft: '120px',
              position: 'fixed', top: '250px',
              right: '30px', borderRadius: '10px',
              width: "120px"
            }}
            onClick={(ev) => toggleFormProperties(ev, true)} aria-label="properties" id="form-designer">
            <Handyman   className='mr-1'/> DESIGNER
          </Fab>

          <Drawer
            anchor={"right"}
            open={openFormProperties}
            onClose={() => toggleFormProperties(false)}
            variant="persistent"
            styles={{ flexShrink: 0 }}
          >
            <ClickAwayListener onClickAway={(ev) => {

            }}>
              <Box sx={{
                width: 400,
                height: "100%",
                background: "#fff",
              }}>
                <Box
                  className="primary"
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    height: '50px',
                    alignItems: 'center',
                    fontSize: '16px',
                    fontWeight: 'bold'
                  }}
                >
                  <Box className='d-flex align-items-center'
                    onClick={(ev) => toggleFormProperties(ev, false)}
                  >
                    <IconButton
                      className='pr-0'
                      style={{
                        color: '#fff'
                      }}
                    >
                      <ArrowBackIos style={{
                        fontSize: '16px',
                        fontWeight: 'bold'
                      }} />
                    </IconButton>
                    {console.log(editor?.getSelected()?.attributes?.name,"editoreditoreditor")}
                    {editor && editor.getSelected() &&
                      `${editor?.getSelected()?.attributes?.name}`
                    }
                  </Box>
                </Box>
                <Box>
                  <Base editor={editor} studentList={studentList} membershipList={membershipList} productFolderList={productFolderList} onChangeEvent={onSettingChangeEvent}/>
                </Box>

              </Box>
            </ClickAwayListener>

          </Drawer>

          <Drawer
            anchor={"right"}
            open={openButtonAction}
            onClose={() => toggleButtonAction(false)}
            variant="persistent"
            styles={{ flexShrink: 0 }}
          >
            <ClickAwayListener onClickAway={(ev) => {

            }}>
              <Box sx={{
                width: 350,
                height: "100%",
                background: "#fff",
              }}>
                <Box
                  className="primary"
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    height: '50px',
                    padding: '0px 20px',
                    alignItems: 'center',
                    fontSize: '16px',
                    fontWeight: 'bold'
                  }}
                >
                  <Typography
                  style={{flex: 1, textAlign: 'left', margin: 0, fontWeight: 'bold'}}
                >EDIT BUTTON ACTION</Typography>

                  <Button
                    variant='contained'
                    // className='tobbarbutton'
                    className='m-1'
                    style={{fontWeight: 'bold'}}
                    onClick={() => {
                      toggleButtonAction({}, false)
                    }}
                  >Back</Button>

                </Box>
                <Box>
                  <ListItem
                    className={`${selectAction === 0 ? 'active' : ''} p-0 border-bottom-light form-submenu action`}
                    onClick={() => {
                      setButtonAction(0)
                    }}
                    style={{
                      marginBottom: '1px',
                    }} >
                    <ListItemIcon
                      className="action-icon"
                    >
                      <EmailIcon/>
                    </ListItemIcon>
                    <ListItemText>
                      SUBMIT ORDER
                    </ListItemText>
                    <ListItemIcon className="check-icon">
                      <CheckIcon/>
                    </ListItemIcon>
                  </ListItem>
                  <ListItem
                    className={`${selectAction === 1 ? 'active' : ''} p-0 border-bottom-light form-submenu action`}
                    onClick={() => {
                      setButtonAction(1)
                    }}
                    style={{
                      marginBottom: '1px',
                    }} >
                    <ListItemIcon
                      className="action-icon"
                    >
                      <DynamicFormIcon/>
                    </ListItemIcon>
                    <ListItemText>
                      SUBMIT Form
                    </ListItemText>
                    <ListItemIcon className="check-icon">
                      <CheckIcon/>
                    </ListItemIcon>
                  </ListItem>
                  <ListItem
                    className={`${selectAction === 2 ? 'active' : ''} p-0 border-bottom-light form-submenu action`}
                    onClick={() => {
                      setButtonAction(2)
                    }}
                    style={{
                      marginBottom: '1px',
                    }} >
                    <ListItemIcon
                      className="action-icon"
                    >
                      <LanguageIcon/>
                    </ListItemIcon>
                    <ListItemText>
                      GO TO WEBSITE URL
                    </ListItemText>
                    <ListItemIcon className="check-icon">
                      <CheckIcon/>
                    </ListItemIcon>
                  </ListItem>
                  {selectAction == 2? (
                    <div id="openSetting" className="p-1 border-bottom-light">
                      <Input
                        style={{
                          width: '100%',
                          height: '40px',
                          padding: '4px 10px !important'
                        }}
                        onChange={handleButtonOpenURLChange}
                        type="text"
                        defaultValue={buttonOpenURL}
                      />
                      <Select defaultValue={buttonOpenWay} className="mt-1" style={{ width: '100%', height: 42}} onChange={handleButtonOpenWayChange} getPopupContainer={() => document.getElementById('openSetting')}>
                        <Option value="same">Open in Same Window</Option>
                        <Option value="other">Open in New Tab/Window</Option>
                      </Select>
                    </div>
                    ): null}
                  <ListItem
                    className={`${selectAction === 3 ? 'active' : ''} p-0 border-bottom-light form-submenu action`}
                    onClick={() => {
                      setButtonAction(3)
                    }}
                    style={{
                      marginBottom: '1px',
                    }} >
                    <ListItemIcon
                      className="action-icon"

                    >
                      <ArrowOutwardIcon/>
                    </ListItemIcon>
                    <ListItemText>
                      OPEN POPUP
                    </ListItemText>
                    <ListItemIcon className="check-icon">
                      <CheckIcon/>
                    </ListItemIcon>
                  </ListItem>
                  <ListItem
                    className={`${selectAction === 4 ? 'active' : ''} p-0 border-bottom-light form-submenu action`}
                    onClick={() => {
                      setButtonAction(4)
                    }}
                    style={{
                      marginBottom: '1px',
                    }} >
                    <ListItemIcon
                      className="action-icon"
                    >
                      <ArrowForwardIcon/>
                    </ListItemIcon>
                    <ListItemText>
                      GO TO NEXT STEP
                    </ListItemText>
                    <ListItemIcon className="check-icon">
                      <CheckIcon/>
                    </ListItemIcon>
                  </ListItem>
                </Box>

              </Box>
            </ClickAwayListener>

          </Drawer>
        </Grid>
      </Grid>
    </>
  )

}

export default Build
