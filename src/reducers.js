const initialState = {
    data: '',
    loading: false,
    error: false
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'REQUESTED_COUNTRIES':
            return {
                data: '',
                loading: true,
                error: false
            };
        case 'REQUESTED_COUNTRIES_SUCCEEDED':
            return {
                data: action.data,
                loading: false,
                error: false
            };
        case 'REQUESTED_COUNTRIES_FAILED':
            return {
                data: '',
                loading: false,
                error: true,
            };
        default:
            return state;
    }
};
export default reducer