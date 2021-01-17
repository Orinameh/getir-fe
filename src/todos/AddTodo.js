import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { createTodo, setTodo } from '../redux/actions/todo';

function AddTodo({ setModal }) {
    const [body, setBody] = useState('');
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    function closeModal() {
        setModal({
            showModal: false, // true or false
            modalType: undefined, // string: create, read, update, or delete,
            modalItemId: ''
        });
    }

    async function onAddTodo(e) {
        e.preventDefault();
        setLoading(true);
        const data = { title: body, completed: false, url: `${process.env.REACT_APP_URL}todos` };
        createTodo('todos', data)
            .then(() => {
                setLoading(false);
                dispatch(setTodo(data));
                closeModal();
            })
            .catch((err) => {
                setLoading(false);
                // TODO: create a popup
                alert('There is an error', err);
            });
    }
    return (
        <form className="form" onSubmit={onAddTodo}>
            <h3> Add New Todo </h3>{' '}
            <div className="form-input">
                <label htmlFor="title">Title</label>

                <input
                    required
                    name="body"
                    value={body}
                    placeholder="E.g Read books"
                    autoComplete="off"
                    onChange={(e) => setBody(e.target.value)}
                />
            </div>
            <button type="submit">{loading ? 'Adding Todo...' : 'Add Todo'}</button>
        </form>
    );
}

AddTodo.propTypes = {
    setModal: PropTypes.func.isRequired,
    modal: PropTypes.shape({
        showModal: PropTypes.bool,
        modalType: PropTypes.string,
        modalItemId: PropTypes.string
    })
};

export default AddTodo;
