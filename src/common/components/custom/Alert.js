import React from 'react';
import Alert from '@material-ui/lab/Alert';

const customAlert = (props) => {
    let { title = 'No Records Found!', type = 'warning', icon = undefined } = props;

    return <Alert variant="outlined" severity={type} icon={icon !== undefined ? icon : ''} style={{
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column'
    }}>
        {title}
    </Alert >;
};

export default customAlert;
