import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { apiService } from '../services/api.service';
import { DropdownField, NumberField, TextAreaField } from './form';
import Button from './ui/Button';
import { useTask } from '../hooks/useTask';
import useUsers from '../hooks/useUsers';
import { useFieldPro } from '../hooks/useFieldPro';

const emptyTask = {
  username: '',
  description: '',
  duration: 0,
};

export default function EditTask() {
  const history = useHistory();
  const { id } = useParams();

  const users = useUsers();
  const { task } = useTask(id);
  const { data, register, addPartialData } = useFieldPro(emptyTask);

  const goToHomePage = () => history.replace('/');

  const onSubmit = (event) => {
    event.preventDefault();
    onUpdateTask(data);
  };

  const onUpdateTask = (task) => {
    apiService
      .updateTaskById(id, task)
      .then((response) => console.log(response))
      .catch((err) => console.log(err.message))
      .finally(() => goToHomePage());
  };

  useEffect(() => {
    console.log('taskx => ', task);
    if (!task) return;
    addPartialData(task);
  }, [task]);

  return (
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <div className="card my-4">
          <div className="card-header">EDIT Task</div>
          <div className="card-body">
            <form onSubmit={onSubmit}>
              <DropdownField {...register('username')} items={users} />
              <TextAreaField {...register('description')} />
              <NumberField {...register('duration')} />
              <div className="pb-4"></div>
              <Button variant="primary">Update</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
