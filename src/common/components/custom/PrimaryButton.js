import React from 'react';
import { makeStyles } from '..';
import MuiComponents from '../material-ui/MuiComponents';
const { Button } = MuiComponents;

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(3, 0, 2)
        // width: "100%"
    }
}
));

function PrimaryButton({ children, type = 'button', color = 'primary', disabled = false, ...props }) {
    const style = useStyles();
    return (
        <div>
            <Button type={type} variant="contained" color={color} className={style.root} disabled={disabled} {...props}>{children}</Button>
        </div>
    );
}

export default PrimaryButton;
