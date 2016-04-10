export function createReducer(initialState, fnMap) {
    return (state = initialState, {type, payload}) => {
        const handle = fnMap[type];
        return handle ? handle(state, payload) : state;
    };
}

export function cutString(st, limit) {
    let cut = st.indexOf(' ', limit);
    if (cut == -1) {
        return st;
    }

    return st.substring(0, cut) + '...';
}
