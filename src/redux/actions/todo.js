import { DELETE, GET, POST, PUT } from '../../api';
import { ADD_TODO, DELETE_TODO, FETCH_TODOS, UPDATE_TODO } from '../types';

// GET Todos
export const setTodos = (todos) => {
    return {
        type: FETCH_TODOS,
        todos
    };
};
export const fetchTodos = (endpoint) => {
    return GET(endpoint).then((res) => res.json());
};

// Create Todos
export const setTodo = (todo) => {
    return {
        type: ADD_TODO,
        todo
    };
};

export const createTodo = (endpoint, data) => {
    return POST(endpoint, data).then((res) => res.json());
};

// Update Todos
export const setUpdateTodo = (todo) => {
    return {
        type: UPDATE_TODO,
        todo
    };
};

export const updateTodo = (endpoint, data) => {
    return PUT(endpoint, data).then((res) => res.json());
};

// Delete Todos
export const setDeleteTodo = (id) => {
    return {
        type: DELETE_TODO,
        id
    };
};

export const deleteTodo = (endpoint) => {
    return DELETE(endpoint).then((res) => res.json());
};
