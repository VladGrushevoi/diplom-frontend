import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Pagination } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function Paginator(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography>Page: {props.page}</Typography>
      <Pagination {...props} />
    </div>
  );
}