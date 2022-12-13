import React from 'react'
import ButtonAdvance from '../elements/button/ButtonAdvance'
import SectionAdvance from '../elements/section/SectionAdvance'
import "../../formbuilder/elements/element.scss"
import FormAdvanced from "../elements/form/form-advanced.js";
import InputAdvance from '../elements/input/inputAdvance';
import Textaeraadvance from '../elements/textaera/Textaeraadvance';
import CheckboxAdvance from '../elements/checkbox/CheckboxAdvance';
import Surveyadvance from "../elements/survey/Surveyadvance"
import DropDownAdvanced from '../elements/dropdown/Dropdownadvanced';
import Countdwonadvance from '../elements/countdwon/Countdwonadvance';
import HeadingAdvanced from '../elements/heading/HeadingAdvanced';
import Bulletadvance from '../elements/bullets/Bulletadvance';
import Rowadvnace from '../elements/rows/Rowadvnace';
import ColumnAdvnace from '../elements/column/ColumnAdvnace';
import Imageadvance from '../elements/Image/Imageadvance';
import Videoadvance from '../elements/video/Videoadvance';
import HeadingSettings from "../elements/heading/HeadingSettings";

const AdvanceTab = (props) => {
  const {
    editor,
    studentList,
    membershipList
  } = props;
  return (
    <div>
      {editor?.getSelected()?.attributes?.name === "Button" ?
        <ButtonAdvance editor={editor} /> : <></>}
      {editor?.getSelected()?.attributes?.name === "wrapper" ?
        <FormAdvanced editor={editor} /> : <></>
      }
      {editor?.getSelected()?.attributes?.name === "Column" ?
        <ColumnAdvnace editor={editor} /> : <></>
      }
      {editor?.getSelected()?.attributes?.name === "Row" ?
        <Rowadvnace editor={editor} /> : <></>
      }
      {editor?.getSelected()?.attributes?.name === "Bullets" ?
        <Bulletadvance editor={editor} /> : <></>
      }
      {editor?.getSelected()?.attributes?.name === "Count Down" ?
        <Countdwonadvance editor={editor} /> : <></>
      }
      {editor?.getSelected()?.attributes?.name === "Section" ?
        <SectionAdvance editor={editor} /> : <></>
      }
      {editor?.getSelected()?.attributes?.name === "Input" ?
        <InputAdvance editor={editor} /> : <></>
      }
      {editor?.getSelected()?.attributes?.name === "SMS" ?
        <InputAdvance editor={editor} /> : <></>
      }
      {editor?.getSelected()?.attributes?.name === "Text Area" ?
        <Textaeraadvance editor={editor} /> : <></>
      }
      {editor?.getSelected()?.attributes?.name === "Checkbox" ?
        <CheckboxAdvance editor={editor} /> : <></>
      }
      {editor?.getSelected()?.attributes?.name === "Drop Down" ?
        <DropDownAdvanced editor={editor} /> : <></>
      }
      {editor?.getSelected()?.attributes?.name === "Survey" ?
        <Surveyadvance editor={editor} /> : <></>
      }

      {editor?.getSelected()?.attributes?.name === "Headline" ?
        <HeadingAdvanced editor={editor} /> : <></>
      }
      {editor?.getSelected()?.attributes?.name === "Sub Headline" ?
        <HeadingAdvanced editor={editor} /> : <></>
      }
      {editor?.getSelected()?.attributes?.name === "Image" ?
        <Imageadvance editor={editor} /> : <></>
      }
      {editor?.getSelected()?.attributes?.name === "Video" ?
        <Videoadvance editor={editor} /> : <></>
      }
      {editor?.getSelected()?.attributes?.name === "Merge Block" ?
        <InputAdvance editor={editor} studentList={studentList} membershipList={membershipList}/> : <></>
      }
      {editor?.getSelected()?.attributes?.name === "Membership Block" ?
        <InputAdvance editor={editor} studentList={studentList} membershipList={membershipList}/> : <></>
      }
      {editor?.getSelected()?.attributes?.name === "Fillable Field" ?
        <InputAdvance editor={editor} studentList={studentList} membershipList={membershipList}/> : <></>
      }
    </div>
  )
}

export default AdvanceTab