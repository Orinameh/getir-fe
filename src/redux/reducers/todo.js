import { ADD_TODO, FETCH_TODOS, UPDATE_TODO } from '../types';

const initialState = {
    data: []
};
export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TODOS:
            return {
                ...state,
                data: [...state.data, ...action.todos]
            };
        case ADD_TODO:
            return {
                ...state,
                data: [...state.data, action.todo]
            };
        case UPDATE_TODO:
            return {
                ...state,
                data: state.data.map((item) => {
                    if (item.id === action.todo.id) {
                        return action.todo;
                    }
                    return item;
                })
            };
        default:
            return state;
    }
};
