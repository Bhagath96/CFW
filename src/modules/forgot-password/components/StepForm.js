import React, { useState, useEffect } from 'react';
import FirstStep from './FirstStep';
import formValidation from './formValidation';
import SecondStep from './SecondStep';
import Confirm from './Confirm';
import { Components, I18n, makeStyles } from '../../../common/components';
import { Link, useHistory } from 'react-router-dom';
import Colors from '../../../common/components/custom/Colors';
const { Card, Box, Typography, Stepper, Step, StepLabel } = Components;
// Step titles

const labels = ['generate_otp', 'enter_otp', 'enter_new_pass'];

const useStyle = makeStyles((theme) => ({
    cardStyle: {
        height: '100vh',
        backgroundColor: Colors['login-back-ground-color']

    },
    icon: {
        color: 'green !important'
    },
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        maxWidth: 800,
        margin: '0 2px',
        transform: 'scale(1.0)',
        [theme.breakpoints.down('md')]: {
            maxWidth: 400,
            minWidth: 305

        }

    },
    title: {
        fontSize: 14
    },
    pos: {
        marginBottom: 12
    },
    mainBody: {
        backgroundColor: Colors['login-back-ground-color']
    },
    step: {
        '&$completed': {
            color: 'lightgreen'
        },
        '&$active': {
            color: 'pink'
        },
        '&$disabled': {
            color: 'red'
        }
    },
    alternativeLabel: {},
    active: {}, //needed so that the &$active tag works
    completed: {},
    disabled: {},
    labelContainer: {
        '&$alternativeLabel': {
            marginTop: 0
        }
    }
})
);
const initialValues = {

    mobile: '',
    otp: '',
    confirmOtp: '',
    password: '',
    confirmPassword: ''

};

const fieldsValidation = {
    firstName: {
        error: '',
        validate: 'text',
        minLength: 2,
        maxLength: 20
    },
    lastName: {
        error: '',
        validate: 'text',
        minLength: 2,
        maxLength: 20
    },
    email: {
        error: '',
        validate: 'email'
    },
    gender: {},
    date: {},
    city: {
        error: '',
        validate: 'text',
        minLength: 3,
        maxLength: 20
    },
    mobile: {
        error: '',
        validate: 'phone',
        maxLength: 15
    }

};

const StepForm = () => {
    const history = useHistory();
    const classes = useStyle();
    useEffect(() => {
    }, []);
    const [activeStep, setActiveStep] = useState(0);
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});

    // Proceed to next step
    const handleNext = () => setActiveStep((prev) => prev + 1);
    // Go back to prev step
    const handleBack = () => setActiveStep((prev) => prev - 1);
    const redirectToLogin = () => {
        history.push('/');

    };

    // Handle form change
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Set values
        setFormValues((prev) => ({
            ...prev,
            [name]: value
        }));

        // set errors
        const error = formValidation(name, value, fieldsValidation) || '';

        setFormErrors({
            [name]: error
        });
    };

    const handleSteps = (step) => {
        switch (step) {
            case 0:
                return (

                    <FirstStep
                        handleNext={handleNext}
                        handleChange={handleChange}
                        values={formValues}
                        formErrors={formErrors}
                    />
                );
            case 1:
                return (
                    <SecondStep
                        handleNext={handleNext}
                        handleBack={handleBack}
                        handleChange={handleChange}
                        values={formValues}
                        formErrors={formErrors}
                    />
                );
            case 2:
                return (
                    <Confirm
                        handleNext={handleNext}
                        handleBack={handleBack}
                        values={formValues}
                    />
                );
            default:
                break;
        }
    };

    return (
        <div className={classes.cardStyle}>
            <Card style={{ backgroundColor: Colors['login-back-ground-color'], display: 'flex', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', height: '100%', margin: '0' }}>
                <Card className={classes.root}>
                    {activeStep === labels.length ? (
                        // Last Component
                        <></>
                    ) : (
                        <>
                            <Box style={{ margin: '30px 0 50px' }}>
                                <Typography variant="h4" align="center">
                                    {I18n.t('forgot_password')}
                                </Typography>
                            </Box>

                            <Stepper
                                activeStep={activeStep}
                                style={{ margin: '30px 0 15px' }}
                                alternativeLabel
                            >
                                {labels.map((label) => (
                                    <Step key={label} classes={{
                                        alternativeLabel: classes.alternativeLabel,
                                        labelContainer: classes.labelContainer
                                    }} >
                                        <StepLabel StepIconProps={{
                                            classes: {
                                                root: classes.step,
                                                completed: classes.completed,
                                                active: classes.active,
                                                disabled: classes.disabled
                                            }
                                        }} >{I18n.t(label)}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                            {handleSteps(activeStep)}
                        </>
                    )}
                    <Link onClick={redirectToLogin}
                        style={{
                            color: 'green',
                            fontFamily: 'Roboto',
                            fontStyle: 'normal',
                            fontWeight: 'normal',
                            fontSize: '15px',
                            lineHeight: '23px',
                            paddingBottom: '3px'
                        }} >{I18n.t('sign_in')}</Link>
                </Card>
            </Card>
        </div>
    );
};
export default StepForm;
