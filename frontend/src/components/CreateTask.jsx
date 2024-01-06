import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { apiService } from '../services/api.service';
import { DropdownField, TextAreaField, TextField } from './form';
import useUsers from '../hooks/useUsers';
import Button from './ui/Button';
import { useFieldPro } from '../hooks/useFieldPro';

const emptyTask = {
  username: '',
  description: '',
  tags: '',
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
    onSaveTask({ ...data, tags });
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
    console.log('✅ useEffect CT');
    if (users.length <= 0) return;
    addPartialData({ username: users[0] });
  }, [users, addPartialData]);

  return (
    <>
      <div className="row py-4">
        <div className="col-md-2">
          <button className="btn alert-success" onClick={goBack}>
            <i className="fa fa-arrow-left pr-1" aria-hidden="true"></i>back
          </button>
        </div>
      </div>
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
                <TextField {...register('tags', required)} />
                <Button variant="primary">Save</Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
