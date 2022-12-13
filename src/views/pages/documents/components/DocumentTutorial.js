import { Grid } from '@mui/material'
import React from 'react'
import Content from './Content'

function DocumentTutorial() {
    return (
        <Grid spacing={2} container className='mt-1'>
            <Grid item sm={12} md={12} lg={12}>
                <h4 className='ml-1'>DOCUMENT TUTORIAL </h4>
                <p
                    className="p-1 pr-5"
                    style={{
                        background: "#eaf4fe",
                    }}
                >
                    Document is a powerful tool designed to allow mymember users to
                    save and organize important files. Users can also create custom
                    files that connect to allow the creation of custom single or
                    bulk documents. Watch the videos below to use documents with
                    ease!
                </p>
            </Grid>
            <Grid item sm={4} md={4} lg={4}>
                <Content
                    hedding={"CREATE FOLDERS & UPLOAD FILES"}
                    content={
                        "Learn how to create folders, subfolders and organize your importantat files.Files can be uploaded in .pdf, .doc, .docx, .xls, .xlsx "
                    }
                    link={"https://www.youtube.com/embed/bidOMaCs3vM"}
                />
            </Grid>
            <Grid item sm={4} md={4} lg={4}>
                <Content
                    hedding={"CREATE CUSTOM DOCUMENTS"}
                    content={
                        "Learn how to create custom documents using mymembers powerful merge feature. Use the merge field library to create custom documents that can be merged with your contact list."
                    }
                    link={"https://www.youtube.com/embed/5RfLIC-3dzY"}
                />
            </Grid>
            <Grid item sm={4} md={4} lg={4}>
                <Content
                    hedding={"PRINT DOCUMENTS"}
                    content={
                        "Print files from your saved folders or print customized documents for single or unlimited bulk contacts. Print any type of business documents in seconds."
                    }
                    link={"https://www.youtube.com/embed/0NFRvVdmmE4"}
                />
            </Grid>
        </Grid>
    )
}

export default DocumentTutorial