import React, { useEffect } from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';

import Button from './PrimaryButton';
import LoadingOverlay from './LoadingOverlay';
import Colors from './Colors.js';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const styles = {
    content: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    }
};

const CustomDialog = (props) => {
    const { disableOk = false, requestInProgress = false, okText = 'ok', cancelText = 'cancel', onCancel, onOk, isOPen = false, title = 'Dialog Title', body = <div>Welcome</div> } = props;
    const descriptionElementRef = React.useRef(null);

    useEffect(() => {
        if (isOPen) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [isOPen]);

    return (
        <Dialog
            open={isOPen}
            onClose={onCancel}
            scroll='paper'
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            TransitionComponent={Transition}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle id="scroll-dialog-title" style={{ backgroundColor: Colors['color-basic-800'] }}> <Typography style={{ color: 'white', fontWeight: 800 }} >{title}</Typography></DialogTitle>
            <DialogContent dividers={true}>
                <DialogContentText
                    id="scroll-dialog-description"
                    ref={descriptionElementRef}
                    style={styles.content}
                >
                    <LoadingOverlay active={requestInProgress}>
                        {body}
                    </LoadingOverlay>
                </DialogContentText>
            </DialogContent>
            <DialogActions style={styles.content}>
                {onCancel && <Button onClick={onCancel}>
                    {cancelText}
                </Button>}
                {onOk && !requestInProgress &&
                    <Button onClick={onOk} autoFocus disabled={disableOk}>
                        {okText}
                    </Button>
                }
            </DialogActions>
        </Dialog >
    );
};

export default CustomDialog;
