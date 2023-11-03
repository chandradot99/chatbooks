import PropTypes from 'prop-types';
import React from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { CloudUpload } from '@mui/icons-material';
import LoadingDots from './LoadingDots';

const VisuallyHiddenInput = styled('input')({
	clip: 'rect(0 0 0 0)',
	clipPath: 'inset(50%)',
	height: 1,
	overflow: 'hidden',
	position: 'absolute',
	bottom: 0,
	left: 0,
	whiteSpace: 'nowrap',
	width: 1,
});

const useStyles = makeStyles(() => ({
	fileUploadWrap: {
    width: "100%",
    top: 0,
    left: 0,
    borderBottom: "1px solid #e2e2e2",
    height: "115px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "16px 0"
	},
  label: {
    marginBottom: "8px",
    fontWeight: 600
  },
  button: {
    width: "260px"
  },
  infoMessage: {
    color: "red",
    width: "500px",
    fontSize: "12px",
    marginTop: "8px",
    display: "flex",
    gap: "8px"
  }
}));

const FileUpload = ({ onFileUpload, loading }) => {
  const classes = useStyles();

  const onFileChange = (event) => {
    const file = event.target.files[0];
    onFileUpload(file);
  };

  return (
    <div className={classes.fileUploadWrap}>
      <div className={classes.label}>
        Chat with below PDF or upload new PDF to start chatting.
      </div>
      <Button component="label" variant="contained" startIcon={<CloudUpload />} className={classes.button} disabled={loading} >
        {
          loading ? (
            <>
              <span>Uploading PDF</span>
              <LoadingDots />
            </>
          ) : (
            <span>Upload PDF</span>
          )
        }
        <VisuallyHiddenInput type="file" onChange={onFileChange} />
      </Button>
      <div className={classes.infoMessage}>
        <span>
          Note: 
        </span>
        <span>
          1. Larger PDFs might not work, try to upload pdf with max 200 pages. <br />
          2. OpenAI has token limit per minute for embeddings, so please wait for 1 minute before next upload
        </span>
      </div>
    </div>
  );
};

FileUpload.propTypes = {
  onFileUpload: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

export default FileUpload;
