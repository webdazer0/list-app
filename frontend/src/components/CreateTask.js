import axios from "axios";
import React, { Component } from "react";
import Global from "../Global";

class CreateTask extends Component {
  state = {
    username: "",
    description: "",
    duration: 0,
    users: [],
  };

  componentDidMount() {
    // this.setState({
    //     users: ['test user', 'user 2'],
    //     username: 'test user'
    // });
    axios.get(`${Global.url}/api/users`).then((res) => {
      if (res.data.length > 0) {
        this.setState({
          users: res.data.map((user) => user.username),
          username: res.data[0].username,
        });
      }
    });
  }

  CambioUser = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  Cambio = (e) => {
    const { name, value } = e.target;
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

    console.log(this.state);
    axios
      .post(`${Global.url}/api/tasks/add`, task)
      .then((res) => {
        console.log(res.data);
        return (window.location = "/");
      })
      .catch((err) => console.log("Something went wrong!"));
  };

  render() {
    return (
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card my-4">
            <div className="card-header">Create Exercice</div>
            <div className="card-body">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <select
                    name="username"
                    onChange={this.CambioUser}
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
                    onChange={this.Cambio}
                    className="form-control"
                  ></textarea>
                </div>
                <div className="form-group">
                  <input
                    type="number"
                    name="duration"
                    onChange={this.Cambio}
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
