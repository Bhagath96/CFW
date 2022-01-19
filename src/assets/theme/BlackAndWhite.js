import BASIC from '../colors/basic/Black.json';
import PRIMARY from '../colors/primary/Black.json';
import NOTIFICATIONS from '../colors/Notifications.json';

const theme = {
    ...BASIC,
    ...PRIMARY,
    ...NOTIFICATIONS,
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
