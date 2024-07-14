import client from 'api/client';
import Cookies from 'js-cookie';
import { Todo } from 'models/Todo';

const getAuthHeaders = () => ({
  'access-token': Cookies.get('_access_token') || '',
  'client': Cookies.get('_client') || '',
  'uid': Cookies.get('_uid') || ''
});

const todoAPI = {
  get(userId: number, page = 1, limit = 20) {
    return client.get(`/users/${userId}/todos?_page=${page}&_limit=${limit}&_sort=name`, {
      headers: getAuthHeaders()
    })
    .then(response => response.data)
    .then(data => data.map((item: any) => new Todo(item)))
    .catch(error => {
      console.error('Error retrieving todos:', error);
      throw new Error('There was an error retrieving the todos. Please try again.');
    });
  },

  post(userId: number, todo: Todo) {
    return client.post(`/users/${userId}/todos`, todo, {
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      }
    })
    .then(response => response.data)
    .catch(error => {
      console.error('Error posting todo:', error);
      throw new Error('There was an error creating the todo. Please try again.');
    });
  },

  put(userId: number, todo: Todo) {
    return client.put(`/users/${userId}/todos/${todo.id}`, todo, {
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      }
    })
    .then(response => response.data)
    .catch(error => {
      console.error('Error updating todo:', error);
      throw new Error('There was an error updating the todo. Please try again.');
    });
  },

  delete(userId: number, todo: Todo) {
    return client.delete(`/users/${userId}/todos/${todo.id}`, {
      headers: getAuthHeaders()
    })
    .then(response => response.data)
    .catch(error => {
      console.error('Error deleting todo:', error);
      throw new Error('There was an error deleting the todo. Please try again.');
    });
  },

  find(userId: number, id: number) {
    return client.get(`/users/${userId}/todos/${id}`, {
      headers: getAuthHeaders()
    })
    .then(response => response.data)
    .then(data => new Todo(data))
    .catch(error => {
      console.error('Error retrieving todo:', error);
      throw new Error('There was an error retrieving the todo. Please try again.');
    });
  },
};

export { todoAPI };
