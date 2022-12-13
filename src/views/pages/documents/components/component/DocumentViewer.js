import React from 'react'
import FileViewer from 'react-file-viewer';

function DocumentViewer(props) {
    const { items, lastPdf } = props;
    
    const type = lastPdf === ".png" || lastPdf === "docx" || lastPdf === "doc" || lastPdf === "jpeg" || lastPdf === "txt" ? "pdf" : "pdf"
    const files = items.document

    return (
        <div>
            <FileViewer
                fileType={type}
                filePath={files}
            />
        </div>
    )
}

export default DocumentViewer