import BASIC from '../../assets/colors/basic/Green.json';
import PRIMARY from '../../assets/colors/primary/Green.json';
import NOTIFICATIONS from '../../assets/colors/Notifications.json';
import CARD_COLOR from '../../assets/colors/CardColors.json';

const theme = {
  ...BASIC,
  ...PRIMARY,
  ...NOTIFICATIONS,
  ...CARD_COLOR,
  'text-basic-color': BASIC['color-basic-600'],
  'text-primary-color': BASIC['color-basic-100'],
  'menu-item-icon-color': '#011906',
  'bread-crumb-color': PRIMARY['color-primary-800'],
  'login-back-ground-color': '#112b00',
  'tab-color': BASIC['color-basic-800'],
  'theme-basic-color': '#039123',
  'theme-primary-color': '#112b00'
};


export default theme;
