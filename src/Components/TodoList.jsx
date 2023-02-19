import React, { useEffect, useState } from 'react'
import TodoItem from './TodoItem'   // contains all items and operations like update, save, cancel
import TodoForm from './TodoForm';  // contains elements like input:text and button:add
import { v4 as uuidv4 } from 'uuid';
import './TodoList.css';

const TodoList = () => {
    const [todos, setTodos] = useState([]); // conatins all todo items in the form of array
    const [inputTodo, setInputTodo] = useState(''); // used to save input text on onChange
    const [filter, setFilter] = useState('All');
    const [search, setSearch] = useState('');
    const [due, setDue] = useState('');

    useEffect(() => {
        const savedTodos = JSON.parse(localStorage.getItem('todos') || '[]');   // check for todos and setTodos
        setTodos(savedTodos);
    }, []);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));   // whenever item gets add setItem in localStorage
    }, [todos]);

    const addHandler = () => {  // when clicked on add button run this function
        if (inputTodo.trim() === '' || due === '') return;    // when input is empty return
        const todoItem = {  // otherwise make a object with id, text and completed checkbox
            id: uuidv4(),
            text: inputTodo,
            completed: false,
            dueDate: due
        }
        console.log(todoItem.dueDate);
        setTodos([...todos, todoItem]); // set this object with previous todo items
        console.log(todoItem);
        setInputTodo('');
        setDue('');
    }

    const inputHandler = (e) => {
        setInputTodo(e.target.value);    // whenever input changes setInputTodo
    }

    const deleteHandler = (id) => {
        setTodos(todos.filter(todo => todo.id !== id)); // set only those todos whose id does not meet passed id which we want to delete
    }

    const editTodoHandler = (id, updatedText, updatedDue) => {  // after clicking on edit check whether id === todos.id and update the text of that todo to updatedText passed from todoItem.jsx
        const updatedTodo = todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, text: updatedText, dueDate: updatedDue }
            } else {
                return todo;
            }
        })
        setTodos(updatedTodo)
    }

    const toggleCheckbox = (id) => {    // toggle helps to keep track of task is completed or not
        const updateCheckBoxTodo = todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, completed: !todo.completed }  // only change completed of todo and other info as it is 
            }
            return todo;
        })
        setTodos(updateCheckBoxTodo);
    }

    const filterHandler = (e) => {  // after changing of type of filter from all, compeleted and incompleted change filter state of selected filter
        setFilter(e.target.value);
    }

    const searchHandler = (e) => {
        setSearch(e.target.value);
    }

    const dueDateHandler = (e) => {
        setDue(e.target.value);
    }

    const filteredTodos = todos.filter(item => {    // now we need to map todos over filteredTodos based on type of filter
        if (filter === 'All') {
            return true;
        } else if (filter === 'Incompleted') {
            return !item.completed || item.completed === undefined;
        } else {
            return item.completed || item.completed === undefined;
        }
    }).filter(item => {
        return item.text.toLowerCase().includes(search.toLowerCase());
    })

    return (
        <div className="TodoList">
            <div className="title-container">
                <h1 className="title">Todo List</h1>
            </div>
            <div className="form-container">
                <TodoForm
                    inputHandler={inputHandler}
                    addHandler={addHandler}
                    inputTodo={inputTodo}
                    filterHandler={filterHandler}
                    searchHandler={searchHandler}
                    dueDateHandler={dueDateHandler}
                    due={due}
                />
            </div>
            <div className="todo-items-container">
                {filteredTodos.map((item) => {
                    return (
                        <div className="todo-item container" key={item.id}>
                            <TodoItem item={item} deleteHandler={deleteHandler} onEdit={editTodoHandler} toggleCheckbox={toggleCheckbox} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default TodoList