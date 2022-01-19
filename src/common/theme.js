import { createTheme } from '@material-ui/core/styles';
import Colors from '../common/components/custom/Colors.js';

export const themeColors = {
  themePrimaryColor: Colors['theme-basic-color'], // for Header, Button, etc..
  themeSecondaryColor: Colors['theme-primary-color'], // for Sidebar,tab appBar
  menuItemIconColor: '#ffff66',
  headerColor: '#ffffff' //for DashBoard Header
};
const baseTheme = createTheme({
  props: {
    MuiPaper: {
      elevation: 0
    },
    MuiContainer:
      { elevation: 0 },
    MuiAppBar: {
      elevation: 1
    },
    MuiButton: {
      elevation: 0
    },
    MuiMenu: {
      elevation: 1
    },
    MuiCard: {
      elevation: 0
    },
    MuiTab: {
      elevation: 0
    },
    MuiBox: {
      elevation: 0
    }
  },
  overrides: {
    MuiTabs: {
      fixed: {
        backgroundColor: themeColors.themePrimaryColor
      }
    },
    MuiAlert: {
      outlinedSuccess: {
        border: `1px solid ${Colors['color-primary-300']}`
      }
    },
    MuiIconButton: {
      // root: {
      //   color: Colors['menu-item-icon-color']
      // }
    },
    PrivateTabIndicator: {
      colorSecondary: {
        backgroundColor: Colors['color-primary-100']
      }
    },

    MuiButton: {
      root: {
        minWidth: 0

      },
      // containedPrimary: {
      //   color: '#fff',
      //   backgroundColor: themeColors.themeSecondaryColor,
      //   '&:hover': {
      //     color: '#ded8d8',
      //     backgroundColor: '#27803b'
      //   }
      // },
      contained: {
        boxShadow: 'none',
        '&:active': {
          boxShadow: 'none'
        },
        '&:focus': {
          boxShadow: 'none'
        }
      },
      containedSecondary: {
        color: themeColors.themeSecondaryColor,
        '&:hover': {
          backgroundColor: Colors['color-primary-900']
        }
      },
      containedPrimary: {
        backgroundColor: themeColors.themePrimaryColor,
        '&:hover': {
          backgroundColor: Colors['color-basic-900']
        }
      },
      label: {
        color: 'white',
        '&:hover': {
          color: 'white'
        }
      }
    },

    MuiButtonGroup: {
      root: {
        boxShadow: 'none'
      },
      contained: {
        boxShadow: 'none',
        '&:active': {
          boxShadow: 'none'
        },
        '&:focus': {
          boxShadow: 'none'
        }
      }
    },
    MuiAppBar: {
      colorPrimary: {
        color: '#0e0000',
        backgroundColor: themeColors.headerColor
      },
      positionStatic: {
        backgroundColor: themeColors.themePrimaryColor
      }
    },

    MuiListItemIcon: {
      root: {
        minWidth: 40
      }
    },
    MuiCardContent: {
      root: {
        '&:last-child': {
          paddingBottom: 16
        }
      }
    },
    MuiLinearProgress: {
      root: {
        background: '#f3f3f3 !important'
      }
    },

    MuiTab: {
      root: {
        // backgroundColor: themeColors.themeSecondaryColor,
        padding: '6px 12px',
        overflow: 'hidden',
        position: 'relative',
        fontSize: '0.875rem',
        maxWidth: '264px',
        minWidth: '72px',
        boxSizing: 'border-box',
        minHeight: '48px',
        textAlign: 'center',
        flexShrink: '0',
        fontFamily: 'Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: '500',
        lineHeight: '1.75',
        whiteSpace: 'normal',
        letterSpacing: '0.02857em',
        textTransform: 'none'
      },
      textColorInherit: {
        color: '#f7f0f0',
        opacity: '0.'
      }
    },
    MuiContainer: {
      root: {
        width: '65%',
        height: '100%'
      }
    }

  },
  palette: {
    divider: 'rgba(30, 30, 30, 0.06)',
    secondary: {
      main: '#8cd136' //indigo[600],
    },
    primary: {
      main: '#ffff' //'#619f30',
    },
    text: {
      secondary: 'rgba(102, 102, 102, 0.83)',
      positive: '#8cd136',
      negative: '#e35959'
    }
  },
  typography: {
    h1: {
      fontSize: '2rem'
    },
    h2: {
      fontSize: '1.8rem'
    },
    h3: {
      fontSize: '1.6rem'
    },
    h4: {
      fontSize: '1.4rem'
    },
    h5: {
      fontSize: '1.2rem'
    },
    h6: {
      fontSize: '1rem'
    }
  },
  // only for tabAppBar
  tabAppBar: {
    backgroundColor: themeColors.themePrimaryColor
  }
});

const adminTheme = {
  header: {
    background: '#fff'
  },
  sidebar: {
    width: 240,
    height: '100vh',
    widthCollapsed: baseTheme.spacing(7),
    background: themeColors.themePrimaryColor,
    color: '#fff',
    overFlow: 'hidden'
  },
  menuItemIcon: {
    color: themeColors.menuItemIconColor
  },
  tabAppbarColorPrimary: {
    color: Colors['color-primary-100'],
    backgroundColor: themeColors.themePrimaryColor

  }
};

const theme = {
  ...baseTheme,
  ...adminTheme
};

export default theme;
