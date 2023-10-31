import PropTypes from 'prop-types';
import React from 'react';
import { makeStyles } from '@mui/styles';
import { AccountCircle } from '@mui/icons-material';


const useStyles = makeStyles(() => ({
    question: {
        display: "flex",
        gap: "8px",
        padding: "16px",
        borderRadius: "8px",
        backgroundColor: "#e8eaed"
    },
    text: {
        fontSize: "15px"
    }
}));

const ChatQuestion = ({ question }) => {
  const classes = useStyles();

  return (
    <div className={classes.question}>
        <AccountCircle htmlColor='#0072c3' />
        <span className={classes.text}>
            {question}
        </span>
    </div>
  );
};

ChatQuestion.propTypes = {
  question: PropTypes.string.isRequired
};

export default ChatQuestion;
