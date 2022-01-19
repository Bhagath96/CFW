import React from 'react';
import MUIDataTable from 'mui-datatables';
import { MUI_COMMON_OPTIONS } from '../../../../common/constants';
import _ from '../../../../utils/LodashUtils';
import CustomToolbar from './CustomToolbar';
import LoadingOverlay from '../../../../common/components/custom/LoadingOverlay';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import { I18n } from '../..';
import { TABLE_THEME_PROPS } from './constants';
import Colors from '../Colors.js';
const theme = (props) => createTheme(props);

function MaterialUiTable({ title, data, options, columns, requestInProgress }) {
    const newOptions = {
        ...MUI_COMMON_OPTIONS,
        ...options, textLabels: {
            ...MUI_COMMON_OPTIONS.textLabels,
            pagination: {
                ...MUI_COMMON_OPTIONS.textLabels.pagination,
                next: I18n.t(MUI_COMMON_OPTIONS.textLabels.pagination.next),
                previous: I18n.t(MUI_COMMON_OPTIONS.textLabels.pagination.previous),
                rowsPerPage: I18n.t(MUI_COMMON_OPTIONS.textLabels.pagination.rowsPerPage),
                displayRows: I18n.t(MUI_COMMON_OPTIONS.textLabels.pagination.displayRows)
            },
            filter: {
                ...MUI_COMMON_OPTIONS.textLabels.filter,
                title: I18n.t(MUI_COMMON_OPTIONS.textLabels.filter.title),
                reset: I18n.t(MUI_COMMON_OPTIONS.textLabels.filter.reset)
            },
            viewColumns: {
                ...MUI_COMMON_OPTIONS.textLabels.viewColumns,
                title: I18n.t(MUI_COMMON_OPTIONS.textLabels.viewColumns.title),
                titleArea: I18n.t(MUI_COMMON_OPTIONS.textLabels.viewColumns.titleArea)
            },
            toolbar: {
                ...MUI_COMMON_OPTIONS.textLabels.toolbar,
                filterTable: I18n.t(MUI_COMMON_OPTIONS.textLabels.toolbar.filterTable),
                search: I18n.t(MUI_COMMON_OPTIONS.textLabels.toolbar.search),
                viewColumns: I18n.t(MUI_COMMON_OPTIONS.textLabels.toolbar.viewColumns)
            },
            body: {
                ...MUI_COMMON_OPTIONS.textLabels.body,
                toolTip: I18n.t(MUI_COMMON_OPTIONS.textLabels.body.toolTip),
                noMatch: I18n.t(MUI_COMMON_OPTIONS.textLabels.body.noMatch)
            }
        }
    };

    let newThemeProps = {
        ...TABLE_THEME_PROPS,
        overrides: {
            ...TABLE_THEME_PROPS.overrides,
            MUIDataTable: {
                ...TABLE_THEME_PROPS.MUIDataTable,
                responsiveBase: {
                    minHeight: 260,
                    maxHeight: 'calc(95vh - 180px) !important'
                }
            },
            MuiChip: {
                outlined: {
                    border: `1px solid ${Colors['color-basic-600']}`,
                    backgroundColor: 'transparent'
                },
                outlinedPrimary: {
                    color: Colors['color-basic-600'],
                    border: `1px solid ${Colors['color-basic-600']}`
                },
                deleteIconOutlinedColorPrimary: {
                    color: Colors['color-basic-900'],
                    '&:hover': {
                        color: Colors['color-basic-600']
                    }
                }
            },
            MUIDataTableToolbar: {
                filterPaper: {
                    width: '650px',
                    height: '350px'
                }
            }
        }
    };

    //Exception Cases
    _.set(newOptions, 'searchPlaceholder', I18n.t(MUI_COMMON_OPTIONS.searchPlaceholder));

    return (
        <LoadingOverlay active={requestInProgress}>
            <MuiThemeProvider theme={theme(newThemeProps)}>
                <MUIDataTable
                    title={title}
                    data={data}
                    columns={columns}
                    options={{
                        ...newOptions,
                        setFilterChipProps: () => {
                            return {
                                color: 'primary',
                                variant: 'outlined'
                            };
                        },
                        customToolbar: () => {
                            let response = [];
                            _.forEach(newOptions.customActions, action => {
                                response.push(<CustomToolbar key={action} handleClick={action.handleClick} icon={action.icon || null} toolTip={action.toolTip || ''} />);
                            });
                            return <>{response} </>;
                        }
                    }}
                />
            </MuiThemeProvider>
        </LoadingOverlay>
    );
}

export default MaterialUiTable;
