import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Swal from "sweetalert2";

function App() {
    const [loading, setloading] = useState(true); 
    const [tasks, setTasks] = useState([]); 
    const [showAddTask, setShowAddTask] = useState(false); 
    
    useEffect(() => {
        setTimeout(() => {
            setloading(false);
        }, 3500);
    }, [])

    const getTasks = JSON.parse(localStorage.getItem("taskAdded"));
    useEffect(() => {
        if (getTasks == null) {
            setTasks([])
        } else {
            setTasks(getTasks);
        }
    }, [])

    const addTask = (task) => {
        const id = uuidv4();
        const newTask = { id, ...task }
        setTasks([...tasks, newTask]);
        Swal.fire({
            icon: 'success',
            title: 'Yay...',
            text: 'You have successfully added a new Contact!'
        })
        localStorage.setItem("taskAdded", JSON.stringify([...tasks, newTask]));
    }

    const deleteTask = (id) => {
        const deleteTask = tasks.filter((task) => task.id !== id);
        setTasks(deleteTask);
        Swal.fire({
            icon: 'success',
            title: 'Oops...',
            text: 'You have successfully deleted a Contact!'
        })
        localStorage.setItem("taskAdded", JSON.stringify(deleteTask));
    }

    const editTask = (id) => {
        const text = prompt("Name");
        const day = prompt("E-mail");
        let data = JSON.parse(localStorage.getItem('taskAdded'));
        const myData = data.map(x => {
            if (x.id === id) {
                return {
                    ...x,
                    text: text,
                    day: day,
                    id: uuidv4()
                }
            }
            return x;
        })
        Swal.fire({
            icon: 'success',
            title: 'Yay...',
            text: 'You have successfully edited an existing Contact!'
        })
        localStorage.setItem("taskAdded", JSON.stringify(myData));
        window.location.reload();
    }
    return (
        <>
            {
                loading ?
                    <div className="spinnerContainer">
                        <div className="spinner-grow text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <div className="spinner-grow text-secondary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <div className="spinner-grow text-success" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <div className="spinner-grow text-danger" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <div className="spinner-grow text-warning" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div> :
                    <div className="container">
                        {/* App Header that has open and App Name */}
                        <Header showForm={() => setShowAddTask(!showAddTask)} changeTextAndColor={showAddTask} />
                        {/* Revealing of Add Task Form */}
                        {showAddTask && <AddTask onSave={addTask} />}
                        {/* Task Counter */}
                        <h3>Number of Contacts: {tasks.length}</h3>
                        {/* Displaying of Tasks */}
                        {
                            tasks.length > 0 ?
                                (<Tasks tasks={tasks} onDelete={deleteTask} onEdit={editTask} />) :
                                ('No Contact Found!')
                        }
                    </div>
            }
        </>
    )
}
export default App;