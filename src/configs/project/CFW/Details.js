import Logo from '../../../assets/image/CFW/Logo.png';
import Banner from '../../../assets/image/CFW/Banner.png';

const defaultValues = {
    LOGO_MENU: Logo,
    LOGO_LOGIN: Logo,
    BANNER_LOGIN: Banner,
    VERSION: '1.0',
    NAME: 'childAndFamilyWelfare',
    COPY_RIGHT: 'trois',
    POWERED_BY: 'trois',
    SLOGAN: 'slogan'
};

const details = {
    local: {
        ...defaultValues
    },
    dev: {
        ...defaultValues
    },
    stage: {
        ...defaultValues
    },
    test: {
        ...defaultValues
    },
    prod: {
        ...defaultValues
    }
};

export default details;
