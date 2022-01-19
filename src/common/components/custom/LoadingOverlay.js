import React from 'react';
import LoadingOverlay from 'react-loading-overlay';
import { themeColors } from '../../theme';
import { GridLoader, PulseLoader } from 'react-spinners';

const { themePrimaryColor } = themeColors;
const LoadingCustomOverlay = ({ active, children, spinnerProps }) => {
    let loader = <GridLoader color={themePrimaryColor} />;

    switch (spinnerProps) {
        case 'selectTagProp':
            loader = <PulseLoader color={themePrimaryColor} />;
            break;
        default:
            loader = <GridLoader color={themePrimaryColor} />;
            break;
    }

    return <LoadingOverlay
        active={active}
        styles={{
            overlay: (base) => ({
                ...base,
                background: 'transparent'
            })
        }}

        spinner={loader}
    >
        {children}
    </LoadingOverlay>;

};
export default LoadingCustomOverlay;
