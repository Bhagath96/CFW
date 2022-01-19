import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { I18n } from '..';
import Slide from '@material-ui/core/Slide';

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

const AlertDialog = (props) => {
  const { onOk, onCancel, icon, isOPen = false, title = '', content = '', okText = I18n.t('ok'), cancelText = I18n.t('cancel') } = props;

  return (
    <div>
      <Dialog
        open={isOPen}
        onClose={onCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        TransitionComponent={Transition}
        maxWidth='lg'
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" style={styles.content}>
            {icon && <> {icon} &nbsp;</>}{content}
          </DialogContentText>
        </DialogContent>
        <DialogActions style={styles.content}>
          {onCancel && <Button onClick={onCancel}>
            {cancelText}
          </Button>}
          {onOk &&
            <Button onClick={onOk} autoFocus>
              {okText}
            </Button>
          }
        </DialogActions>
      </Dialog>
    </div >
  );
};

export default AlertDialog;
