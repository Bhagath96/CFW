import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector, connect } from 'react-redux';
import { Field, Form, FormSection, reduxForm } from 'redux-form';
import { Components, makeStyles, I18n } from '../../../../common/components';
import { STATE_REDUCER_KEY } from '../../constants';
import _ from '../../../../utils/LodashUtils';
import { renderSimpleSelect } from '../../../../utils/FormUtils';
import * as Actions from '../../actions';
import LoadingOverlay from '../../../../common/components/custom/LoadingOverlay.js';
import { getEmptyPicky } from '../../../../utils/CommonUtils';

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
export const moduleRoleMapping = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const moduleAssignList = useSelector(state => _.get(state, STATE_REDUCER_KEY, {}));
    const { roleList, roleAssignModuleList = [], roleAssignModulesView: { moduleMapping = {} } = {}, saveRoleAssignModuleList } = moduleAssignList;
    // let roleListData = _.get(roleList, 'data.content', []);

    const { id } = useParams();

    // let roleTypeId = 2;
    useEffect(() => {
        dispatch(Actions.fetchRolesforListBox());
        return () => {
            dispatch(Actions.setRoleAndUser({ type: 'Roles', data: getEmptyPicky() }));
        };
    }, []);

    const submit = async (values) => {
        await dispatch(Actions.saveAssignedModulesinOrgChk({ ...values, organizationId: id }));
        await dispatch(Actions.fetchAssignedModulesforChk({ orgID: id, roleId: values.Roles }));
    };

    return (
        <LoadingOverlay active={roleAssignModuleList.requestInProgress || roleList.requestInProgress || saveRoleAssignModuleList.requestInProgress}>
            <Grid container>
                <Grid item xs={12} sm={12} md={12} className={classes.item}>

                    <Field name="Roles" label={I18n.t('roles')} component={renderSimpleSelect} onChange={(value) => {
                        props.change('Roles', value.target.value);
                        props.change('moduleMapping', moduleMapping);
                        // dispatch(Actions.setRoleAndUser({ type: 'Roles', data: value.target.value }));
                        dispatch(Actions.fetchAssignedModulesforChk({ orgID: id, roleId: value.target.value }));
                    }}>
                        {
                            _.get(roleList, 'data', [])
                        }
                    </Field>
                </Grid>
            </Grid>
            <Form onSubmit={props.handleSubmit(submit)}>
                {Object.keys(moduleMapping).length > 0 ?
                    < FormSection name="moduleMapping">
                        <Grid container >
                            {renderCheckBoxes(_.get(roleAssignModuleList, 'data', []))}
                        </Grid>
                    </FormSection> : null
                }

                <Grid item xs={12} sm={12} md={12} className={classes.submit}>
                    <Button type="submit">{I18n.t('submit')}</Button>
                </Grid>
            </Form >
        </LoadingOverlay>
    );
};

export default connect(state => ({
    initialValues: state[STATE_REDUCER_KEY].roleAssignModulesView
}))(reduxForm({
    form: 'moduleRoleMapping',
    enableReinitialize: true
})(moduleRoleMapping));
