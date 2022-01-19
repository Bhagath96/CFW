import React, { forwardRef } from 'react';
import { NavLink } from 'react-router-dom';
import { Components } from '../common/components';

const { ListItem } = Components;

const AppMenuItemComponent = props => {
    const { className, onClick, link, children } = props;

    // If link is not set return the orinary ListItem
    if (!link || typeof link !== 'string') {
        return (
            <ListItem
                button
                className={className}
                onClick={onClick}
                style={{ padding: '8px 5px !important' }}
            >
                {children}
            </ListItem>
        );
    }

    // Return a LitItem with a link component
    return (
        <ListItem
            button
            className={className}
            style={{ padding: '8px 5px !important' }}
            component={forwardRef((currentProps, ref) => <NavLink exact {...currentProps} innerRef={ref} />)}
            to={link}
        >
            {children}
        </ListItem>
    );
};

export default AppMenuItemComponent;
