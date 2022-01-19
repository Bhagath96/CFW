import React, { useEffect, useState } from 'react';
import { Field, Form, reduxForm, FieldArray } from 'redux-form';
import { useParams } from 'react-router-dom';
import {
    renderTextField, renderSimpleSelect, renderTextAreaField, UploadFile, reactMultiSelect, renderSelect
} from '../../../utils/FormUtils';
import { useDispatch, useSelector, connect } from 'react-redux';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import { renderCard } from '../../../assets/css/bhoom';
import { makeStyles, Components, Icons } from '../../../common/components';
import { withStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import { IMAGE_UPLOAD, STATE_REDUCER_KEY } from '../constant';
import _ from '../../../utils/LodashUtils';
import * as CommonAction from '../../common/actions';
import * as CommonConstants from '../../common';
import * as Actions from '../actions';
import createEventValidation from '../validate';
import { I18n } from '../../../common/components';
import { convertToLocal, convertToUTC } from '../../../utils/DateUtils';
import moment from 'moment';
import clsx from 'clsx';
import ImageCropAndCompress from '../../../common/components/custom/ImageCropAndCompress';
import { MIME_TYPES } from '../../common/constants';

const { AddBoxTwoTone, DeleteForeverIcon } = Icons;

const { Grid, Button, CardComponent, IconButton, CardHeader, CardContent, Card, Colors, DateTimePicker } = Components;


const useStyles = makeStyles((theme) => ({
    root: {
        flex: 1
    },
    item: {
        padding: theme.spacing(1)
    },
    submit: {
        textAlign: 'center'
    },
    '.MuiButton-label': {
        '&:hover': {
            color: 'black'
        }
    },
    hide: {
        display: 'none'
    },
    show: {
        display: 'contents'

    }
}));
const Accordion = withStyles({
    root: {
        boxShadow: 'none',
        '&:not(:last-child)': {
        },
        borderBottom: 0,
        '&:before': {
            display: 'none'
        },
        '&$expanded': {
            margin: 'auto'
        }
    },
    expanded: {}
})(MuiAccordion);
const AccordionSummary = withStyles({
    root: {
        backgroundColor: Colors['color-primary-100'],
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56
        }
    },
    content: {
        '&$expanded': {
            margin: '12px 0'
        }
    },
    expanded: {}
})(MuiAccordionSummary);

const renderLabels = ({ fields, shortLabelDisplay, offlineMode,
    //meta: { touched, error, submitFailed },
    change, languages, title = I18n.t('label_body') }) => {
    fields.length < 1 && fields.push({});
    const classes = useStyles();

    return (
        <Card style={renderCard.options} >
            <CardHeader
                action={
                    <IconButton className='addButton' aria-label="Options" onClick={() => fields.push({})}>
                        <AddBoxTwoTone />
                    </IconButton>
                }
                title={title}
            />
            <CardContent style={renderCard.content}>
                {fields.map((member, index) => (
                    <Card key={index} style={renderCard.accordion}>
                        <Accordion defaultExpanded={true} >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Grid container alignItems='center'>
                                    <Grid item>
                                        <Typography>{`${I18n.t('label_body')}${index + 1}`}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid item xs={1} sm={1} md={1} >
                                    <IconButton aria-label="Options" onClick={() => fields.remove(index)}>
                                        <DeleteForeverIcon />
                                    </IconButton>
                                </Grid>
                            </AccordionSummary>
                            <Grid container spacing={2} key={index} style={renderCard.gridCenter}>
                                <Grid item xs={shortLabelDisplay ? 3 : 4} >
                                    <Field name={`${member}.langId`} label={I18n.t('language')} component={renderSimpleSelect} onChange={(value) =>
                                        change(`${member}.langId`, value.target.value)} >
                                        {
                                            _.get(languages, 'data', [])
                                        }
                                    </Field>
                                </Grid>
                                <Grid item xs={shortLabelDisplay ? 4 : 6} >
                                    <Field name={`${member}.label`} label={I18n.t('label')} component={renderTextField} />
                                </Grid>

                                <Grid item xs={6} className={clsx(!offlineMode ? classes.hide : '')} >
                                    <Field name={`${member}.locationName`} label={I18n.t('location_name')} type='text' component={renderTextField} />
                                </Grid>
                                {
                                    shortLabelDisplay ?
                                        <Grid item xs={3} >
                                            <Field name={`${member}.shortLabel`} label={I18n.t('short_label')} component={renderTextField} />
                                        </Grid> : null
                                }
                                <Grid item xs={12}>
                                    <Field name={`${member}.body`} label={I18n.t('body')} type='text' component={renderTextAreaField} />
                                </Grid>

                                {/* </AccordionDetails> */}
                            </Grid>
                        </Accordion>
                    </Card>
                ))}
            </CardContent>
        </Card >
    );
};

function CreateEvent(props) {
    const { id } = useParams();
    const start = new Date();
    start.setUTCHours(0, 0, 0, 0);
    const dispatch = useDispatch();
    const [labelError, SetLabelError] = useState('');

    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [upImg, setUpImg] = useState();

    const [selectStartDate, setSelectedStartDate] = useState(moment().startOf('day'));
    const [selectEndDate, setSelectedEndDate] = useState(moment());

    const [dateValidation, setDateValidation] = useState('');
    const [offlineMode, setOfflineMode] = useState(false);
    const [districtId, setDistrictId] = useState(1);

    const { allLanguages: languages } = useSelector(state => state[CommonConstants.STATE_REDUCER_KEY]);
    const { fetchRoles, fetchDefaultRoles, fetchUserGroups, fetchDefaultUserGroups, eventType, fetchEventById = {}, stateList, districtList, lsgiTypeList, lsgiList, onlinePlatformList } = useSelector(state => state[STATE_REDUCER_KEY]);
    const { data: { eventStart = null, eventEnd = null, eventTypeId = {} } = {} } = fetchEventById;
    const { change } = props;
    const classes = useStyles();
    const { handleSubmit } = props;
    change('state', stateList.data[0]);
    const datePickerValidation = () => {
        setDateValidation('');
        if (moment(selectStartDate).isAfter(moment(selectEndDate))) {
            setDateValidation(I18n.t('start_les_end'));
        }
        if (moment(selectStartDate).isSame(moment(selectEndDate))) {
            setDateValidation(I18n.t('start_same_end'));
        }
    };
    useEffect(() => {
        return () => {
            setSelectedStartDate(moment().startOf('day'));
            setSelectedEndDate(moment());
        };
    }, []);
    useEffect(() => {
        if (id) {
            dispatch(Actions.fetchEventDataById(id));
        }
    }, [id]);
    useEffect(() => {
        if (!id) {
            change('eventTypeId', eventType.data[0]);
        }
    }, [eventType.data.length > 0]);
    useEffect(() => {
        if (id) {
            eventStart !== null ? setSelectedStartDate(eventStart) : '';
            eventEnd !== null ? setSelectedEndDate(eventEnd) : '';
        }
    }, [fetchEventById]);

    useEffect(() => {
        if (!id) {
            change('userGroups', fetchDefaultUserGroups?.data);
            change('roles', fetchDefaultRoles?.data);
        }
    }, [fetchDefaultUserGroups, fetchDefaultRoles]);
    useEffect(() => {
        datePickerValidation();
    }, [selectStartDate, selectEndDate]);
    useEffect(() => {
        dispatch(CommonAction.getAllLanguages());
        dispatch(Actions.fetchRoles());
        dispatch(Actions.fetchDefaultRoles());
        dispatch(Actions.fetchUserGroups());
        dispatch(Actions.fetchDefaultUserGroups());
        dispatch(Actions.fetchEventType());

        dispatch(Actions.fetchStateList());
        dispatch(Actions.fetchLSGIType());
        dispatch(Actions.fetchOnlinePlatforms());
    }, []);
    useEffect(() => {
        if (eventTypeId.id === 1) {
            setOfflineMode(false);
        } else if (eventTypeId.id === 2) {
            setOfflineMode(true);
        }
    }, [eventTypeId]);

    useEffect(() => {
        if (stateList.data.length > 0) {
            const stateId = stateList.data[0].id;
            stateId && dispatch(Actions.fetchDistrict(stateId));
        }
    }, [stateList.data.length > 0]);


    const submit = (values) => {
        const reFormattedStartDate = convertToLocal(selectStartDate);
        const reFormattedEndDate = convertToLocal(selectEndDate);

        let formData = new FormData();
        formData.append('file', imageFile);
        SetLabelError('');
        let stateObjectToSend = {
            ...values,
            eventTypeId: values?.eventTypeId.id,
            userGroups: values?.userGroups.map(obj => obj.id),
            roles: values?.roles.map(obj => obj?.pk ? obj.pk : obj.id),
            eventStart: convertToUTC(reFormattedStartDate),
            eventEnd: convertToUTC(reFormattedEndDate)
        };

        stateObjectToSend.labels = values.labels;
        delete stateObjectToSend.photoId;
        if (values.eventTypeId.id === 1) {
            delete stateObjectToSend.longitude;
            delete stateObjectToSend.longitude;
            delete stateObjectToSend.lsgi;
            delete stateObjectToSend.lsgi_type;
            delete stateObjectToSend.state;
            delete stateObjectToSend.district;
            delete stateObjectToSend.onlinePlatform;
            delete stateObjectToSend.labels.locationName;

            stateObjectToSend = {
                ...stateObjectToSend,
                onlineMeetPlatformId: values?.onlinePlatform?.id
            };
            let labels = _.map(values.labels, item => {
                delete item.locationName;
                return item;
            });
            stateObjectToSend.labels = labels;

        } else if (values.eventTypeId.id === 2) {
            delete stateObjectToSend.onlinePlatform;
            delete stateObjectToSend.onlineMeetLink;
            delete stateObjectToSend.district;
            delete stateObjectToSend.lsgi_type;

            stateObjectToSend = {
                ...stateObjectToSend,
                districtId: values?.district?.id,
                lsgiTypeId: values?.lsgiType?.id,
                lsgiId: values?.lsgi?.id
            };

        }
        if (!dateValidation) {
            if (id) {
                formData.append('data', new Blob([JSON.stringify(stateObjectToSend)], {
                    type: 'application/json'
                }));
                dispatch(Actions.updatesEventData(id, formData));
            } else {
                formData.append('data', new Blob([JSON.stringify(stateObjectToSend)], {
                    type: 'application/json'
                }));

                dispatch(Actions.saveEventData({ formData }));

            }
        }
    };

    const handleFileUpload = (event) => {
        const files = event.target.files[0];
        const reader = new FileReader();
        reader.addEventListener('load', () => setUpImg({ fileName: files.name, url: reader.result }));
        reader.readAsDataURL(event.target.files[0]);
    };

    const eventTypeOnChange = (e) => {
        if (e.id === 1) {
            setOfflineMode(false);
        } else if (e.id === 2) {
            setOfflineMode(true);
        }
    };
    const handleChangeStartDate = (e) => {
        const formattedStartDate = convertToLocal(e, 'YYYY-MM-DDTHH:mm:ss');
        setSelectedStartDate(formattedStartDate);

    };
    const handleChangeEndDate = (e) => {
        const formattedEndDate = convertToLocal(e, 'YYYY-MM-DDTHH:mm:ss');
        setSelectedEndDate(formattedEndDate);
    };


    return (
        <CardComponent>
            <Form onSubmit={handleSubmit(submit)} autoComplete='off'>
                <Grid container>
                    <Grid item xs={6} sm={6} md={6} className={classes.item}>
                        <Field name='eventTypeId' label={I18n.t('event_type')} type='text' component={renderSelect} onChange={(e) => {
                            eventTypeOnChange(e);
                            change('state', null);
                            change('district', null);
                            change('lsgiType', null);
                            change('lsgi', null);
                            change('onlinePlatform', null);
                            change('onlineMeetLink', '');
                            change('latitude', '');
                            change('longitude', '');
                        }}
                        >
                            {
                                _.get(eventType, 'data', [])
                            }
                        </Field>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} className={classes.item}>
                        <Field name='sort' label={I18n.t('sort')} type='number' component={renderTextField} />
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} className='customPicky' style={{ padding: '8px' }}>
                        <DateTimePicker onChange={handleChangeStartDate} errors={dateValidation} selected={moment(selectStartDate)}
                            label={I18n.t('start_date')}
                            ampm
                            disablePast
                            format='DD/MM/YYYY hh:mm A'
                            autoOk
                            error={false}
                            helperText={null}
                        />
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} className='customPicky' style={{ padding: '8px' }}>
                        <DateTimePicker onChange={handleChangeEndDate} errors={dateValidation} selected={moment(selectEndDate)}
                            ampm
                            format='DD/MM/YYYY hh:mm A'
                            autoOk
                            label={I18n.t('end_date')}
                            error={false}
                            helperText={null}
                            minDate={selectStartDate}
                        />
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} className={classes.item}>
                        <Field name='userGroups' label={I18n.t('user_groups')} type='text' option={fetchUserGroups?.data?.content} component={reactMultiSelect} />
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} className={classes.item}>
                        <Field name='roles' label={I18n.t('roles')} type='text' option={_.unionBy(fetchDefaultRoles.data, fetchRoles.data, 'name')} component={reactMultiSelect} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} className={classes.item}></Grid>
                    <Grid item xs={12} sm={12} md={12} >
                        <FieldArray name='labels' labelError={labelError} offlineMode={offlineMode} component={renderLabels} languages={languages} change={change} />
                        {
                            labelError ? <small style={{ color: 'red' }}>{labelError}</small> : <small></small>
                        }
                    </Grid>

                    <Grid container className={clsx(classes.hide, offlineMode && classes.show)} >

                        <Grid item xs={6} sm={6} md={6} className={classes.item} style={{ marginBottom: '20px', maxHeight: '100%', overflow: 'scrollbars' }}>
                            <Field name='state' label={I18n.t('state')} type='text' component={renderSelect} style={{ position: 'absolute' }}
                                onChange={(e) => {
                                    dispatch(Actions.fetchDistrict(e.id));
                                    change('district', null);
                                    change('lsgiType', null);
                                    change('lsgi', null);

                                }} >
                                {
                                    _.get(stateList, 'data', [])
                                }
                            </Field>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} className={classes.item} style={{ marginBottom: '20px', maxHeight: '100%', overflow: 'scrollbars' }}>
                            <Field name='district' label={I18n.t('district')} type='text' component={renderSelect} style={{ position: 'absolute' }}
                                onChange={(e) => {
                                    setDistrictId(e.id);
                                    change('lsgiType', null);
                                    change('lsgi', null);
                                }} >
                                {
                                    _.get(districtList, 'data', [])
                                }
                            </Field>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} className={classes.item} style={{ marginBottom: '20px', maxHeight: '100%', overflow: 'scrollbars' }}>
                            <Field name='lsgiType' label={I18n.t('lsgi_type')} type='text' component={renderSelect} style={{ position: 'absolute' }}
                                onChange={(e) => {
                                    dispatch(Actions.fetchLSGI(e.id, districtId));
                                    change('lsgi', null);

                                }} >
                                {
                                    _.get(lsgiTypeList, 'data', [])
                                }
                            </Field>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} className={classes.item} style={{ marginBottom: '20px', maxHeight: '100%', overflow: 'scrollbars' }}>
                            <Field name='lsgi' label={I18n.t('lsgi')} type='text' component={renderSelect} style={{ position: 'absolute' }}
                                onChange={() => { }} >
                                {
                                    _.get(lsgiList, 'data', [])
                                }
                            </Field>
                        </Grid>

                        <Grid item xs={6} sm={6} md={6} className={classes.item}>
                            <Field name='latitude' label={I18n.t('latitude')} type='number' component={renderTextField} />
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} className={classes.item}>
                            <Field name='longitude' label={I18n.t('longitude')} type='number' component={renderTextField} />
                        </Grid>
                    </Grid>

                    <Grid container className={clsx(offlineMode ? classes.hide : classes.show)}>

                        <Grid item xs={6} sm={6} md={6} className={classes.item} style={{ marginBottom: '20px', maxHeight: '100%', overflow: 'scrollbars' }}>
                            <Field name='onlinePlatform' label={I18n.t('online_Platforms')} type='text' component={renderSelect} style={{ position: 'absolute' }}
                                onChange={() => { }} >
                                {
                                    _.get(onlinePlatformList, 'data', [])
                                }
                            </Field>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} className={classes.item}>
                            <Field name='onlineMeetLink' label={I18n.t('link')} type='text' component={renderTextField} />
                        </Grid>

                    </Grid>

                    <Grid item xs={12} className={classes.item}>
                        <Field width={IMAGE_UPLOAD.WIDTH} height={IMAGE_UPLOAD.HEIGHT} name='photoId' accept={[MIME_TYPES.PNG, MIME_TYPES.JPEG, MIME_TYPES.JPG]} label={I18n.t('file_upload')} type='file' imgURL={imageUrl} component={UploadFile} onChange={handleFileUpload} />
                        {upImg && <ImageCropAndCompress img={upImg} width={IMAGE_UPLOAD.WIDTH} height={IMAGE_UPLOAD.HEIGHT} setUploadImageUrl={setImageUrl} setUploadImage={setImageFile} />}
                    </Grid>
                    <Grid item xs={12} className={classes.submit}>
                        <Button type="submit">{I18n.t('submit')}</Button>
                    </Grid>
                </Grid>
            </Form>
        </CardComponent >
    );
}
export default
    connect(state => ({
        initialValues: state[STATE_REDUCER_KEY].fetchEventById.data
    }))(reduxForm({
        form: 'createEvent',
        enableReinitialize: true,
        validate: createEventValidation
    })(CreateEvent));

