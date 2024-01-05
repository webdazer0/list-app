import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { apiService } from '../services/api.service';
import { DropdownField, NumberField, TextAreaField } from './form';
import Button from './ui/Button';
import { useTask } from '../hooks/useTask';
import useUsers from '../hooks/useUsers';

export default function EditTask() {
  const history = useHistory();
  const { id } = useParams();

  const { users } = useUsers();
  const { task, onChange } = useTask(id);

  const goToHomePage = () => history.replace('/');

  const onSubmit = (event) => {
    event.preventDefault();
    onUpdateTask(task);
  };

  const onUpdateTask = (task) => {
    apiService
      .updateTaskById(id, task)
      .then((response) => console.log(response))
      .catch((err) => console.log(err.message))
      .finally(() => goToHomePage());
  };

  return (
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <div className="card my-4">
          <div className="card-header">EDIT Task</div>
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
              <div className="pb-4"></div>
              <Button variant="primary">Update</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
