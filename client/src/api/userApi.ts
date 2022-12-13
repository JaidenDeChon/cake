import axios from 'axios';

import type { IUser } from '@models/';

export async function createUser (userData: IUser): Promise<IUser> {
    const result = await axios.post('api/users/create-user', userData);
    return result.data;
}

export async function getUserById (id: string): Promise<IUser> {
    const result = await axios.get(`api/users/get-user-by-id/${ id }`);
    return result.data;
}

export async function login (email: string, password: string): Promise<IUser> {
    const result = await axios.post('api/users/login', { email, password });
    return result.data;
}
