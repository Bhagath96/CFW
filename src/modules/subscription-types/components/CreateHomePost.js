import React, { useEffect, useState } from 'react';
import { Field, Form, reduxForm, FieldArray } from 'redux-form';
import { useParams } from 'react-router-dom';
import { renderTextField, renderSimpleSelect, renderTextAreaField, reactMultiSelect, UploadFile } from '../../../utils/FormUtils';
import { useDispatch, useSelector, connect } from 'react-redux';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import { renderCard } from '../../../assets/css/bhoom';
import { makeStyles, Components, Icons } from '../../../common/components';
import { withStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import { IMAGE_UPLOAD, STATE_REDUCER_KEY } from '../constant';
import _ from 'lodash';
import * as CommonAction from '../../common/actions';
import * as CommonConstants from '../../common';
import * as Actions from '../actions';
import { I18n } from '../../../common/components';
import { homePostValidation, asyncHomePostValidation } from '../validations';
import { RESPONSE_TYPE } from '../../../common/constants';
import ImageCropAndCompress from '../../../common/components/custom/ImageCropAndCompress';
import { MIME_TYPES } from '../../common/constants';


const { AddBoxTwoTone, DeleteForeverIcon } = Icons;

const { Grid, Button, CardComponent, IconButton, CardHeader, CardContent, Card, Colors, Switch } = Components;


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
    switchItem: {
        display: 'flex',
        alignItems: 'center'
    },
    label: {
        cursor: 'pointer'
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
    change, languages, title = I18n.t('label') }) => {
    fields.length < 1 && fields.push({});

    return (
        <Card style={renderCard.options} >
            <CardHeader
                action={
                    <IconButton className='addButton' aria-label="Options" onClick={() => {
                        fields.push({});
                    }}>
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
                                    <Field name={`${member}.title`} label={I18n.t('title')} component={renderTextField} />
                                </Grid>

                                <Grid item xs={11} >
                                    <Field name={`${member}.body`} label={I18n.t('body')} component={renderTextAreaField} />
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

function CreateHomePost(props) {
    const { id, postId } = useParams();
    const dispatch = useDispatch();
    const { allLanguages: languages } = useSelector(state => state[CommonConstants.STATE_REDUCER_KEY]);

    const { change } = props;
    const classes = useStyles();
    const { handleSubmit } = props;
    const [checked, setChecked] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [upImg, setUpImg] = useState();
    const {
        listOrganisationRoles: { dropdown: dropdownRole = [{}], dropdownAll: dropdownRoleAll = [] },
        listUserGroups: { dropdown: dropdownUserGroup, dropdownAll: dropdownUserGroupAll },
        fetchHomePostById: { data } } = useSelector(state => state[STATE_REDUCER_KEY]);

    useEffect(() => {
        dispatch(Actions.listOrganizationRoles({ id, ...RESPONSE_TYPE.DROP_DOWN }));
        dispatch(Actions.listUserGroups({ id, ...RESPONSE_TYPE.DROP_DOWN }));
        dispatch(Actions.listOrganizationRoles({ id, ...RESPONSE_TYPE.DROP_DOWN, full: true }));
        dispatch(Actions.listUserGroups({ id, ...RESPONSE_TYPE.DROP_DOWN, full: true }));
        if (id && postId !== 'create') {
            dispatch(Actions.fetchHomePostById({ id, postId }));
        }
    }, [id]);

    useEffect(() => {

        dispatch(CommonAction.getAllLanguages());
        setImageUrl(null);
        return () => {
            dispatch(Actions.clearHomePostReducer());
            dispatch(Actions.clearDefaultReducer());
        };

    }, []);

    useEffect(() => {
        if (postId === 'create') {
            change('roles', dropdownRole);
            change('usergroups', dropdownUserGroup);
        }
    }, [dropdownRole.length > 0 || dropdownUserGroup.length > 0]);
    useEffect(() => {
        if (data?.photo) {
            setChecked(false);
            setImageUrl(data.photo);
        } else {
            setChecked(true);
        }
    }, [data?.photo]);
    const submit = (values) => {

        let formData = new FormData();
        formData.append('file', imageFile);

        let normalData = {
            ...values,
            usergroups: values?.usergroups.map(obj => obj.id),
            roles: values?.roles.map(obj => obj?.pk ? obj.pk : obj.id)
        };
        const isNormalData = values?.youtubeId?.length > 1 ? true : false;
        !isNormalData && delete normalData.youtubeId;
        delete normalData.photo;
        delete normalData?.id;
        formData.append('topicPostRequest', new Blob([JSON.stringify(normalData)], {
            type: 'application/json'
        }));
        if (!isNaN(postId)) {
            dispatch(Actions.updatesHomePostData({ id, postId, formData }));
        } else {
            dispatch(Actions.saveHomePostData({ id, formData }));
        }
    };
    const handleFileUpload = (event) => {
        const files = event.target.files[0];
        const reader = new FileReader();
        reader.addEventListener('load', () => setUpImg({ fileName: files.name, url: reader.result }));
        reader.readAsDataURL(event.target.files[0]);
        change('youtubeId', null);
    };

    return (
        <CardComponent>
            <Form onSubmit={handleSubmit(submit)} autoComplete='off'>
                <Grid container>
                    <Grid item xs={6} sm={6} md={3} className={classes.switchItem}>
                        <Typography className={classes.label} onClick={() => {
                            setChecked(false);
                        }}>{I18n.t('picture')}</Typography>
                        <div onClick={() => {
                            setChecked(!checked);
                        }}>
                            <Switch checked={checked} />
                        </div>
                        <Typography className={classes.label} onClick={() => {
                            setChecked(true);
                        }}>{I18n.t('youtube_url')}</Typography>
                    </Grid>

                    {checked ? <Grid item xs={6} sm={6} md={9} className={classes.item}>

                        <Field name='youtubeId' label={I18n.t('youtube_url')} type='text' onChange={() => {
                            setImageFile(null);
                            change('photo', null);
                        }} component={renderTextField} />
                    </Grid> :
                        <Grid item xs={6} sm={6} md={9} className={classes.item}>
                            <Field width={IMAGE_UPLOAD.WIDTH} height={IMAGE_UPLOAD.HEIGHT} name='photo' accept={[MIME_TYPES.PNG, MIME_TYPES.JPEG, MIME_TYPES.JPG]} imgURL={imageUrl} label={I18n.t('picture')} component={UploadFile} onChange={handleFileUpload} />
                            {upImg && <ImageCropAndCompress img={upImg} width={IMAGE_UPLOAD.WIDTH} height={IMAGE_UPLOAD.HEIGHT} setUploadImageUrl={setImageUrl} setUploadImage={setImageFile} />}
                        </Grid>
                    }

                    <Grid item xs={6} sm={6} md={6} className={classes.item}>
                        <Field name='roles' label={I18n.t('roles')} type='text' option={_.unionBy(dropdownRole, dropdownRoleAll, 'name')} component={reactMultiSelect} />
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} className={classes.item}>
                        <Field name='usergroups' label={I18n.t('user_groups')} type='text' option={dropdownUserGroupAll} component={reactMultiSelect} />
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} className={classes.item}>
                        <Field name='sort' label={I18n.t('sort')} type='number' component={renderTextField} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} >
                        <FieldArray name='labels' component={renderLabels} languages={languages} change={change} />
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
        initialValues: state[STATE_REDUCER_KEY].fetchHomePostById.data
    }))(reduxForm({
        form: 'CreateHomePost',
        enableReinitialize: true,
        validate: homePostValidation,
        asyncValidate: asyncHomePostValidation,
        asyncChangeFields: ['youtubeId']
    })(CreateHomePost));

