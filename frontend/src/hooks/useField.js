export function useField() {
  const [value, setValue] = useState('');

  const handleField = (event) => setValue(event.target.value);

  return {
    value,
    onchange: handleField,
  };
}
