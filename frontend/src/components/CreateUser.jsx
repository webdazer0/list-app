import React, { useState } from 'react';
import { apiService } from '../services/api.service';
import Button from './ui/Button';
import { TextField } from './form';

export default function CreateUser() {
  const [username, setUsername] = useState('');

  const onChangeUsername = (event) => setUsername(event.target.value);

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
              <TextField
                name="username"
                value={username}
                onChange={onChangeUsername}
              />
              <Button variant="primary">Save</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
