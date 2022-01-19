import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Input, ListItemText, Checkbox, MenuItem, FormGroup, InputLabel, TextField, Typography, FormControl, Select, TextareaAutosize, withStyles, IconButton, Box } from '@material-ui/core';
import { Picky } from 'react-picky';
import styled from 'styled-components';
import LoadingOverlay from '../common/components/custom/LoadingOverlay';
import _ from '../utils/LodashUtils';
import { themeColors } from '../common/theme';
import InputAdornment from '@material-ui/core/InputAdornment';
import { I18n } from '../common/components';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { convertToLocal } from './DateUtils';
import ReactSelect from 'react-select';
import DatePicker from 'react-datepicker';

const MultiSelect = styled(Picky)`
  .picky__input{
    color: #8898aa;
    border: 0px solid #cad1d7;
    border-radius: 0.00rem;
import ReactSelect from 'react-select';
    height: calc(1.75rem + 1px);
    border-bottom-width: thin;
    border-bottom-color: black;
    
  }

  `;

const styles = {
    padding: {
        paddingLeft: '100px'
    },
    select: {
        padding: '0px 0 0px',
        // paddingRight: '500px',
        lineHeight: '1.42857',
        textDecoration: 'none',
        color: '#3C4858',
        letterSpacing: '0',
        '&:focus': {
            backgroundColor: 'transparent'
        },
        // '&[aria-owns] + input + svg': {
        //     transform: 'rotate(180deg)'
        // },
        '& + input + svg': {
            transition: 'all 300ms linear'
        }
    },
    selectLabel: {
        '& > div > ul': {
            border: '0',
            padding: '5px 0',
            margin: '0',
            boxShadow: 'none',
            textAlign: 'left',
            listStyle: 'none',
            backgroundColor: '#fff',
            backgroundClip: 'padding-box'
        },
        '& $selectPaper $selectMenuItemSelectedMultiple': {
            backgroundColor: 'inherit'
        },
        '& > div + div': {
            maxHeight: '266px !important'
        }
    },
    selectMenuItemSelected: {
        backgroundColor: '#FFF' + '!important',
        color: '#fafafa'
    },
    selectFormControl: {
        margin: '7px 0 17px 0 !important',
        '& > div': {
            '&:before': {
                borderBottomWidth: '1px !important',
                borderBottomColor: '#808080' + '!important'
            },
            '&:after': {
                borderBottomColor: '#9c27b0' + '!important'
            }
        }
    },
    selectMenuItem: {
        fontSize: '13px',
        padding: '10px 20px',
        margin: '0 5px',
        borderRadius: '2px',
        transition: 'all 150ms linear',
        display: 'block',
        clear: 'both',
        font: 'caption',
        fontWeight: '400',
        lineHeight: '2',
        whiteSpace: 'nowrap',
        color: '#333',
        paddingRight: '30px',
        '&:hover': {
            backgroundColor: '9c27b0',
            color: '#FFF'
        }
    },
    uploadButton: {
        backgroundColor: '#3C4858',
        color: 'white',
        padding: '0.5rem',
        borderRadius: '0.3rem',
        cursor: 'pointer'
    },
    uploadDescription: {
        margin: '10px 0',
        color: '#a2a2a2',
        fontSize: '0.75rem'
    }
};
const WhiteTextField = withStyles({
    root: {
        '& .MuiInputBase-input': {
            color: 'black' // Text color
        },
        '& .MuiInput-underline:before': {
            borderBottomColor: 'black' // Semi-transparent underline
        },
        '& .MuiInput-underline:hover:before': {
            borderBottomColor: 'black' // Solid underline on hover
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'black' // Solid underline on focus
        },
        '& .MuiFormLabel-root': {
            color: '#a2a2a2'
        },
        '& .MuiFormLabel-root:after': {
            color: '#a2a2a2'
        }
    }
})(TextField);
export const validateForm = (schema, values) => {
    const { error } = schema.validate(values, { abortEarly: false });
    if (error) {
        let value = error.details.reduce((result, item) => {
            result[item.path[0]] = item.message;
            return result;
        }, {});
        return value;
    }
    return {};
};
export const asyncValidate = (schema) => {
    return async (values) => {
        return await schema
            .validate(values, { abortEarly: false })
            .then(() => { })
            .catch((errors) => {
                const formErrors = {};
                errors.inner.forEach((error) => {
                    _.set(formErrors, error.path, error.message);
                });
                throw formErrors;
            });
    };
};
const renderTextField = ({ input: { value, name, defaultValue = '', shrink = true, ...inputProps }, min = 0, type = 'text', disabled, label, placeholder = '', adornment = {}, meta: { touched, error, asyncValidating } }) => {
    const {
        isVisible: adornmentVisibility = false,
        position: adornmentPosition = 'end',
        areaLabel: adornmentAreaLabel = 'toggle_visibility',
        onClick: adornmentOnClick = () => { },
        onMouseDown: adornmentOnMouseDown = () => { },
        showIcon: adornmentShowIcon = <Visibility />,
        hideIcon: adornmentHideIcon = <VisibilityOff />,
        show: adornmentStatus = false
    } = adornment;

    let startAdornmentObj = {};
    if (adornmentVisibility) {
        startAdornmentObj[adornmentPosition === 'end' ? 'endAdornment' : 'startAdornment'] = <InputAdornment>
            <IconButton
                aria-label={I18n.t(adornmentAreaLabel)}
                onClick={adornmentOnClick}
                onMouseDown={adornmentOnMouseDown}
            >
                {adornmentStatus ? adornmentShowIcon : adornmentHideIcon}
            </IconButton>
        </InputAdornment>;
    }

    return <FormGroup>
        <WhiteTextField type={type}
            disabled={Boolean(disabled)}
            value={value && String(value)}
            name={name} id={name}
            placeholder={placeholder} label={label} fullWidth={true}
            InputProps={{
                inputProps: { min: min, ...startAdornmentObj }
            }}
            defaultValue={defaultValue}
            InputLabelProps={{
                shrink: shrink
            }}
            {...inputProps} />
        {touched && error && <Typography color="error" style={{
            margin: '0',
            fontSize: '0.75rem',
            marginTop: '3px',
            textAlign: 'left',
            fontFamily: 'Roboto',
            fontWeight: '400',
            lineHeight: '1.5',
            letterSpacing: '0.00938em'
        }} >{error}</Typography>}
        {asyncValidating && <div>loading...</div>}
    </FormGroup>;
};

// eslint-disable-next-line no-unused-vars
const UploadFile = ({ input: { value: omitValue, ...inputProps }, meta: { touched, error }, imgURL, accept, size = 200, maxSize = 2048, ...props }) => {
    let imagePath;
    if (imgURL) {
        imagePath = imgURL;
    } else {
        imagePath = omitValue;
    }
    let acceptedFiles = '';
    _.forEach(accept, item => {
        acceptedFiles += item.replace(/image\//i, '') + ', ';
    });
    acceptedFiles = acceptedFiles.toUpperCase().slice(0, acceptedFiles.length - 2) + '.';
    return (
        < Box style={{ borderStyle: 'ridge', width: 'fitContent', padding: '20px', display: 'flex' }}>
            <img style={{ maxWidth: '300px', paddingLeft: '25px', objectFit: 'contain' }} src={imagePath}></img>
            <div style={{ padding: '10px' }}>
                <label htmlFor="fileUploadButton" style={styles.uploadButton}>{I18n.t('choose_file')}</label>
                <Typography style={styles.uploadDescription}>{I18n.t('supported_formats', { types: acceptedFiles })}</Typography>
                <Typography style={styles.uploadDescription}>{I18n.t('dimensions_are', { size: `${props.width}*${props.height}` })}</Typography>
                <Typography style={styles.uploadDescription}>{I18n.t('upload_files_between', { size: size, maxSize: maxSize / 1024 })}</Typography>
            </div>
            <input type='file' accept={accept} {...inputProps} {...props} style={{ paddingLeft: '15px' }} id='fileUploadButton' hidden />
            {touched && error && <Typography color="error" variant="caption">{error}</Typography>}
        </Box >
    );
};

const renderTextAreaField = ({ input: { value, name, ...inputProps }, type = 'text', disabled, label, placeholder = '', meta: { touched, error } }) => (
    <FormGroup>
        {label && <div className='customPicky'> <InputLabel htmlFor={name}>{label}</InputLabel></div>}
        <TextareaAutosize type={type}
            rows={6}
            rowsMax={6}
            style={styles.selectLabel}
            disabled={Boolean(disabled)} value={value && String(value)} name={name} id={name} placeholder={placeholder} label={label} fullWidth={true} {...inputProps} />
        {touched && error && <Typography color="error" variant="caption">{error}</Typography>}
    </FormGroup>
);
const renderSelect = ({ input: { value, name, ...inputProps }, children, selectAll, selectAllText = 'Select All', filterable = true, multiple, label, disabled = false, placeholder = '', showLoader = false, spinnerProps = 'selectTagProp', meta: { touched, error } }) => (
    <LoadingOverlay active={showLoader} spinnerProps={spinnerProps}>
        <FormGroup>
            {label && <div className='customPicky'>
                <InputLabel htmlFor={name}>{label}</InputLabel>
            </div>}
            <MultiSelect
                value={multiple ? value || [] : value || null} {...inputProps}
                options={children}
                open={false}
                multiple={multiple}
                includeSelectAll={selectAll}
                selectAllText={selectAllText}
                includeFilter={filterable}
                labelKey='name'
                valueKey='id'
                placeholder={placeholder}
                dropdownHeight={150}
                disabled={disabled}
                className={disabled === true ? 'pickySelect grey' : null}
                numberDisplayed={1}
            />
            {touched && error && <Typography color="error" variant="caption">{error}</Typography>}
        </FormGroup>
    </LoadingOverlay>
);

const newStyles = () => ({
    underline: {
        color: themeColors.themeSecondaryColor,
        '&::after': {
            border: '0px solid black'
        }
    }
});

const SearchTextField = props => {
    const { classes, ...rest } = props;
    return (
        <TextField InputProps={{ classes: { underline: classes.underline } }} {...rest} placeholder='Search' />
    );
};

export default withStyles(newStyles)(SearchTextField);

const renderSimpleSelect = ({ input: { value, name, ...inputProps }, children = [], multiple, label, meta: { touched, error }, showLoader = false, spinnerProps = 'normal', disabled = false }) => {
    let dataType = typeof value === 'object';
    let selectedValue = multiple ? dataType ? value.id : value || [] : dataType ? value.id : value || '';
    return (
        <LoadingOverlay active={showLoader} spinnerProps={spinnerProps}>
            <FormControl style={styles.FormControl} fullWidth={true}>
                {label && <InputLabel htmlFor={name} style={styles.selectLabel}>{label}</InputLabel>}
                <Select style={styles.select}
                    value={selectedValue}
                    options={children}
                    disabled={disabled}
                    {...inputProps} >
                    <MenuItem value="">Select</MenuItem>
                    {
                        children.map(data => {
                            return (
                                <MenuItem style={styles.selectMenuItem}
                                    value={data?.id}
                                    key={data?.id}>
                                    {data.name}
                                </MenuItem>
                            );
                        })
                    }
                </Select>
                {touched && error && <Typography color="error" style={{ fontSize: '0.75rem' }} >{error}</Typography>}
            </FormControl >
        </LoadingOverlay >
    );
};

const getRenderedValue = (data = [], items = []) => {
    let selected = data.map(item => _.get(_.find(items, ['id', item]), 'name', ''));
    return selected.join(', ');
};

const renderMultiSelect = ({ input: { value, name, ...inputProps }, children = [], showCheckBox = true, label, meta: { touched, error } }) => {
    let selectedValue = value || [];
    return (
        <FormControl style={styles.FormControl} fullWidth={true}>
            {label && <InputLabel htmlFor={name} style={styles.selectLabel}>{label}</InputLabel>}
            <Select
                labelId={name}
                id={name}
                multiple
                value={selectedValue}
                {...inputProps}
                input={<Input />}
                renderValue={(selected) => getRenderedValue(selected, children)}
            >
                {children.map((data) => (
                    <MenuItem key={data.name} value={data.id}>
                        {showCheckBox && <Checkbox checked={selectedValue.indexOf(data.id) > -1} />}
                        <ListItemText primary={data.name} />
                    </MenuItem>
                ))}
            </Select>
            {touched && error && <Typography color="error" >{error}</Typography>}
        </FormControl >);
};
const reactMultiSelect = ({ input: { value, name, onBlur, ...inputProps }, option = [], label, meta: { touched, error }, multiple = true }) => {
    return (
        <FormControl style={styles.FormControl} fullWidth={true}>
            {label && <InputLabel htmlFor={name} style={{ transform: 'initial', position: 'sticky' }}>{label}</InputLabel>}
            < ReactSelect
                styles={{ marginTop: '10px' }}
                id={name}
                options={option}
                isMulti={multiple}
                value={multiple ? value || [] : value || null}
                onBlur={() => onBlur(value)}
                getOptionLabel={(o) => o.name}
                getOptionValue={(o) => o.id}
                {...inputProps}
            />
            {touched && error && <Typography color="error" style={{ fontSize: '0.75rem' }} >{error}</Typography>}
        </FormControl>
    );
};
//

const renderDateTimePicker = ({ input, meta: { touched, error } }) => {

    return (
        <div>
            <DatePicker {...input} timeInputLabel="Time:"
                dateFormat="MM/dd/yyyy h:mm aa"
                showTimeInput
                selected={input.value}
            />
            {/* selected={input.value ? convertToLocal(input.value, 'MM/dd/yyyy h:mm aa') : null} */}

            {touched && error && <span>{error}</span>}
        </div>
    );
};

const renderDateTimeField = ({ input: { value, name, ...inputProps }, type = 'date', disabled, label, placeholder = '', adornment = {}, meta: { touched, error } }) => {
    const {
        isVisible: adornmentVisibility = false,
        position: adornmentPosition = 'end',
        areaLabel: adornmentAreaLabel = 'toggle_visibility',
        onClick: adornmentOnClick = () => { },
        onMouseDown: adornmentOnMouseDown = () => { },
        showIcon: adornmentShowIcon = <Visibility />,
        hideIcon: adornmentHideIcon = <VisibilityOff />,
        show: adornmentStatus = false
    } = adornment;
    let startAdornmentObj = {};
    if (adornmentVisibility) {
        startAdornmentObj[adornmentPosition === 'end' ? 'endAdornment' : 'startAdornment'] = <InputAdornment>
            <IconButton
                aria-label={I18n.t(adornmentAreaLabel)}
                onClick={adornmentOnClick}
                onMouseDown={adornmentOnMouseDown}
            >
                {adornmentStatus ? adornmentShowIcon : adornmentHideIcon}
            </IconButton>
        </InputAdornment>;
    }

    return <FormGroup>
        <WhiteTextField type={type}
            disabled={Boolean(disabled)}
            value={convertToLocal(value, 'YYYY-MM-DDTHH:mm:ss')}
            name={name} id={name}
            placeholder={placeholder} label={label} fullWidth={true}
            InputProps={{
                ...startAdornmentObj
            }}
            {...inputProps} />
        {touched && error && <Typography color="error" style={{
            margin: '0',
            fontSize: '0.75rem',
            marginTop: '3px',
            textAlign: 'left',
            fontFamily: 'Roboto',
            fontWeight: '400',
            lineHeight: '1.5',
            letterSpacing: '0.00938em'
        }} >{error}</Typography>}
    </FormGroup>;
};
// const renderFileUploadField = ({ input: { value: omitValue, name, ...inputProps }, type = 'file', disabled, label, placeholder = '', adornment = {}, meta: { touched, error } }) => {
//     const {
//         isVisible: adornmentVisibility = false,
//         position: adornmentPosition = 'end',
//         areaLabel: adornmentAreaLabel = 'toggle_visibility',
//         onClick: adornmentOnClick = () => { },
//         onMouseDown: adornmentOnMouseDown = () => { },
//         showIcon: adornmentShowIcon = <Visibility />,
//         hideIcon: adornmentHideIcon = <VisibilityOff />,
//         show: adornmentStatus = false
//     } = adornment;
//     let startAdornmentObj = {};
//     if (adornmentVisibility) {
//         startAdornmentObj[adornmentPosition === 'end' ? 'endAdornment' : 'startAdornment'] = <InputAdornment>
//             <IconButton
//                 aria-label={I18n.t(adornmentAreaLabel)}
//                 onClick={adornmentOnClick}
//                 onMouseDown={adornmentOnMouseDown}
//             >
//                 {adornmentStatus ? adornmentShowIcon : adornmentHideIcon}
//             </IconButton>
//         </InputAdornment>;
//     }

//     return <FormGroup>
//         <WhiteTextField type={type}
//             disabled={Boolean(disabled)}
//             // value={value}
//             name={name} id={name}
//             placeholder={placeholder} label={label} fullWidth={true}
//             InputProps={{
//                 ...startAdornmentObj
//             }}
//             {...inputProps} />
//         {touched && error && <Typography color="error" style={{
//             margin: '0',
//             fontSize: '0.75rem',
//             marginTop: '3px',
//             textAlign: 'left',
//             fontFamily: 'Roboto',
//             fontWeight: '400',
//             lineHeight: '1.5',
//             letterSpacing: '0.00938em'
//         }} >{error}</Typography>}
//     </FormGroup>;
// };

// const renderDatePicker = ({input, placeholder, defaultValue, meta: {touched, error} }) => (
//     <div>
//         <DatePicker {...input} dateForm="MM/DD/YYYY" selected={input.value ? moment(input.value) : null} />
//         {touched && error && <span>{error}</span>}
//     </div>
// );
// export const Datepicker = ({

//     input, id, label, required, className, disabled, popoverAttachment, popoverTargetAttachment, popoverTargetOffset, todayButton,
//     meta: {touched, error, invalid} }) => (
//     <FormGroup color={`${touched && invalid ? 'danger' : ''}`} className={`${required ? 'required ' : ' '}${className}`}>
//         {label && <label htmlFor={id}>{label}</label>}
//         <DatePicker
//             className="form-control"
//             {...input}
//             fixedHeight
//             todayButton={todayButton}
//             label={label}
//             id={id}
//             dateForm="MM/DD/YYYY"
//             selected={input.value ? moment(input.value) : null}
//             disabled={disabled}
//             popoverAttachment={popoverAttachment}
//             popoverTargetAttachment={popoverTargetAttachment}
//             popoverTargetOffset={popoverTargetOffset}
//         />
//         {touched && error && <Typography color="error" >{error}</Typography>}

//     </FormGroup>
// );
// export const singleDatePicker = ({

//     input, id, label, required, className, disabled, popoverAttachment, popoverTargetAttachment, popoverTargetOffset, todayButton,
//     meta: { touched, error, invalid } }) => (
//     <SingleDatePicker
//         showClearDate={true}
//         showDefaultInputIcon={true}
//         displayFormat="YYYY-MM-DD"
//         numberOfMonths={1}
//         disabled={disabled}
//         placeholder={placeholder}
//         date={input.value}
//         onDateChange={input.onChange}
//         focused={focused}
//         onFocusChange={this.onFocusChange}
//         id={input.name}
//     />
// {
//     error && touched && <span>{error}</span>
// }
// }

// export default renderDatePicker

export {
    renderTextField, renderSelect, renderSimpleSelect, renderMultiSelect, renderTextAreaField,
    renderDateTimeField, reactMultiSelect, UploadFile, renderDateTimePicker
};
