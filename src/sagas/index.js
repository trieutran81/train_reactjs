import { put, takeLatest, all, ac } from 'redux-saga/effects';
function* fetchNews() {
    const json = yield fetch('http://newsapi.org/v2/everything?q=bitcoin&from=2020-05-18&sortBy=publishedAt&apiKey=8bb5ed2942e44b03856a2cd244309d5e')
        .then(response => response.json());
    yield put({ type: "NEWS_RECEIVED", json: json.articles, });
}
function* getCustomer() {
    const customer = yield fetch('http://localhost:3000/customer')
        .then(response => response.json());
    console.log('getCustomer', customer)
    yield put({ type: "GET_ALL_CUSTOMER", customer: customer });
}
function* createCustomer(action) {
    var {newCustomer}= action;
    console.log('newCustomer', newCustomer)
    const result = yield fetch(
        'http://localhost:3000/customer/', 
        {
         method: 'POST' ,
         headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(newCustomer),
        })
        .then(response => response.json());
    console.log('result', result)

    yield put({ type: "CREATE_SUCCESS", result: result });
}
function* deleteCustomer(action) {
    const result = yield fetch('http://localhost:3000/customer/' + action.id, { method: 'DELETE' })
        .then(response => response.json());
    console.log('result', result)

    yield put({ type: "DELETE_SUCCESS", result: result });
}

function* actionWatcher() {
    yield takeLatest('GET_NEWS', fetchNews)
}
function* actionGetCustomer() {
    yield takeLatest('GET_CUSTOMER', getCustomer)
}
function* actionCreateCustomer() {
    yield takeLatest('CREATE_CUSTOMER', createCustomer)
}
function* actionDeleteCustomer() {
    yield takeLatest('DELETE_CUSTOMER', deleteCustomer)
}
export default function* rootSaga() {
    yield all([
        actionWatcher(),
        actionGetCustomer(),
        actionCreateCustomer(),
        actionDeleteCustomer()
    ]);
}