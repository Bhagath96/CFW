/* eslint-disable no-undef */
const fileExists = require('file-exists');

const getFavIcon = (project) => {
    const defaultPath = './src/assets/image/favicon.ico';
    let path = project ? `./src/assets/image/${project}/favicon.ico` : defaultPath;
    fileExists(path).then(exists => {
        path = exists ? path : defaultPath;
    });
    return path;
};

module.exports = { getFavIcon };
