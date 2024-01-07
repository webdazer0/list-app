import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { apiService } from '../services/api.service';
import { DateField, DropdownField, TextAreaField, TextField } from './form';
import useUsers from '../hooks/useUsers';
import Button from './ui/Button';
import { useFieldPro } from '../hooks/useFieldPro';

const emptyTask = {
  username: '',
  description: '',
  tags: '',
  date: '',
};

export default function CreateTask() {
  const history = useHistory();

  const users = useUsers();
  const { data, register, addPartialData } = useFieldPro(emptyTask);

  const goToHomePage = () => history.replace('/');
  const goBack = () => history.goBack();

  const onSubmit = (event) => {
    event.preventDefault();
    const tags = data.tags.split(',').map((tag) => tag.trim());
    const date = new Date(data.date);
    onSaveTask({ ...data, tags, date });
  };

  const onSaveTask = (task) => {
    apiService
      .createTask(task)
      .then((response) => console.log(response))
      .catch((err) => console.log(err.message))
      .finally(goToHomePage);
  };

  const required = { required: true };

  useEffect(() => {
    if (users.length <= 0) return;
    addPartialData({ username: users[0] });
  }, [users, addPartialData]);

  return (
    <>
      <div className="row pt-4 pb-3 align-items-center">
        <div className="col-md-3">
          <button className="btn alert-success" onClick={goBack}>
            <i className="fa fa-arrow-left pr-1" aria-hidden="true"></i>back
          </button>
        </div>
        <div className="col-md-6">
          <div className="h4 mb-0">Create New Task</div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card mt-0 mb-4">
            <div className="card-body">
              <form onSubmit={onSubmit}>
                <DropdownField
                  {...register('username', required)}
                  items={users}
                />
                <TextAreaField {...register('description', required)} />
                <TextField {...register('tags', required)} />
                <DateField {...register('date', required)} />
                <Button variant="primary">Save</Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
