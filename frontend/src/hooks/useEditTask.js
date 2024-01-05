const emptyTask = {
  username: '',
  description: '',
  duration: 0,
};

export const useTask = () => {
  const [task, setTask] = useState(emptyTask);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  return {
    task,
    setTask,
    onChange: handleChange,
  };
};
