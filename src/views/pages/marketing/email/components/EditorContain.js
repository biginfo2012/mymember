import React, { Component } from 'react';
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg"
//import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import {
  UPLAODE_IMAGE
} from "../../../../../redux/actions/email";
import { connect } from 'react-redux';
class EditorContainer extends Component {
  state = {
    editorState: EditorState.createEmpty()
  }

  onEditorStateChange = (editorState) => {
    const currentContent = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
    this.props.setEditorState(editorState)
  };

  uploadCallback = async (file, callback) => {
    return new Promise((resolve, reject) => {
      const reader = new window.FileReader();
      reader.onloadend = async () => {
        const form_data = new FormData();
        form_data.append("img", file);
        const res = await this.props.UPLAODE_IMAGE(form_data);
        const url = new URL(res.data)
        resolve({ data: { link: url } });
      };
      reader.readAsDataURL(file);
    });
  };
  render() {
    const { editorState } = this.state;
    return (
      <div style={{width: "400px"}}>
        <Editor
          editorState={this.props.editorState}
          onEditorStateChange={editorState => this.onEditorStateChange(editorState)}
          toolbar={{
            options: ['inline', 'blockType', 'image', 'fontSize', 'list', 'textAlign', 'history'],
            image: {
              urlEnabled: true,
              uploadEnabled: true,
              previewImage: true,
              uploadCallback: this.uploadCallback,
              alt: { present: true, mandatory: true }
            }
          }}
          editorStyle={{height: "200px"}}
        />
      </div>
    )
  }
}

export default connect(null, { UPLAODE_IMAGE })(EditorContainer)
