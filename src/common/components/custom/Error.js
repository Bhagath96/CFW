import React from 'react';
import { connect } from 'react-redux';
import { makeStyles, Grid } from '../common/Components.js';

const useStyles = makeStyles(() => ({
    Container: {
        display: 'flex',
        flexFlow: 'row-reverse wrap'
    },
    h1: {
        fontSize: '20em',
        margin: '0',
        zIndex: '-1',
        marginLeft: '-70px',
        marginRight: '-80px'
    }
}));
export const Error = () => {
    const classes = useStyles();
    return (
        <div className={classes.Container}>
            <Grid container>
                <Grid item xs={12} sm={12} md={12}>
                    <h className={classes.h1}>4</h>
                    <div> <h className={classes.h1}>0</h></div>
                    <h className={classes.h1}>4</h>
                </Grid>
            </Grid>
        </div>
    );
};
const mapStateToProps = () => ({

});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Error);
