import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { setUpdateTodo, updateTodo } from '../redux/actions/todo';
import { useDispatch } from 'react-redux';

function EditTodo({ setModal, modal, data }) {
    const [body, setBody] = useState('');
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    // Grab the id of the current Todo
    const id = modal.modalItemId;

    function closeModal() {
        setModal({
            showModal: false, // true or false
            modalType: undefined, // string: create, read, update, or delete,
            modalItemId: ''
        });
    }

    async function onEditTodo(e) {
        e.preventDefault();
        setLoading(true);
        const data_ = {
            title: body ? body : data[id].title,
            completed: status === 'complete' ? true : false
        };
        updateTodo(`todos/${data[id].id}`, data_)
            .then((res) => {
                dispatch(setUpdateTodo(res));
                setLoading(false);

                closeModal();
            })
            .catch((err) => {
                setLoading(false);
                // TODO: create a popup
                alert('There is an error', err);
            });
    }

    return (
        <form className="form" onSubmit={onEditTodo}>
            <h3> Edit Todo </h3>{' '}
            <div className="form-input">
                <label htmlFor="title">Title</label>
                <input
                    required
                    name="body"
                    defaultValue={data[id].title || ''}
                    placeholder="E.g Read books"
                    onChange={(e) => setBody(e.target.value)}
                />
            </div>
            <div className="form-input">
                <label htmlFor="status">Status</label>
                {/* eslint-disable-next-line jsx-a11y/no-onchange */}
                <select
                    name="status"
                    defaultValue={data[id].completed ? 'complete' : 'incomplete' || ''}
                    onChange={(e) => setStatus(e.target.value)}>
                    <option>Select status</option>
                    <option value="complete">Complete</option>
                    <option value="incomplete">Incomplete</option>
                </select>
            </div>
            <button type="submit" disabled={loading}>
                {loading ? 'Editing...' : 'Edit Todo'}
            </button>
        </form>
    );
}

EditTodo.propTypes = {
    setModal: PropTypes.func.isRequired,
    modal: PropTypes.shape({
        showModal: PropTypes.bool,
        modalType: PropTypes.string,
        modalItemId: PropTypes.string
    }),
    data: PropTypes.array.isRequired
};

export default EditTodo;
