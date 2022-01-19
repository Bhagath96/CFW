import { fork, all } from 'redux-saga/effects';
import _ from 'lodash';
import * as modules from '../modules';


let sagas = [];
_.values(modules).forEach(module => {
    if (module.saga) {
        sagas.push(fork(module.saga));
    }
});

export default function* root() {
    yield all(sagas);
}
