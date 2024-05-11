import { UserType } from '../../types/user';
import client from './client';

export const getUsers = () => {
    return client.get<UserType[]> ('users');
};

export const createUser = (user: Pick<UserType, 'name' | 'email'>) => {
    return client.post('/users', user);
};

export const updateUser = (id: number, user: Pick<UserType, 'name' | 'email'>) => {
    return client.put(`/users/${id}`, user);
};

export const deleteUser = (id: number) => {
    return client.delete(`/users/${id}`);
};