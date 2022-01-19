import BASIC from '../colors/basic/Blue.json';
import PRIMARY from '../colors/primary/Blue.json';
import NOTIFICATIONS from '../colors/Notifications.json';
import CARD_COLOR from '../../assets/colors/CardColors.json';


const theme = {
  ...BASIC,
  ...PRIMARY,
  ...NOTIFICATIONS,
  ...CARD_COLOR,
  'text-basic-color': BASIC['color-basic-600'],
  'text-primary-color': BASIC['color-basic-100'],
  'menu-item-icon-color': '#000c1a',
  'bread-crumb-color': PRIMARY['color-primary-800'],
  'login-back-ground-color': PRIMARY['color-primary-900'],
  'tab-color': BASIC['color-basic-800'],
  'theme-basic-color': BASIC['color-basic-800'],
  'theme-primary-color': PRIMARY['color-primary-800']
};

export default theme;
