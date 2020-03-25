import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import {requestCountries, requestCountriesSuccess, requestCountriesError} from './actions'
import regeneratorRuntime from "regenerator-runtime";

function* watchFetchCountries() {
    yield takeEvery('FETCHED_COUNTRIES', fetchCountriesAsync);
}

function* fetchCountriesAsync() {
    try {
        yield put(requestCountries());
        const data = yield call(() => {
            return fetch('https://restcountries.eu/rest/v2/all')
                .then(res => res.json())
            });
        yield put(requestCountriesSuccess(data));
    } catch (error) {
        yield put(requestCountriesError());
    }
}
export default watchFetchCountries
