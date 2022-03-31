import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import DatePicker from "react-horizontal-datepicker"
export default function Schedule() {
    // category array
    const cat = ["personal", "work", "shopping", "event", "other"]
    // todos to hold all todos
    const [todos, setTodos] = useState([])
    // todoData to hold todos from form
    const [todoData, setTodoData] = useState({
        time: "",
        title: "",
        done: false,
        category: "personal",
        date: new Date(Date.now()).toLocaleString('en', { dateStyle: 'short' })
    })
    // this function is used to update todos to/from localStorage
    const handleAddTodo = () => {

        if (localStorage.getItem("todos") !== null) {
            // if localStorage has data, get it from localStorage and concat new todo to it
            const localData = JSON.parse(localStorage.getItem("todos"))
            localData.push(todoData)
            localStorage.setItem('todos', JSON.stringify(localData))
            setTodos(localData)
        } else {
            // if localStorage is empty, add the new todo to it
            localStorage.setItem('todos', JSON.stringify([todoData]))
            setTodos([todoData])

        }

    }
    // get the todos from localstorage on page load
    useEffect(() => {
        localStorage.getItem("todos") !== null
            ? setTodos(JSON.parse(localStorage.getItem("todos")))
            : setTodos([])
    }, [])
    // handle the change of date in the datepicker
    const selectedDay = val => {
        setTodoData({ ...todoData, date: new Date(val).toLocaleString('en', { dateStyle: 'short' }) })
    };


    return (
        <div className='container'>
            {/* Navigation bar starts */}
            <div className='mt-3 d-flex justify-content-between'>
                <h4 data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasExample"><i className="bi bi-list"></i></h4>
                <h1>SCHEDULE</h1>
                <h4 data-bs-toggle="modal" data-bs-target="#todoModal"><i className="bi bi-plus-square"></i></h4>
            </div>
            {/* Navigation bar end */}
            {/* Date Picker */}
            <div className="alert-primary p-5 my-2 d-flex gap-5 shadow">
                <DatePicker
                    getSelectedDay={selectedDay}
                    labelFormat={"MMM"}
                    color="black"
                />
            </div>
            {/* Date Picker end*/}
            {/* Display Todo  Cards */}
            <div className="todoList">
                {
                    todos.map(item => <div key={item.title} className="card mt-3">
                        <div className="card-body d-flex align-items-center justify-content-between mt-2 shadow">
                            <div className='d-flex gap-5'>
                                <div className="p-4  ">
                                    {item.time} {item.date}
                                </div>
                                <div>
                                    <h3 style={{ textTransform: 'capitalize' }}>{item.title}</h3>
                                    <p style={{ textTransform: 'capitalize' }}>{item.category}</p>
                                </div>
                            </div>
                            <input
                                type="checkbox"
                                className='form-check-input'
                            />
                        </div>
                    </div>)
                }
            </div>
            {/* Display Todo  Cards End*/}

            {/* Modal window to add Todos */}
            <div className="modal fade" id='todoModal'>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add Todo</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <input
                                type="text"
                                className="form-control"
                                onChange={e => setTodoData({ ...todoData, title: e.target.value })}
                            />
                            <br />
                            <input
                                type="time"
                                className='form-control'
                                onChange={e => setTodoData({ ...todoData, time: e.target.value })}
                            />
                            <br />
                            <select className="form-control" onChange={e => setTodoData({ ...todoData, category: e.target.value })}>
                                {
                                    cat.map(item => <option key={item}>{item}</option>)
                                }
                            </select>
                        </div>
                        <div className="modal-footer">
                            <button
                                onClick={handleAddTodo}
                                type="button"
                                className="btn btn-primary"
                                data-bs-dismiss="modal"
                            >Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal window to add Todos Ends */}
            {/* Sidebar Menu Starts */}
            <>
                <div
                    className="offcanvas offcanvas-start"
                    tabIndex={-1}
                    id="offcanvasExample"
                    aria-labelledby="offcanvasExampleLabel"
                >
                    <div className="offcanvas-header bg-primary">
                        <h5 className="offcanvas-title text-light">
                            Menu
                        </h5>
                        <button
                            type="button"
                            className="btn-close text-reset"
                            data-bs-dismiss="offcanvas"
                            
                        />
                    </div>
                    <div className="offcanvas-body">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className='nav-link' to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className='nav-link' to="/schedule">Schedule</Link>
                            </li>

                        </ul>
                    </div>
                </div>
            </>
            {/* Sidebar Menu end */}

        </div>
    )
}
