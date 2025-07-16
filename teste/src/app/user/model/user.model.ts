export interface User {
    id: number;
    name: string;
    login: string;
    email: string;
    password: string;
    phoneNumber: number;
    photo?: string;
    matricula: string;
    isActive: boolean;
    createdAt: Date;
}