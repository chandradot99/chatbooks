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
		width: "20%",
		backgroundColor: "#001529"
	}
}));

const Sidebar = ({ onFileUpload }) => {
  const classes = useStyles();

  const onFileChange = (event) => {
    const file = event.target.files[0];
    onFileUpload(file);
  };

  return (
    <div className={classes.sidebar}>
        <Button component="label" variant="contained" startIcon={<CloudUpload />}>
        Upload file
        <VisuallyHiddenInput type="file" onChange={onFileChange} />
      </Button>
    </div>
  );
};

Sidebar.propTypes = {
    onFileUpload: PropTypes.func.isRequired
};

export default Sidebar;
