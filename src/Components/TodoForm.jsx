import React from 'react'
import './todoForm.css'

const TodoForm = ({ inputHandler, addHandler, inputTodo, filterHandler, searchHandler, dueDateHandler, due }) => {
    return (
        <div className='form-container'>
            <input type="text" onChange={inputHandler} value={inputTodo} placeholder='Add a task...' className="input-field" />
            <input type="date" onChange={dueDateHandler} value={due} className="date-field" />
            <button onClick={addHandler} className="add-button">Add</button>
            <select onChange={filterHandler} className="filter-select">
                <option value="All">All</option>
                <option value="Completed">Completed</option>
                <option value="Incompleted">Incompleted</option>
            </select>
            <input type="search" placeholder='Search tasks...' onChange={searchHandler} className="search-field" />
        </div>
    )
}

export default TodoForm