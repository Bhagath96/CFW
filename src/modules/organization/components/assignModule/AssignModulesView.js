import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector, connect } from 'react-redux';
import { Field, Form, FormSection, reduxForm } from 'redux-form';
import { Components, makeStyles, I18n } from '../../../../common/components';
import { STATE_REDUCER_KEY } from '../../constants';
import _ from '../../../../utils/LodashUtils';
import * as Actions from '../../actions';
import LoadingOverlay from '../../../../common/components/custom/LoadingOverlay.js';

const { Grid, Button } = Components;

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
export const AssignModulesView = (props) => {
    const renderCheckBoxes = (list) => {
        let data = list.map((item) => {
            return <Grid key={item.id} item xs={4} sm={4} md={4}>
                <Field
                    component="input"
                    name={item.id}
                    type="checkbox" />
                <span>{item.name}</span>
            </Grid>;
        });

        return data;
    };
    const classes = useStyles();
    const dispatch = useDispatch();
    const moduleAssignList = useSelector(state => _.get(state, STATE_REDUCER_KEY, {}));
    const { assignModuleList, saveModuleList } = moduleAssignList;
    const { id } = useParams();


    useEffect(() => {
        dispatch(Actions.fetchModulesforChk(id));
    }, []);

    const submit = (values) => {
        dispatch(Actions.saveModulesinOrgChk({ ...values, organizationId: id }));
    };

    return (
        <Form onSubmit={props.handleSubmit(submit)}>
            <LoadingOverlay active={assignModuleList.requestInProgress || saveModuleList.requestInProgress}>
                <FormSection name="formData">
                    <Grid container >
                        {renderCheckBoxes(_.get(assignModuleList, 'data', []))}
                    </Grid>
                </FormSection>
                <Grid item xs={12} sm={12} md={12} className={classes.submit}>
                    <Button type="submit">{I18n.t('submit')}</Button>
                </Grid>
            </LoadingOverlay>
        </Form >
    );
};

export default connect(state => ({
    initialValues: state[STATE_REDUCER_KEY].assignModulesView
}))(reduxForm({
    form: 'AssignModulesView',
    enableReinitialize: true
})(AssignModulesView));
