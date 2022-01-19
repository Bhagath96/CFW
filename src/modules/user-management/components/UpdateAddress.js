import React, { useEffect, useState } from 'react';
import { Field, Form, FormSection, reduxForm } from 'redux-form';
import { makeStyles, Components, I18n } from '../../../common/components';
import { renderTextField, renderSelect } from '../../../utils/FormUtils';
import { useDispatch, useSelector, connect } from 'react-redux';
import { ADDRESS_TYPES, STATE_REDUCER_KEY } from '../constants';
import _ from '../../../utils/LodashUtils';
import { getAddressOfTheUser, updateAddress, loadDistricts, loadState } from '../actions';
import { useParams } from 'react-router-dom';
import LoadingOverlay from '../../../common/components/custom/LoadingOverlay.js';
import { updateAddressValidation } from '../validations';

const { Grid, Button, Typography } = Components;
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    item: {
        padding: theme.spacing(1)
    },
    mainItem: {
        marginBottom: '20px'
    },
    submit: {
        textAlign: 'center'
    }
}));

function UpdateAddress(props) {
    const { id } = useParams();
    const dispatch = useDispatch();

    const classes = useStyles();
    const userManagementValues = useSelector(state => state[STATE_REDUCER_KEY]);
    const sameValues = useSelector(state => _.get(state, 'form.UpdateAddress.values.currentAddress', {}));
    // const [defaultAddress, setDefaultAddress] = useState(1);


    useEffect(() => {
        dispatch(loadState());
        dispatch(getAddressOfTheUser(id));
    }, []);

    // dispatch(loadDistricts({ identifier: 'PR', id: { stateId: stateId } }));
    // dispatch(loadDistricts({ identifier: 'CR', id: { stateId: currentAddressStateId } }));

    const { change, handleSubmit } = props;
    const { states, getUserAddress, listDistrictsForAddress } = userManagementValues;
    const { data: { sameAddress = false } = {} } = getUserAddress;
    const [checkValue, setCheckValue] = useState(sameAddress);

    //function triggered when checkbox is clicked
    const checkBoxClick = () => {
        change('permanentAddress', sameValues);
        setCheckValue(!checkValue);
    };

    const formatValues = (data) => {
        let response = {
            pincode: _.get(data, 'pincode', ''),
            addressLine1: _.get(data, 'addressLine1', ''),
            addressLine2: _.get(data, 'addressLine2', ''),
            landmark: _.get(data, 'landmark', '')
        };
        let curId = _.get(data, 'id', null);
        if (curId !== null) {
            response.id = curId;
        }
        let curStateId = _.get(data, 'state.id', null);
        if (curStateId !== null) {
            response.stateId = curStateId;
        }
        let curDistrictId = _.get(data, 'district.id', null);
        if (curDistrictId !== null) {
            response.districtId = curDistrictId;
        }
        return response;
    };

    const submit = (values = {}) => {
        const { currentAddress = {}, permanentAddress = {} } = values;
        let newAddressArray = [];
        let currentDefaultAddress = _.get(values, 'defaultAddress.id', 2);
        let isSameAddress = _.get(currentAddress, 'sameAddress', false);

        let currentAddressData = formatValues(currentAddress);
        let permanentAddressData = formatValues(permanentAddress);

        if (isSameAddress) {
            newAddressArray.push({ ...currentAddressData, typeId: 2, defaultAddress: true });
            newAddressArray.push({ ...currentAddressData, typeId: 1, defaultAddress: false });
        } else {
            if (currentDefaultAddress === 1) {
                newAddressArray.push({ ...permanentAddressData, typeId: 1, defaultAddress: true });
                newAddressArray.push({ ...currentAddressData, typeId: 2, defaultAddress: false });

            } else {
                newAddressArray.push({ ...permanentAddressData, typeId: 1, defaultAddress: false });
                newAddressArray.push({ ...currentAddressData, typeId: 2, defaultAddress: true });
            }
        }

        dispatch(updateAddress(id, newAddressArray));
    };

    return (
        <div style={{ overflowY: 'scroll', overflowX: 'hidden' }}>
            <Form onSubmit={handleSubmit(submit)}>
                <LoadingOverlay active={getUserAddress.requestInProgress}>
                    <Grid item xs={12} sm={12} md={12} className={classes.mainItem}>
                        <Field name='defaultAddress' label={I18n.t('default_address')} component={renderSelect} >
                            {ADDRESS_TYPES}
                        </Field>
                    </Grid>
                    {<FormSection name="currentAddress">
                        <Typography style={{ marginLeft: '1%' }}>{I18n.t('current_address')}</Typography>
                        <Grid container>
                            <Grid item xs={12} sm={12} md={12} className={classes.item}>
                                <Field name='addressLine1' label={I18n.t('address_1')} component={renderTextField} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} className={classes.item}>
                                <Field name='addressLine2' label={I18n.t('address_2')} component={renderTextField} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} className={classes.item}>
                                <Field name='landmark' label={I18n.t('land_mark')} component={renderTextField} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} className={classes.item}>
                                <Field name="state" label={I18n.t('state')} component={renderSelect} onChange={(value) => {
                                    dispatch(loadDistricts({ identifier: 'CR', id: { stateId: value.id } }));
                                    change('currentAddress.district', null);
                                }}

                                >
                                    {
                                        _.get(states, 'data', [])
                                    }
                                </Field>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} className={classes.item}>
                                <Field name="district" label={I18n.t('district')} component={renderSelect} onChange={(value) =>
                                    change('district', value.id)
                                }>
                                    {
                                        _.get(listDistrictsForAddress, 'CR', [])
                                    }
                                </Field>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} className={classes.item}>
                                <Field name='pincode' label={I18n.t('pin_code')} type='number' component={renderTextField} />
                            </Grid>
                        </Grid>
                        <Field style={{ marginLeft: '1%' }} component="input" name='sameAddress' type="checkbox" onClick={() => checkBoxClick()} /><span>{I18n.t('same_address')}?</span><br /><br />

                    </FormSection>}
                    <FormSection name="permanentAddress" hidden={checkValue}>
                        <Typography style={{ marginLeft: '1%' }}>{I18n.t('permanent_address')}</Typography>
                        <Grid container>
                            <Grid item xs={12} sm={12} md={12} className={classes.item}>
                                <Field name='addressLine1' label={I18n.t('address_1')} component={renderTextField} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} className={classes.item}>
                                <Field name='addressLine2' label={I18n.t('address_2')} component={renderTextField} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} className={classes.item}>
                                <Field name='landmark' label={I18n.t('land_mark')} component={renderTextField} />
                            </Grid>
                            {/* <Grid item xs={12} sm={12} md={12} className={classes.item}>
                                <Field name="state" label="State" component={renderSelect} onChange={(value) => {
                                    // dispatch(loadDistricts({ identifier: 'User', id: { stateId: value.id } }));

                                    // change('state', value.id);
                                }}
                                >
                                {
                                        _.get(states, 'data', [])
                                    }
                                </Field>
                            </Grid> */}
                            <Grid item xs={12} sm={12} md={12} className={classes.item}>
                                <Field name='state' label={I18n.t('state')} component={renderSelect} filterable={false} onChange={(value) => {
                                    change('state', value);
                                    dispatch(loadDistricts({ identifier: 'PR', id: { stateId: value.id } }));
                                    change('permanentAddress.district', null);
                                }
                                }
                                >
                                    {
                                        states.data?.map(item => ({ id: item.id, name: item.name }))
                                    }
                                </Field>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} className={classes.item}>
                                <Field name="district" label={I18n.t('district')} component={renderSelect} onChange={(value) =>
                                    change('district', value.id)
                                }>
                                    {
                                        _.get(listDistrictsForAddress, 'PR', [])
                                    }
                                </Field>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} className={classes.item}>
                                <Field name='pincode' label={I18n.t('pin_code')} type='number' component={renderTextField} />
                            </Grid>
                        </Grid>
                    </FormSection>

                    <Grid item xs={12} className={classes.submit}>
                        <Button type="submit">{I18n.t('submit')}</Button>
                    </Grid>
                </LoadingOverlay>
            </Form>

        </div >
    );
}

export default connect(state => ({
    initialValues: state[STATE_REDUCER_KEY].getUserAddress.data
}))(reduxForm({
    form: 'UpdateAddress',
    enableReinitialize: true,
    validate: updateAddressValidation
})(UpdateAddress));
