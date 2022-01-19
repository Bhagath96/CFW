import React, { useEffect, useState } from 'react';
import { Field, Form, reduxForm, FieldArray } from 'redux-form';
import { useParams } from 'react-router-dom';
import { renderTextField, renderSimpleSelect, reactMultiSelect, UploadFile } from '../../../utils/FormUtils';
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
import { I18n } from '../../../common/components';
import createNewsValidation from '../validate';
import { getFieldIdFromUrl, submitValidationCheck } from '../../../utils/ApiUtils';
import ImageCropAndCompress from '../../../common/components/custom/ImageCropAndCompress';
import { MIME_TYPES } from '../../common/constants';


const { AddBoxTwoTone, DeleteForeverIcon } = Icons;

const { Grid, Button, CardComponent, IconButton, CardHeader, CardContent, Card, Colors } = Components;


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

const renderLabels = ({ fields, shortLabelDisplay,
    //meta: { touched, error, submitFailed },
    change, languages, title = I18n.t('label'), dispatch, urlFlagObj, error }) => {
    fields.length < 1 && fields.push({});
    const handleClick = (fieldss, value, index) => {
        dispatch(change(`labels[${index}].clicked`, true));
        error('');
        dispatch(CommonAction.clearDeriveUrlarray({ index }));
        dispatch(change(`labels[${index}].urlFlag`, []));

        let data = [];
        let fieldId = getFieldIdFromUrl(value);
        let res = dispatch(CommonAction.checkDriveUrl({ fieldId, index, urlFlagObj }));
        data = res.payload?.data?.urlFlagObj;

        dispatch(change(`labels[${index}].urlFlag`, data));
        dispatch(change('urlFlags', data));
    };


    const urlChangeHandler = (fieldss, value, index) => {
        dispatch(change(`labels[${index}].clicked`, false));
    };

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
                                        <Typography>{`${I18n.t('label')}${index + 1}`}</Typography>
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
                                {
                                    shortLabelDisplay ?
                                        <Grid item xs={3} >
                                            <Field name={`${member}.label`} label={I18n.t('short_label')} component={renderTextField} />
                                        </Grid> : null
                                }
                                <Grid container spacing={2} key={index} style={renderCard.gridCenter}>

                                    <Grid item xs={12} sm={12} md={12} >
                                        <Field name={`${member}.body`} label={I18n.t('google_drive_link')} type='text' component={renderTextField} onChange={() => {
                                            urlChangeHandler(fields, fields.get(index).body, index);
                                        }} />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12} >

                                        <Button type='button' onClick={() => handleClick(fields, fields.get(index).body, index)}>{I18n.t('validate_link')}</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Accordion>
                    </Card>
                ))}
            </CardContent>
        </Card >
    );
};

function CreateNews(props) {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [labelError, SetLabelError] = useState('');
    const [formError, SetFormError] = useState('');
    const [error, setError] = useState('');
    const { allLanguages: languages, driveUrlflages = [] } = useSelector(state => state[CommonConstants.STATE_REDUCER_KEY]);
    const { defaultRole: { data: defaultRoleData = [] } = {}, defaultUserGroup: { data: defaultUserGroup = [] } = {}, fetchRolesByHashTagId: { data: fullRole = [] } = {}, fetchUserGroupByHashTagId: { data: fullUserGroup = [] } = {}, fetchNewsById: { data: singleNews = {} } = {} } = useSelector(state => state[STATE_REDUCER_KEY]);

    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [upImg, setUpImg] = useState();

    const { change } = props;
    const classes = useStyles();
    const { handleSubmit } = props;

    useEffect(() => {
        if (id) {
            dispatch(Actions.fetchNewsDataById(id));
        }
    }, [id]);
    useEffect(() => {
        // window.gapi.load('client');
        dispatch(CommonAction.getAllLanguages());
        dispatch(Actions.getAllRolesForNews());
        dispatch(Actions.getDefaultRolesForNews());
        dispatch(Actions.getDefaultUserGroupForNews());
        dispatch(Actions.getAllUserGroupForNews());


    }, []);
    useEffect(() => {
        if (!id) {
            change('roles', defaultRoleData);
            change('usergroups', defaultUserGroup);
        }
    }, [defaultRoleData?.length > 0, defaultUserGroup?.length > 0]);

    useEffect(() => {
        if (singleNews?.photoId) {
            setImageUrl(singleNews.photoId);
        }

    }, [singleNews]);


    useEffect(() => {
        if (imageFile === null) {
            change('fileUpload', null);
        }
    }, [imageFile]);
    // const handleFileUpload = (event) => {
    //     const files = event.target.files[0];
    //     const reader = new FileReader();
    //     reader.addEventListener('load', () => setImageFile({ fileName: files.name, url: reader.result }));
    // };

    const handleFileUpload = (event) => {
        const files = event.target.files[0];
        const reader = new FileReader();
        reader.addEventListener('load', () => setUpImg({ fileName: files.name, url: reader.result }));
        reader.readAsDataURL(event.target.files[0]);
    };
    const submit = (values) => {

        setError('');
        let { bodyIndex, submitCurrectFlag } = submitValidationCheck(values);

        if (submitCurrectFlag) {

            let newsObj = JSON.parse(JSON.stringify(values));
            newsObj.roles = newsObj?.roles?.length > 0 ? newsObj?.roles?.map((item) => item.id) : [];
            newsObj.usergroups = newsObj?.usergroups?.length > 0 ? newsObj?.usergroups?.map((item) => item.id) : [];

            let formData = new FormData();
            formData.append('file', imageFile);
            SetFormError('');
            SetLabelError('');
            let stateObjectToSend = {
                ...newsObj
            };

            if (values.sort) {
                if (id) {
                    if (values.labels?.length > 0) {
                        stateObjectToSend.labels = values.labels;
                        formData.append('data', new Blob([JSON.stringify(stateObjectToSend)], {
                            type: 'application/json'
                        }));
                        dispatch(Actions.updatesNewsData({ formData, id }));
                    } else {
                        SetLabelError(I18n.t('At_least_one_label_must_be_entered'));
                    }

                } else {
                    if (values.labels?.length > 0) {
                        stateObjectToSend.labels = values.labels;
                        formData.append('data', new Blob([JSON.stringify(stateObjectToSend)], {
                            type: 'application/json'
                        }));


                        dispatch(Actions.saveNewsData({ formData }));
                    } else {
                        SetLabelError(I18n.t('At_least_one_label_must_be_entered'));
                    }

                }
            }
        } else {

            setError(`Invalid link on ${bodyIndex}`);
            bodyIndex = '';
        }
    };

    return (
        <CardComponent>
            <Form onSubmit={handleSubmit(submit)} autoComplete='off'>
                <Grid container>
                    <Grid item xs={12} sm={12} md={12} >
                        <FieldArray name='labels' labelError={labelError} component={renderLabels} languages={languages} change={change} dispatch={dispatch} urlFlagObj={driveUrlflages} error={setError} />

                    </Grid>

                    <Grid item xs={6} sm={6} md={6} className={classes.item}>
                        <Field name='author' label={I18n.t('author')} type='text' component={renderTextField} />
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} className={classes.item}>
                        <Field name='sort' label={I18n.t('sort_order')} type='number' component={renderTextField} />
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} className={classes.item}>
                        <Field name='roles' label={I18n.t('roles')} option={fullRole} component={reactMultiSelect} />
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} className={classes.item}>
                        <Field name='usergroups' label={I18n.t('user_groups')} option={fullUserGroup} component={reactMultiSelect} />
                    </Grid>
                    <Grid item xs={12} className={classes.item}>
                        <Field name='fileUpload'
                            accept={[MIME_TYPES.PNG, MIME_TYPES.JPEG, MIME_TYPES.JPG]}
                            id='code' imgURL={imageUrl} label={I18n.t('file_upload')}
                            type='file' component={UploadFile}
                            onChange={(e) => handleFileUpload(e)}
                            width={IMAGE_UPLOAD.WIDTH} height={IMAGE_UPLOAD.HEIGHT}
                        />
                        {upImg && <ImageCropAndCompress img={upImg} width={IMAGE_UPLOAD.WIDTH} height={IMAGE_UPLOAD.HEIGHT} setUploadImageUrl={setImageUrl} setUploadImage={setImageFile} />}
                    </Grid>

                    <Grid item xs={12} className={classes.item}>

                        {
                            error ? <div style={{ color: 'red' }}>{error}</div> : <small></small>
                        }
                    </Grid>

                    <Grid item xs={12} className={classes.submit} >

                        <Button type="submit" >{I18n.t('submit')}</Button>
                        {
                            formError ? <small style={{ color: 'red' }}>{formError}</small> : <small></small>
                        }
                    </Grid>
                </Grid>
            </Form>
        </CardComponent>
    );
}
export default
    connect(state => ({
        initialValues: state[STATE_REDUCER_KEY]?.fetchNewsById?.data
    }))(reduxForm({
        form: 'createNews',
        enableReinitialize: true,
        validate: createNewsValidation

    })(CreateNews));
