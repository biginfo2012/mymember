import React, { Component } from 'react';
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg"
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
      <div style={{
        border: "1px solid #b8c2cc", //for border
      }}>
        <Editor
          editorState={this.props.editorState}
          wrapperClassName="editorWrapper"
          // toolbarClassName="toolbarWrapper"
          onEditorStateChange={editorState => this.onEditorStateChange(editorState)}
          style={{
            widht: "100%",
            height: "50vh",
            border: "1px solid #b8c2cc",
          }}
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
        />
      </div>
    )
  }
}

export default connect(null, { UPLAODE_IMAGE })(EditorContainer)
