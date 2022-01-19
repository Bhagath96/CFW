import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

import { Components, I18n } from '../common/components';
const { Box, Typography, Tab } = Components;

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

export const findTabIndex = (array = [], name) => {
    let index = _.findIndex(array, (item) => {
        return item.name === name;
    });
    return index;
};

export const getTabDetails = (array = [], setTabFn, selected) => {
    let tabs = [], tabPanels = [];
    array?.map((item, index) => {
        tabs.push(<Tab key={index} label={I18n.t(item.label)} onClick={() => setTabFn(item.name)} />);
        tabPanels.push(<TabPanel key={index} value={selected} index={index}>
            {item.component}
        </TabPanel>);
    });
    return { tabs, tabPanels };

};
