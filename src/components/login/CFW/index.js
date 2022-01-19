import React from 'react';
import { Form } from 'redux-form';
import { Typography, Grid, useMediaQuery, FormGroup, TextField, Box, Button } from '@material-ui/core';
import backgroundFinalStyle from './background-styles';
import { I18n, Icons, makeStyles } from '../../../common/components';


import cfwIcon from '../../../assets/image/image.png';
import { Link } from 'react-router-dom';

const { LockOutlined: LockOutlinedIcon, AccountCircleOutlined: AccountCircleOutlinedIcon } = Icons;
const useStyles = makeStyles(() => ({
    root: {
        minHeight: '100vh',
        height: '100%',
        background: '#141414',
        paddingTop: '100px',
        position: 'relative',
        fontFamily: 'Fira Sans !important'
    },
    logoContainer: {
        height: '50%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        float: 'left'


    },
    loginContainer: {
        height: '50%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        float: 'right',
        padding: '0 10px'

    },
    projectName: {
        color: 'white',
        fontSize: '20px',
        fontWeight: '500',
        marginTop: 0,
        fontFamily: 'Poppins',
        lineHeight: '40px'
    },
    malayalamContent: {
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: '16px',
        lineHeight: '20px',
        letterSpacing: '-0.01em',
        color: 'white',
        textAlign: 'center'

    },
    slogan: {
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: '16px',
        lineHeight: '180 %',
        color: '#9B9B9B',
        opacity: 0.66,
        textAlign: 'left',
        paddingTop: 60
    },
    loginHead: {
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: '25px',
        lineHeight: '56px',
        color: '#ECECEC'
    },
    note: {
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: '16px',
        lineHeight: '25px',
        color: '#9B9B9B'
    },
    accountIcon: {
        paddingTop: '10px',
        paddingLeft: '13px',
        paddingBottom: '10px',
        maxHeight: '20px',
        maxWidth: '20px'
    },
    boxMargin: {
        marginBottom: '5px'
    },

    forgetPassword: {
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '12px',
        lineHeight: '10px',
        color: 'white',
        textAlign: 'center',
        textDecoration: 'none'
    },
    loginButton: {
        width: '100%',
        justifyContent: 'center',
        marginTop: '70px',
        height: '45px',
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '1ppx',
        textTransform: 'none',
        lineHeight: '35px',
        color: 'yellow',
        borderRadius: '8px',
        background: '#303234',
        // boxShadow: '9px 9px 16px rgba(49, 47, 47, 0.6)',
        '&:hover': {
            backgroundColor: '#393a3b'
            // color: '#3c52b2'
        }
    }
}));

const inputStyles = makeStyles(() => ({
    underline: {
        '&&&:before': {
            borderBottom: 'none'
        },
        '&&:after': {
            borderBottom: 'none'
        }
    },
    input: {
        '&::placeholder': {
            width: '169px',
            height: '23px',
            left: '159px',
            top: '488px',
            fontFamily: 'Roboto',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: '15px',
            lineHeight: '23px',
            color: '#828282'
        },
        '&&&:before': {
            borderBottom: 'none'
        },
        '&&:after': {
            borderBottom: 'none'
        },
        padding: '12px 0 7px'
    }
}));


const Login = (props) => {
    const classes = useStyles();
    const inputClasses = inputStyles();
    const { change, handleSubmit, submit, changeRoute, passwordType, PROJECT_DETAILS } = props;
    const TextColor = backgroundFinalStyle.textColor;

    const matches1024 = useMediaQuery('(max-width:1024px)');
    const matches1824 = useMediaQuery('(max-width:1824px)');

    return (
        <Grid container className={classes.root}>
            <Grid container justify="center" direction="row" justifyContent='space-between' style={{ height: '100%', flexWrap: 'wrap', marginBottom: '200px' }}>

                <Grid item xs={12} md={5} lg={4} className={classes.logoContainer}>
                    <Grid item xs='12' style={matches1024 ? { display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' } : {}}>
                        <Typography className={classes.projectName}>
                            Welcome to
                        </Typography>

                        <Typography style={{ fontSize: '36px', color: 'white', fontWeight: 550 }}>
                            {I18n.t(PROJECT_DETAILS.NAME)}
                        </Typography>

                        <Grid style={{ textAlign: 'center' }}>

                            <img src={cfwIcon} height={matches1824 ? '90%' : '20'}
                                width={matches1824 ? '332px' : '20'} style={{ borderRadius: '8px' }}></img>

                        </Grid>

                        <Typography className={classes.malayalamContent}>
                            വനിത ശിശുവികസന വകുപ്പ്
                        </Typography>

                        <Typography className={classes.slogan}>
                            {I18n.t(PROJECT_DETAILS.SLOGAN)}
                        </Typography>


                    </Grid>
                </Grid>

                <Grid item xs={12} md={8} sm={8} lg={5} className={classes.loginContainer}>
                    <Grid item xs={12} style={matches1024 ? { display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' } : { marginLeft: 'auto', width: '80%' }}>
                        <Typography className={classes.loginHead}>
                            Log In
                        </Typography>

                        <Typography className={classes.note}>
                            Enter your credentials to access your account.
                        </Typography>


                        <Form onSubmit={handleSubmit(submit)} autoSave={1} style={{ paddingTop: 50, width: '100%' }}>

                            <Grid item xs={12} >
                                <Typography variant="h6" style={{ fontSize: '14px', color: '#FFFFFF' }}>Username</Typography>
                                <TextColor>
                                    <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>

                                        <Grid item xs={2} lg={2} sm={2} md={2} xl={2} >
                                            <Box >

                                                <AccountCircleOutlinedIcon className={classes.accountIcon} />

                                            </Box>
                                        </Grid>
                                        <Grid item xs={10} lg={10} sm={10} md={10} xl={10} >

                                            <Box className={classes.boxMargin}>
                                                <TextField type='text'
                                                    onChange={(e) => {
                                                        // setUsername(e.target.value);
                                                        change('username', e.target.value);
                                                    }}
                                                    name="username" id="username" placeholder='Enter your Username' autoSave={1}

                                                    InputProps={{ classes: inputClasses }}


                                                />
                                            </Box>
                                        </Grid>

                                    </FormGroup>

                                </TextColor>

                            </Grid>
                            <Grid item xs={12} style={{ paddingTop: 40 }}>
                                <Typography variant="h6" style={{ fontSize: '14px', color: '#FFFFFF' }}>Password</Typography>
                                <TextColor>
                                    <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>

                                        <Grid item xs={2} lg={2} sm={2} md={2} xl={2} >
                                            <Box >

                                                <LockOutlinedIcon className={classes.accountIcon} />

                                            </Box>
                                        </Grid>
                                        <Grid item xs={10} lg={10} sm={10} md={10} xl={10} >

                                            <Box className={classes.boxMargin}>
                                                <TextField type={passwordType}
                                                    onChange={(e) => {
                                                        // setUsername(e.target.value);
                                                        change('password', e.target.value);
                                                    }}
                                                    name="password" id="password" placeholder='Enter your Password' autoSave={1}

                                                    InputProps={{ classes: inputClasses }}


                                                />
                                            </Box>
                                        </Grid>


                                    </FormGroup>

                                </TextColor>

                            </Grid>
                            <Grid item xs={12} style={{ paddingTop: 10 }}>

                                <Box
                                    display="flex"
                                    flexWrap="wrap"
                                    alignContent="flex-start"
                                    justifyContent="flex-end">
                                    <Box>
                                        <Link variant="body2" onClick={changeRoute} className={classes.forgetPassword}>{I18n.t('forgot_password')}?</Link>
                                    </Box>
                                </Box>

                            </Grid>
                            <Grid item xs={12}>
                                <Box display="flex" justifyContent="center" height='35px' >
                                    <Box width="100%" >
                                        <Button type="submit" className={classes.loginButton}>{I18n.t('login')}</Button>
                                    </Box>
                                </Box>
                            </Grid>

                        </Form>


                    </Grid>
                </Grid>

            </Grid>

        </Grid>
    );
};

export default Login;
