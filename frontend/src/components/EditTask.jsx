import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { apiService } from '../services/api.service';
import { DateField, DropdownField, TextAreaField, TextField } from './form';
import Button from './ui/Button';
import { useTask } from '../hooks/useTask';
import useUsers from '../hooks/useUsers';
import { useFieldPro } from '../hooks/useFieldPro';
import { format } from 'date-fns';
import { CheckboxField } from './form/CheckboxField';

const emptyTask = {
  username: '',
  description: '',
  tags: '',
  date: '',
  done: false,
};

export default function EditTask() {
  const history = useHistory();
  const { id } = useParams();

  const users = useUsers();
  const task = useTask(id);
  const { data, register, addPartialData } = useFieldPro(emptyTask);

  const goToHomePage = () => history.replace('/');
  const goBack = () => history.goBack();

  const onSubmit = (event) => {
    event.preventDefault();
    const tags = data.tags.split(',').map((tag) => tag.trim());
    const date = new Date(data.date);
    onUpdateTask({ ...data, tags, date });
  };

  const onUpdateTask = (task) => {
    apiService
      .updateTaskById(id, task)
      .then((response) => console.log(response))
      .catch((err) => console.log(err.message))
      .finally(() => goToHomePage());
  };

  const required = { required: true };

  useEffect(() => {
    if (!task._id) return;
    const date = format(new Date(task.date), 'yyyy-MM-dd');
    const newTask = { ...task, tags: task.tags?.join(',') ?? '', date };
    console.log({ newTask });
    addPartialData(newTask);
  }, [task, addPartialData]);

  return (
    <>
      <div className="row pt-4 pb-3 align-items-center">
        <div className="col-md-3">
          <button className="btn alert-success" onClick={goBack}>
            <i className="fa fa-arrow-left pr-1" aria-hidden="true"></i>back
          </button>
        </div>
        <div className="col-md-6">
          <div className="h4 mb-0">Edit Task</div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <form onSubmit={onSubmit}>
            <div className="card mt-0 mb-4">
              <div className="card-body">
                <DropdownField
                  {...register('username', required)}
                  items={users}
                />
                <TextAreaField {...register('description', required)} />
                <TextField {...register('tags', required)} />
                <DateField {...register('date', required)} />
                <CheckboxField {...register('done')} label="complete" />
                <div className="pb-4"></div>
                <Button variant="warning">Update</Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
