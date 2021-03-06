import React, { Component } from 'react';
import axios from 'axios';
import Global from '../Global';

class CreateUser extends Component {

    state = {
        username: ''
    }

    CambioUsername = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        const user = {
            username: this.state.username
        }
        console.log(user);
        axios.post(`${Global.url}/api/users/add`, user)
        .then(res => console.log(res.data));
        this.setState({ username: '' });
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card my-4">
                        <div className="card-header">
                            Create User
                        </div>
                        <div className="card-body">
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input type="text" name="username" value={this.state.username} onChange={this.CambioUsername} className="form-control"/>
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

export default CreateUser;