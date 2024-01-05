import React from 'react';
import { useHistory } from 'react-router-dom';
import { apiService } from '../services/api.service';
import { useTask } from '../hooks/useTask';
import { DropdownField, NumberField, TextAreaField } from './form';
import useUsers from '../hooks/useUsers';
import Button from './ui/Button';

export default function CreateTask() {
  const { users } = useUsers();
  const { task, onChange } = useTask();

  const history = useHistory();

  const goToHomePage = () => history.replace('/');

  const onSubmit = (e) => {
    e.preventDefault();
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
              <DropdownField
                name="username"
                onChange={onChange}
                value={task.username}
                items={users}
              />
              <TextAreaField
                name="description"
                onChange={onChange}
                value={task.description}
              />
              <NumberField
                name="duration"
                onChange={onChange}
                value={task.duration}
              />
              <Button variant="primary">Save</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
