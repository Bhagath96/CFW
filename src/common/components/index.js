import { makeStyles, createStyles } from '@material-ui/core/styles';
import MuiIcons from './material-ui/Icons';
import MuiComponents from './material-ui/MuiComponents';
import CustomComponents from './custom';
import I18next from 'i18next';

const Components = { ...MuiComponents, ...CustomComponents };

export { I18next as I18n, MuiIcons as Icons, Components, makeStyles, createStyles };
