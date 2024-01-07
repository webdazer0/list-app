import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiService } from '../services/api.service';

import { format, differenceInDays } from 'date-fns';

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
      <div className="d-flex justify-content-between py-4 align-items-center">
        <h4 className="mb-0">
          Tasks
          <span className="badge badge-danger rounded-circle ml-2 small h6">
            {tasks.length}
          </span>
        </h4>
        <Link className="btn alert-success" to="/task/create">
          <i className="fa fa-add pr-1" aria-hidden="true"></i> Add Task
        </Link>
      </div>

      <div className="row row-gap">
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
  const updatedAt = format(new Date(task.updatedAt), 'dd MMM, yyyy');
  const dueDate = format(new Date(task.date), 'dd MMM, yyyy');
  const now = Date.now();
  const difference = differenceInDays(new Date(task.date), now);
  const duration = difference < 0 ? 100 : difference < 30 ? 75 : 25;
  const styleColorMap = {
    25: 'bg-success',
    75: 'bg-success',
    100: 'bg-danger',
  };

  const styleColor = styleColorMap[duration];

  return (
    <div className="col-lg-4 col-md-6 col-sm-12">
      <div className="card rounded-lg shadow-sm ">
        <div className="card-header d-flex justify-content-between pr-0">
          <div>
            {task.tags.map((tag) => (
              <span key={tag} className="badge badge-pill badge-info">
                {tag}
              </span>
            ))}
          </div>
          <div className="btn-group">
            <button
              type="button"
              className="btn py-0"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fa fa-ellipsis-h" aria-hidden="true"></i>
            </button>
            <div className="dropdown-menu">
              <Link to={'/task/' + task._id} className="dropdown-item">
                <i
                  className="fa fa-pencil text-warning pr-2"
                  aria-hidden="true"
                ></i>
                Edit
              </Link>
              <Link
                to="/"
                onClick={() => onDelete(task._id)}
                className="dropdown-item"
              >
                <i
                  className="fa fa-trash text-danger pr-2"
                  aria-hidden="true"
                ></i>
                Delete
              </Link>
              <div className="dropdown-divider"></div>
              <div className="dropdown-item">View Author</div>
            </div>
          </div>
        </div>
        <div className="card-body">
          <p className="custom-wrap">
            <b>{task.description}</b>
          </p>
          <small>
            <i className="fa fa-clock pr-1 text-info" aria-hidden="true"></i>
            {dueDate}
          </small>
          <div className="progress my-2" style={{ height: '.4rem' }}>
            <div
              className={`progress-bar progress-bar-striped ${styleColor}`}
              role="progressbar"
              style={{ width: `${duration}%` }}
              aria-valuenow={duration}
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
          {task.done && (
            <span className=" alert alert-success py-1 px-2 small">
              Completed
              <i className="fa fa-check  pl-1" aria-hidden="true"></i>
            </span>
          )}
        </div>

        <div className="card-footer d-flex justify-content-between align-items-center">
          <span className="small">
            Last updated: <b>{updatedAt}</b>
          </span>

          <span
            className="avatar bg-secondary text-white"
            data-name={task.username?.slice(0, 2)?.toUpperCase()}
            data-toggle="tooltip"
            data-placement="top"
            title={task.username}
          ></span>
        </div>
      </div>
    </div>
  );
}
