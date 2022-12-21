import React, { Component } from 'react';
import { Editor } from "react-draft-wysiwyg"
import { connect } from 'react-redux';
import "./index.scss"

class Htmleditor extends Component {
  onEditorStateChange = (editorState) => {
    this.props.handlechnageeditor(editorState)
  };
  render() {
    return (
      <div>
        <Editor
          editorState={this.props.data}
          wrapperClassName="editorWrapper-new"
          onEditorStateChange={editorState => this.onEditorStateChange(editorState)}
          toolbar={{
            options: ['inline', 'blockType', 'image', 'fontSize', 'list', 'textAlign', 'history'],
          }}
        />
      </div>
    )
  }
}

export default connect(null, null)(Htmleditor)