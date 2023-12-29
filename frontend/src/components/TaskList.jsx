import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Global from "../Global";

class TaskList extends Component {
  state = {
    data: [],
  };

  getAllTasks() {
    axios
      .get(`${Global.url}/tasks`)
      .then((res) => {
        this.setState({ data: res.data });
        return console.log(this.state);
      })
      .catch((err) => console.log(err.message));
  }

  componentDidMount() {
    this.getAllTasks();
  }

  deleteTask = (id) => {
    axios
      .delete(`${Global.url}/tasks/${id}`)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.message))
      .finally(() => this.getAllTasks());
  };

  render() {
    return (
      <div className="container">
        <h1>Task List</h1>
        <div className="row">
          <ItemTaskList items={this.state.data} onDelete={this.deleteTask} />
        </div>
      </div>
    );
  }
}

export default TaskList;

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
          {task.username}{" "}
          <span className="badge badge-pill badge-success">
            {task.duration}
          </span>
        </div>
        <div className="card-body">
          <p>{task.description}</p>
        </div>
        <div className="card-footer">
          <Link to={"/edit/" + task._id} className="btn btn-success mr-2">
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
