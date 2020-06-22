const reducer = (state = {}, action) => {
    switch (action.type) {
        case 'GET_NEWS':
            return { ...state, loading: true };
        case 'NEWS_RECEIVED':
            return { ...state, news: action.json[0], loading: false }
        case 'GET_ALL_CUSTOMER':
            return { ...state, customer: action.customer, loading: false }
        case 'DELETE_SUCCESS':
            return { ...state, result: action.result, loading: false }
        case 'CREATE_SUCCESS':
            return { ...state, result: action.result, loading: false }
        default:
            return state;
    }
};
export default reducer;