import BASIC from '../../assets/colors/basic/Orange.json';
import PRIMARY from '../../assets/colors/primary/Orange.json';
import NOTIFICATIONS from '../../assets/colors/Notifications.json';
import CARD_COLOR from '../../assets/colors/CardColors.json';


const theme = {
    ...PRIMARY,
    ...BASIC,
    ...NOTIFICATIONS,
    ...CARD_COLOR,
    'text-basic-color': BASIC['color-basic-600'],
    'text-primary-color': BASIC['color-basic-100'],
    'menu-item-icon-color': PRIMARY['color-primary-800'],
    'bread-crumb-color': PRIMARY['color-primary-800'],
    'login-back-ground-color': PRIMARY['color-primary-800'],
    'tab-color': BASIC['color-basic-800'],
    'theme-basic-color': BASIC['color-basic-700'],
    'theme-primary-color': PRIMARY['color-primary-800']
};

export default theme;
