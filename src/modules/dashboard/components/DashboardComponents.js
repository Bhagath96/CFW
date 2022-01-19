import React from 'react';
import _ from 'lodash';
import { Card, MuiThemeProvider, createTheme, Grid, Typography, Icon } from '@material-ui/core';

import Animate from './Animate';
import { I18n } from '../../../common/components';
import Colors from '../../../common/components/custom/Colors';

const theme = (props) => createTheme(props);

const newCardProps = {
  overrides: {
    MuiCard: {
      root: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around'
      }
    },
    MuiCardHeader: {
      root: {
        paddingBottom: '0px'
      }
    },
    MuiCardContent: {
      root: {
        justifyContent: 'flex-end'
      }
    }
  }
};

export const DashboardCard = ({ children, style }) => (
  <MuiThemeProvider theme={theme(newCardProps)}>
    <Card style={style}>{children}</Card>
  </MuiThemeProvider>);

const generateCardContent = (content) => {
  let response = [];
  _.forEach(content, (item) => {
    response.push(<Grid item xs={12}>
      <Typography variant="h5" style={{ fontWeight: 600 }}>
        <Grid container>
          <Grid item xs={7}>{item.key}</Grid>
          <Grid item xs={5}>{(item.value || 0).toLocaleString('en-IN')}</Grid>
        </Grid>
      </Typography>
    </Grid>);
  });
  return response;
};

export const DashboardCounter = ({ onClick = () => alert('card MoreInfo Clicked'), title = 'Card Title', subtitle = '', icon = 'mdi-web-clock', color = 'color-success', content = [] }) => {
  return (
    <Grid container alignItems="center" style={{ color: Colors[`${color}-200`], background: `linear-gradient(45deg, ${Colors[`${color}-800`]}, ${Colors[`${color}-400`]})`, padding: 10, borderRadius: 10 }}>
      <Grid container>
        <Grid item xs>
          <Typography gutterBottom variant='h3' style={{ fontWeight: 700 }}>
            {title}
          </Typography>
          <Typography gutterBottom variant="h6">
            {subtitle}
          </Typography>
        </Grid>
        <Grid item>
          <Animate.scale>
            <Icon style={{ fontSize: 40 }} className={`mdi ${icon}`} />
          </Animate.scale>
        </Grid>
      </Grid>
      {generateCardContent(content)}
      <Grid item xs={12} style={{ cursor: 'pointer', color: Colors[`${color}-200`], background: `linear-gradient(45deg, ${Colors[`${color}-400`]}, ${Colors[`${color}-800`]})`, padding: 0, borderRadius: 10, marginTop: 10 }}>
        <div onClick={onClick}>
          <Typography align='right' variant='h6' alignItems='center'>
            <Animate.move x={-15}>
              <>
                {I18n.t('more_info')} { }
                <Icon style={{ fontSize: 18 }} className='mdi mdi-arrow-right-circle' />
              </>
            </Animate.move>
          </Typography>
        </div>
      </Grid>
    </Grid >
  );
};

export const CounterCard = ({ title = 'Card Title', subtitle = '',
  // icon = 'mdi-web-clock',
  color = 'color-brown', content = {} }) => {
  const { count = 0 } = content;
  return (
    <Grid container alignItems="center" style={{ color: Colors[`${color}-200`], background: `linear-gradient(45deg, ${Colors[`${color}-800`]}, ${Colors[`${color}-400`]})`, padding: 10, borderRadius: 10 }}>
      <Grid container>
        <Grid item xs style={{ justifyContent: 'center', display: 'flex' }}>
          <Typography gutterBottom variant='h3' style={{ fontWeight: 400 }}>
            {title}
          </Typography>
          <Typography gutterBottom variant="h6">
            {subtitle}
          </Typography>
        </Grid>
        {/* <Grid item>
          <Animate.scale>
            <Icon style={{ fontSize: 40 }} className={`mdi ${icon}`} />
          </Animate.scale>
        </Grid> */}
      </Grid>
      <Grid item xs={12} >
        <Typography variant="h1" style={{ fontWeight: 600 }}>
          <Grid container>
            <Grid item xs={12} style={{ textAlign: 'center' }}>{(count || 0).toLocaleString('en-IN')}</Grid>
          </Grid>
        </Typography>
      </Grid>
      <Grid item xs={12} style={{ cursor: 'pointer', color: Colors[`${color}-200`], background: `linear-gradient(45deg, ${Colors[`${color}-400`]}, ${Colors[`${color}-800`]})`, padding: 0, borderRadius: 10, marginTop: 10 }}>
        <div >
          <Typography align='right' variant='h6' alignItems='center'>
            <Animate.move x={-15}>
              <>
                {I18n.t('')} { }
                {/* <Icon style={{ fontSize: 18 }} className='mdi mdi-arrow-right-circle' /> */}
              </>
            </Animate.move>
          </Typography>
        </div>
      </Grid>
    </Grid >
  );
};
