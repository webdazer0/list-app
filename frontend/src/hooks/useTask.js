import { useEffect, useState } from 'react';
import { apiService } from '../services/api.service';

const emptyTask = {
  username: '',
  description: '',
  tags: '',
};

export const useTask = (id) => {
  const [task, setTask] = useState(emptyTask);

  useEffect(() => {
    if (id) {
      apiService
        .getTaskById(id)
        .then(setTask)
        .catch((err) => console.log(err.message));
    }
  }, [id]);

  return task;
};
