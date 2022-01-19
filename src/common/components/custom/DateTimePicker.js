import React from 'react';
import { MuiPickersUtilsProvider, DateTimePicker, DatePicker, TimePicker } from '@material-ui/pickers';
import { ThemeProvider } from '@material-ui/styles';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import { createTheme } from '@material-ui/core/styles';
import { IconButton, InputAdornment, Icon } from '@material-ui/core';

import Colors from './Colors.js';
import { I18n } from '../index.js';
/*
    ref : https://material-ui-pickers.dev/demo/datepicker
*/

const materialTheme = createTheme({
    overrides: {
        MuiPickersToolbar: {
            toolbar: {
                backgroundColor: Colors['color-basic-800']
            }
        },
        MuiPickersCalendarHeader: {
            switchHeader: {
                // backgroundColor: Colors['color-basic-200'],
                // color: "white",
            }
        },
        MuiPickersDay: {
            day: {
                color: Colors['color-basic-800']
            },
            daySelected: {
                backgroundColor: Colors['color-basic-800'],
                '&:hover': {
                    backgroundColor: Colors['color-basic-900']
                }
            },
            dayDisabled: {
                color: Colors['color-basic-200']
            },
            current: {
                color: Colors['color-cancelled-600']
            }
        },
        MuiPickersModal: {
            dialogAction: {
                color: Colors['color-basic-800']
            }
        },
        MuiButton: {
            textPrimary: {
                color: Colors['color-basic-800']
            }
        },
        MuiPickersYear: {
            yearSelected: {
                color: Colors['color-basic-800']
            }
        },
        MuiPickerDTTabs: {
            tabs: {
                backgroundColor: Colors['color-basic-600']
            }
        },
        MuiPickersClock: {
            clock: {
                backgroundColor: Colors['color-basic-transparent-100']
            },
            pin: {
                backgroundColor: Colors['color-basic-800']
            }
        },
        MuiPickersClockPointer: {
            thumb: {
                border: `14px solid ${Colors['color-basic-800']}`
            },
            pointer: {
                backgroundColor: Colors['color-basic-800']
            }
        }
    }
});

const getComponent = (props) => {
    const { selected, onChange, shouldDisableDate, mode = 'date_time', label, errors, ampm = false, ...rest } = props;
    switch (mode) {
        case 'date':
            return <DatePicker
                label={label || I18n.t('date_picker')}
                value={selected}
                onChange={onChange}
                shouldDisableDate={shouldDisableDate}
                animateYearScrolling={true}
                showTodayButton={true}
                todayLabel={I18n.t('today')}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton>
                                <Icon className='mdi mdi-calendar-month' />
                            </IconButton>
                        </InputAdornment>
                    )
                }}
                {...rest}
            />;
        case 'time':
            return <TimePicker
                label={label || I18n.t('time_picker')}
                value={selected}
                ampm={ampm}
                onChange={onChange}
                showTodayButton={true}
                todayLabel={I18n.t('now')}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton>
                                <Icon className='mdi mdi-clock' />
                            </IconButton>
                        </InputAdornment>
                    )
                }}
                {...rest}
            />;
        default:
            return (
                <div>
                    <DateTimePicker
                        style={{ width: '100%' }}
                        label={label || I18n.t('date_time_picker')}
                        value={selected}
                        onChange={onChange}
                        shouldDisableDate={shouldDisableDate}
                        ampm={ampm}
                        animateYearScrolling={true}
                        showTodayButton={true}
                        todayLabel={I18n.t('today')}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton>
                                        <Icon className='mdi mdi-calendar-month' />
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        {...rest}
                    />
                    {errors ? <small style={{ color: 'red' }}>{errors}</small> : ''}
                </div>
            );
    }
};

const CustomDateTimePicker = (props) => {
    return (
        <ThemeProvider theme={materialTheme}>
            <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
                {getComponent(props)}
            </MuiPickersUtilsProvider>
        </ThemeProvider>
    );
};

export default CustomDateTimePicker;
