import React, { Component } from "react";
import { apiService } from "../services/api.service";

class EditTask extends Component {
  state = {
    username: "",
    description: "",
    duration: 0,
    users: [],
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    apiService
      .getTaskById(id)
      .then((response) => {
        const { username, description, duration } = response;
        this.setState({
          username,
          description,
          duration,
        });
      })
      .catch((err) => console.log(err.message));

    apiService.getUsers().then((response) => {
      if (response.length > 0) {
        this.setState({
          users: response.map((user) => user.username),
        });
      }
    });
  }

  goToHomePage() {
    this.props.history.replace("/");
  }

  onSelectUser = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  onUpdateTaskDescription = (event) => {
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

    this.onUpdateTask(task);
  };

  onUpdateTask(task) {
    const { id } = this.props.match.params;

    apiService
      .updateTaskById(id, task)
      .then((response) => console.log(response))
      .catch((err) => console.log(err.message))
      .finally(() => this.goToHomePage());
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card my-4">
            <div className="card-header">EDIT Task</div>
            <div className="card-body">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <select
                    name="username"
                    onChange={this.onSelectUser}
                    value={this.state.username}
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
                    onChange={this.onUpdateTaskDescription}
                    value={this.state.description}
                    className="form-control"
                  ></textarea>
                </div>
                <div className="form-group">
                  <input
                    type="number"
                    name="duration"
                    onChange={this.onUpdateTaskDescription}
                    value={this.state.duration}
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

export default EditTask;
