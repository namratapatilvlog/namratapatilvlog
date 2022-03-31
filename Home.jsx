import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import DatePicker from "react-horizontal-datepicker"

export default function Home() {
    const [todos, setTodos] = useState([])
    const cat = ["personal", "work", "shopping", "event", "other"]
    const updateData = () => {
        // if localStorage has data, get it from localStorage otherwise set it to empty array
        localStorage.getItem("todos") !== null
            ? setTodos(JSON.parse(localStorage.getItem("todos")))
            : setTodos([])
    }
    useEffect(() => {
        // Load Data From localStorage
        updateData()
    }, [])

    // handle the count of todos in each category
    const countTodos = () => {
        let count = {
            personal: 0,
            work: 0,
            shopping: 0,
            event: 0,
            other: 0
        }
        todos.map(item => {
            count[item.category]++
        })
        return count
    }
    return (
        <div className='container'>
            {/* Navigation Bar */}
            <div className='mt-3 d-flex justify-content-between'>
                <h4 data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasExample"><i className="bi bi-list"></i></h4>
                <h1>HOME</h1>
                <span></span>
            </div>````````````````````````
            {/* Navigation Bar End */}

            {/* Date Picker */}
            //<div className="alert-primary p-5 my-2 d-flex gap-5 shadow">
                <DatePicker
                    labelFormat={"MMM"}
                    color="black"
                />
            </div>
            {/* Date Picker End */}
            {/* Category Card  */}
            {
                cat.map(item => <div className="card mt-2 shadow" key={item}>
                    <div className="card-body d-flex align-items-center">
                        <div className='alert-primary circle me-3 shadow-sm'>
                            {item[0]}
                        </div>
                        <div>
                            <h5 style={{ textTransform: 'capitalize' }}>{item}</h5>
                            <p className='text-text-muted'>{`${countTodos()[item]} Task`}</p>
                        </div>
                    </div>
                </div>)
            }

            {/* Category Card End */}
            {/* Sidebar Mennu */}
            <div
                className="offcanvas offcanvas-start"
                tabIndex={-1}
                id="offcanvasExample"
                aria-labelledby="offcanvasExampleLabel"
            >
                <div className="offcanvas-header bg-primary">
                    <h5 className="offcanvas-title text-light" id="offcanvasExampleLabel">
                        Menu
                    </h5>
                    <button
                        type="button"
                        className="btn-close text-reset"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
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
            {/* Sidebar Menu End */}
        </div >
    )
}
