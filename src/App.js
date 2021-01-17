import React, { useEffect, useState } from 'react';
import './App.css';
// import data from './data';
import Modal from './modal/Modal';
import AddTodo from './todos/AddTodo';
import Todos from './todos/Todos';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, setTodos } from './redux/actions/todo';
import EditTodo from './todos/EditTodo';
import DeleteTodo from './todos/DeleteTodo';

function App() {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.todo.data);
    const [modal, setModal] = useState({
        showModal: false,
        modalType: undefined,
        modalItemId: ''
    });
    const [fetching, setFetching] = useState(false);

    useEffect(() => {
        setFetching(true);
        fetchTodos('todos')
            .then((data) => {
                setFetching(false);
                dispatch(setTodos(data));
            })
            .catch((err) => {
                setFetching(false);
                // TODO: create a popup
                alert('There is an error', err);
            });
    }, [dispatch]);

    function showModalForm() {
        switch (modal.modalType) {
            case 'add':
                return <AddTodo {...{ setModal, modal }} />;
            case 'edit':
                return <EditTodo {...{ setModal, modal, data }} />;
            case 'delete':
                return <DeleteTodo {...{ setModal, modal, data }} />;
            default:
                return;
        }
    }

    if (fetching) {
        return (
            <div className="App">
                <p>Fetching Todos....</p>
            </div>
        );
    }

    if (data.length === 0) {
        return (
            <div className="App">
                <p className="msg">No Tasks available yet, Click the button below to create</p>
                <button
                    className="App-add-new"
                    onClick={() =>
                        setModal({
                            showModal: true,
                            modalType: 'add'
                        })
                    }>
                    &#x2b;
                </button>
                <Modal
                    {...{
                        modal,
                        setModal
                    }}>
                    {showModalForm()}
                </Modal>
            </div>
        );
    }
    return (
        <div className="App">
            <div className="App-header">
                <h2> Here is your Todo List </h2>
                <p>
                    {data.length} {'  '}
                    Tasks
                </p>
            </div>
            <button
                className="App-add"
                onClick={() =>
                    setModal({
                        showModal: true,
                        modalType: 'add'
                    })
                }>
                &#x2b;{' '}
            </button>{' '}
            <Todos {...{ data, setModal }} />
            <Modal
                {...{
                    modal,
                    setModal
                }}>
                {showModalForm()}
            </Modal>{' '}
        </div>
    );
}

export default App;
