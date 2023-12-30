import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiService } from '../services/api.service';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  const getAllTasks = () => {
    apiService
      .getTasks()
      .then((response) => setTasks(response))
      .catch((err) => console.log(err.message));
  };

  const deleteTask = (id) => {
    apiService
      .deleteTaskById(id)
      .then((response) => console.log(response))
      .catch((err) => console.log(err.message))
      .finally(() => getAllTasks());
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  return (
    <div className="container">
      <h1>Task List</h1>
      <div className="row">
        <ItemTaskList items={tasks} onDelete={deleteTask} />
      </div>
    </div>
  );
}

// COMPONENTS

function ItemTaskList(props) {
  return props.items.map((task, i) => {
    return <ItemTask key={i} task={task} onDelete={props.onDelete} />;
  });
}

function ItemTask({ task, onDelete }) {
  return (
    <div className="col-md-4">
      <div className="card">
        <div className="card-header d-flex justify-content-between">
          {task.username}{' '}
          <span className="badge badge-pill badge-success">
            {task.duration}
          </span>
        </div>
        <div className="card-body">
          <p>{task.description}</p>
        </div>
        <div className="card-footer">
          <Link to={'/edit/' + task._id} className="btn btn-success mr-2">
            Edit
          </Link>
          <Link
            to="/"
            onClick={() => onDelete(task._id)}
            className="btn btn-danger"
          >
            Delete
          </Link>
        </div>
      </div>
    </div>
  );
}
