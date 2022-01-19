import React, { useEffect, useState } from 'react';
import { Components, I18n } from '../../../common/components';
import { makeStyles, Paper } from '@material-ui/core';
import { renderSelect } from '../../../utils/FormUtils';
import { Field, Form, reduxForm } from 'redux-form';
import 'react-datepicker/dist/react-datepicker.css';
import { CounterCard } from './DashboardComponents';
import { connect, useDispatch, useSelector } from 'react-redux';
import { loadDistrict, loadLSGI, loadLSGIType } from '../actions';
import * as Actions from '../actions';
import { STATE_REDUCER_KEY } from '../constants';
import _ from 'lodash';

const { Grid, Button } = Components;


const useStyles = makeStyles((theme) => ({
    pickyContainer: {
        marginBottom: '10px'
    },
    datePicker: {
        backgroundColor: 'white',
        color: 'black !important'
    },
    item: {
        padding: theme.spacing(1)
    }
}));

const dashboardView = (props) => {
    const { change, handleSubmit } = props;

    const [districtId, setDistrictId] = useState('');
    const [LSGIType, setLSGIType] = useState('');
    const dispatch = useDispatch();
    const submit = (value) => {
        const lsgiId = _.get(_.get(value, 'Lsgi', ''), 'id', '');

        dispatch(Actions.loadTotalChildCount({ districtId, lsgiId }));
        dispatch(Actions.loadTotalParentCount({ districtId, lsgiId }));
        dispatch(Actions.loadTotalTeacherCount({ districtId, lsgiId }));
        dispatch(Actions.loadGeneralPublicCount({ districtId, lsgiId }));
        dispatch(Actions.loadOfficialCount({ districtId, lsgiId }));
        dispatch(Actions.loadComplaintReceivedCount({ districtId, lsgiId }));
    };
    const clear = () => {
        change('District', null);
        change('LsgiType', null);
        change('blockPanchayath', null);
        change('Lsgi', null);
        submit();
    };
    const { districtList = {}, LSGITypeList = {}, LSGIList = {}, blockPanchayath = {},
        childCount, parentCount, teachersCount, generalPublic, officialCount, complaintCount
    } = useSelector(state => state[STATE_REDUCER_KEY]);
    useEffect(() => {
        dispatch(loadDistrict());
        dispatch(loadLSGIType());
        const lsgiId = '';
        dispatch(Actions.loadTotalChildCount({ districtId, lsgiId }));
        dispatch(Actions.loadTotalParentCount({ districtId, lsgiId }));
        dispatch(Actions.loadTotalTeacherCount({ districtId, lsgiId }));
        dispatch(Actions.loadGeneralPublicCount({ districtId, lsgiId }));
        dispatch(Actions.loadOfficialCount({ districtId, lsgiId }));
        dispatch(Actions.loadComplaintReceivedCount({ districtId, lsgiId }));
    }, []);
    const classes = useStyles();
    return (
        <>
            <Paper elevation={3} style={{ marginBottom: 15 }}>
                <Form onSubmit={handleSubmit(submit)}>
                    <Grid container className={classes.item}>
                        <Grid item lg={4} xs={4} sm={6} md={6} className={classes.item}>
                            <Field name="District" label='District' component={renderSelect} onChange={(value) => {
                                setDistrictId(value.id);
                                change('LsgiType', null);
                                change('blockPanchayath', null);
                                change('Lsgi', null);
                            }}>
                                {_.get(districtList, 'data', [])}
                            </Field>
                        </Grid>
                        <Grid item lg={4} xs={4} sm={6} md={6} className={classes.item}>
                            <Field name="LsgiType" label='LsgiType' component={renderSelect} onChange={(value) => {
                                setLSGIType(value.name);
                                dispatch(loadLSGI(value.id, districtId));
                                change('Lsgi', null);
                            }}>
                                {_.get(LSGITypeList, 'data', [])}
                            </Field>
                        </Grid>
                        {
                            LSGIType === 'Panchayath' && < Grid item lg={4} xs={4} sm={6} md={6} className={classes.item}>
                                <Field name="blockPanchayath" label={I18n.t('block_panchayath')} component={renderSelect} onChange={(value) => {
                                    dispatch(loadLSGI(LSGIType, districtId, value.id));

                                }}>
                                    {
                                        _.get(blockPanchayath, 'data', [])
                                    }
                                </Field>
                            </Grid>
                        }
                        <Grid item lg={4} xs={4} sm={6} md={6} className={classes.item}>
                            <Field name="Lsgi" label='Lsgi' component={renderSelect}>
                                {_.get(LSGIList, 'data', [])}
                            </Field>
                        </Grid>


                        <Grid item xs={12} sm={12} md={12} style={{ display: 'flex', justifyContent: 'center' }}>
                            <Button type="submit">{I18n.t('submit')}</Button>

                            <Button style={{ marginLeft: '30px', backgroundColor: '#e34d43' }} onClick={() => {
                                clear();
                            }}>
                                {I18n.t('clear')}
                            </Button>
                        </Grid>

                    </Grid>
                </Form>
            </Paper>

            <Grid container spacing={2} style={{ marginBottom: '8px' }}>
                <Grid item lg={4} sm={4} xs={4} >
                    <CounterCard title={I18n.t('total_child_count')} color='color-red' subtitle='' icon='mdi-account-multiple'
                        content={{ count: childCount.data }} />
                </Grid>
                <Grid item lg={4} sm={4} xs={4} >
                    <CounterCard title={I18n.t('total_parent_count')} color='color-pink' icon='mdi-tools'
                        content={{ count: parentCount.data }} />
                </Grid>
                <Grid item lg={4} sm={4} xs={4} >
                    <CounterCard title={I18n.t('total_teacher_count')} color='color-teal' icon='mdi-currency-inr'
                        content={{ count: teachersCount.data }} />
                </Grid>
                <Grid item lg={4} sm={4} xs={4} >
                    <CounterCard title={I18n.t('total_general_public_count')} color='color-orange' icon='mdi-currency-inr'
                        content={{ count: generalPublic.data }} />
                </Grid>
                <Grid item lg={4} sm={4} xs={4} >
                    <CounterCard title={I18n.t('total_officials_count')} color='color-brown' icon='mdi-currency-inr'
                        content={{ count: officialCount.data }} />
                </Grid>
                <Grid item lg={4} sm={4} xs={4} >
                    <CounterCard title={I18n.t('total_complaints_received')} color='color-purple' icon='mdi-currency-inr'
                        content={{ count: complaintCount.data }} />
                </Grid>
            </Grid>
        </>
    );
};

export default connect()(reduxForm({
    form: 'dashboardView'
})(dashboardView));
