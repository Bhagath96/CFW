import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import { Field, Form, reduxForm } from 'redux-form';
import { useParams } from 'react-router-dom';
import _ from 'lodash';
import { SketchPicker } from 'react-color';

import * as Actions from '../actions';
import { renderTextField, renderSelect } from '../../../utils/FormUtils';
import { Components, I18n, makeStyles } from '../../../common/components';
import LoadingOverlay from '../../../common/components/custom/LoadingOverlay.js';
import { STATE_REDUCER_KEY } from '../constants';
import { Typography } from '@material-ui/core';

const { Grid, Button, CardComponent } = Components;
const useStyles = makeStyles((theme) => ({
    color: {
        position: 'absolute!important',
        marginTop: '25px'
    },
    root: {
        flexGrow: 1
    },
    item: {
        padding: theme.spacing(1)
    },
    submit: {
        textAlign: 'center'
    },
    card: {
        marginTop: '10px'
    }
}));

const AdditionalBasicDetails = (props) => {
    const classes = useStyles();
    const { handleSubmit } = props;
    const dispatch = useDispatch();
    const { id = null } = useParams();

    useEffect(() => {
        if (id) {
            dispatch(Actions.fetchAdditionalBasicDetails({ organizationId: id }));
        }
        dispatch(Actions.fetchAdditionalBasicDetailsWards({ organizationId: id }));
    }, []);

    const { additionalBasicDetails: { requestInProgress = false, data: { color } = {} } = {}, additionalBasicDetailsWards = {} } = useSelector(state => state[STATE_REDUCER_KEY]);
    const [displayColorPicker, setDisplayColorPicker] = useState(false);
    const [selectedColor, setSelectedColor] = useState('grey');
    useEffect(() => {
        setSelectedColor(color || '#FFFFFF');
    }, [color]);

    const submit = (values) => {
        values.color = selectedColor;
        if (id) {
            values.organizationId = id;
        }
        dispatch(Actions.saveAdditionalBasicDetails(values));
    };

    const styles = {
        color: {
            width: '36px',
            height: '14px',
            borderRadius: '2px'
        },
        swatch: {
            padding: '5px',
            background: '#fff',
            borderRadius: '1px',
            boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
            display: 'inline-block',
            cursor: 'pointer',
            marginTop: '8px'
        },
        popover: {
            position: 'absolute',
            zIndex: '9999'
        },
        cover: {
            // position: 'fixed',
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px'
        }
    };

    return (
        <CardComponent >
            <div onClick={() => {
                if (displayColorPicker) {
                    setDisplayColorPicker(false);
                }
            }} >
                <Form onSubmit={handleSubmit(submit)} style={{ overflowY: 'scroll' }}>
                    <LoadingOverlay active={requestInProgress}>
                        <Grid container className={classes.item}>
                            <Grid item xs={3} sm={3} md={3} className={classes.item}>
                                <Typography>Color :{selectedColor}</Typography>
                            </Grid>
                            <Grid xs={3} sm={3} md={3} >
                                <div>
                                    <div style={styles.swatch} onClick={() => setDisplayColorPicker(!displayColorPicker)}>
                                        <div style={{ ...styles.color, background: selectedColor }} />
                                    </div>
                                    <div style={styles.popover}>
                                        <div style={styles.cover} />
                                        {displayColorPicker && <SketchPicker className={classes.color} color={selectedColor} onChange={(picked) => setSelectedColor(picked.hex)} />}
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={6} sm={6} md={6} className={classes.item}>
                                <Field name="ward" label={I18n.t('ward')} component={renderSelect}>
                                    {
                                        _.get(additionalBasicDetailsWards, 'data', [])
                                    }
                                </Field>
                            </Grid>
                            <Grid item xs={6} sm={6} md={6} className={classes.item}>
                                <Field name="latitude" label={I18n.t('latitude')} component={renderTextField} />
                            </Grid>
                            <Grid item xs={6} sm={6} md={6} className={classes.item}>
                                <Field name="longitude" label={I18n.t('longitude')} component={renderTextField} />
                            </Grid>
                            <Grid item xs={6} sm={6} md={6} className={classes.item}>
                                <Field name="description" label={I18n.t('description')} component={renderTextField} />
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} className={classes.submit}>
                            <Button type="submit">{id !== null ? I18n.t('update') : I18n.t('submit')}</Button>
                        </Grid>
                    </LoadingOverlay>
                </Form >
            </div>
        </CardComponent>
    );
};



export default connect(state => ({
    initialValues: state[STATE_REDUCER_KEY].additionalBasicDetails.data
}))(reduxForm({
    validate: validateAdditionalDetails,
    form: 'AdditionalBasicDetails',
    enableReinitialize: true
})(AdditionalBasicDetails));
