import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { apiService } from '../services/api.service';

export default function CreateTask() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(null);

  const history = useHistory();

  const goToHomePage = () => history.replace('/');

  useEffect(() => {
    apiService.getUsers().then((data) => {
      if (data.length > 0) {
        setUsers(data.map((user) => user.username));
        setUsername(data[0]);
      }
    });
  }, []);

  const onSelectUser = (event) => {
    const { value } = event.target;
    setUsername(value);
  };

  const onUpdateDescription = (event) => {
    const { value } = event.target;
    setDescription(value);
  };

  const onUpdateDuration = (event) => {
    const { value } = event.target;
    setDuration(value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const task = {
      username,
      description,
      duration,
    };

    onSaveTask(task);
  };

  const onSaveTask = (task) => {
    apiService
      .createTask(task)
      .then((response) => console.log(response))
      .catch((err) => console.log(err.message))
      .finally(goToHomePage);
  };

  return (
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <div className="card my-4">
          <div className="card-header">Create Task</div>
          <div className="card-body">
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <select
                  name="username"
                  onChange={onSelectUser}
                  className="form-control"
                >
                  {users.map((user) => {
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
                  onChange={onUpdateDescription}
                  className="form-control"
                ></textarea>
              </div>
              <div className="form-group">
                <input
                  type="number"
                  name="duration"
                  onChange={onUpdateDuration}
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
