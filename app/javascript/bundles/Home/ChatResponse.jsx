import PropTypes from 'prop-types';
import React from 'react';
import { makeStyles } from '@mui/styles';
import { Chat } from '@mui/icons-material';
import Markdown from 'markdown-to-jsx'

const useStyles = makeStyles(() => ({
    response: {
        display: "flex",
        gap: "8px",
        padding: "16px",
        borderRadius: "8px",
        backgroundColor: "#fff",
        border: "1px solid #e8eaed"
    },
    text: {
        fontSize: "15px",
        "& > :first-child": {
            marginTop: 0
        },
        "& > :last-child": {
            marginBottom: 0
        }
    }
}));

const ChatResponse = ({ response }) => {
  const classes = useStyles();

  return (
    <div className={classes.response}>
        <Chat htmlColor='#8f1752' />
        <Markdown className={classes.text}>
            {response}
        </Markdown>
    </div>
  );
};

ChatResponse.propTypes = {
  response: PropTypes.string.isRequired
};

export default ChatResponse;
