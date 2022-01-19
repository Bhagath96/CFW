export const TABLE_THEME_PROPS = {
    overrides: {
        MUIDataTableBodyCell: {
            root: {
            }
        },
        MUIDataTableSelectCell: {
            expandDisabled: {
                // Soft hide the button.
                visibility: 'hidden'
                // maxHeight: '60vh'
            }
        },
        MUIDataTable: {
            paper: {
                root: {
                    paddingBottom: '52px',
                    marginBottom: '56px'
                }
            },
            responsiveStacked: {
                maxHeight: 'none',
                overflowX: 'scroll'
            },
            responsiveScrollMaxHeight: {
                maxHeight: '65vh !important'
            }
        },
        MUIDataTablePagination: {
            navContainer: {
                backgroundColor: 'white',
                position: 'fixed !important',
                bottom: 0,
                right: 0,
                zIndex: 999,
                width: '100%',
                marginTop: '50px'
            }
        },
        MuiTableRow: {
            head: {
                zIndex: 999,
                position: 'relative'
            }
        },
        MUIDataTableToolbar: {
            filterPaper: {
                overflowY: 'scroll !important',
                overflow: 'visible !important'
            }
        }
    }
};
