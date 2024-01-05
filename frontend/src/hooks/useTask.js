import { useEffect, useState } from 'react';
import { apiService } from '../services/api.service';

const emptyTask = {
  username: '',
  description: '',
  duration: 0,
};

export const useTask = (id) => {
  const [task, setTask] = useState(emptyTask);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (id) {
      apiService
        .getTaskById(id)
        .then(setTask)
        .catch((err) => console.log(err.message));
    }
  }, [id]);

  return {
    task,
    onChange: handleChange,
  };
};
