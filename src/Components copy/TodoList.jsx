import React from "react";
import TodoItem from "./TodoItem";

const TodoList = () => {
    const [todos, setTodos] = React.useState([]);
    const [newTodo, setNewTodo] = React.useState("");

    const handleAddTodo = () => {
        if (newTodo.trim() === "") return;
        const id = Math.floor(Math.random() * 100000);
        const newTodoItem = { id, text: newTodo };
        setTodos([...todos, newTodoItem]);
        setNewTodo("");
    };

    const handleDeleteTodo = (id) => {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
    };

    const handleEditTodo = (id, updatedText) => {
        const updatedTodos = todos.map((todo) => {
            if (todo.id === id) {
                return { ...todo, text: updatedText };
            } else {
                return todo;
            }
        });
        setTodos(updatedTodos);
    };

    return (
        <div className="todo-list">
            <h1>Todo List</h1>
            <div className="todo-form">
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                />
                <button onClick={handleAddTodo}>Add Todo</button>
            </div>
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onDelete={handleDeleteTodo}
                    onEdit={handleEditTodo}
                />
            ))}
        </div>
    )
}

export default TodoList