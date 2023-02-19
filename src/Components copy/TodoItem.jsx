import React from "react";

const TodoItem = ({ todo, onDelete, onEdit }) => {
    const [editing, setEditing] = React.useState(false);
    const [updatedTodo, setUpdatedTodo] = React.useState(todo.text);

    const handleDelete = () => {
        onDelete(todo.id);
    };

    const handleEdit = () => {
        setEditing(true);
    };

    const handleSave = () => {
        onEdit(todo.id, updatedTodo);
        setEditing(false);
    };

    const handleCancel = () => {
        setUpdatedTodo(todo.text);
        setEditing(false);
    };

    const handleInputChange = (e) => {
        setUpdatedTodo(e.target.value);
    };

    return (
        <div className="todo-item">
            {editing ? (
                <>
                    <input type="text" value={updatedTodo} onChange={handleInputChange} />
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                </>
            ) : (
                <>
                    <span>{todo.text}</span>
                    <button onClick={handleEdit}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </>
            )}
        </div>
    );
};

export default TodoItem;