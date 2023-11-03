import PropTypes from 'prop-types';
import React from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { CloudUpload } from '@mui/icons-material';

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
	sidebar: {
    width: "100%",
    top: 0,
    left: 0,
    borderBottom: "1px solid #e2e2e2",
    height: "70px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "16px 0"
	},
  label: {
    marginBottom: "8px"
  },
  button: {
    width: "200px"
  }
}));

const FileUpload = ({ onFileUpload }) => {
  const classes = useStyles();

  const onFileChange = (event) => {
    const file = event.target.files[0];
    onFileUpload(file);
  };

  return (
    <div className={classes.sidebar}>
      <div className={classes.label}>
        Chat with below PDF or Upload new PDF to start Chatting.
      </div>
      <Button component="label" variant="contained" startIcon={<CloudUpload />} className={classes.button} >
        Upload PDF
        <VisuallyHiddenInput type="file" onChange={onFileChange} />
      </Button>
    </div>
  );
};

FileUpload.propTypes = {
    onFileUpload: PropTypes.func.isRequired
};

export default FileUpload;
