import React, { Component } from "react";
import { apiService } from "../services/api.service";

class CreateTask extends Component {
  state = {
    username: "",
    description: "",
    duration: 0,
    users: [],
  };

  goToHomePage() {
    this.props.history.replace("/");
  }

  componentDidMount() {
    apiService.getUsers().then((res) => {
      if (res.length > 0) {
        this.setState({
          users: res.map((user) => user.username),
          username: res[0].username,
        });
      }
    });
  }

  onSelectUser = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  onUpdateField = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const task = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
    };

    this.onSaveTask(task);
  };

  onSaveTask(task) {
    apiService.createTask(task)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.message))
      .finally(() => this.goToHomePage());
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card my-4">
            <div className="card-header">Create Task</div>
            <div className="card-body">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <select
                    name="username"
                    onChange={this.onSelectUser}
                    className="form-control"
                  >
                    {this.state.users.map((user) => {
                      return (
                        <option key={user} value={user}>
                          {user}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="form-group">
                  <textarea
                    type="text"
                    name="description"
                    onChange={this.onUpdateField}
                    className="form-control"
                  ></textarea>
                </div>
                <div className="form-group">
                  <input
                    type="number"
                    name="duration"
                    onChange={this.onUpdateField}
                    className="form-control"
                  />
                </div>
                <button className="btn btn-primary btn-block">Save</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateTask;
