import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { apiService } from '../services/api.service';

export default function EditTask() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(0);

  const history = useHistory();
  const params = useParams();
  const { id } = params;

  const goToHomePage = () => history.replace('/');

  const handleUsername = (event) => setUsername(event.target.value);

  const handleDescription = (event) => setDescription(event.target.value);

  const handleDuration = (event) => setDuration(event.target.value);

  const onSubmit = (event) => {
    event.preventDefault();
    const task = {
      username,
      description,
      duration,
    };

    onUpdateTask(task);
  };

  const onUpdateTask = (task) => {
    apiService
      .updateTaskById(id, task)
      .then((response) => console.log(response))
      .catch((err) => console.log(err.message))
      .finally(() => goToHomePage());
  };

  useEffect(() => {
    apiService
      .getTaskById(id)
      .then((response) => {
        console.log(response);
        setUsername(response.username);
        setDescription(response.description);
        setDuration(response.duration);
      })
      .catch((err) => console.log(err.message));

    apiService.getUsers().then((response) => {
      setUsers(response.map((user) => user.username));
    });
  }, [id]);

  return (
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <div className="card my-4">
          <div className="card-header">EDIT Task</div>
          <div className="card-body">
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <select
                  name="username"
                  onChange={handleUsername}
                  value={username}
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
              <InputTextAreaField
                name="description"
                type="text"
                onChange={handleDescription}
                value={description}
                className="form-control"
              />
              <InputField
                name="duration"
                type="number"
                onChange={handleDuration}
                value={duration}
              />
              <button className="btn btn-success btn-block">Update</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

const InputField = ({ value, onChange, name, type }) => {
  return (
    <div className="form-group">
      <input
        type={type}
        name={name}
        onChange={onChange}
        value={value}
        className="form-control"
      />
    </div>
  );
};

const InputTextAreaField = ({ value, onChange, name, type }) => {
  return (
    <div className="form-group">
      <textarea
        type={type}
        name={name}
        onChange={onChange}
        value={value}
        className="form-control"
      ></textarea>
    </div>
  );
};
