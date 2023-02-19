import React, { useState } from 'react'
import './todoItem.css'

const TodoItem = ({ item, deleteHandler, onEdit, toggleCheckbox }) => {
    const [isEditing, setIsEditing] = useState(false);  // it is used for editing purpose
    const [inputUpdateTodo, setInputUpdateTodo] = useState(item.text);  // used for keeping track of new text of todo
    const [dueUpdateTodo, setDueUpdateTodo] = useState(item.dueDate);

    const inputChangeHandler = (e) => {
        setInputUpdateTodo(e.target.value)
    }

    const dueChangeHandler = (e) => {
        setDueUpdateTodo(e.target.value);
    }

    const editHandler = () => {
        setIsEditing(true);
    }

    const saveHandler = () => {
        onEdit(item.id, inputUpdateTodo, dueUpdateTodo);
        setIsEditing(false);
    }

    const cancelHandler = () => {
        setInputUpdateTodo(item.text);
        setIsEditing(false);
    }

    const checkBoxHandler = () => {
        toggleCheckbox(item.id);
    }

    return (
        <div className="item-info">
            {
                isEditing ? (
                    <div className="edit-mode">
                        <input type="text" value={inputUpdateTodo} onChange={inputChangeHandler} className="edit-input" />
                        <input type="date" value={dueUpdateTodo} onChange={dueChangeHandler} className="edit-due" />
                        <div className="edit-button-container">
                            <button onClick={saveHandler} className="edit-save">Save</button>
                            <button onClick={cancelHandler} className="edit-cancel">Cancel</button>
                        </div>
                    </div>
                ) : (
                    <div className={item.completed ? 'completed item-container' : 'item-container'}>
                        <input type="checkbox" onChange={checkBoxHandler} checked={item.completed} className="checkbox" />
                        <div className="text-container">
                            <span className="text">{item.text}</span>
                            <span className="due-date">Due date: {item.dueDate}</span>
                        </div>
                        <div className="button-container">
                            <button onClick={editHandler} className="edit-button">Edit</button>
                            <button onClick={() => deleteHandler(item.id)} className="delete-button">Delete</button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default TodoItem