import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Components, I18n } from '../../../common/components';
import NotificationApiProvider from './NotificationApiProvider';
import { useDispatch } from 'react-redux';
import { loadAPIProviders } from '../actions';
const { Box, Typography, Tab, Tabs } = Components;
// import { organizationTypeChecking } from '../../../utils/ApiUtils';
// import { useHistory, useParams } from 'react-router-dom';
// import { PATH } from '../../../routes';

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
        // backgroundColor: 'green',
        // color: 'black',
        borderRight: `1px solid ${theme.palette.divider}`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    MuiTabTextColorInherit: {
        // color: 'black',
        // opacity: '0.7'

    }
}));

function ApiProviderNewView() {
    // const history = useHistory();
    const classes = useStyles();
    // const { id } = useParams();
    const [value, setValue] = React.useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadAPIProviders());
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <Tabs value={value} onChange={handleChange} aria-label="Vertical tabs example" orientation='vertical' style={{ width: '20%', display: 'flex', flexDirection: 'column', alignItems: 'center' }} className={classes.tabs}>
                <Tab label={I18n.t('notifications')} {...a11yProps(0)} />
                {/* <Tab label={I18n.t('email')} {...a11yProps(1)} />
                <Tab label={I18n.t('payment_gateway')} {...a11yProps(2)} /> */}

            </Tabs>
            <TabPanel value={value} index={0}>
                <NotificationApiProvider />
            </TabPanel>
            {/* <TabPanel value={value} index={1}>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <PaymentGateWay />
            </TabPanel> */}

        </div>

    );
}

export default ApiProviderNewView;

