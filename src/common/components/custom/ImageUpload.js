import React, { useEffect, useState } from 'react';
import { Input, Button, Grid, withStyles } from '@material-ui/core';
import { I18n } from '..';
import Swal from 'sweetalert2';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import _ from 'lodash';
import Colors from './Colors';
const CustomButton = withStyles({
    root: {
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: Colors['color-basic-700'],
        minWidth: '200px',
        padding: '10px',
        borderRadius: '50px',
        justifyContent: 'space-evenly',
        '&:hover': {
            backgroundColor: Colors['color-basic-800']
        }
    },
    label: {
        '&:hover': {
            color: 'white'
        }
    }
})(Button);
const styles = {
    image: {
        marginBottom: '2%',
        objectFit: 'contain',
        maxHeight: '500px',
        maxWidth: '500px'
    },
    icon: {
        margin: '2%',
        objectFit: 'contain',
        maxHeight: '50px',
        maxWidth: '50px'
    }
};
const ImgaeUpload = (props) => {
    const { initialValues: { initialBase64 } = {}, accept = '.jpg', maxFileSize = 5, withoutMime = false, icon = false } = props;
    const [base64, setBase64] = useState(undefined);
    useEffect(() => {
        if (initialBase64) {
            if (_.startsWith(initialBase64, 'data:image/')) {
                setBase64(initialBase64);
            } else {
                setBase64('data:image/*;base64,' + initialBase64);
            }
        }
    }, [initialBase64]);

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const handleFileRead = async (file) => {
        let base64Str = '';
        if ((file.size || 0) > 0) {
            if (file.size / 1000 < maxFileSize) {
                base64Str = await convertBase64(file);
            } else {
                Swal.fire({
                    title: I18n.t('invalid_image_size'),
                    type: 'error',
                    text: I18n.t('maximum_allowed_size', { size: maxFileSize }),
                    width: 600
                });
            }
        }

        setBase64(base64Str);
        if (withoutMime) {
            let strImage = base64Str.replace(/^data:image\/[a-z]+;base64,/, '');
            props.onImageUpload && props.onImageUpload(strImage);
        } else {
            props.onImageUpload && props.onImageUpload(base64Str);
        }
    };
    return <Grid container style={{ width: '100%' }} alignItems='center' justify='center' direction='column'>
        {base64 && base64.length > 0 && <img style={icon ? styles.icon : styles.image} src={base64} />}
        <label>
            <Input
                type="file"
                style={{ display: 'none' }}
                inputProps={{ accept }}
                onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                        handleFileRead(file);
                    }
                }}
            />
            <CustomButton variant="contained" component="span">
                {I18n.t('upload_icon')}
                <AddPhotoAlternateIcon />
            </CustomButton>
        </label>
    </Grid>;
};

export default ImgaeUpload;
