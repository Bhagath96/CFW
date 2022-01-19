import { Grid, makeStyles, TextField } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import React, { useState } from 'react';
import _ from 'lodash';
import { Dialog } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Components, I18n } from '../../../components';
import FONTELLO_CONFIG from './config.json';
import './css/fontello.css';

const { Colors, Button } = Components;
const useStyles = makeStyles({
    icon: {
        fontSize: '2.75rem !important',
        display: 'flex',
        '&:before': {
            backgroundColor: Colors['text-basic-color']
        }
    }
});
const MuiIconPicker = ({ onIconPick, defaultIcon = '' }) => {
    const classes = useStyles();
    const { glyphs: ICONS } = FONTELLO_CONFIG;
    const [length, setLength] = useState(ICONS.length);
    const pages = Math.ceil(length / 50);
    const [selectedIcon, setIcon] = useState(defaultIcon);
    const [page, setPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(ICONS);
    const [open, setOpen] = useState(false);
    const handleChange = (event, value) => {
        setPage(value);
    };
    const handleSearch = (e) => {
        let tempPage = _.filter(ICONS, (item) => item.css.includes(e.target.value));
        setLength(tempPage.length);
        setCurrentPage(tempPage);
        setPage(1);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (<div>
        <Grid item xs={12} style={{ display: 'flex', alignItems: 'center', padding: '5px' }}>
            <Button style={{ color: 'black !important', margin: '0 10px' }} onClick={() => setOpen(true)}>{I18n.t('pick_icon')}</Button>
            {selectedIcon && <div>
                <i style={{ backgroundColor: Colors[''] }}
                    className={`icon-${selectedIcon} ${classes.icon}`}></i>
            </div>}
        </Grid>
        <Dialog onClose={handleClose} open={open}>
            <div style={{ height: '375px', width: '510px', padding: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <TextField
                    label='Search'
                    onChange={handleSearch}
                    style={{ width: '100%' }}
                />
                <div style={{ height: '250px', margin: '5px 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{
                        height: '250px', width: '480px', display: 'flex'
                    }} >
                        {
                            currentPage.slice((page - 1) * 50, page * 50).map((icon, i) => {
                                return <div
                                    key={i}
                                    style={{ height: '50px', width: '50px' }}
                                    onClick={() => {
                                        setIcon(icon.css);
                                        onIconPick(icon.css);
                                        setOpen(false);
                                    }}
                                >
                                    <i className={`icon-${icon.css} ${classes.icon}`}></i>
                                </div>;

                            })
                        }
                    </div>
                    {currentPage.length === 0 && <Typography>Icon Not found</Typography>}
                    < div style={{ textAlign: 'center' }}>
                        <Pagination count={pages} page={page} color="secondary" onChange={handleChange} />
                    </div>
                </div >
            </div>
        </Dialog>
    </div >
    );
};

export default MuiIconPicker;

