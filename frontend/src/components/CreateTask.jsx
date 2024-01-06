import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { apiService } from '../services/api.service';
import { DropdownField, NumberField, TextAreaField } from './form';
import useUsers from '../hooks/useUsers';
import Button from './ui/Button';
import { useFieldPro } from '../hooks/useFieldPro';

const emptyTask = {
  username: '',
  description: '',
  duration: 0,
};

export default function CreateTask() {
  const users = useUsers();
  const { data, register, addPartialData } = useFieldPro(emptyTask);

  const history = useHistory();

  const goToHomePage = () => history.replace('/');

  const onSubmit = (event) => {
    event.preventDefault();
    onSaveTask(data);
  };

  const onSaveTask = (task) => {
    apiService
      .createTask(task)
      .then((response) => console.log(response))
      .catch((err) => console.log(err.message))
      .finally(goToHomePage);
  };

  useEffect(() => {
    if (users.length <= 0) return;
    addPartialData({ username: users[0] });
  }, [users]);

  const required = { required: true };

  return (
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <div className="card my-4">
          <div className="card-header">Create Task</div>
          <div className="card-body">
            <form onSubmit={onSubmit}>
              <DropdownField
                {...register('username', required)}
                items={users}
              />
              <TextAreaField {...register('description', required)} />
              <NumberField {...register('duration', required)} />
              <Button variant="primary">Save</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
