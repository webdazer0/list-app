import { useCallback, useState } from 'react';

export const useFieldPro = (initialData = {}) => {
  const [data, setData] = useState(initialData);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const addPartialData = useCallback((otherData = {}) => {
    setData((prev) => ({ ...prev, ...otherData }));
  }, []);

  const register = (name, props = {}) => {
    return {
      name,
      onChange: handleChange,
      value: data[name],
      ...props,
    };
  };

  return {
    data,
    register,
    addPartialData,
  };
};
