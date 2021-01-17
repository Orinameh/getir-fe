import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteTodo, setDeleteTodo } from '../redux/actions/todo';

function DeleteTodo({ setModal, modal, data }) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    // Grab the id of the current Todo
    const id = modal.modalItemId;
    console.log(data, id);

    function closeModal() {
        setModal({
            showModal: false, // true or false
            modalType: undefined, // string: create, read, update, or delete,
            modalItemId: ''
        });
    }

    async function onDeleteTodo(e) {
        e.preventDefault();
        setLoading(true);
        deleteTodo(`todos/${data[id].id}`)
            .then((res) => {
                console.log(res, data, id);
                setLoading(false);
                dispatch(setDeleteTodo(data[id].id));
                closeModal();
            })
            .catch((err) => {
                setLoading(false);
                console.log(data, id);

                // TODO: create a popup
                alert('There is an error', err);
            });
    }
    return (
        <form className="form" onSubmit={onDeleteTodo}>
            <h3> Are you sure you want to delete this Todo? </h3>{' '}
            <button type="submit">{loading ? 'Deleting Todo...' : 'Delete Todo'}</button>
        </form>
    );
}

DeleteTodo.propTypes = {
    setModal: PropTypes.func.isRequired,
    modal: PropTypes.shape({
        showModal: PropTypes.bool,
        modalType: PropTypes.string,
        modalItemId: PropTypes.string
    }),
    data: PropTypes.array.isRequired
};

export default DeleteTodo;
