import React, { useEffect } from 'react';
import { Field, Form, FormSection, FieldArray } from 'redux-form';
import { renderTextField, renderSimpleSelect, renderSelect } from '../../../utils/FormUtils';
import { Components, I18n, makeStyles, Icons } from '../../../common/components';
import _ from '../../../utils/LodashUtils';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../actions';
import LoadingOverlay from '../../../common/components/custom/LoadingOverlay.js';
import { renderCard, liteBoxShadow } from '../../../assets/css/bhoom';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import { withStyles } from '@material-ui/core/styles';
import * as CommonConstants from '../../../modules/common/constants';
// import { organizationTypeChecking } from '../../../utils/ApiUtils';

const { Grid, Button, CardComponent, Card, CardHeader, IconButton, CardContent, Typography, Colors } = Components;

const { AddBoxTwoTone, DeleteForeverIcon, ExpandMoreIcon } = Icons;

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    item: {
        padding: theme.spacing(1)
    },
    submit: {
        textAlign: 'center'
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

const renderLabels = ({ fields,
    change, languages, title = 'Label' }) => {
    fields.length < 1 && fields.push({});
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
                                        <Typography>{`${title} ${index + 1}`}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid item xs={1} sm={1} md={1} >
                                    <IconButton aria-label="Options" onClick={() => fields.remove(index)}>
                                        <DeleteForeverIcon />
                                    </IconButton>
                                </Grid>
                            </AccordionSummary>
                            <Grid container spacing={2} key={index} style={renderCard.gridCenter}>
                                <Grid item xs={6} >
                                    <Field name={`${member}.langId`} label={I18n.t('language')} component={renderSimpleSelect} onChange={(value) =>
                                        change(`${member}.langId`, value.target.value)} >
                                        {
                                            _.get(languages, 'data', [])
                                        }
                                    </Field>
                                </Grid>
                                <Grid item xs={6} >
                                    <Field name={`${member}.label`} label={I18n.t('label')} component={renderTextField} />
                                </Grid>
                            </Grid>
                        </Accordion>
                    </Card>
                ))}
            </CardContent>
        </Card >

    );
};


export const AddOrganizationView = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { id = null } = useParams();
    useEffect(() => {
        dispatch(Actions.loadStates());
        dispatch(Actions.loadLSGITypes());
        if (id) {
            // let organizationType = organizationTypeChecking(id);
            // if (!organizationType) {
            dispatch(Actions.fetchOrganizationDetails(id));
            // }
        }
        return () => {
            dispatch(Actions.clearOrgDetails());
        };
    }, []);


    const { change, handleSubmit, organization: {
        // parentOrganizations = {},
        organizationTypes = {},
        state = {},
        district = {},
        blockPanchayath = {},
        // districtPanchayath = {},
        lsgi = {},
        lsgiTypes = {},
        addOrUpdateOrganization = {}
    }
    } = props;
    const { allLanguages: languages } = useSelector(languageState => languageState[CommonConstants.STATE_REDUCER_KEY]);
    const formData = useSelector(states => _.get(states, 'form.AddOrganizationForm.values.organization', {}));
    const LSGI_TYPE_PANCHAYATH_ID = _.find(lsgiTypes.data, ['name', 'Panchayath'])?.id;
    const districtId = _.get(formData, 'district.id', '');

    const submit = (values) => {
        dispatch(Actions.saveOrganization({ ..._.get(values, 'organization', {}), organizationId: id }));
    };
    return (
        <CardComponent>
            <div>
                <Form onSubmit={handleSubmit(submit)}>

                    <LoadingOverlay active={addOrUpdateOrganization.requestInProgress}>
                        <FormSection name="organization">
                            <Grid container className={classes.item}>
                                <Grid item xs={4} sm={4} md={4} className={classes.item}>
                                    <Field name="code" label={I18n.t('organization_code')} component={renderTextField} />
                                </Grid>
                                <Grid item xs={8} sm={8} md={8} className={classes.item}>
                                    <Field name="name" label={I18n.t('organization_name')} component={renderTextField} />
                                </Grid>
                                <Grid item style={liteBoxShadow} xs={12} sm={12} md={12} >
                                    <FieldArray name='labels' component={renderLabels} languages={languages} change={change} title={I18n.t('label')} />
                                </Grid>
                                {/* <Grid item xs={12} sm={12} md={12} className={classes.item}>
                                    <Field name="parentOrganization" label={I18n.t('parent_organization')} component={renderSimpleSelect} onChange={(value) =>
                                        change('organization.parentOrganization', value)} >
                                        {
                                            _.get(parentOrganizations, 'data', [])
                                        }
                                    </Field>
                                </Grid> */}

                                <Grid item xs={12} sm={12} md={12} className={classes.item}>
                                    <Field name="organizationType" label={I18n.t('organization_type')} component={renderSimpleSelect} onChange={(event, index, value) => {
                                        change('organization.organizationType', value);
                                    }
                                    }>
                                        {
                                            _.get(organizationTypes, 'data', [])
                                        }
                                    </Field>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} className={classes.item}>
                                    <Field name="state" label={I18n.t('state')} component={renderSelect} onChange={(value) => {
                                        dispatch(Actions.loadDistricts(value.id));
                                        change('organization.state', value);
                                        change('organization.district', null);
                                        change('organization.lsgi', null);

                                    }}>
                                        {
                                            _.get(state, 'data', [])
                                        }
                                    </Field>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} className={classes.item}>
                                    <Field name="district" label={I18n.t('district')} component={renderSelect} onChange={(value) => {
                                        change('organization.district', value);
                                        change('organization.lsgi', null);
                                    }} >
                                        {
                                            _.get(district, 'data', [])
                                        }
                                    </Field>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} className={classes.item}>
                                    <Field name="lsgiType" label={I18n.t('lsgi_type')} component={renderSelect} onChange={(value) => {
                                        change('organization.lsgiType', value);
                                        const lsgiTypeId = value.id;
                                        dispatch(Actions.loadLSGI({ districtId, lsgiTypeId }));
                                    }}>
                                        {
                                            _.get(lsgiTypes, 'data', [])
                                        }
                                    </Field>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} className={classes.item}>
                                    <Field name="lsgi" label={I18n.t('lsgi')} component={renderSelect} onChange={(value) =>
                                        change('organization.lsgi', value)}
                                    >
                                        {
                                            _.get(lsgi, 'data', [])
                                        }
                                    </Field>
                                </Grid>
                                {_.get(formData, 'lsgiType.id', null) === LSGI_TYPE_PANCHAYATH_ID && < Grid item xs={12} sm={12} md={12} className={classes.item}>
                                    <Field name="blockPanchayath" label={I18n.t('block_panchayath')} component={renderSelect} onChange={(value) =>
                                        change('organization.blockPanchayath', value)} >
                                        {
                                            _.get(blockPanchayath, 'data', [])
                                        }
                                    </Field>
                                </Grid>}

                                <Grid item xs={4} sm={4} md={4} className={classes.item}>
                                    <Field name="sort" label={I18n.t('sort_order')} component={renderTextField} />
                                </Grid>
                            </Grid>
                        </FormSection>

                        <Grid item xs={12} sm={12} md={12} className={classes.submit}>
                            <Button type="submit">{id !== null ? I18n.t('update') : I18n.t('submit')}</Button>
                        </Grid>
                    </LoadingOverlay>
                </Form >
            </div>
        </CardComponent >
    );
};

export default AddOrganizationView;
