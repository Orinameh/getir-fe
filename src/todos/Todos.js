import React from 'react';
import PropTypes from 'prop-types';
import './todo.css';

function Todos({ data, setModal }) {
    return data.map((datum, i) => {
        return (
            <div key={i} className={`todo ${datum.completed ? 'complete' : ''}`}>
                <p>{datum.title}</p>
                <button
                    onClick={() => {
                        setModal({
                            showModal: true,
                            modalType: 'edit',
                            modalItemId: `${i}`
                        });
                    }}>
                    Edit
                </button>
                <button
                    className="delete"
                    onClick={() => {
                        setModal({
                            showModal: true,
                            modalType: 'delete',
                            modalItemId: `${i}`
                        });
                    }}>
                    X
                </button>
            </div>
        );
    });
}

Todos.propTypes = {
    data: PropTypes.array.isRequired,
    setModal: PropTypes.func,
    modal: PropTypes.shape({
        showModal: PropTypes.bool,
        modalType: PropTypes.string,
        modalItemId: PropTypes.string
    })
};
export default Todos;
