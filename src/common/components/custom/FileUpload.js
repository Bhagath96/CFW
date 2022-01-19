import React, { useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch } from 'react-redux';
import { I18n } from '../../components';
import { showNotification } from '../../../modules/common/actions';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CancelIcon from '@material-ui/icons/Cancel';

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
};

const activeStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
};

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
};

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
};

const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
};


const FileUpload = (props) => {
    const [files, setFiles] = React.useState([]);
    const [thumbs, setThumbs] = React.useState([]);
    const dispatch = useDispatch();
    const { accept = 'image/*', maxFiles = 2, minFiles = 0, multiple = false } = props;
    const customValidator = (file) => {
        if (file.name.length > 100) { // sample Code for Validation
            dispatch(showNotification({ code: 'name-too-large', message: 'Name is larger than 10 characters', type: 'error' }));
            return {
                code: 'name-too-large',
                message: 'Name is larger than 10 characters'
            };
        }
        return null;
    };

    const {
        acceptedFiles,
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone(
        {
            multiple,
            accept,
            validator: customValidator,
            maxFiles,
            onDrop: currentAcceptedFiles => {
                setFiles([
                    ...files,
                    ...currentAcceptedFiles.map(file =>
                        Object.assign(file, {
                            preview: URL.createObjectURL(file)
                        })
                    )
                ]);
            },
            minFiles
        }
    );


    const removeFile = (file) => {
        let newFiles = files;
        acceptedFiles.splice(acceptedFiles.indexOf(file), 1);
        newFiles.splice(newFiles.indexOf(file), 1);
        setFiles(newFiles);
        // eslint-disable-next-line no-use-before-define
        setThumbs(getThumbs(newFiles));
    };

    const getThumbs = (selectedFiles) => selectedFiles.map((file, i) => (
        <div key={i} style={{ display: 'inline-flex', flexDirection: 'column' }}>
            <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={() => removeFile(file)}
            >
                <CancelIcon />
            </IconButton>
            <div style={thumb} key={file.name}>
                <div style={thumbInner}>
                    <img src={file.preview} style={img} />
                </div>
            </div>
        </div >
    ));

    React.useEffect(() => {
        setThumbs(getThumbs(files));
    }, [files]);

    React.useEffect(
        () => () => {
            // Make sure to revoke the data uris to avoid memory leaks
            files.forEach(file => URL.revokeObjectURL(file.preview));
        },
        [files]
    );

    // const accepted = acceptedFiles.map(file => (
    //     <li key={file.path}>
    //         {file.path} - {file.size} bytes
    //     </li>
    // ));

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isDragActive,
        isDragReject,
        isDragAccept
    ]);


    // const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
    const message = isDragActive ?
        <p>{I18n.t('drop_files_here')}</p> :
        <p>{I18n.t('drag_and_drop_or_click_here')}</p>;

    return (
        <div className="container">
            <div {...getRootProps({ style })}>
                <input {...getInputProps()} />
                {message}
            </div>
            <aside style={thumbsContainer}>
                {thumbs}
            </aside>
            <Grid item xs={12} >
                <Button onClick={() => {
                    props.onUpload && props.onUpload(files);
                }}>{props.okLabel || 'ok'}</Button>
            </Grid>
        </div>
    );
};

export default FileUpload;
