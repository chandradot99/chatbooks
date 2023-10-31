import React from 'react';
import { makeStyles } from '@mui/styles';
import { Chat } from '@mui/icons-material';
import LoadingDots from './LoadingDots';


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
        fontSize: "15px"
    }
}));

const ChatLoading = () => {
  const classes = useStyles();

  return (
    <div className={classes.response}>
        <Chat htmlColor='#8f1752' />
        <LoadingDots />
    </div>
  );
};

export default ChatLoading;
