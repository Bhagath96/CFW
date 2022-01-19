const defaultValues = {
    apiServer: {
        url: 'https://cfw-api-dev.trois.in:9443'
    },
    authServer: {
        url: 'https://cfw-api-dev.trois.in:8443'
    }
};

const urls = {
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

export default urls;
