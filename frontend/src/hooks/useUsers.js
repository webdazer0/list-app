import { useEffect, useState } from 'react';
import { apiService } from '../services/api.service';

export default function useUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    apiService
      .getUsers()
      .then((response) => response.map((user) => user.username))
      .then(setUsers);
  }, []);

  return {
    users,
  };
}
