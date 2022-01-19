import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';


const useStyles = makeStyles(() => ({
    cardStyle: {
        // position: 'relative',
        borderStyle: 'none',
        boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
        // width: '100%',
        paddingLeft: '2%',
        paddingTop: '2%',
        paddingRight: '2%',
        background: 'whiteColor',
        overflow: 'visible',
        // overflowY: 'scroll'
        marginBottom: '60px'
    }
}));
function CardComponent(props) {
    const classes = useStyles();
    return (
        <div>
            <Card className={classes.cardStyle} style={{ width: '103%' }}>
                {props.children}
            </Card>
        </div>
    );
}

export default CardComponent;
