import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles} from '@material-ui/core/styles';

const useStyle = makeStyles(() => ({
    customLink: {
        textDecoration: "none"
    },
}));

export default function CustomLink(props){
    const classes = useStyle();
    return(
        <>
            <Link  className={classes.customLink} to={props.to}>{props.children}</Link>
        </>
    )
}