import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';


const useStyles = makeStyles(() => ({
    cardStyle: {
        // position: 'relative',
        borderStyle: 'none',
        // boxShadow: 'rgba(255, 0, 0, 0.117647) 0px 1px 6px, rgba(255, 0, 0, 0.117647) 0px 1px 4px',
        width: '100%',
        paddingLeft: '2%',
        paddingTop: '2%',
        paddingRight: '2%',
        paddingBottom: '2%',
        maxHeight: '77vh',
        minHeight: '77vh',
        overflowY: 'scroll'
    }
}));
function CardComponentForList(props) {
    const classes = useStyles();
    return (
        <div>
            <Card className={classes.cardStyle}>
                {props.children}
            </Card>
        </div>
    );
}

export default CardComponentForList;
