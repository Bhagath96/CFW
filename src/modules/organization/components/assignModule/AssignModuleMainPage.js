import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles, Components, I18n } from '../../../../common/components';
import AssignModulesView from '../assignModule/AssignModulesView.js';
import ModuleRoleMapping from '../assignModule/moduleRoleMapping.js';
import * as Actions from '../../actions';
import Colors from '../../../../common/components/custom/Colors';


const { Box, Typography, Tab, Tabs } = Components;

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 5,
        display: 'flex'
    },
    tabs: {
        backgroundColor: Colors['theme-primary-color'],
        // color: 'black',
        borderRight: `1px solid ${theme.palette.divider}`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    MuiTabTextColorInherit: {
        color: 'black',
        opacity: '0.7'

    }
}));

function AssignModuleMainPage() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const dispatch = useDispatch();

    const handleChange = (event, newValue) => {

        dispatch(Actions.clearCheckListInReducer());
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <Tabs value={value} onChange={handleChange} aria-label="Vertical tabs example" orientation='vertical' style={{ width: '19%', display: 'flex', flexDirection: 'column', alignItems: 'center' }} className={classes.tabs}>
                <Tab label={I18n.t('module')} {...a11yProps(0)} />
                <Tab label={I18n.t('assign_roles')} {...a11yProps(1)} />

            </Tabs>
            <TabPanel value={value} index={0} style={{ width: '100%' }}>
                <AssignModulesView />
            </TabPanel>
            <TabPanel value={value} index={1} style={{ width: '100%' }}>
                <ModuleRoleMapping />
            </TabPanel>

        </div>

    );
}

export default AssignModuleMainPage;

