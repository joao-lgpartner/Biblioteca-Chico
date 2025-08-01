export interface User {
    id: number;
    name: string;
    login: string;
    email: string;
}

export interface UserCreate extends Omit<User, 'id'> {
    password: string;
}

export interface UserUpdate extends User {
    password?: string;
}

export interface LoginResponse {
    access_token: string;
    toke_type: string;
    user: User;
}