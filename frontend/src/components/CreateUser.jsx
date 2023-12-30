import React, { useState } from 'react';
import { apiService } from '../services/api.service';

export default function CreateUser() {
  const [username, setUsername] = useState('');

  const onChangeUsername = (event) => {
    const { value } = event.target;
    setUsername(value);
  };

  const resetForm = () => setUsername('');

  const onSubmit = (event) => {
    event.preventDefault();
    const user = { username };

    apiService
      .createUser(user)
      .then((response) => console.log(response))
      .catch((err) => console.log(err.message))
      .finally(resetForm);
  };

  return (
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <div className="card my-4">
          <div className="card-header">Create User</div>
          <div className="card-body">
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="username"
                  value={username}
                  onChange={onChangeUsername}
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
