import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { apiService } from '../services/api.service';
import { DropdownField, TextAreaField, TextField } from './form';
import Button from './ui/Button';
import { useTask } from '../hooks/useTask';
import useUsers from '../hooks/useUsers';
import { useFieldPro } from '../hooks/useFieldPro';

const emptyTask = {
  username: '',
  description: '',
  tags: '',
};

export default function EditTask() {
  const history = useHistory();
  const { id } = useParams();

  const users = useUsers();
  const task = useTask(id);
  const { data, register, addPartialData } = useFieldPro(emptyTask);

  const goToHomePage = () => history.replace('/');

  const onSubmit = (event) => {
    event.preventDefault();
    const tags = data.tags.split(',').map((tag) => tag.trim());
    onUpdateTask({ ...data, tags });
  };

  const onUpdateTask = (task) => {
    apiService
      .updateTaskById(id, task)
      .then((response) => console.log(response))
      .catch((err) => console.log(err.message))
      .finally(() => goToHomePage());
  };

  useEffect(() => {
    console.log('✅ useEffect newTask');
    if (!task) return;
    const newTask = { ...task, tags: task.tags?.join(',') ?? '' };
    console.log({ newTask });
    addPartialData(newTask);
  }, [task, addPartialData]);

  return (
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <div className="card my-4">
          <div className="card-header">EDIT Task</div>
          <div className="card-body">
            <form onSubmit={onSubmit}>
              <DropdownField {...register('username')} items={users} />
              <TextAreaField {...register('description')} />
              <TextField {...register('tags')} />
              <div className="pb-4"></div>
              <Button variant="primary">Update</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
