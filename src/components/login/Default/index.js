import React from 'react';
import { Form } from 'redux-form';
import { Link, FormGroup, TextField, Typography, Grid, Box, Paper } from '@material-ui/core';

import userIcon from '../../../assets/image/Group@2x.png';
import passwordIcon from '../../../assets/image/Group.png';
import backgroundFinalStyle from './background-styles';
import { Icons, I18n, makeStyles } from '../../../common/components';
import Button from '../../../common/components/custom/PrimaryButton';

const { Visibility, VisibilityOff } = Icons;
const styles = {
    'login-form':
    {
        justifyContent: 'center',
        minHeight: '100vh',
        color: 'white'
    },
    'button-block': {
        width: '100%',
        justifyContent: 'center',
        marginTop: '1px',
        height: '45px',
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '1ppx',
        textTransform: 'none',
        lineHeight: '35px',
        color: 'yellow',
        borderRadius: '9px'
    },
    'login-background':
    {
        justifyContent: 'center',
        color: 'white'
    },
    'avt-text':
    {
        padding: '20px',
        color: 'white'
    },
    'radius-box':
    {
        borderRadius: '20px'
    },
    'icon-grid':
    {
        paddingTop: '10px',
        paddingLeft: '13px',
        paddingBottom: '10px',
        maxHeight: '20px',
        maxWidth: '20px'
    },
    'icon-text':
    {
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '15px',
        lineHeight: '23px'
    },
    'typography-text-h1':
    {
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '32px',
        lineHeight: '70px',
        color: '#FFFFFF'

    },
    'typography-text-h2':
    {
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '6px',
        lineHeight: '70px',
        color: '#FFFFFF'

    },
    'text-h4':
    {
        fontFamily: 'Roboto',
        fontStyle: 'normal'
    },
    'box-Margin':
    {
        marginBottom: '5px'
    }
};
const useStyles = makeStyles({
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
        }
    }
});

const Login = (props) => {
    const classes = useStyles();
    const FullscreenBackground = backgroundFinalStyle.fullscreenBackground;
    const ImgFull = backgroundFinalStyle.imageFull;
    const TextColor = backgroundFinalStyle.textColor;
    const { colors, change, handleSubmit, submit, changeRoute, changePasswordType, passwordType, PROJECT_DETAILS, LoginLogo } = props;

    return (
        <div>
            <FullscreenBackground style={{ backgroundColor: colors['login-back-ground-color'] }}>
                <Grid container justify="center" direction="row">
                    <Grid item lg={5}>
                        <Grid
                            container
                            direction="column"
                            justify="center"
                            style={styles['login-form']}
                        >
                            <div style={{ paddingLeft: 40, paddingRight: 40 }}>
                                <Grid container>
                                    <Grid item>
                                        <LoginLogo alt={I18n.t(PROJECT_DETAILS.NAME)} src={PROJECT_DETAILS.LOGO_LOGIN} />
                                    </Grid>
                                    <Grid item xs='12'>
                                        <h4 >
                                            {I18n.t(PROJECT_DETAILS.NAME)}
                                        </h4>
                                    </Grid>
                                    <Grid item xs='12'>
                                        <Typography component="h1" variant="h3" style={styles['typography-text-h1']}><b>{I18n.t('login')}</b></Typography>
                                    </Grid>
                                    <Grid item xs='12'>
                                        <Typography variant="h6">{I18n.t(PROJECT_DETAILS.SLOGAN)}</Typography>
                                    </Grid>
                                </Grid>
                            </div>
                            <Paper

                                style={{ ...styles['login-background'], backgroundColor: colors['login-back-ground-color'] }}
                            >
                                <div style={{ padding: 40 }}>
                                    <Grid item>
                                        <Form onSubmit={handleSubmit(submit)} autoSave={1}>
                                            <Grid container direction="column" spacing={2}>
                                                <Grid item xs={12} lg={12} sm={12} md={12} xl={12}>

                                                    <TextColor>
                                                        < FormGroup >
                                                            <Grid container spacing={1} alignItems="flex-end">
                                                                <Grid item xs={2} lg={2} sm={2} md={2} xl={2}>
                                                                    <Box >
                                                                        <img height="15%" width="25%" src={userIcon} style={styles['icon-grid']}></img>
                                                                    </Box>
                                                                </Grid>
                                                                <Grid item xs={10} lg={10} sm={10} md={10} xl={10} >
                                                                    <Box width={350} style={styles['box-Margin']}>
                                                                        <TextField type='text'
                                                                            onChange={(e) => {
                                                                                // setUsername(e.target.value);
                                                                                change('username', e.target.value);
                                                                            }}
                                                                            name="username" id="username" placeholder={I18n.t('u_name')} style={{ width: '100%' }} autoSave={1}
                                                                            InputProps={{ classes }}
                                                                        />
                                                                    </Box>
                                                                </Grid>
                                                            </Grid>
                                                        </FormGroup >
                                                    </TextColor>
                                                </Grid>
                                                <Grid item xs={12} lg={12} sm={12} md={12} xl={12}>
                                                    <TextColor>
                                                        < FormGroup >
                                                            <Grid container spacing={1} alignItems="flex-end">
                                                                <Grid item xs={2} lg={2} sm={2} md={2} xl={2} >
                                                                    <Box >
                                                                        <img height="13%" width="23%" src={passwordIcon} style={styles['icon-grid']}></img>
                                                                    </Box>
                                                                </Grid>
                                                                <Grid item xs={8} lg={8} sm={8} md={8} xl={8} >
                                                                    <Box width={350} style={styles['box-Margin']}>
                                                                        <TextField type={passwordType} onChange={(e) => {
                                                                            // setPassword(e.target.value);
                                                                            change('password', e.target.value);
                                                                        }}
                                                                            name="password" id="password" placeholder={I18n.t('password')} fullWidth={true} InputProps={{ classes }}
                                                                            autoSave={1} />
                                                                    </Box>
                                                                </Grid>
                                                                <Grid item xs={1} lg={1} sm={1} md={1} xl={1} >
                                                                    <Box >
                                                                        {
                                                                            passwordType === 'password' ?
                                                                                <Visibility style={{
                                                                                    fill: '#6e7373', paddingTop: '10px',
                                                                                    paddingLeft: '13px',
                                                                                    paddingBottom: '10px',
                                                                                    maxHeight: '20px',
                                                                                    maxWidth: '20px'
                                                                                }} onClick={() => {
                                                                                    changePasswordType();
                                                                                }} />
                                                                                :
                                                                                <VisibilityOff style={{
                                                                                    fill: '#6e7373', paddingTop: '10px',
                                                                                    paddingLeft: '13px',
                                                                                    paddingBottom: '10px',
                                                                                    maxHeight: '20px',
                                                                                    maxWidth: '20px'
                                                                                }} onClick={() => {
                                                                                    changePasswordType();
                                                                                }} />
                                                                        }
                                                                    </Box>
                                                                </Grid>
                                                                <Grid item xs={1} lg={1} sm={1} md={1} xl={1} ></Grid>
                                                            </Grid>
                                                        </FormGroup>
                                                    </TextColor>
                                                </Grid>
                                                <Grid item>
                                                    <div style={{ padding: 1 }}>
                                                        <Box
                                                            display="flex"
                                                            flexWrap="wrap"
                                                            alignContent="flex-start"
                                                            justifyContent="flex-end">
                                                            <Box>
                                                                <Link className={classes.cursror} onClick={changeRoute} variant="body2" style={styles['icon-text']}>{I18n.t('forgot_password')}</Link>
                                                            </Box>
                                                        </Box>
                                                    </div>
                                                </Grid>
                                                <Grid item>
                                                    <Box display="flex" justifyContent="center" height='35px' >
                                                        <Box width="100%" >
                                                            <Button type="submit" style={styles['button-block']}>{I18n.t('login')}</Button>
                                                        </Box>
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                        </Form>
                                    </Grid>
                                </div>

                            </Paper>
                        </Grid>
                    </Grid>
                    <Grid item lg={6}>
                        <ImgFull>
                            <img height="100%" width="100%" src={PROJECT_DETAILS.BANNER_LOGIN}></img>
                        </ImgFull>
                    </Grid>
                </Grid>
            </FullscreenBackground>
        </div>
    );
};

export default Login;
