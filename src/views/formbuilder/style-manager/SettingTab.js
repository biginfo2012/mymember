import React, {useEffect} from 'react'
import ButtonSetting from '../elements/button/ButtonSetting';
import SectionSetting from '../elements/section/SectionSetting';
import "../../formbuilder/elements/element.scss"
import FormSettings from "../elements/form/form-settings.js";
import Inputsetting from '../elements/input/Inputsetting';
import Textareasetting from '../elements/textaera/Textareasetting';
import Checkboxsettings from '../elements/checkbox/Checkboxsettings';
import Surveysettings from "../elements/survey/Surveysettings"
import Dropdownsettings from '../elements/dropdown/Dropdownsettings';
import Countdownsetting from '../elements/countdwon/Countdownsetting';
import HeadingSettings from '../elements/heading/HeadingSettings';
import Bulletsettings from '../elements/bullets/Bulletsettings';
import Rowsetting from "../elements/rows/Rowsetting"
import ColumnSetting from '../elements/column/ColumnSetting';
import Imagesetting from '../elements/Image/Imagesetting';
import Videosetting from '../elements/video/Videosetting';
import ProductSettings from "../elements/membership/ProductSettings";
import MembershipSettings from "../elements/membership/MembershipSettings";

const SettingTab = (props) => {
  const {
    editor,
    studentList,
    membershipList,
    productFolderList,
    onChangeEvent
  } = props;
  return (
    <div>
      {editor?.getSelected()?.attributes?.name === "Button" ?
        <ButtonSetting editor={editor} onChangeEvent={onChangeEvent}/> : <></>}
      {/*{editor?.getSelected()?.attributes?.name === "wrapper" ?*/}
      {/*  <FormSettings editor={editor} /> : <></>*/}
      {/*}*/}
      {editor && (editor.getSelected() === null || editor.getSelected() === undefined) ?
        <Rowsetting editor={editor} /> : <></>
      }
      {editor?.getSelected()?.attributes?.name === "Column" ?
        <ColumnSetting editor={editor} /> : <></>
      }
      {editor?.getSelected()?.attributes?.name === "Form" ?
        <Rowsetting editor={editor} /> : <></>
      }
      {editor?.getSelected()?.attributes?.name === "Bullets" ?
        <Bulletsettings editor={editor} /> : <></>
      }
      {editor?.getSelected()?.attributes?.name === "Count Down" ?
        <Countdownsetting editor={editor} /> : <></>
      }
      {editor?.getSelected()?.attributes?.name === "Section" ?
        <SectionSetting editor={editor} /> : <></>
      }
      {editor?.getSelected()?.attributes?.name === "Input" ?
        <Inputsetting editor={editor} /> : <></>
      }
      {editor?.getSelected()?.attributes?.name === "SMS" ?
        <Inputsetting editor={editor} /> : <></>
      }
      {editor?.getSelected()?.attributes?.name === "Text Area" ?
        <Textareasetting editor={editor} /> : <></>
      }
      {editor?.getSelected()?.attributes?.name === "Checkbox" ?
        <Checkboxsettings editor={editor} /> : <></>
      }
      {editor?.getSelected()?.attributes?.name === "Drop Down" ?
        <Dropdownsettings editor={editor} /> : <></>
      }
      {editor?.getSelected()?.attributes?.name === "Survey" ?
        <Surveysettings editor={editor} /> : <></>
      }

      {editor?.getSelected()?.attributes?.name === "Headline" ?
        <HeadingSettings editor={editor} /> : <></>
      }
      {editor?.getSelected()?.attributes?.name === "Sub Headline" ?
        <HeadingSettings editor={editor} /> : <></>
      }
      {editor?.getSelected()?.attributes?.name === "Image" ?
        <Imagesetting editor={editor} /> : <></>
      }
      {editor?.getSelected()?.attributes?.name === "Video" ?
        <Videosetting editor={editor} /> : <></>
      }
      {editor?.getSelected()?.attributes?.name === "Product" ?
        <ProductSettings editor={editor} studentList={studentList} productFolderList={productFolderList}/> : <></>
      }
      {editor?.getSelected()?.attributes?.name === "Membership" ?
        <MembershipSettings editor={editor} studentList={studentList} membershipList={membershipList}/> : <></>
      }
      {editor?.getSelected()?.attributes?.name === "Merge Block" ?
        <Inputsetting editor={editor} /> : <></>
      }
      {editor?.getSelected()?.attributes?.name === "Membership Block" ?
        <Inputsetting editor={editor} /> : <></>
      }
      {editor?.getSelected()?.attributes?.name === "Fillable Field" ?
        <HeadingSettings editor={editor} /> : <></>
      }
    </div >
  )
}

export default SettingTab
