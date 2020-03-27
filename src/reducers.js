const initialState = {
    data: '',
    loading: false,
    error: false,
    search: ''
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'REQUESTED_COUNTRIES':
            return {
                ...state,
                data: '',
                loading: true,
                error: false
            };
        case 'REQUESTED_COUNTRIES_SUCCEEDED':
            return {
                ...state,
                data: action.data,
                loading: false,
                error: false
            };
        case 'REQUESTED_COUNTRIES_FAILED':
            return {
                ...state,
                data: '',
                loading: false,
                error: true,
            };
        case 'SEARCH':
            return {
                ...state,
                search: action.data
            }
        default:
            return state;
    }
};
export default reducer